import { IShiftState } from '../../@domains/shift/shift_state';

export class ShiftOperation {
  static createState(result: any) {
    const workingPlans = result.working_plan.reduce((group: any, item: any) => {
      const { group_day } = item;
      group[group_day] = group[group_day] ?? [];
      group[group_day].push({
        id: item.id,
        working_day_id: item.working_day_id,
        working_plan_confirm: item.working_plan_confirm,
        working_type: item.working_type,
        firm_id: item.firm_id,
        firm_name: item.firm_name,
        lat: item.lat,
        long: item.long,
        pool_id: item.pool_id,
        pool_name: item.pool_name,
        start: item.start,
        end: item.end,
        tariff_id: item.tariff_id,
        onway_time: item.onway_time,
        is_overwork: item.is_overwork,
        replacement_plate: item.replacement_plate,
        is_active_state: item.is_active_state,
        is_active_today: item.is_active_today,
        is_shift_answer: item.is_shift_answer,
        is_start_shift: item.is_start_shift,
      });
      return group;
    }, {});

    const response: IShiftState = {
      reject_count: result.reject_count,
      client: result.client,
      user: result.user,
      working_plan: workingPlans,
      is_start_shift: false,
      is_startable_shift: false,
      show_shift_answer: false,
      active_work:
        workingPlans.today && workingPlans.today.length > 0
          ? workingPlans.today.find((i: any) => i.is_active_today)
          : {},
      dashboard_data: [
        {
          label: 'Paket',
          type: 'value',
          value: 0,
          series: [],
          data: {},
        },

        {
          label: 'Ek Km',
          type: 'value',
          value: 0,
          series: [],
          data: {},
        },
      ],
    };

    if (response.active_work && response.active_work.is_active_today) {
      response.is_start_shift = response.active_work.is_start_shift;
      response.is_startable_shift = !response.active_work.is_start_shift;
      response.show_shift_answer =
        !response.active_work.is_start_shift && !response.active_work.is_shift_answer ? true : false;
    }

    return response;
  }
}