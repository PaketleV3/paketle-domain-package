import { OrderDetail } from './order.model';

export interface Order2DeliveryModel {
  firm_id: number;
  order_id: number;
  delivery_type_id: string;
  lat?: string;
  long?: string;
  repeat?: number;
}

export interface FirmPool {
  pool_id: number;
  pool_name: string;
}

export interface FirmDetail {
  id: number;
  name: string;
  lat: string;
  long: string;
  address: string;
  group_id: string;
  pool?: FirmPool[];
}

export interface JobModel {
  hash: string;
  firm: FirmDetail;
  order: OrderDetail;
  job: Order2DeliveryModel;
  courierId?: number;
}
