import ApiClient from './ApiClient';
import { LoginDataType } from '../types/authType';

export const loginApi = async (params: { email: string, password: string }): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/login', {}, params);
  return data;
};

export const logoutApi = async (): Promise<any> => {
  const { data } = await ApiClient.post('/api/logout', {}, {});
  return data;
};

export const sendVerifyCodeApi = async (email: string): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/sendVerifyCode', {}, {email});
  return data;
};

export const resetPasswordApi = async (params: { password: string, verify_code: string, email: string}): Promise<any> => {
  const { data } = await ApiClient.postJsonData('/api/resetPassword', {}, params);
  return data;
};

export const validateAccessTokenApi = async (companyCode: string, staffId: string): Promise<any> => {
  const { data } = await ApiClient.get(`/v1/staffs/${companyCode}`, { staffId });
  return data;
};

export default validateAccessTokenApi;
