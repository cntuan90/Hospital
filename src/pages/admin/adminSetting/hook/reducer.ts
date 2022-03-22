import { IAdminSettingInitState } from './type';
import { Actions, types } from './actions';

const reducer = (state: IAdminSettingInitState, action: Actions): IAdminSettingInitState => {
  const cloneState: IAdminSettingInitState = JSON.parse(JSON.stringify({ ...state }));

  switch (action.type) {
    case types.SET_REQUIREDSTAFFS:
      cloneState.requiredStaffData = action.payload;
      return cloneState;

    case types.SET_GROUPLIST:
      cloneState.groupListData = action.payload;
      return cloneState;

    case types.SET_HOLIDAYLIST:
      cloneState.holidayListData = action.payload;
      return cloneState;

    default:
      return state;
  }
};

export default reducer;
