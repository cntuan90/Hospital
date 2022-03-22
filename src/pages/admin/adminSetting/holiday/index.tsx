import { yupResolver } from "@hookform/resolvers/yup";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  adminHolidaySettingDeleteApi,
  adminHolidaySettingGetApi,
  adminHolidaySettingSaveApi,
} from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import RoundedAddButton from "../../../../components/atoms/Buttons/Round/RoundedAddButton";
import DataTable from "../../../../components/DataTable";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import { ROWS_PER_PAGES, USING_TEXT_LIST } from "../../../../utility/usingTexts";
import { setHolidayList } from "../hook/actions";
import useAdminSettingHook from "../hook/hook";
import RenderHolidayListSetting from "./components/dateSetting";
import RenderDateTypeSetting from "./components/dateTypeSetting";
import useStyles from "./styles";

const GroupSetting: React.FC = () => {
  const classes = useStyles();
  // const history = useHistory();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [fullRowTable, setFullRowTable] = useState<number>(ROWS_PER_PAGES[0]);
  const [rowPerPage, setRowPerPage] = useState<number[]>(ROWS_PER_PAGES);

  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAdminSettingHook();
  const [deleteId, setDeleteId] = useState<number>();

  // const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleSelectItem = (itemSelected: number[]) =>
  //   setSelectedRows(itemSelected);

  const handleUpdateTargetDateFromChild = (index: number, date: string) => {
    const tempArr = [...state.holidayListData];
    const newData = tempArr?.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          holiday_date:
            date === "Invalid date"
              ? "Invalid date"
              : moment(date).format("YYYY-MM-DD"),
        };
      }
      return item;
    });

    dispatch(setHolidayList(newData));
  };

  const handleUpdateDateTypeFromChild = (index: number, type: string) => {
    const tempArr = [...state.holidayListData];
    const newData = tempArr?.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          date_type: Number(type || 3),
        };
      }
      return item;
    });

    dispatch(setHolidayList(newData));
  };

  const handleDeleteItem = async () => {
    console.log(deleteId);
    if (deleteId === undefined) return;
    try {
      setLoading(true);

      if (!!state.holidayListData[deleteId].id) {
        await adminHolidaySettingDeleteApi(state.holidayListData[deleteId].id);
        enqueueSnackbar(USING_TEXT_LIST.succeedDelete, { variant: "success" });
        fetchData();
      } else {
        const tempArr = [...state.holidayListData].filter((item, index) => index !== deleteId);
        dispatch(setHolidayList(tempArr));
      }

    } catch (error: any) {
      enqueueSnackbar(
        error.response.data.messages || error.response.data.errors,
        { variant: "error" }
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const columns: any[] = [
    {
      id: "date",
      align: "center",
      label: "日付",
      width: "150px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            component="th"
            id={`enhanced-table-checkbox-${index}`}
            scope="row"
            className={classes.cssRowBody}
          >
            <RenderHolidayListSetting
              data={row}
              // classes={classes}
              index={i}
              isEdit={isEdit}
              handleUpdateTargetDateFromChild={handleUpdateTargetDateFromChild}
            />
          </TableCell>
        );
      },
    },
    {
      id: "dateType",
      align: "left",
      label: "カウント区分",
      width: "200px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            className={classes.cssRowBody}
          >
            <RenderDateTypeSetting
              data={row}
              classes={classes}
              index={i}
              isEdit={isEdit}
              handleUpdateDateTypeFromChild={handleUpdateDateTypeFromChild}
            />
          </TableCell>
        );
      },
    },
    {
      id: "action",
      align: "center",
      label: "",
      width: "200px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell key={index} align={this.align}>
            <div
              className={classes.cssDeleteBtn}
              onClick={(e) => {
                e.preventDefault();
                handleClickOpen();
                setDeleteId(i);
              }}
            >
              <Tooltip
                title="削除"
                className={classes.tableTooltipDelete}
              // onClick={handleDelete}
              >
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          </TableCell>
        );
      },
    },
  ];

  const handleAddRow = () => {
    const newData = [
      ...state.holidayListData,
      {
        holiday_date: moment().format("YYYY-MM-DD"),
        date_type: 3,
        del_flag: 0,
        id: null,
      },
    ];

    turnOnEditMode();
    dispatch(setHolidayList(newData));
  };

  const turnOnEditMode = () => {
    setIsEdit(true);
    setFullRowTable(ROWS_PER_PAGES[2]);
    setRowPerPage([ROWS_PER_PAGES[2]]);
  };

  const turnOffEditMode = () => {
    setIsEdit(false);
    setRowPerPage(ROWS_PER_PAGES);
    setFullRowTable(ROWS_PER_PAGES[2]);
  };

  const checkValidationBeforSubmit = () => {
    let checkInvalidDate = false;
    let checkDuplicate = false;

    // Check invalid date
    state.holidayListData.forEach((item) => {
      if (item?.holiday_date === "Invalid date") {
        checkInvalidDate = true;
        enqueueSnackbar("Invalid date", { variant: "error" });
      }
    });

    // Check duplicate
    const holidayListId = state?.holidayListData?.map(
      (item) => item.holiday_date
    );
    checkDuplicate = state?.holidayListData?.some((item, index) => {
      if (index !== holidayListId?.indexOf(item?.holiday_date)) {
        enqueueSnackbar("Duplicate date", { variant: "error" });
        return index !== holidayListId?.indexOf(item?.holiday_date);
      }
    });

    return checkInvalidDate || checkDuplicate;
  };

  const handleSave = async () => {
    //  Validation
    const checkValidation = checkValidationBeforSubmit();
    if (checkValidation) return;

    turnOffEditMode();
    try {
      setLoading(true);

      const params = {
        holidays: [...state.holidayListData].map((item) => ({
          id: item?.id || null,
          holiday_date: moment(item?.holiday_date ?? "").format("YYYY-MM-DD"),
          date_type: item?.date_type ?? 3,
        })),
      };
      await adminHolidaySettingSaveApi(params);
      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
      fetchData();
    } catch (error: any) {
      enqueueSnackbar(
        error.response.data.messages || error.response.data.errors,
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await adminHolidaySettingGetApi();

      dispatch(
        setHolidayList(
          res.sort((a: any, b: any) =>
            moment(a.holiday_date).diff(moment(b.holiday_date))
          )
        )
      );
    } catch (error: any) {
      enqueueSnackbar(
        error.response.data.messages || error.response.data.errors,
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /**
     * Check authority
     */
    fetchData();
  }, []);

  return (
    <ScreenLoader isLoading={isLoading}>
      <Box className={classes.root}>
        {/* Block 1 */}
        <Typography variant="h5">祝日設定</Typography>
        <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
          説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
        </span>

        {/* Block 2 */}
        <Grid container spacing={4}>
          <Grid item lg={12}>
            {
              <Box maxWidth="1200px">
                <DataTable
                  data={state.holidayListData}
                  columns={columns}
                  showDeleteAndCheckBoxIcon={false}
                  setFullRow={fullRowTable}
                  rowsPerPageOptions={rowPerPage}
                  setHeaderColor="#e7e7e7"
                // showPagination={false}
                />
              </Box>
            }

            <Grid container={true} spacing={4}>
              <Grid item={true} lg={3}>
                <Box marginBottom="1.5rem">
                  <RoundedAddButton
                    className={classes.btnAddStyle}
                    onClick={handleAddRow}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box className={classes.cssFooter}>
          {!isEdit && (
            <PillButton
              type="button"
              className={classes.cssSaveButton}
              style={{
                background: "#27a8e0",
                color: "#fff",
                fontSize: "20px",
                marginRight: "20px",
              }}
              onClick={() => {
                turnOnEditMode();
              }}
            >
              編集
            </PillButton>
          )}
          {!!isEdit && (
            <PillButton
              type="button"
              className={classes.cssSaveButton}
              style={{ background: "#27a8e0", color: "#fff", fontSize: "20px" }}
              onClick={handleSave}
            >
              保存
            </PillButton>
          )}
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            選択した項目を削除してもいいですか？
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={handleDeleteItem} color="primary" autoFocus={true}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ScreenLoader>
  );
};

export default GroupSetting;
