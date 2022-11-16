import { ADMIN_CHANGE_TYPE } from './constants';

export interface CourierAdminChange {
  type: ADMIN_CHANGE_TYPE;
  id?: number;
}
