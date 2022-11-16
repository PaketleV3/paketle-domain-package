export enum OrderStatusEnum {
  WAIT = 'Bekliyor, kurye teslim almadı',
  INACT = 'Toplanıyor işlemde',
  ONWAY = 'Kuryede',
  CANCEL = 'İptal Edildi',
  COMPLETE = 'Teslim Edildi',
  COMPLETESYNC = 'Senkronize edildi',
}

export enum OrderItemStatusEnum {
  OK = 'Onaylandı',
  CANCEL = 'İptal Edildi',
  WAIT = 'Bekliyor',
}

export enum OrderItemSaleStatusEnum {
  IF_SALE = 'Satıştaki ürün',
  OUT_OF_SALE = 'Sepetten çıkarılan ürün',
}

export enum OrderItemUnitEnum {
  KOLI = 'Koli',
  ADET = 'Adet',
  MIKTAR = 'Miktar',
  KG = 'Kg',
  Gr = 'Gram',
  LT = 'Lt',
}

export enum OrderWarehouseStatusEnum {
  WAIT = 'Bekliyor',
  OK = 'Kurye Onayladı',
  OUT = 'Eksik',
}

export interface OrderItem {
  id: number;
  qty: number;
  item_price: number;
}

export interface OrderDetail {
  id: number;
  lat: string;
  long: string;
  order_code: string;
  order_date: Date;
  address: string;
  city: string;
  district: string;
  items: OrderItem[];
}
