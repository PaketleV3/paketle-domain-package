export enum WorkingTypes {
  POOL,
  DEDICA,
  JOKER,
}

export interface IUserStatusChange {
  id: number;
  new_status: string;
}

export interface IUser {
  id: number;
  name: string;
  hash: string;
}

export interface IWork {
  working_type_code: WorkingTypes;
  firm_id: number;
  pool_id: number;
}

export interface IQ {
  courier: IUser;
  work: IWork;
}
