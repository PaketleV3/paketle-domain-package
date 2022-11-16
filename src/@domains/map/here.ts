import { Sorting, VehicleTypes } from './constants';

export interface ITwoPointStart {
  time: Date;
  lat: number;
  long: number;
}

export interface ITwoPointDistance {
  mode: VehicleTypes;
  origin: string;
  destination: string;
}

export interface IWayPointItems {
  id: string;
  location: string;
}

export interface IWayPointRequest {
  mode: VehicleTypes;
  sorting: Sorting;
  start_point: string;
  end_point: string;
  wait_time: number;
  points: IWayPointItems[];
}

export interface IWayPointItemDto {
  lat: number;
  long: number;
  type: string;
  in_date: Date;
  out_date: Date;
  distance: number;
  duration: number;
}

export interface ITwoPointResponse {
  duration: number;
  distance: number;
  start: ITwoPointStart;
  end: ITwoPointStart;
}
