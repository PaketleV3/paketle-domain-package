export const GET_STATE_SQL = `
SELECT json_build_object(
               'id', c.id,
               'name_surname', c.name_surname,
               'status_code', c.status_id,
               'courier_type', c.courier_type_id,
               'lat', c.lat,
               'long', c.long
           ) as user,
       json_build_object(
               'id', cl.id,
               'client_name', cl.client_name,
               'logo_url', cl.logo_url
           ) as client,
       (SELECT json_agg(r.*)
        FROM (
                 SELECT wp.id,
                        wd.id                                  as working_day_id,
                        COALESCE(wd.is_answer, false)          as working_plan_confirm,
                        (CASE
                            WHEN 
                                                           (to_char(wp.start, 'YYYY-MM-DD') = to_char(now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul', 'YYYY-MM-DD') )
                                                           OR 
                                                           (now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' BETWEEN wp.start AND wp.end)
                                                        THEN 'today'
                            WHEN 
                                                               to_char(wp.start, 'YYYY-MM-DD') = to_char(now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' + interval '-1 day', 'YYYY-MM-DD')
                            THEN 'yesterday'
                            ELSE
                                'tomorrow'
                           END)                               as group_day,
                        to_char(wp.start, 'YYYY-MM-DD')        as "date",
                        wp.working_type_id                     as working_type,
                        wp.firm_id,
                        firm."name"                            as firm_name,
                        firm.lat,
                        firm.long,
                        COALESCE(firm.package_limit, 10)::numeric as package_limit,
                        COALESCE(firm.first_package_status, false) as first_package_status,
                        COALESCE(firm.select_package_type, 'NONE') as select_package_type,
                        COALESCE(firm.disable_show_address, false) as disable_show_address,
                        COALESCE(firm.disable_start_image, false) as disable_start_image,
                        wp.pool_id,
                        pool.pool_name,
                        wp.pool_id,
                        pool.pool_name,
                        wp."start",
                        wp."end",
                        wp.onway_time,
                        wp.tariff_id,
                        coalesce(wp.is_overwork, false)        as is_overwork,
                        coalesce(wp.is_report_complete, false) as is_report_complete,
                        wp.replacement_moto_id                 as replacement_plate,
                        coalesce(wp.is_manuel_shift, false)    as is_manuel_shift,
                        coalesce(wp.is_end, false)             as is_end,
                        --coalesce(firm.is_enable_menuel_delivery, false) as is_enable_menuel_delivery,
                        CASE WHEN wp.working_type_id='POOL' THEN 'INTEGRATION'
                        ELSE coalesce(firm.delivery_policy_id, 'NONE') 
                        END as delivery_policy_id,

                        CASE WHEN wp.working_type_id='POOL' THEN 
                            COALESCE((SELECT json_agg(json_build_object(
                                'id', fi.id,
                                'name', fi.name,
                                'manuel_delivery', COALESCE(fi.is_enable_menuel_delivery, false)
                            )) FROM firm_pool fp JOIN firm fi ON fi.id = fp.firm_id WHERE fi.is_active AND fp.pool_id=wp.pool_id), json_build_array())
                            ELSE
                                json_build_array(json_build_object(
                                    'id', firm.id,
                                    'name', firm.name,
                                    'manuel_delivery', COALESCE(firm.is_enable_menuel_delivery, false)
                                ))
                        END as firms,

                        case
                            when 
							    (wp.working_type_id='DEDICA' AND firm.is_enable_menuel_delivery IS TRUE) OR wp.working_type_id='POOL' THEN true
                            else false 
                         end  as is_enable_menuel_delivery,
                        CASE
                            WHEN (
                                            now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' >=
                                            wp."start" - INTERVAL '10 minutes'
                                    AND
                                            now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' <=
                                            wp."end"
                                ) THEN true
                            ELSE FALSE END as is_active_state,

                        CASE
                            WHEN (
                                    /*to_char(now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul',
                                            'YYYY-MM-DD') = to_char(wp."start", 'YYYY-MM-DD')*/
                                    now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' <=
                                            wp."end"
                                ) THEN true
                            ELSE FALSE END                     as is_active_today,

                        COALESCE(wd.is_answer, false)          as is_shift_answer,
                        coalesce(wd.is_shift_start, false)     as is_start_shift,
                        case
                            when 
                            	-- coalesce(firm.delivery_policy_id, 'NONE') = 'NONE' and
                                 coalesce(wp.is_report_complete, false) is false  
                                and now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' >= wp."end" 
                                 -- and coalesce(wp.is_start, false)
                                THEN true
                            else false end                     as is_require_report,

                        Extract(EPOCH FROM (wp."end" - now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul'))::int4 +
                        1                                      AS to_end_second,
                        Extract(EPOCH FROM (wp."start" - now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul'))::int4 +
                        1                                      AS to_start_second
                 FROM working_plan wp
                        LEFT JOIN working_day wd ON wd.courier_id = wp.courier_id
                     AND to_char(wd.workday, 'YYYY-MM-DD') =
                         to_char(wp."start", 'YYYY-MM-DD')
                          LEFT JOIN pool ON pool."id" = wp.pool_id
                          LEFT JOIN firm ON firm.id = wp.firm_id
                 WHERE wp.courier_id = c.id
                    AND wp.is_active
                   --AND wd.courier_id = c.id
                   AND (
                         ( -- Dün başladı bugün bir zaman aralığında bitti ancak raporlama yapılmadı
                                     date_trunc('day', wp.start) = date_trunc('day', now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' + interval '-1 day')
                                 and date_trunc('day', wp.end) = date_trunc('day', now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul')
                                 and (
                                             coalesce(wp.is_start, false)
                                             --AND not coalesce(wp.is_end, false)
                                             and (wp.is_report_complete is not true AND wp.is_operation_edited IS NOT TRUE
                                                -- and coalesce(firm.delivery_policy_id, 'NONE') = 'NONE'
                                            )
                                         )
                             )
                         or
                         ( -- Dün başladı bugün içindeyiz; rapor durumuna bakılmıyor
                                     date_trunc('day', wp.start) = date_trunc('day', now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' + interval '-1 day')
                                 -- and coalesce(wp.is_start, false)
                                 and
                                     now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' BETWEEN wp.start::timestamp AND wp.end::timestamp
                             )
                         or (
                             date_trunc('day', wp.start) = date_trunc('day', now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul')
                             )
                         or (
                                 date_trunc('day', wp.start) = date_trunc('day', now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' + interval '+1 day')
                             )
                     )
                 ORDER BY wp."start"
             ) as r
       )     as working_plan,
       (
           SELECT count(courier_id)::int as count
           FROM courier_reject_log
           where DATE_TRUNC('month', reject_date at time zone 'Europe/Istanbul') =
                 DATE_TRUNC('month', now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul')
             and courier_id = c.id
       )     as reject_count
FROM couriers c
         JOIN clients cl
              ON cl.id = c.client_id
WHERE c.is_active
  AND c.id = $1
`
