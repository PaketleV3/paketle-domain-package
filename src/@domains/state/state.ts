import { WorkingTypes } from '../courier/constants';

export interface IWorkingPlan {
  id: number;
  working_day_id: number;
  working_plan_confirm: boolean;
  working_type: WorkingTypes;
  firm_id: number;
  tariff_id?: number;
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
  is_active_today: boolean;
  is_shift_answer: boolean;
  is_start_shift?: boolean;
}


export interface IWork_ {
  id: number;
  firm_id?: number;
  firm_name?: string;
  start: any;
  end: any;
  working_type: WorkingTypes;
  pool_id?: number;
  pool_name?: string;
  replacement_plate?: string;
  onway_time?: any;
  is_overwork: boolean;
  tariff_id?: number;
}
export interface IStateObject {
  id: number;
  hash: string;
  last_update?: Date;
  validate_hash: string;
  name: string;
  firm_id?: number;
  firm?: string;
  client_id?: number;
  client_name?: string;
  status?: string;
  lat?: string;
  long?: string;
  is_online?: boolean;
  battery?: number;
  speed?: number;
  accuracy?: number;
  bearing?: number;
  phone_info?: string;
  current_pool?: string;
  reject_count?: number;
  messaging_token?: string;
  shift_start_date?: Date;
  work: IWorkingPlan;
  today: IWorkingPlan[];
}
