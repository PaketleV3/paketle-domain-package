import { ITokenModel } from '../token/token';
import { MONITORTYPES, RECEIVE_TYPE } from './constants';

export interface IDummySignalObject {
  type: RECEIVE_TYPE;
  data?: any;
}

export interface IDummyMonitorData {
  id: any;
  data: any;
}

export interface IMonitorModel {
  type: MONITORTYPES;
  data: ITokenModel;
}

export interface IMonitorDummy {
  type: MONITORTYPES;
  id: any;
  data: any;
}

export interface IMonitorLog {
  type: MONITORTYPES;
  data: any;
}
