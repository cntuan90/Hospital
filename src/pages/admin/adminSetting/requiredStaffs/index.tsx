import { yupResolver } from "@hookform/resolvers/yup";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  adminRequiredStaffSettingGetApi,
  adminRequiredStaffSettingSaveApi,
} from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";
import { setRequiredStaff } from "../hook/actions";
import useAdminSettingHook from "../hook/hook";
import RowBody from "./rowBody";
import useStyles from "./styles";
import {
  IRequiredStaffSettingGetApi,
  IRequiredStaffSettingPostObj,
} from "./type";

const RequiredStaffs: React.FC = () => {
  const classes = useStyles();
  // const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { state, dispatch } = useAdminSettingHook();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<IRequiredStaffSettingGetApi[]>(
    []
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateRowBodyFromChild = (
    index: number,
    data: string,
    type: string
  ) => {
    const tempArr = [...updateData];
    const newdata = tempArr?.map((item: any, i: number) => {
      if (i === index) {
        switch (type) {
          case "mon":
            return {
              ...item,
              mon: data,
            };
          case "tue":
            return {
              ...item,
              tue: data,
            };
          case "wed":
            return {
              ...item,
              wed: data,
            };
          case "thu":
            return {
              ...item,
              thu: data,
            };
          case "fri":
            return {
              ...item,
              fri: data,
            };
          case "sat":
            return {
              ...item,
              sat: data,
            };
          case "sun":
            return {
              ...item,
              sun: data,
            };

          default:
            break;
        }
      }
      return item;
    });

    setUpdateData(newdata);
  };

  const formatPostObject = (
    defaultData: IRequiredStaffSettingGetApi[]
  ): IRequiredStaffSettingPostObj => ({
    listGroup: defaultData?.map((item: any) => ({
      id: item?.id || null,
      number_staff_monday: Number(item?.mon) || 0,
      number_staff_tuesday: Number(item?.tue) || 0,
      number_staff_wednesday: Number(item?.wed) || 0,
      number_staff_thursday: Number(item?.thu) || 0,
      number_staff_friday: Number(item?.fri) || 0,
      number_staff_saturday: Number(item?.sat) || 0,
      number_staff_sunday: Number(item?.sun) || 0,
    })),
  });

  const handleSave = async () => {
    dispatch(setRequiredStaff([...updateData]));
    try {
      setLoading(true);

      const formatedPostObject = formatPostObject([...updateData]);

      await adminRequiredStaffSettingSaveApi(formatedPostObject);

      setIsEdit(false);
      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(
        error.response.data.messages || error.response.data.errors,
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDataFromApiGet = (data: IRequiredStaffSettingGetApi[]) => {
    return data?.map((item: any) => ({
      ...item,
      groupName: item?.group_name || "",
      mon: item?.number_staff_monday || "",
      tue: item?.number_staff_tuesday || "",
      wed: item?.number_staff_wednesday || "",
      thu: item?.number_staff_thursday || "",
      fri: item?.number_staff_friday || "",
      sat: item?.number_staff_saturday || "",
      sun: item?.number_staff_sunday || "",
    }));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await adminRequiredStaffSettingGetApi();

      const tempArrGrp = formatDataFromApiGet(res);
      dispatch(setRequiredStaff(tempArrGrp));
      setUpdateData(tempArrGrp);
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
        <Typography variant="h5">必要人数設定</Typography>
        <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
          説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
        </span>

        {/* Block 2 */}
        <Typography variant="h5" style={{ paddingTop: "10px" }}>
          人数編集
        </Typography>

        <Box width="800px" style={{ margin: '1.5rem' }}>
          <TableContainer style={{ maxHeight: "600px" }} component={Paper}>
            <Table
              aria-labelledby="tableTitle"
              stickyHeader={true}
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow className={classes.cssRowHeader}>
                  <TableCell
                    key="headerCell_0"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="500px"
                  >
                    グループ名
                  </TableCell>
                  <TableCell
                    key="headerCell_1"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    月
                  </TableCell>
                  <TableCell
                    key="headerCell_2"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    火
                  </TableCell>
                  <TableCell
                    key="headerCell_3"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    水
                  </TableCell>
                  <TableCell
                    key="headerCell_4"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    木
                  </TableCell>
                  <TableCell
                    key="headerCell_5"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    金
                  </TableCell>
                  <TableCell
                    key="headerCell_6"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    土
                  </TableCell>
                  <TableCell
                    key="headerCell_7"
                    align="center"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    width="100px"
                  >
                    日
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor: "#fff" }}>
                {state?.requiredStaffData.length > 0 ? (
                  [...state?.requiredStaffData]?.map((item, index) => (
                    <RowBody
                      data={item}
                      index={index}
                      classes={classes}
                      isEdit={isEdit}
                      handleUpdateRowBodyFromChild={
                        handleUpdateRowBodyFromChild
                      }
                    />
                  ))
                ) : (
                  <>
                    <Typography>{USING_TEXT_LIST.noData}</Typography>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

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
      </Box>
    </ScreenLoader>
  );
};

export default RequiredStaffs;
