import moment from 'moment';
import { useReducer } from 'react';
import reducer from './reducer';
import { IAdminSettingInitState } from './type';

const useAdminSettingHook = () => {
  const initialState: IAdminSettingInitState = {
    requiredStaffData: [],
    groupListData: [],
    holidayListData: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useAdminSettingHook;
