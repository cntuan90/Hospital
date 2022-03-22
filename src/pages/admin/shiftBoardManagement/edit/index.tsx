import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import clsx from "clsx";
import { isArray } from "lodash";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import moment from "moment";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { stringify } from "querystring";
import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { adminSaveDraftOrPublishShiftAssignmentApi, adminUpdateStaffDetailTargetSetting, getDetailShiftBoardMangementApi } from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import CustomCalendar from "../../../../components/organisms/Calendar";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import useQuery from "../../../../hooks/useQuery";
import DataTableBody from "../components/DataTableBody";
import DataTableHeadCalendar from "../components/DataTableHead";
import { calculateAssignedDaysOfStaffByDateType, calculateTotalAssignedStaffWithCheckBox, formatListTotalAssignedStaffs, formatTableAssignedStaffName, formatTableHederListDate, handleFormatDataWithCheckbox } from "../components/functions";
import { setHeaderAssignedStaffName, setHeaderDataList, setIsShowCalendar, setIsShowColumn, setIsShowTargetSetting } from "../hook/actions";
import useShiftBoardManagement from "../hook/hook";
import TodosDispatch from "./context";
import useTableStyles from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";
import { IShiftBoardManageGetDetailApi } from "./type";

const ShiftBoardManagementEdit: React.FC = () => {
  const classes = useTableStyles();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const { state, dispatch } = useShiftBoardManagement();
  const [originData, setOriginData] = useState<IShiftBoardManageGetDetailApi[]>([]);

  const { handleSubmit, control, setValue, getValues, formState: { errors } } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      //
    },
  });

  const URLSearchParams = useQuery();
  const id = URLSearchParams.get('id') || '';
  const statusQuery = URLSearchParams.get('status') || '';
  const period_start_date = URLSearchParams.get('period_start_date') || '';
  const period_end_date = URLSearchParams.get('period_end_date') || '';
  const { enqueueSnackbar } = useSnackbar();

  const { isShowCalendar, isShowTargetSetting, staffDetailTargetSetting, tableHeaderListDate, tableHeaderTotalAssignedStaffs, tableHeaderAssignedStaffname, staffInfoOnCalendar, isShowColumn } = state;

  const [isLoading, setLoading] = useState(true);

  // moment.locale("ja");

  const onSubmit = async (formData: any) => {
    dispatch(setIsShowTargetSetting({
      isShowTargetSetting: false,
      staffDetailTargetSetting: {},
    }));

    try {
      setLoading(true);
      const params = {
        shift_assignment_id: staffDetailTargetSetting?.shift_assignment_id || '',
        target_shift_number_holiday: Number(formData?.target_shift_number_holiday) || 0,
        target_shift_number_saturday: Number(formData?.target_shift_number_saturday) || 0,
        target_shift_number_sunday: Number(formData?.target_shift_number_sunday) || 0,
        target_shift_number_weekday: Number(formData?.target_shift_number_weekday) || 0,
      }

      await adminUpdateStaffDetailTargetSetting(params);
      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
      fetchData();
    } catch (error: any) {
      const errList = error?.response?.data?.messages;
      if (isArray(errList) && errList?.length > 0) {
        errList.forEach((item) => {
          enqueueSnackbar(item || '',
            { variant: "error" }
          );
        })
      } else {
        enqueueSnackbar(
          error?.response?.data?.messages || error?.response?.data?.errors || "サーバー側でエラーが発生しました。",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const formatDataSave = (isSaveDraft: number) => {
    let edittedStaffArr: any[] = [];

    originData.forEach((item: any) => {
      item?.list_staff_detail.forEach((staff: any) => {
        staff?.shift_detail.forEach((staffDetail: any) => {

          // filter which staff has editted
          tableHeaderAssignedStaffname.forEach((child: any) => {
            if (item?.group_id !== child?.group_id) return;
            child?.list_staff_detail.forEach((childStaff: any) => {
              if (staff?.staff_id !== childStaff?.staff_id) return;
              let childArr: any[] = [];

              childStaff.shift_detail.forEach((childStaffDetail: any) => {
                if (staffDetail?.date_register !== childStaffDetail?.date_register) return;
                if (staffDetail?.shift_detail_status !== childStaffDetail?.shift_detail_status || staffDetail?.admin_assign_status !== childStaffDetail?.admin_assign_status) {

                  childArr = [...childArr, {
                    staff_shift_detail_id: childStaffDetail?.staff_shift_detail_id ?? '',
                    shift_detail_status: childStaffDetail?.shift_detail_status,
                    admin_assign_status: childStaffDetail?.admin_assign_status,
                    date_register: childStaffDetail?.date_register,
                  }];
                }
              })

              if (childArr.length > 0) {
                edittedStaffArr = [...edittedStaffArr,
                {
                  assignment_id: childStaff?.assignment_id,
                  shift_assignment_id: childStaff?.shift_assignment_id,
                  list_shift_detail: childArr,
                }];
              }
            })
          })

        })
      })
    })

    return {
      shift_management_id: id,
      admin_save: isSaveDraft,
      assign_staff: edittedStaffArr,
    };
  }

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      const formattedDataSave = formatDataSave(0); // 0 is saveDraft
      await adminSaveDraftOrPublishShiftAssignmentApi(formattedDataSave);

      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
      fetchData();

    } catch (error: any) {
      const errList = error?.response?.data?.messages;
      if (isArray(errList) && errList?.length > 0) {
        errList.forEach((item) => {
          enqueueSnackbar(item || '',
            { variant: "error" }
          );
        })
      } else {
        enqueueSnackbar(
          error?.response?.data?.messages || error?.response?.data?.errors || "サーバー側でエラーが発生しました。",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // Pop up 1 Calendar

  const handleCloseCalendar = () => {
    dispatch(setIsShowCalendar({
      isShowCalendar: false,
      staffInfoOnCalendar: {},
    }));
  };

  const handleSaveFromChild = (data: any[] = []) => {
    if (data?.length === 0) return;
    const formattedData = data.map((item: any) => (
      {
        ...item,
        date: moment(item?.date).format('YYYY-MM-DD'),
      }
    ))

    const updateExpectedAssignOfStaff = tableHeaderAssignedStaffname.map((item: any) => {
      return {
        ...item,
        list_staff_detail: item?.list_staff_detail.map((staff: any) => {
          if (staff?.staff_id === staffInfoOnCalendar.staffId) {
            return {
              ...staff,
              shift_detail: staff?.shift_detail.map((staffDetail: any) => {
                const obj = { ...staffDetail };
                formattedData?.length > 0 && formattedData?.forEach((temp: any) => {
                  if (staffDetail?.date_register === temp?.date) {
                    obj.shift_detail_status = Number(temp?.status ?? 0);
                  }
                })
                return obj;
              })
            }
          } else {
            return {
              ...staff,
            }
          }
        })
      }
    })

    dispatch(setHeaderAssignedStaffName(updateExpectedAssignOfStaff));
    dispatch(setIsShowCalendar({
      isShowCalendar: false,
      staffInfoOnCalendar: {},
    }));
  }

  // Pop up 2 Publish
  const showPopupPublish = () => {
    setOpenPop2(true);
  };

  const handleClosePop2 = () => {
    setOpenPop2(false);
  };

  const handlePublish = async (data: any) => {
    setOpenPop2(false);

    try {
      setLoading(true);
      const formattedDataSave = formatDataSave(1); // 1 is publish

      await adminSaveDraftOrPublishShiftAssignmentApi(formattedDataSave);

      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
      fetchData();

    } catch (error: any) {
      const errList = error?.response?.data?.messages;
      if (isArray(errList) && errList?.length > 0) {
        errList.forEach((item) => {
          enqueueSnackbar(item || '',
            { variant: "error" }
          );
        })
      } else {
        enqueueSnackbar(
          error?.response?.data?.messages || error?.response?.data?.errors || "サーバー側でエラーが発生しました。",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // Pop up 3 Target Setting
  const handleCloseTargetSetting = () => {
    dispatch(setIsShowTargetSetting({
      isShowTargetSetting: false,
      staffDetailTargetSetting: {},
    }));
  };

  const [openPop2, setOpenPop2] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = {
        shift_management_id: id,
        period_start_date,
        period_end_date,
      }
      const res = await getDetailShiftBoardMangementApi(params);

      // Format big data
      const calculateAssignedDaysOfStaff = calculateAssignedDaysOfStaffByDateType(res[0]?.date_info, res);
      const formatAddStaffName = formatTableAssignedStaffName(calculateAssignedDaysOfStaff);
      const formatedTableAssignedStaffName = handleFormatDataWithCheckbox(formatAddStaffName);
      console.log(formatedTableAssignedStaffName);
      setOriginData(formatedTableAssignedStaffName);

      // Format total assignment staffs
      const formateTotalAssignedStaff = formatListTotalAssignedStaffs(res);
      const formatedTableHeaderTotalAssignedStaffs = calculateTotalAssignedStaffWithCheckBox(formatedTableAssignedStaffName, formateTotalAssignedStaff);

      // Format date type arrow
      const formatedTableHeaderlist = formatTableHederListDate(res[0]?.date_info);

      dispatch(setHeaderDataList({ formatedTableAssignedStaffName, formatedTableHeaderTotalAssignedStaffs, formatedTableHeaderlist }))
    } catch (error: any) {
      const errList = error?.response?.data?.messages;
      if (isArray(errList) && errList?.length > 0) {
        errList.forEach((item) => {
          enqueueSnackbar(item || '',
            { variant: "error" }
          );
        })
      } else {
        enqueueSnackbar(
          error.response.data.messages || error.response.data.errors || "サーバー側でエラーが発生しました。",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setValue('target_shift_number_weekday', staffDetailTargetSetting?.target_shift_number_weekday || 0);
    setValue('target_shift_number_saturday', staffDetailTargetSetting?.target_shift_number_saturday || 0);
    setValue('target_shift_number_sunday', staffDetailTargetSetting?.target_shift_number_sunday || 0);
    setValue('target_shift_number_holiday', staffDetailTargetSetting?.target_shift_number_holiday || 0);
  }, [staffDetailTargetSetting])

  return (
    <ScreenLoader isLoading={isLoading}>
      <TodosDispatch.Provider value={{ state, dispatch }}>
        <Box margin="1rem" style={{ height: "auto" }}>
          {isShowColumn ? (
            <Tooltip
              title="実績当直数を非表示"
              arrow={true}
              TransitionComponent={Zoom}
              placement="top"
              classes={{ tooltip: classes.paddingTooltip }}
            >
              <RemoveIcon className={classes.cssAddRemoveColumnBtn} onClick={() => {
                dispatch(setIsShowColumn(false))
              }} />
            </Tooltip>
          ) : (
            <Tooltip
              title="実績当直数を表示"
              arrow={true}
              TransitionComponent={Zoom}
              placement="top"
              classes={{ tooltip: classes.paddingTooltip }}
            >
              <AddIcon className={classes.cssAddRemoveColumnBtn} onClick={() => {
                dispatch(setIsShowColumn(true))
              }} />
            </Tooltip>
          )}
          <TableContainer component={Paper} className={clsx(classes.stickyTableFull, classes.tableContainerRadiusTop)} >
            <Table
              stickyHeader={true}
              aria-labelledby="tableTitle"
              aria-label="sticky table"
            >
              <DataTableHeadCalendar
                key={`table_header_staff_assignment`}
                classes={classes}
                data={tableHeaderAssignedStaffname}
                tableHeaderTotalAssignedStaffs={tableHeaderTotalAssignedStaffs}
                tableHeaderListDate={tableHeaderListDate}
                isShowColumn={isShowColumn}
              />
              <TableBody >
                {tableHeaderAssignedStaffname.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={tableHeaderListDate.length} align="center">
                      データがありません。
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {/* Render Staffs Shift Assignment */}
                    {tableHeaderAssignedStaffname.map((item, index) => (
                      <DataTableBody
                        key={`table_body_staff_assignment_${String(index)}`}
                        data={item}
                        index={index}
                        classes={classes}
                        isShowColumn={isShowColumn}
                      />
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className={classes.cssFooter}>
            <Link to={`${pathname}/printOrDownload?id=${id}&period_start_date=${period_start_date}&period_end_date=${period_end_date}`} style={{ textDecoration: 'none' }}>
              <PillButton
                type="button"
                className={classes.cssSaveButton}
                style={{
                  background: "#27a8e0",
                  color: "#fff",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              >
                印刷/ダウンロード
              </PillButton>
            </Link>
            <PillButton
              type="button"
              className={classes.cssSaveButton}
              disabled={statusQuery === '2'}
              style={{
                background: "#27a8e0",
                color: "#fff",
                fontSize: "20px",
                marginRight: "20px",
              }}
              onClick={handleSaveDraft}
            >
              下書き保存
            </PillButton>
            <PillButton
              type="button"
              className={classes.cssSaveButton}
              disabled={statusQuery === '2'}
              style={{ background: "#27a8e0", color: "#fff", fontSize: "20px" }}
              onClick={showPopupPublish}
            >
              公開/修正
            </PillButton>
          </Box>

          {/* ------------------------------------------Show Pop Up Calendar-------------------------------------------------------- */}
          <Dialog
            onClose={handleCloseCalendar}
            aria-labelledby="customized-dialog-title"
            open={isShowCalendar}
            maxWidth="sm"
          >
            <DialogContent dividers={true}>
              <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", flexDirection: 'column' }}>
                <CustomCalendar
                  // selectedDate={selectedDate}
                  // handleDateChange={handleDateChange}
                  handleSaveFromChild={handleSaveFromChild}
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* ------------------------------------------Show Pop Up Target Setting-------------------------------------------------------- */}
          <Dialog
            onClose={handleCloseTargetSetting}
            aria-labelledby="customized-dialog-title"
            open={isShowTargetSetting || false}
            maxWidth="md"
          >
            <DialogContent dividers={true}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ textAlign: 'center' }}>目標当直数設定</h2>
                <Grid container style={{ display: 'flex', alignItems: 'center', width: '500px', justifyContent: 'center' }}>
                  <Grid item lg={4} style={{ textAlign: 'center' }}>
                    {`${staffDetailTargetSetting?.staff_name ?? ' '} 先生`}
                  </Grid>
                  <Grid item lg={2}>
                    <Controller
                      name="target_shift_number_weekday"
                      control={control}
                      defaultValue={staffDetailTargetSetting?.target_shift_number_weekday || 0}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <TextField
                            {...field}
                            inputRef={field.ref}
                            size="small"
                            label="平"
                            onChange={(e) => {
                              e.preventDefault();
                              const val = e.target.value.replace(/[^0-9]/g, "") || "";
                              field.onChange(val);
                            }}
                            inputProps={{ maxLength: 2 }}
                            style={{ width: "50px", margin: "0.5rem" }}
                            error={!!errors?.target_shift_number_weekday}
                            helperText={errors?.target_shift_number_weekday?.message}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item lg={2}>
                    <Controller
                      name="target_shift_number_saturday"
                      control={control}
                      defaultValue={staffDetailTargetSetting?.target_shift_number_saturday || 0}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <TextField
                            {...field}
                            inputRef={field.ref}
                            size="small"
                            label="土"
                            onChange={(e) => {
                              e.preventDefault();
                              const val = e.target.value.replace(/[^0-9]/g, "") || "";
                              field.onChange(val);
                            }}
                            inputProps={{ maxLength: 2 }}
                            style={{ width: "50px", margin: "0.5rem" }}
                            error={!!errors?.target_shift_number_saturday}
                            helperText={errors?.target_shift_number_saturday?.message}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item lg={2}>
                    <Controller
                      name="target_shift_number_sunday"
                      control={control}
                      defaultValue={staffDetailTargetSetting?.target_shift_number_sunday || 0}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <TextField
                            {...field}
                            inputRef={field.ref}
                            size="small"
                            label="日"
                            onChange={(e) => {
                              e.preventDefault();
                              const val = e.target.value.replace(/[^0-9]/g, "") || "";
                              field.onChange(val);
                            }}
                            inputProps={{ maxLength: 2 }}
                            style={{ width: "50px", margin: "0.5rem" }}
                            error={!!errors?.target_shift_number_sunday}
                            helperText={errors?.target_shift_number_sunday?.message}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item lg={2}>
                    <Controller
                      name="target_shift_number_holiday"
                      control={control}
                      defaultValue={staffDetailTargetSetting?.target_shift_number_holiday || 0}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <TextField
                            {...field}
                            inputRef={field.ref}
                            size="small"
                            label="祝"
                            onChange={(e) => {
                              e.preventDefault();
                              const val = e.target.value.replace(/[^0-9]/g, "") || "";
                              field.onChange(val);
                            }}
                            inputProps={{ maxLength: 2 }}
                            style={{ width: "50px", margin: "0.5rem" }}
                            error={!!errors?.target_shift_number_holiday}
                            helperText={errors?.target_shift_number_holiday?.message}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <PillButton
                    type="submit"
                    className={classes.cssSaveButtonSmallSize}
                    style={{ background: "#27a8e0", color: "#fff", fontSize: "20px", marginTop: '2rem' }}
                  >
                    保存
                  </PillButton>
                </Grid>
              </form>
            </DialogContent>
          </Dialog>

          {/* ------------------------------------------Show Pop Up Publish-------------------------------------------------------- */}
          <Dialog
            onClose={handleClosePop2}
            aria-labelledby="customized-dialog-title"
            open={openPop2}
            maxWidth="md"
          >
            <DialogContent dividers={true}>
              <div className={classes.cssPopup2}>
                <Typography variant="h4">公開/編集を確定</Typography>
                <Typography variant="h6" style={{ marginTop: '2rem', width: '600px' }}>説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。</Typography>
                <div className={classes.cssPopup2Checkbox}>
                  <Checkbox />
                  <Typography variant="h6">スタッフに公開/変更を通知する</Typography>
                </div>
                <PillButton
                  type="button"
                  className={classes.cssSaveButton}
                  style={{ background: "#27a8e0", color: "#fff", fontSize: "20px", marginTop: '2rem' }}
                  onClick={handlePublish}
                >
                  保存
                </PillButton>
              </div>
            </DialogContent>
          </Dialog>
        </Box>
      </TodosDispatch.Provider>
    </ScreenLoader>
  );
};

export default ShiftBoardManagementEdit;
