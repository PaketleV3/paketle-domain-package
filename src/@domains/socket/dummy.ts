import { ITokenModel } from '../token/token';
import { MONITORTYPES, RECEIVE_TYPE } from './constants';

export interface IDummySignalObject {
  type: RECEIVE_TYPE;
  data?: any;
}

export interface DummyMonitorData {
  id: any;
  data: any;
}

export interface MonitorModel {
  type: MONITORTYPES;
  data: ITokenModel;
}

export interface MonitorDummy {
  type: MONITORTYPES;
  id: any;
  data: any;
}

export interface MonitorLog {
  type: MONITORTYPES;
  data: any;
}
