import { RECEIVE_TYPE } from './constants';

export interface AskOrderObject {
  hash: string;
  firm: string;
  address: string;
  city_district?: string;
  desi?: number;
}

export interface NotifyAskObject {
  type: RECEIVE_TYPE;
  data: AskOrderObject;
}

export interface BaseOrder {
  customer_name: string;
  address: string;
  lat_long: string;
}

export interface ChangeDelivery {
  delivery_id: number;
  is_complete: boolean;
  complete_count: number;
  remainder_count: number;
  order_count: number;
  next: BaseOrder;
}

export interface ChangeDeliveryObject {
  type: RECEIVE_TYPE;
  data: ChangeDelivery;
}

export interface NotifyDelivery {
  delivery_id: number;
  order_count?: number;
  address: string;
  cancelable: boolean;
  slot: boolean;
  slotTime: string;
  price?: number;
}

export interface NotifyDeliveryObject {
  type: RECEIVE_TYPE;
  data: NotifyDelivery;
}
