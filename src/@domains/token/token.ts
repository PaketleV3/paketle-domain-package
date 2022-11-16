export interface ITokenModel {
  user_id: number;
  token: string;
  name: string;
}

export interface JwtUser {
  user_id: number;
  user_name: string;
  mobile_phone: string;
  email: string;
  client_id: number;
  firm_id?: number;
  client: string;
  user_type: string;
  expires: any;
}
