import { IAdminSettingInitState } from './type';
import { Actions, types } from './actions';

const reducer = (state: IAdminSettingInitState, action: Actions): IAdminSettingInitState => {
  switch (action.type) {
    case types.SET_HOLIDAYLIST:
      return {... state, holidayListData: action.payload};
              
      case types.SET_HEADER_ASSIGNED_STAFFNAME:
      return {... state, tableHeaderAssignedStaffname: action.payload};
        
      case types.SET_HEADER_TOTAL_ASSIGNED_STAFF:
      return {... state, tableHeaderTotalAssignedStaffs: action.payload};

      case types.SET_SHOW_CALENDAR:
        return {
          ...state, 
          isShowCalendar: action.payload.isShowCalendar,
          staffInfoOnCalendar: action.payload.staffInfoOnCalendar,
        };

      case types.SET_SHOW_TARGET_SETTING:
        return {
          ...state, 
          isShowTargetSetting: action.payload.isShowTargetSetting,
          staffDetailTargetSetting: action.payload.staffDetailTargetSetting,
        };

      case types.SET_HEADER_STAFF_NAME_ARR:
        return {...state, tableHeaderStaffNameArr: action.payload};

      case types.SET_HEADER_DATA_LIST:
        return {...state, 
          tableHeaderAssignedStaffname: action.payload.formatedTableAssignedStaffName,
          tableHeaderTotalAssignedStaffs: action.payload.formatedTableHeaderTotalAssignedStaffs,
          tableHeaderListDate: action.payload.formatedTableHeaderlist,
        };

      case types.SET_SHOW_COLUMN:
        return {...state, 
          isShowColumn: action.payload,
        };

    default:
      return state;
  }
};

export default reducer;