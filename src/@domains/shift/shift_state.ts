export interface IAuthClient {
  id: number;
  client_name: string;
  logo_url: string;
}

export interface IStateUser {
  id: number;
  name_surname: string;
  status_code: string;
  courier_type: string;
  lat: string;
  long: string;
}

export interface IWorkinPlan {
  id: number;
  working_day_id: number;
  working_plan_confirm: boolean;
  working_type: string;
  firm_id: number;
  firm_name: string;
  lat: string;
  long: string;
  pool_id: number;
  pool_name: string;
  start: Date;
  end: Date;
  onway_time: number;
  is_overwork: boolean;
  replacement_plate: string;
  is_active_state: boolean;
  is_shift_answer: boolean;
  is_start_shift?: boolean;
}

export interface IKpi {
  type: string;
  label: string;
  value: number;
  data: object;
  series: [];
}

export interface IWorkingDailyPlan {
  today: IWorkinPlan[];
  tomorrow: IWorkinPlan[];
}

export interface IShiftState {
  reject_count?: number;
  client: IAuthClient;
  user: IStateUser;
  is_start_shift?: boolean;
  is_startable_shift?: boolean;
  show_shift_answer?: boolean;
  working_plan: IWorkingDailyPlan;
  active_work: IWorkinPlan;
  dashboard_data: IKpi[];
}
