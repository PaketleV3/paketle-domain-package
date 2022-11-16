import { Sorting, VehicleTypes } from './constants';

export interface ITwoPointDistance {
  mode: VehicleTypes;
  origin: string;
  destination: string;
}

export interface WayPointItems {
  id: string;
  location: string;
}

export interface WayPointRequest {
  mode: VehicleTypes;
  sorting: Sorting;
  start_point: string;
  end_point: string;
  wait_time: number;
  points: WayPointItems[];
}

export interface WayPointItemDto {
  lat: number;
  long: number;
  type: string;
  in_date: Date;
  out_date: Date;
  distance: number;
  duration: number;
}
