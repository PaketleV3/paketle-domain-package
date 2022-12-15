import {WorkingTypes} from '../courier/constants';
import {ShiftPosition} from './constants';

export interface IWorkingPlan {
    id: number;
    working_day_id: number;
    working_plan_confirm: boolean;
    working_type: WorkingTypes;
    firm_id: number;
    tariff_id?: number;
    firm_name: string;
    lat: string;
    long: string;
    pool_id: number;
    pool_name: string;
    start: Date;
    end: Date;
    onway_time: number;
    is_overwork: boolean;
    is_report_complete: boolean;
    replacement_plate: string;
    is_manuel_shift: boolean;
    is_active_state: boolean;
    is_active_today: boolean;
    is_shift_answer: boolean;
    is_start_shift?: boolean;
    to_end_second?: number;
    to_start_second?: number;
}

export interface IStateObject {
    id: number;
    hash: string;
    last_update?: Date;
    validate_hash: string;
    open_log?: boolean;
    name: string;
    firm_id?: number;
    firm?: string;
    client_id?: number;
    client_name?: string;
    status?: string;
    lat?: string;
    long?: string;
    is_online?: boolean;
    battery?: number;
    speed?: number;
    accuracy?: number;
    bearing?: number;
    phone_info?: string;
    current_pool?: string;
    reject_count?: number;
    messaging_token?: string;
    shift_start_date?: Date;
    work: IWorkingPlan;
    today: IWorkingPlan[];
}

export interface IShiftJob {
    courier_id: number;
    shift_position: ShiftPosition;
    work: IWorkingPlan;
}
