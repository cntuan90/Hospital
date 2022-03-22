import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useContext, useEffect } from 'react';
import TodosDispatch from '../edit/context';
import { setHeaderAssignedStaffName, setHeaderTotalAssignedStaffs } from '../hook/actions';
import { addStaffNameAndCalculateSubtotal, calculateAssignedDaysOfStaffByDateType, calculateTotalAssignedStaffs, checkDateType, checkIsSelectedOtherGroup, setAlertWhenContinuousCheck, setOnOffCheckboxStatus } from './functions';

export default function CheckboxStatus({
  data, date, groupId, staffId, staffName,
}: any) {
  const [checkBoxStatus, setCheckboxStatus] = React.useState<boolean>(false);
  const { state: { tableHeaderAssignedStaffname, tableHeaderTotalAssignedStaffs }, dispatch } = useContext(TodosDispatch);

  const handleShowCheckboxColor = (isCheck: boolean) => {
    if (data?.isAlert) {
      return '#ff6b6b' // Red Alert
    } else if (data?.shift_detail_status === 1 && isCheck) {
      return '#ffbf19' // Yellow warning
    } else if (isCheck) {
      return 'green' // Green Selecting 
    } else {
      return ''
    }
  }

  const handleUpdateCheckboxStatus = useCallback((isCheck: boolean) => {
    console.log(date, groupId, staffId, staffName);

    // Set on/off checbox
    const newData = setOnOffCheckboxStatus(tableHeaderAssignedStaffname, groupId, staffId, date);

    // Set alert when >= 2 continous checked cells
    const setAlertData = setAlertWhenContinuousCheck(newData, groupId, staffId);

    // Check Is Selected Other Grp
    const checkIsSelectedOtherGrp = checkIsSelectedOtherGroup(setAlertData);

    // Add staff name to header & calculate subtotal assigned staffs of each group
    const addStaffNameToHeader = addStaffNameAndCalculateSubtotal(checkIsSelectedOtherGrp, groupId, staffId, staffName, date, isCheck);

    // Calculate 月内当直数	(by date type)
    const assignedDaysOfStaffByDateType = calculateAssignedDaysOfStaffByDateType(tableHeaderAssignedStaffname[0]?.date_info, addStaffNameToHeader);

    // Calculate total assigned staffs
    const cloneTableHeaderTotalAssignedStaffs = calculateTotalAssignedStaffs(tableHeaderTotalAssignedStaffs, date, isCheck);

    dispatch(setHeaderAssignedStaffName(assignedDaysOfStaffByDateType));
    dispatch(setHeaderTotalAssignedStaffs(cloneTableHeaderTotalAssignedStaffs));
  }, [tableHeaderAssignedStaffname]);

  useEffect(() => {
    setCheckboxStatus(data?.admin_assign_status === 1 ? true : false);
  }, [data])

  return (
    <>
      <Checkbox
        checked={checkBoxStatus}
        style={{ color: `${handleShowCheckboxColor(checkBoxStatus)}` }}
        // style={{ color: `${(data?.shift_detail_status === 1 && checkBoxStatus) ? '#ffbf19' : (checkBoxStatus ? 'green' : '')}` }}
        onClick={() => {
          setCheckboxStatus(!checkBoxStatus);
          handleUpdateCheckboxStatus(!checkBoxStatus);
        }} />
    </>
  );
}
