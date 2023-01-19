import { RECEIVE_TYPE } from './constants';

export interface IReturnUpdate {
  target_time: number;
  target_km: number;
  current_location: string;
  target_name?: string;
  target_location?: string;
  arrived?: boolean;
}

export interface IReturnUpdateObject {
  type: RECEIVE_TYPE;
  data: IReturnUpdate;
}

export interface ILocSignal {
  lat: string;
  long: string;
  battery: number;
  speed?: number;
  bearing?: number;
  accuracy?: number;
}

export interface IPublishCourier {
  loc: ILocSignal;
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
