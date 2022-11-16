import { RECEIVE_TYPE } from './constants';

export interface ReturnUpdate {
  target_time: number;
  target_km: number;
  current_location: string;
}

export interface ReturnUpdateObject {
  type: RECEIVE_TYPE;
  data: ReturnUpdate;
}

export interface LocSignal {
  lat: string;
  long: string;
  battery: number;
}

export interface PublishCourier {
  loc: LocSignal;
  courier_id: number;
  firm_id?: number;
  courier_name: string;
  last_update: Date;
  route: {
    km: number;
    time: number;
    name?: string;
  };
}
