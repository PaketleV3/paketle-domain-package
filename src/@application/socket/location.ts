import { IReturnUpdate } from "../../@domains/socket/location";

export class ReturnUpdate implements IReturnUpdate {
  target_time!: number;
  target_km!: number;
  current_location!: string;
}
