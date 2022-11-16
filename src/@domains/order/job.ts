import { IOrderDetail } from './order.model';

export interface IOrder2DeliveryModel {
  firm_id: number;
  order_id: number;
  delivery_type_id: string;
  lat?: string;
  long?: string;
  repeat?: number;
}

export interface IFirmPool {
  pool_id: number;
  pool_name: string;
}

export interface IFirmDetail {
  id: number;
  name: string;
  lat: string;
  long: string;
  address: string;
  group_id: string;
  pool?: IFirmPool[];
}

export interface IJobModel {
  hash: string;
  firm: IFirmDetail;
  order: IOrderDetail;
  job: IOrder2DeliveryModel;
  courierId?: number;
}
