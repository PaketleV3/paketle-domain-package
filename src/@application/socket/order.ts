import { IBaseOrder, IChangeDelivery, INotifyDelivery } from '../../@domains/socket/order';

export class NotifyDelivery implements INotifyDelivery {
  delivery_id!: number;
  order_count?: number | undefined;
  address!: string;
  cancelable!: boolean;
  slot!: boolean;
  slotTime!: string;
  price?: number | undefined;
}

export class ChangeDelivery implements IChangeDelivery {
  delivery_id!: number;
  is_complete!: boolean;
  complete_count!: number;
  remainder_count!: number;
  order_count!: number;
  next!: IBaseOrder;
}
