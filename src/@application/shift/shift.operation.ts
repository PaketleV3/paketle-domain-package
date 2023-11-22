import { IShiftState } from '../../@domains/shift/shift_state';

export class ShiftOperation {
  static createState(result: any) {
    let workingPlans;
    try {
      workingPlans = result.working_plan.reduce((group: any, item: any) => {
        const { group_day } = item;
        group[group_day] = group[group_day] ?? [];
        group[group_day].push({
          id: item.id,
          working_day_id: item.working_day_id,
          working_plan_confirm: item.working_plan_confirm,
          working_type: item.working_type,
          firm_id: item.firm_id,
          firm_name: item.firm_name,
          package_limit: Number(item.package_limit || 10),
          first_package_status: item?.first_package_status || false,
          select_package_type: item?.select_package_type || 'NONE',
          disable_show_address: item?.disable_show_address || false,
          disable_start_image: item?.disable_start_image || false,
          lat: item.lat,
          long: item.long,
          pool_id: item.pool_id,
          pool_name: item.pool_name,
          start: item.start,
          end: item.end,
          is_report_complete: item.is_report_complete,
          tariff_id: item.tariff_id,
          onway_time: item.onway_time,
          is_overwork: item.is_overwork,
          replacement_plate: item.replacement_plate,
          is_manuel_shift: item.is_manuel_shift,
          is_end: item.is_end,
          is_active_state: item.is_active_state,
          is_active_today: item.is_active_today,
          is_shift_answer: item.is_shift_answer,
          is_start_shift: item.is_start_shift,
          is_enable_manuel_delivery: item.is_enable_menuel_delivery || false,
          to_end_second: item.to_end_second,
          to_start_second: item.to_start_second,
          is_require_report: item.is_require_report,
          delivery_policy_id: item.delivery_policy_id,
          firms: item.firms || [],
        });
        return group;
      }, {});
    } catch (e) {
      console.error(e);
    }

    const response: IShiftState = {
      reject_count: result.reject_count,
      client: result.client,
      user: result.user,
      working_plan: workingPlans,
      is_start_shift: false,
      is_startable_shift: false,
      show_shift_answer: false,
      is_report_yesterday: workingPlans && workingPlans.yesterday && workingPlans.yesterday.length > 0 &&
        workingPlans.yesterday.findIndex((i: any) => i.is_require_report) !== -1 ? true : false,
      is_report_today: workingPlans && workingPlans.today && workingPlans.today.length > 0 &&
        workingPlans.today.findIndex((i: any) => i.is_require_report && i.is_start_shift) !== -1 ? true : false,
      active_work:
        workingPlans && workingPlans.today && workingPlans.today.length > 0
          ? workingPlans.today.find((i: any) => i.is_active_today && !i.is_end && i.is_active_state)
          : {},
      is_yesterday: workingPlans && workingPlans.yesterday && workingPlans.yesterday.length >0 ? true : false,
      next_work: undefined,
      dashboard_data: [
        // {
        //   label: 'Paket',
        //   type: 'value',
        //   value: 0,
        //   series: [],
        //   data: {},
        // },

        // {
        //   label: 'Ek Km',
        //   type: 'value',
        //   value: 0,
        //   series: [],
        //   data: {},
        // },
      ],
    };

    if (response && response.is_yesterday) {
      const checkActiveWorkYesterDay = workingPlans.yesterday.find((i: any) => i.is_active_today && !i.is_end && i.is_active_state);
      if (checkActiveWorkYesterDay && checkActiveWorkYesterDay.id && checkActiveWorkYesterDay.is_active_state) {
        response.active_work = checkActiveWorkYesterDay;
      }
    }

    if (response.working_plan.yesterday && response.working_plan.yesterday.findIndex((i: any) => i.is_active_state) !== -1) {
      response.next_work = response.working_plan.yesterday.find((i: any) => i.is_active_state);
    } else if (response.working_plan.today && response.working_plan.today.findIndex((i: any) => i.is_active_today) !== -1) {
      response.next_work = response.working_plan.today.find((i: any) => i.is_active_today);
    }


    if (response.next_work && response.next_work.is_active_today) {
      response.is_start_shift = response.next_work.is_start_shift;
      response.is_startable_shift = response.next_work && !response.next_work.is_start_shift && response.next_work.is_active_state;
      response.show_shift_answer =
        !response.next_work.is_start_shift &&
          !response.next_work.is_shift_answer &&
          !response.next_work.is_active_state &&
          response.next_work && response.next_work.to_start_second && response.next_work.to_start_second < 7200
          ? true
          : false;
    } else {
      response.show_shift_answer = response.working_plan.today && response.working_plan.today.findIndex((i: any) => i.to_start_second < 7200 && i.is_active_today && !i.is_active_state) !== -1
    }

    return response;
  }
}
