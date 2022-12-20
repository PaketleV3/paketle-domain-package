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
                             WHEN to_char(wp.start, 'YYYY-MM-DD') = to_char(now(), 'YYYY-MM-DD') THEN 'today'
                             WHEN to_char(wp.start, 'YYYY-MM-DD') = to_char(now() + interval '-1 day', 'YYYY-MM-DD')
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
                        --coalesce(firm.is_enable_menuel_delivery, false)                   as is_enable_menuel_delivery,
                        case
                            when coalesce(firm.delivery_policy_id, 'NONE') = 'NONE'
                                THEN true
                            else false end                     as is_enable_manuel_delivery,
                        CASE
                            WHEN (
                                            now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' >=
                                            wp."start" - INTERVAL '10 minutes'
                                    AND
                                            now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' <=
                                            wp."end"
                                ) THEN true
                            ELSE FALSE END                     as is_active_state,

                        CASE
                            WHEN (
                                    to_char(now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul',
                                            'YYYY-MM-DD') = to_char(wp."start", 'YYYY-MM-DD')
                                ) THEN true
                            ELSE FALSE END                     as is_active_today,

                        COALESCE(wd.is_answer, false)          as is_shift_answer,
                        coalesce(wd.is_shift_start, false)     as is_start_shift,
                        case
                            when coalesce(firm.delivery_policy_id, 'NONE') = 'NONE' and
                                 coalesce(wp.is_report_complete, false) is false  
                                and now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' <= wp."end" + INTERVAL '10 minutes'
                                 -- and coalesce(wp.is_start, false)
                                THEN true
                            else false end                     as is_require_report,

                        Extract(EPOCH FROM (wp."end" - now() at time zone 'Europe/Istanbul'))::int4 +
                        1                                      AS to_end_second,
                        Extract(EPOCH FROM (wp."start" - now() at time zone 'Europe/Istanbul'))::int4 +
                        1                                      AS to_start_second
                 FROM working_plan wp
                          LEFT JOIN working_day wd ON wd.courier_id = wp.courier_id
                     AND to_char(wd.workday, 'YYYY-MM-DD') =
                         to_char(wp."start", 'YYYY-MM-DD')
                          LEFT JOIN pool ON pool."id" = wp.pool_id
                          LEFT JOIN firm ON firm.id = wp.firm_id
                 WHERE wp.courier_id = c.id
                   --AND wd.courier_id = c.id
                   AND (
                         ( -- Dün başladı bugün bir zaman aralığında bitti ancak raporlama yapılmadı
                                     date_trunc('day', wp.start) = date_trunc('day', now() + interval '-1 day')
                                 and date_trunc('day', wp.end) = date_trunc('day', now())
                                 and (
                                             coalesce(wp.is_start, false)
                                             --AND not coalesce(wp.is_end, false)
                                             and (wp.is_report_complete is not true and
                                                  coalesce(firm.delivery_policy_id, 'NONE') = 'NONE')
                                         )
                             )
                         or
                         ( -- Dün başladı bugün içindeyiz; rapor durumuna bakılmıyor
                                     date_trunc('day', wp.start) = date_trunc('day', now() + interval '-1 day')
                                 and coalesce(wp.is_start, false)
                                 and
                                     now()::timestamp at time zone 'UTC' at time zone 'Europe/Istanbul' BETWEEN wp.start::timestamp AND wp.end::timestamp
                             )
                         or (
                             date_trunc('day', wp.start) = date_trunc('day', now())
                             )
                         or (
                                 date_trunc('day', wp.start) = date_trunc('day', now() + interval '+1 day')
                             )
                     )
                 ORDER BY wp."start"
             ) as r
       )     as working_plan,
       (
           SELECT count(courier_id)::int as count
           FROM courier_reject_log
           where DATE_TRUNC('month', reject_date at time zone 'Europe/Istanbul') =
                 DATE_TRUNC('month', now() at time zone 'Europe/Istanbul')
             and courier_id = c.id
       )     as reject_count
FROM couriers c
         JOIN clients cl
              ON cl.id = c.client_id
WHERE c.is_active
  AND c.id = $1
`
