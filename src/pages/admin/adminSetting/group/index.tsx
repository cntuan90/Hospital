import { Button, Dialog, DialogActions, DialogTitle, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  adminGroupSettingApi,
  adminGroupSettingDeleteApi,
  adminGroupSettingGetApi,
  adminGroupSettingGetListStaffApi,
} from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import RoundedAddButton from "../../../../components/atoms/Buttons/Round/RoundedAddButton";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import RenderGroupAndStaffList from "./components";
import useStyles from "./styles";
import * as yup from "yup";
import { IAdminGroupSettingGetApi } from "./type";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";

const GroupSetting: React.FC = () => {
  const classes = useStyles();
  // const history = useHistory();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  // const { state, dispatch } = useAdminSettingHook();

  const [defaultData, setDefaultData] = useState<any[]>([]);
  const [listStaffData, setListStaffData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number>();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateGroupNameFromChild = (index: number, data: string) => {
    const tempArr = [...defaultData];
    const newData = tempArr?.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          group: {
            id: item.group.id,
            groupName: data,
          },
        };
      }
      return item;
    });
    setDefaultData([...newData]);
  };

  const handleUpdateStaffListFromChild = async (index: number, data: any[]) => {
    const newListStaff = [...listStaffData].filter(
      (item) => data?.findIndex((i) => item.id === i) !== -1
    );

    const tempArr = [...defaultData];
    const newData = tempArr?.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          listStaff: newListStaff,
        };
      }
      return item;
    });

    setDefaultData(newData);
  };

  const handleAddRow = () => {
    const newData = [
      ...defaultData,
      {
        group: {
          id: null,
          groupName: "",
        },
        listStaff: [],
      },
    ];

    setDefaultData(newData);
    setIsEdit(true);
  };

  const handleDeleteRow = async () => {
    console.log(deleteId)
    // if (!deleteId) {
    //   console.log(deleteId);
    // }
    if (deleteId === undefined) return;
    try {
      setLoading(true);

      if (!!defaultData[deleteId].group.id) {
        await adminGroupSettingDeleteApi(defaultData[deleteId].group.id);

        enqueueSnackbar(USING_TEXT_LIST.succeedDelete, { variant: "success" });
        fetchData();
      } else {
        const tempArr = [...defaultData].filter((item, index) => index !== deleteId)
        setDefaultData(tempArr);
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

  const handleConfirmDelete = (index: number) => {
    setDeleteId(index);
    handleClickOpen();
  }

  const formatPostObject = (defaultData: any): any => {
    const tempArr: any[] = defaultData.map((item: any) => {
      if (!!item.group.id) {
        return {
          group: {
            id: item.group.id,
            group_name: item.group.groupName,
          },
          list_staff:
            item.listStaff.length > 0
              ? item?.listStaff.map((item: any) => ({
                staff_id: item.id,
                user_name: item.name,
              }))
              : [],
        };
      } else {
        return {
          group: {
            id: null,
            group_name: item.group.groupName || "",
          },
          list_staff:
            item.listStaff.length > 0
              ? item?.listStaff.map((item: any) => ({
                staff_id: item.id,
                user_name: item.name,
              }))
              : [],
        };
      }
    });

    return tempArr;
  };

  const handleSave = async () => {
    // Validate groupName and staffList not blank
    let checkBlank = false;
    defaultData.forEach((item) => {
      if (item.listStaff.length === 0 || item.group.groupName === "")
        checkBlank = true;
    });
    if (checkBlank) return;

    try {
      setLoading(true);

      const formatedPostObject = formatPostObject([...defaultData]);

      const tempObj = {
        // listGroupDelete: [...listGroupDelete],
        assignment: [...formatedPostObject],
      };

      await adminGroupSettingApi(tempObj);

      setIsEdit(false);
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

  const formatDataFromApiGet = (data: IAdminGroupSettingGetApi) => {
    return data.assignment.map((item: any) => ({
      group: {
        id: item?.group?.id || "",
        groupName: item?.group.group_name || "",
      },
      listStaff: item?.list_staff?.map((value: any) => ({
        id: value?.staff_id || "",
        name: value?.user_name || "",
      })),
    }));
  };

  const fetchListStaff = async () => {
    try {
      setLoading(true);

      const resStaff = await adminGroupSettingGetListStaffApi();
      const tempArrStaff =
        resStaff?.length > 0 &&
        [...resStaff].map((item, index) => ({
          id: item.id,
          name: item.user_name,
        }));
      setListStaffData(tempArrStaff || []);
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
      const res = await adminGroupSettingGetApi();

      const tempArrGrp = formatDataFromApiGet(res);
      setDefaultData(tempArrGrp);
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
    fetchListStaff();
  }, []);

  return (
    <ScreenLoader isLoading={isLoading}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Box className={classes.root}>
        {/* Block 1 */}
        <Typography variant="h5">グループ設定</Typography>
        <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
          説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
        </span>

        {/* Block 2 */}
        <Typography variant="h5" style={{ paddingTop: "10px" }}>
          グループ編集
        </Typography>


        <Grid container spacing={4} style={{ maxWidth: '1200px' }}>
          <Grid item lg={12}>
            <Box className={classes.lineSpace} />
            <Grid container className={classes.cssFlexCenter} spacing={2}>
              <Grid item lg={3} style={{ textAlign: "center" }}>
                グループ名
              </Grid>
              <Grid item lg={6} style={{ textAlign: "center" }}>
                所属スタッフ
              </Grid>
              <Grid item lg={3}></Grid>
            </Grid>

            <Box className={classes.lineSpace} />
            {defaultData.length > 0 ? (
              defaultData.map((data: any, index: any) => (
                <RenderGroupAndStaffList
                  data={data}
                  index={index}
                  listStaffData={listStaffData}
                  classes={classes}
                  handleUpdateGroupNameFromChild={
                    handleUpdateGroupNameFromChild
                  }
                  handleUpdateStaffListFromChild={
                    handleUpdateStaffListFromChild
                  }
                  handleDeleteRow={handleConfirmDelete}
                  isEdit={isEdit}
                />
              ))
            ) : (
              <>
                <Typography>{USING_TEXT_LIST.noData}</Typography>
                <Box className={classes.lineSpace} />
              </>
            )}
          </Grid>
        </Grid>

        <Grid container={true} spacing={4}>
          <Grid item={true} lg={3}>
            <Box marginBottom="1.5rem">
              <RoundedAddButton
                className={classes.btnAddStyle}
                onClick={() => {
                  handleAddRow();
                }}
              />
            </Box>
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
                setIsEdit(true);
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
            <Button onClick={handleDeleteRow} color="primary" autoFocus={true}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* </form> */}
    </ScreenLoader>
  );
};

export default GroupSetting;
