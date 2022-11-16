import { RECEIVE_TYPE } from './constants';

export interface IAskOrderObject {
  hash: string;
  firm: string;
  address: string;
  city_district?: string;
  desi?: number;
}

export interface INotifyAskObject {
  type: RECEIVE_TYPE;
  data: IAskOrderObject;
}

export interface IBaseOrder {
  customer_name: string;
  address: string;
  lat_long: string;
}

export interface IChangeDelivery {
  delivery_id: number;
  is_complete: boolean;
  complete_count: number;
  remainder_count: number;
  order_count: number;
  next: IBaseOrder;
}

export interface IChangeDeliveryObject {
  type: RECEIVE_TYPE;
  data: IChangeDelivery;
}

export interface INotifyDelivery {
  delivery_id: number;
  order_count?: number;
  address: string;
  cancelable: boolean;
  slot: boolean;
  slotTime: string;
  price?: number;
}

export interface INotifyDeliveryObject {
  type: RECEIVE_TYPE;
  data: INotifyDelivery;
}
