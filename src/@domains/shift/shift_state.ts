import { IWorkingPlan } from '../state/state';

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

export interface IKpi {
  type: string;
  label: string;
  value: number;
  data: object;
  series: [];
}

export interface IWorkingDailyPlan {
  today: IWorkingPlan[];
  tomorrow: IWorkingPlan[];
}

export interface IShiftState {
  reject_count?: number;
  client: IAuthClient;
  user: IStateUser;
  is_start_shift?: boolean;
  is_startable_shift?: boolean;
  show_shift_answer?: boolean;
  working_plan: IWorkingDailyPlan;
  active_work: IWorkingPlan;
  dashboard_data: IKpi[];
}
