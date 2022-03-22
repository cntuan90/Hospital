import { IAdminGroupSettingGetApi, IAdminGroupSettingPostApi, IListStaffGetApi } from '../pages/admin/adminSetting/group/type';
import { IAdminHolidaySettingGetApi } from '../pages/admin/adminSetting/holiday/type';
import { IAdminEntrySettingGetApi, IAdminEntrySettingPostApi } from '../pages/admin/adminSetting/initialization/type';
import { IRequiredStaffSettingGetApi, IRequiredStaffSettingPostObj } from '../pages/admin/adminSetting/requiredStaffs/type';
import { IAdminNotificatinSettingGetApi } from '../pages/admin/adminSetting/notification/type';
import ApiClient from './ApiClient';
import { IAdminGetListStaffApi, IGetStaffDetailApi } from '../pages/admin/staffManagement/type';
import { IShiftBoardManageGetApi } from '../pages/admin/shiftBoardManagement/type';
import { IDetailShiftBoardManagementGetApi, IDetailShiftBoardManagementParams, IShiftBoardManageGetDetailApi } from '../pages/admin/shiftBoardManagement/edit/type';

// ---------------Initialization Setting-------------------------

export const adminInitializationSettingApi = async (params: IAdminEntrySettingPostApi): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/setting/entryShiftSetting', {}, params);
  return data;
};

export const adminInitializationGetListApi = async (): Promise<IAdminEntrySettingGetApi> => {
  const { data } = await ApiClient.get('/api/setting/listShiftSetting', {});
  return data;
};

// ---------------Group Setting-------------------------

export const adminGroupSettingGetApi = async (): Promise<IAdminGroupSettingGetApi> => {
  const { data } = await ApiClient.postJsonData('/api/group/getListAssignment', {}, {});
  return data;
};

export const adminGroupSettingGetListStaffApi = async (): Promise<IListStaffGetApi[]> => {
  const { data } = await ApiClient.get('/api/staff/listStaff', {});
  return data;
};

export const adminGroupSettingApi = async (params: IAdminGroupSettingPostApi): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/group/createGroup', {}, params);
  return data;
};

export const adminGroupSettingDeleteApi = async (id: number): Promise<any> => {
  const params = {
    id: [id],
  }
  await ApiClient.postJsonData('/api/group/deleteGroup', {}, params);
};

// ---------------Required Staff Setting-------------------------

export const adminRequiredStaffSettingGetApi = async (): Promise<IRequiredStaffSettingGetApi[]> => {
  const { data } = await ApiClient.get('/api/group/getListGroup', {} );
  return data;
};

export const adminRequiredStaffSettingSaveApi = async (params: IRequiredStaffSettingPostObj): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/setting/group/setRequireNumber', {}, params);
  return data;
};

// ---------------Holiday Setting-------------------------
export const adminHolidaySettingGetApi = async (): Promise<IAdminHolidaySettingGetApi[]> => {
  const { data } = await ApiClient.get('/api/setting/listHoildaySetting', {});
  return data;
};

export const adminHolidaySettingSaveApi = async (params: any): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/setting/entryHolidaySetting', {}, params);
  return data;
};

export const adminHolidaySettingDeleteApi = async (id: any): Promise<any> => {
  const params = { 
    id: [id],
  };
  const { data } = await ApiClient.postJsonData('/api/setting/deleteHoliday', {}, params);
  return data;
};

// ---------------Notification Setting-------------------------
export const adminNotificatinSettingGetApi = async (): Promise<IAdminNotificatinSettingGetApi> => {
  const { data } = await ApiClient.get('/api/setting/listNotificationSetting', {});
  return data;
};

export const adminNotificatinSettingSaveApi = async (params: any): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/setting/entryNotificationSetting', {}, params);
  return data;
};

// ---------------Change Info Setting-------------------------
export const adminChangeInfoSettingSaveApi = async (params: any): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/setting/updateInfoAdmin', {}, params);
  return data;
};

// ---------------Admin Staff Management Setting-------------------------
export const adminGetStaffListApi = async (): Promise<IAdminGetListStaffApi[]> => {
  const { data } = await ApiClient.get('/api/staff/listStaffWithGroup', {});
  return data;
};

export const adminGetStaffDetailApi = async (id: string): Promise<IGetStaffDetailApi> => {
  const { data } = await ApiClient.get(`/api/staff/detailStaff?id=${id}`, {});
  return data;
};

export const getListStaffFileCSV = async (filename: string): Promise<any> => {
  await ApiClient.downloadCsv('/api/staff/downloadStaff', {}, filename );
};

export const updateListStaffFileCSV = async (filename: any): Promise<any> => {
  const params = {
    upload_file: filename,
  }
  await ApiClient.postMutipartData('/api/staff/uploadStaff', {}, params);
};

export const deleteStaffDetailApi = async (id: number[]) => {
  const params = {
    id,
  }
  await ApiClient.postJsonData('/api/staff/deleteStaff', {}, params);
}

export const adminAddStaffPostApi = async (params: any): Promise<void> => {
  const { data } = await ApiClient.postJsonData('/api/staff/createStaff', {}, params);
  return data;
};

export const adminUpdateStaffPostApi = async (params: any): Promise<void> => {
  const { data } = await ApiClient.postJsonData('/api/staff/updateStaff', {}, params);
  return data;
};

// ---------------Shift Board Management Setting-------------------------
export const getShiftBoardManagementListApi = async (): Promise<IShiftBoardManageGetApi[]> => {
  const { data } = await ApiClient.get('/api/management/list', {});
  return data;
};
``
export const getDetailShiftBoardMangementApi = async (params: IDetailShiftBoardManagementParams): Promise<IShiftBoardManageGetDetailApi[]> => {
  const { data } = await ApiClient.postJsonData('/api/management/getAllStaffShiftDetail', {}, params);
  return data;
};

export const adminUpdateStaffDetailTargetSetting = async (params: any): Promise<void> => {
  const { data } = await ApiClient.postJsonData('/api/management/updateTargetShiftNumber', {}, params);
  return data;
};

export const adminSaveDraftOrPublishShiftAssignmentApi = async (params: any): Promise<void> => {
  const { data } = await ApiClient.postJsonData('/api/management/adminShiftRegister', {}, params);
  return data;
};