export enum RECEIVE_TYPE {
  NOTIFY_DELIVERY = 'NOTIFY_DELIVERY',
  STATE_UPDATE = 'STATE_UPDATE',
  CHANGE_DELIVERY = 'CHANGE_DELIVERY',
  RETURN_UPDATE = 'RETURN_UPDATE',
  WORKPLAN_UPDATE = 'WORKPLAN_UPDATE',
  RESET = 'RESET',
  ASK_ORDER = 'ASK_ORDER',
  LOCRESPONSE = 'LOCRESPONSE',
}

export enum ADMIN_CHANGE_TYPE {
  'ADDSHIFT' = 'ADDSHIFT',
  'CHANGESHIFT' = 'CHANGESHIFT',
  'DELETESHIFT' = 'DELETESHIFT',
  'STOPSHIFT' = 'STOPSHIP',
}

export enum MONITORTYPES {
  SAVETOKEN = 'SAVETOKEN',
  OPENSHIFT = 'OPENSHIFT',
  STATESTATUSCHANGE = 'STATESTATUSCHANGE',
  SETSTATE = 'SETSTATE',
  STATEHASH = 'STATEHASH',
  ADDFIRMQ = 'ADDFIRMQ',
  ADDPOOLQ = 'ADDPOOLQ',
  ORDER = 'ORDER',
  ASK = 'ASK',
  LOCRESPONSE = 'LOCRESPONSE',
}
