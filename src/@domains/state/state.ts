export interface IWork {
  id: number;
  firm_id?: number;
  firm_name?: string;
  start: any;
  end: any;
  working_type: 'POOL' | 'DEDICA';
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
  current_pool?: string;
  reject_count?: number;
  messaging_token?: string;
  shift_start_date?: Date;
  work: IWork;
}
