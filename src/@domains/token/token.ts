export interface ITokenModel {
  user_id: number;
  token: string;
  name: string;
}

export interface IJwtUser {
  user_id: number;
  user_name: string;
  mobile_phone: string;
  email: string;
  client_id: number;
  firm_id?: number;
  brand_id?: number | null | undefined;
  company_id?: number | null;
  region_id?: number | null;
  client: string;
  user_type: string;
  expires: any;
}
