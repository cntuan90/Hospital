import { IShiftBoardManageGetDetailApi } from "../edit/type";

export const types = {
  SET_HOLIDAYLIST: 'SET_HOLIDAYLIST',
  SET_HEADER_TOTAL_ASSIGNED_STAFF: 'SET_HEADER_TOTAL_ASSIGNED_STAFF',
  SET_HEADER_ASSIGNED_STAFFNAME: 'SET_HEADER_ASSIGNED_STAFFNAME',
  SET_SHOW_CALENDAR: 'SET_SHOW_CALENDAR',
  SET_SHOW_TARGET_SETTING: 'SET_SHOW_TARGET_SETTING',
  SET_HEADER_DATA_LIST: 'SET_HEADER_DATA_LIST',
  SET_HEADER_STAFF_NAME_ARR: 'SET_HEADER_STAFF_NAME_ARR',
  SET_SHOW_COLUMN: 'SET_SHOW_COLUMN',
} as const;

export const setHolidayList = (payload: any[]) => ({
  type: types.SET_HOLIDAYLIST,
  payload,
});

export const setHeaderTotalAssignedStaffs = (payload: any[]) => ({
  type: types.SET_HEADER_TOTAL_ASSIGNED_STAFF,
  payload,
});

export const setHeaderAssignedStaffName = (payload: IShiftBoardManageGetDetailApi[]) => ({
  type: types.SET_HEADER_ASSIGNED_STAFFNAME,
  payload,
});

export const setIsShowCalendar = (payload: {isShowCalendar: boolean, staffInfoOnCalendar: any}) => ({
  type: types.SET_SHOW_CALENDAR,
  payload,
});

export const setIsShowTargetSetting = (payload: {isShowTargetSetting: boolean, staffDetailTargetSetting: any}) => ({
  type: types.SET_SHOW_TARGET_SETTING,
  payload,
});

export const setHeaderDataList = (payload: any) => ({
  type: types.SET_HEADER_DATA_LIST,
  payload,
});

export const setHeaderStaffNameArr = (payload: any) => ({
  type: types.SET_HEADER_STAFF_NAME_ARR,
  payload,
});

export const setIsShowColumn = (payload: boolean) => ({
  type: types.SET_SHOW_COLUMN,
  payload,
});

export type Actions = ReturnType<typeof setHolidayList>
  | ReturnType<typeof setHeaderTotalAssignedStaffs>
  | ReturnType<typeof setHeaderAssignedStaffName>
  | ReturnType<typeof setIsShowCalendar>
  | ReturnType<typeof setIsShowTargetSetting>
  | ReturnType<typeof setHeaderDataList>
  | ReturnType<typeof setHeaderStaffNameArr>
  | ReturnType<typeof setIsShowColumn>
