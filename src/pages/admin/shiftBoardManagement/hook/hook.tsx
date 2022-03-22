import moment from 'moment';
import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import { IAdminSettingInitState } from './type';

const useShiftBoardManagement = () => {
  const initialState: IAdminSettingInitState = {
    calendarData: {
      loadingCalendar: false,
      errorCalendar: "",
      desiredTime: null,
      filterPublicDays: [],
      filterSelectedCallDays: [],
      filterSelectedDays: [],
      weekdayStart: 0,
      weekdayEnd: 0,
      weekendStart: 0,
      weekendEnd: 0,
      holidayStart: 0,
      holidayEnd: 0,
      publicHoliday: true,
      publicHolidayList: [],
      showTime: false,
      possibleMonthCode: null,
      possibleDayCode: null,
      monthSynchronized: moment().format("MM"),
      yearSynchronized: moment().format("YYYY"),
      daySynchronized: moment().format("DD"),
      regularHolidayFriday: false,
      regularHolidayMonday: false,
      regularHolidaySaturday: false,
      regularHolidaySunday: false,
      regularHolidayThursday: false,
      regularHolidayTuesday: false,
      regularHolidayWednesday: false,
      privateHolidays: [],
      isRedirect: false,
      currentDaySynchronized: moment().format("YYYY-MM-DD"),
    },
    holidayListData: [], //Admin holiday setting
    tableHeaderListDate: [],
    tableHeaderTotalAssignedStaffs: [],
    tableHeaderAssignedStaffname: [],
    tableHeaderStaffNameArr: [],
    isShowCalendar: false,
    isShowTargetSetting: false,
    isShowColumn: false,
    staffDetailTargetSetting: {},
    staffInfoOnCalendar: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useShiftBoardManagement;
