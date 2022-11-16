export interface IOrderItem {
  id: number;
  qty: number;
  item_price: number;
}

export interface IOrderDetail {
  id: number;
  lat: string;
  long: string;
  order_code: string;
  order_date: Date;
  address: string;
  city: string;
  district: string;
  items: IOrderItem[];
}
