import { ADMIN_CHANGE_TYPE } from './constants';

export interface ICourierAdminChange {
  type: ADMIN_CHANGE_TYPE;
  id?: number;
}
