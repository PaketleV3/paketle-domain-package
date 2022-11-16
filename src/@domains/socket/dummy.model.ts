import { RECEIVE_TYPE } from './constants';

export interface DummySignalObject {
  type: RECEIVE_TYPE;
  data?: any;
}
