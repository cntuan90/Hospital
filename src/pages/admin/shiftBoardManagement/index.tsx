import {
  Box, TableCell,
} from "@mui/material";
import clsx from "clsx";
import { isArray } from "lodash";
import moment from "moment";
import { useSnackbar } from "notistack";
import { stringify } from "querystring";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getShiftBoardManagementListApi } from "../../../api/adminApi";
import PillButton from "../../../components/atoms/Buttons/PillButton";
import DataTable from "../../../components/DataTable";
import ScreenLoader from "../../../components/organisms/ScreenLoader";
import useStyles from "./styles";
import { IShiftBoardManageGetApi } from "./type";

const ShiftBoardManagement: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const [isLoading, setLoading] = useState(true);

  const [listShiftBoard, setlistShiftBoard] = useState<IShiftBoardManageGetApi[]>([]);

  const columns: any[] = [
    {
      id: "period",
      align: "center",
      label: "期間",
      width: "150px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            component="th"
            id={`enhanced-table-checkbox-${index}`}
            scope="row"
            className={classes.cssRowTable}
          >
            <Link to={`${pathname}/edit?id=${row?.id}&status=${row?.status_value}&period_start_date=${row?.period_start_date}&period_end_date=${row?.period_end_date}`} className={classes.cssNameTitle}>
              {row?.period || ''}
            </Link>
          </TableCell>
        );
      },
    },
    {
      id: "status",
      align: "center",
      label: "ステータス",
      width: "200px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            className={classes.cssRowTable}
          >
            {row?.status || ''}
          </TableCell>
        );
      },
    },
    {
      id: "dateSubmit",
      align: "center",
      label: "提出期限",
      width: "150px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            className={classes.cssRowTable}
          >
            {row?.date_submit || ''}
          </TableCell>
        );
      },
    },
    {
      id: "action",
      align: "center",
      label: "リンク",
      width: "250px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell key={index} align={this.align}>
            {row?.status_value === 2 ? (
              <PillButton
                type="button"
                style={{ background: "#27a8e0", color: "#fff", fontSize: "20px", width: '230px', maxHeight: '30px' }}
              >
                印刷
              </PillButton>
            ) : ''}
          </TableCell>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getShiftBoardManagementListApi();
      setlistShiftBoard(
        res.sort((a: any, b: any) => +new Date(b.date_submit) - +new Date(a.date_submit))
      );
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

  return (
    <ScreenLoader isLoading={isLoading}>
      <Box maxWidth="1200px" margin="1rem">
        <Box marginLeft="2rem">
          <DataTable
            data={listShiftBoard}
            columns={columns}
            showDeleteAndCheckBoxIcon={false}
            // setFullRow={fullRowTable}
            // rowsPerPageOptions={rowPerPage}
            setHeaderColor="#e7e7e7"
          // showPagination={false}
          />
        </Box>
      </Box>
    </ScreenLoader>
  );
};

export default ShiftBoardManagement;
