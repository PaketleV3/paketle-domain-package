import { RECEIVE_TYPE } from './constants';

export interface IDummySignalObject {
  type: RECEIVE_TYPE;
  data?: any;
}
