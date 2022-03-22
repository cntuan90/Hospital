// import { IAccountingDetail, IAccountingDetailInitState } from './type';

import { IAdminHolidaySettingGetApi } from "../holiday/type";

export const types = {
  SET_REQUIREDSTAFFS: 'SET_REQUIREDSTAFFS',
  SET_GROUPLIST: 'SET_GROUPLIST',
  SET_HOLIDAYLIST: 'SET_HOLIDAYLIST',
} as const;

export const setRequiredStaff = (payload: any) => ({
  type: types.SET_REQUIREDSTAFFS,
  payload,
});

export const setGroupList = (payload: any) => ({
  type: types.SET_GROUPLIST,
  payload,
});

export const setHolidayList = (payload: IAdminHolidaySettingGetApi[]) => ({
  type: types.SET_HOLIDAYLIST,
  payload,
});


export type Actions = ReturnType<typeof setRequiredStaff>
  | ReturnType<typeof setGroupList>
  | ReturnType<typeof setHolidayList>
