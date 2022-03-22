export interface IHoliday {
    date: string,
    name: string,
}
export interface IPrivateHoliday {
    timeFrom: string,
    timeTo: string
}
export interface IWeekType {
    regularHolidayMonday: boolean,
    regularHolidayTuesday: boolean,
    regularHolidayWednesday: boolean,
    regularHolidayThursday: boolean,
    regularHolidayFriday: boolean,
    regularHolidaySaturday: boolean,
    regularHolidaySunday: boolean,
}
export interface IResponseHolidayData {
    publicHolidayList: IHoliday[],
    privateHolidays: IPrivateHoliday[],
    weekDayHoliday: IWeekType
}
type Status = 1 | 2 | 0
export interface IStatusCalendar {
    date: string,
    status: Status
}

export interface UrlParamsTypeShiftBoard {
    id: string;
}

export interface IGroupInfo {
    group_id: number;
    group_name: string;
}

export interface IDateInfo {
    date: string;
    number_staff: number;
    date_type: any;
}

export interface IStaffShiftDetail {
    staff_id: number;
    staff_name: string;
    staff_shift_detail_id: number;
    shift_detail_status: number;
    date_register: string;
}

export interface IDetailShiftBoardManagementGetApi {
    group_info: IGroupInfo;
    date_info: IDateInfo[];
    staff_shift_detail: IStaffShiftDetail[];
}

export interface IDetailShiftBoardManagementParams {
    shift_management_id: string,
    period_start_date: string,
    period_end_date: string,
}

export interface StaffDetail {
    staff_id: number;
    staff_name: string;
}

export interface DateInfo {
    date: string;
    number_staff: number;
    date_type: string;
    assigned_staffs?: number; 
    assigned_staff_name?: StaffDetail[]; 
}

export interface ShiftDetail {
    staff_shift_detail_id: any;
    shift_detail_status: any;
    admin_assign_status: string;
    date_register: string;
    isAlert?: boolean;
    isGrey?: boolean;
    isSelectedOtherGrp?: boolean;
}

export interface ListStaffDetail {
    assignment_id: number;
    shift_assignment_id: number;
    shift_assignment_status: number;
    staff_id: number;
    staff_name: string;
    target_shift_number_weekday: number;
    target_shift_number_saturday: number;
    target_shift_number_sunday: number;
    target_shift_number_holiday: number;
    shift_detail: ShiftDetail[];
    admin_assigned_weekday?: number;
    admin_assigned_saturday?: number;
    admin_assigned_sunday?: number;
    admin_assigned_holiday?: number;
}

export interface IShiftBoardManageGetDetailApi {
    display_type: number;
    calendar_start_week_day: number;
    group_id: number;
    group_name: string;
    date_info: DateInfo[];
    list_staff_detail: ListStaffDetail[];
}
