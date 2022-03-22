import moment from "moment";

// export const getTitleOfWeekday = (date: string) => {
//   if (moment(date).isoWeekday() < 6) {
//     return "平";
//   } else if (moment(date).isoWeekday() === 6) {
//     return "土";
//   } else {
//     return "日/祝";
//   }
// };

export const returnLeftWidth = (dateType: number) => {
  // 230 is 1st & 2nd column width sum
  if (dateType === 3) return (200 + 230); //200 is width of 4 col
  if (dateType === 2) return (165 + 230); //165 is width of 3 col
  if (dateType === 1) return (140 + 230); //140 is width of 2 col
  return (80 + 230); //80 is width of 1 col
}

export const returnWidthOfDateType = (dateType: number) => {
  if (dateType === 0) return 80;
  if (dateType === 1) return 70;
  if (dateType === 2) return 55;
  return 50;
}

export const formatTableAssignedStaffName = (data: any[] = []) => {
  const arr: any[] = [...data].map((item, i) => {
    return (
      {
        ...item,
        date_info: [...item.date_info].map((dateData: any) => (
          {
            ...dateData,
            assigned_staff_name: [],
            assigned_staffs: 0,
          }
        )),
        list_staff_detail: [...item.list_staff_detail].map((staff: any) => (
          {
            ...staff,
            shift_detail: [...staff.shift_detail].map((detail: any) => (
              {
                ...detail,
                shift_detail_status: detail?.shift_detail_status === '' ? 0 : Number(detail?.shift_detail_status),
                admin_assign_status: detail?.admin_assign_status === '' ? 0 : Number(detail?.admin_assign_status),
                isSelectedOtherGrp: false,
              }
            )),
          }
        )),
      }
    )
  }
  );
  return arr;
}

export const formatListTotalAssignedStaffs = (data: any[] = []) => {
  let arr: any[] = [...data[0].date_info].map((item) => (
    {
      ...item,
      assigned_staffs: 0,
      number_staff: 0,
    }
  ));

  [...data].forEach((itemData) => {
    itemData?.date_info?.forEach((itemVal: any) => {
      arr.forEach((arrVal: any, i) => {
        if (itemVal.date === arrVal.date) {
          arr[i].number_staff += itemVal.number_staff;
        }
      })
    })
  });
  return arr;
}

export const formatTableHederListDate = (data: any[] = []) => {
  const arr: any[] = [...data].map((item, i) => (
    {
      // id: `businessDay_${String(i)}`,
      align: "center",
      date: item?.date || '',
      width: "120px",
      label: String(item?.date_type) || '',
      // dateNum: `${moment(
      //   `${moment().format("YYYY")}/${item?.date}`
      // ).isoWeekday()}`,
    }
  ));
  return arr;
}

export const showDateTypeColumn = (dateType?: number) => {
  if (dateType === 3) return 4;
  if (dateType === 2) return 3;
  if (dateType === 1) return 2;
  return 1
}

export const setOnOffCheckboxStatus = (tableHeaderAssignedStaffname: any[] = [], groupId: string = '', staffId: string = '', date: string = '') => {
  const newData = tableHeaderAssignedStaffname.map((item: any) => {
    if (item.group_id === groupId) {
      return {
        ...item,
        list_staff_detail: item.list_staff_detail.map((staff: any) => {
          if (staff.staff_id === staffId) {
            return {
              ...staff,
              shift_detail: staff.shift_detail.map((detail: any, i: number) => {
                if (detail.date_register === date) {
                  return {
                    ...detail,
                    admin_assign_status: detail.admin_assign_status === 1 ? 0 : 1,
                  }
                } else {
                  return {
                    ...detail,
                  }
                }
              }),
            }
          } else {
            return {
              ...staff,
            }
          }
        })
      }
    } else {
      return {
        ...item,
      }
    }
  })

  return newData;
}

export const checkDateType = (dateTypeArr: any[] = [], date: string = '') => {
  let dateType: string = '';
  dateTypeArr.forEach((item: any) => {
    if (item?.date === date) dateType = item?.date_type;
  })
  return dateType;
}

export const calculateAssignedDaysOfStaffByDateType = (dateTypeArr: any[] = [], checkArr: any[] = []) => {
  const assignedDaysOfStaffByDateType = checkArr.map((item: any) => {
    return {
      ...item,
      list_staff_detail: item?.list_staff_detail.map((staff: any) => {
        let admin_assigned_weekday = 0;
        let admin_assigned_saturday = 0;
        let admin_assigned_sunday = 0;
        let admin_assigned_holiday = 0;
        staff?.shift_detail?.forEach((detail: any) => {
          if (detail?.admin_assign_status === 1) {
            const getDateType: string = checkDateType(dateTypeArr, detail?.date_register);
            switch (getDateType) {
              case '平':
                admin_assigned_weekday += 1;
                break;
              case '土':
                admin_assigned_saturday += 1;
                break;
              case '日':
                admin_assigned_sunday += 1;
                break;
              case '祝':
                admin_assigned_holiday += 1;
                break;
              default:
                break;
            }
          }
        })
        return {
          ...staff,
          admin_assigned_weekday,
          admin_assigned_saturday,
          admin_assigned_sunday,
          admin_assigned_holiday,
        }
      })
    }
  })

  return assignedDaysOfStaffByDateType;
}

export const setAlertWhenContinuousCheck = (newData: any[] = [], groupId: string = '', staffId: string = '') => {
  const setAlertData = newData.map((item: any) => {
    if (item.group_id === groupId) {
      return {
        ...item,
        list_staff_detail: item.list_staff_detail.map((staff: any) => {
          if (staff.staff_id === staffId) {
            return {
              ...staff,
              shift_detail: staff.shift_detail.map((detail: any, i: number) => {
                if (detail.admin_assign_status === 1 && (staff.shift_detail[i - 1]?.admin_assign_status === 1 || staff.shift_detail[i + 1]?.admin_assign_status === 1)) {
                  return {
                    ...detail,
                    isAlert: true,
                  }
                } else if (staff.shift_detail[i - 1]?.admin_assign_status === 1 || staff.shift_detail[i + 1]?.admin_assign_status === 1) {
                  return {
                    ...detail,
                    isAlert: false,
                    isGrey: true,
                  }
                } else {
                  return {
                    ...detail,
                    isAlert: false,
                    isGrey: false,
                  }
                }

              }),
            }
          } else {
            return {
              ...staff,
            }
          }
        })
      }
    } else {
      return {
        ...item,
      }
    }
  })

  return setAlertData;
}

export const checkIsSelectedOtherGroup = (setAlertData: any[] = []) => {
  const checkIsSelectedOtherGrp = [...setAlertData].map((item: any) => {
    return {
      ...item,
      list_staff_detail: item.list_staff_detail.map((staff: any) => {
        return {
          ...staff,
          shift_detail: staff.shift_detail.map((detail: any, i: number) => {
            const obj = { ...detail };
            if (detail.admin_assign_status === 1) {
              [...setAlertData].forEach((temp: any) => {
                if (temp.group_id !== item.group_id) {
                  temp.list_staff_detail.forEach((tempDetail: any) => {
                    if (tempDetail.staff_id === staff.staff_id) {
                      tempDetail.shift_detail.forEach((dateDetail: any) => {
                        if (dateDetail.date_register === detail.date_register && dateDetail.admin_assign_status === 1) {
                          obj.isSelectedOtherGrp = true;
                        }
                      })
                    }
                  })
                }
              })
            } else {
              obj.isSelectedOtherGrp = false;
            }
            return obj;
          }),
        }
      })
    }
  })

  return checkIsSelectedOtherGrp;
}

export const addStaffNameAndCalculateSubtotal = (checkIsSelectedOtherGrp: any[] = [], groupId: string = '', staffId: string = '', staffName: string = '', date: string = '', isCheck: boolean = false) => {
  const addStaffNameToHeader = checkIsSelectedOtherGrp.map((item: any) => {
    if (item.group_id === groupId) {
      return {
        ...item,
        date_info: item.date_info.map((val: any) => {
          if (val.date === date && isCheck) {
            const obj = {
              staff_id: staffId,
              staff_name: staffName,
            }
            return {
              ...val,
              assigned_staffs: Number(val.assigned_staffs + 1),
              assigned_staff_name: [...val.assigned_staff_name, obj],
            }
          } else if (val.date === date && !isCheck) {
            return {
              ...val,
              assigned_staffs: Number(val.assigned_staffs - 1),
              assigned_staff_name: val.assigned_staff_name.filter((staff: any) => staff.staff_id !== staffId),
            }
          } else {
            return {
              ...val,
            }
          }
        }),
      }
    } else {
      return {
        ...item,
      }
    }
  })

  return addStaffNameToHeader;
}

export const calculateTotalAssignedStaffs = (tableHeaderTotalAssignedStaffs: any = [], date: string = '', isCheck: boolean = false) => {
  const cloneTableHeaderTotalAssignedStaffs = [...tableHeaderTotalAssignedStaffs].map((val, i) => {
    if (val.date === date && isCheck) {
      return {
        ...val,
        assigned_staffs: Number(val.assigned_staffs += 1),
      }
    } else if (val.date === date && !isCheck) {
      return {
        ...val,
        assigned_staffs: Number(val.assigned_staffs -= 1),
      }
    } return {
      ...val,
    }
  })

  return cloneTableHeaderTotalAssignedStaffs;
}

export const handleFormatDataWithCheckbox = (data: any = []) => {
  if (data?.length === 0) return [];

  // Set alert when >= 2 continous checked cells
  const setAlertData = data?.map((item: any) => {
    return {
      ...item,
      list_staff_detail: item.list_staff_detail.map((staff: any) => {
        return {
          ...staff,
          shift_detail: staff.shift_detail.map((detail: any, i: number) => {
            if (detail.admin_assign_status === 1 && (staff.shift_detail[i - 1]?.admin_assign_status === 1 || staff.shift_detail[i + 1]?.admin_assign_status === 1)) {
              return {
                ...detail,
                isAlert: true,
              }
            } else if (staff.shift_detail[i - 1]?.admin_assign_status === 1 || staff.shift_detail[i + 1]?.admin_assign_status === 1) {
              return {
                ...detail,
                isAlert: false,
                isGrey: true,
              }
            } else {
              return {
                ...detail,
                isAlert: false,
                isGrey: false,
              }
            }

          }),
        }
      })
    }
  })

  const checkIsSelectedOtherGrp = [...setAlertData].map((item: any) => {
    return {
      ...item,
      list_staff_detail: item.list_staff_detail.map((staff: any) => {
        return {
          ...staff,
          shift_detail: staff.shift_detail.map((detail: any, i: number) => {
            const obj = { ...detail };
            if (detail.admin_assign_status === 1) {
              [...setAlertData].forEach((temp: any) => {
                if (temp.group_id !== item.group_id) {
                  temp.list_staff_detail.forEach((tempDetail: any) => {
                    if (tempDetail.staff_id === staff.staff_id) {
                      tempDetail.shift_detail.forEach((dateDetail: any) => {
                        if (dateDetail.date_register === detail.date_register && dateDetail.admin_assign_status === 1) {
                          obj.isSelectedOtherGrp = true;
                        }
                      })
                    }
                  })
                }
              })
            } else {
              obj.isSelectedOtherGrp = false;
            }
            return obj;
          }),
        }
      })
    }
  })

  const assignedDaysOfStaffByDateType = checkIsSelectedOtherGrp.map((item: any) => {
    return {
      ...item,
      list_staff_detail: item?.list_staff_detail.map((staff: any) => {
        let admin_assigned_weekday = 0;
        let admin_assigned_saturday = 0;
        let admin_assigned_sunday = 0;
        let admin_assigned_holiday = 0;
        staff?.shift_detail?.forEach((detail: any) => {
          if (detail?.admin_assign_status === 1) {
            const getDateType: string = checkDateType(checkIsSelectedOtherGrp[0].date_info, detail?.date_register);
            switch (getDateType) {
              case '平':
                admin_assigned_weekday += 1;
                break;
              case '土':
                admin_assigned_saturday += 1;
                break;
              case '日':
                admin_assigned_sunday += 1;
                break;
              case '祝':
                admin_assigned_holiday += 1;
                break;
              default:
                break;
            }
          }
        })
        return {
          ...staff,
          admin_assigned_weekday,
          admin_assigned_saturday,
          admin_assigned_sunday,
          admin_assigned_holiday,
        }
      })
    }
  })

  const addStaffNameToHeader = assignedDaysOfStaffByDateType.map((item: any) => {
    return {
      ...item,
      date_info: item.date_info.map((val: any) => {
        const objDate = { ...val };

        item?.list_staff_detail.forEach((staff: any) => {
          staff?.shift_detail?.forEach((detail: any) => {
            if (val.date === detail?.date_register && detail?.admin_assign_status === 1) {
              objDate.assigned_staffs = Number(val.assigned_staffs + 1);
              objDate.assigned_staff_name = [...objDate.assigned_staff_name, {
                staff_id: staff?.staff_id,
                staff_name: staff?.staff_name,
              }];
            }
          })
        })

        return objDate;
      }),
    }
  })

  return addStaffNameToHeader;
}

export const calculateTotalAssignedStaffWithCheckBox = (origindata: any = [], checkData: any = []) => {
  const cloneData = [...checkData].map((val, i) => {
    const tempObj = { ...val };

    [...origindata]?.forEach((temp: any) => {
      temp?.list_staff_detail?.forEach((staff: any) => {
        staff?.shift_detail?.forEach((detail: any) => {
          if (val.date === detail?.date_register && detail?.admin_assign_status === 1) {
            tempObj.assigned_staffs = Number(val.assigned_staffs += 1);
          }
        })
      })
    })

    return tempObj;
  })

  return cloneData;
}