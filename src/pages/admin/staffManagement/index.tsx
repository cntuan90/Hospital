import { Delete, UploadFile } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  TableCell,
} from "@mui/material";
import { Box } from "@mui/system";
import { isArray } from "lodash";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  adminGetStaffListApi,
  deleteStaffDetailApi,
  getListStaffFileCSV,
  updateListStaffFileCSV,
} from "../../../api/adminApi";
import RoundedDisableButton from "../../../components/atoms/Buttons/Round/RoundedDisableButton";
import DataTable from "../../../components/DataTable";
import ScreenLoader from "../../../components/organisms/ScreenLoader";
import { Store } from "../../../redux/store";
import { ROWS_PER_PAGES, USING_TEXT_LIST } from "../../../utility/usingTexts";
import useStyles from "./styles";
import { IAdminGetListStaffApi } from "./type";

const StaffManagement: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [listStaff, setListStaff] = useState<IAdminGetListStaffApi[]>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const ref = useRef<any>();

  const { handleSubmit, control, watch, setValue, getValues } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      csvInput: null,
    },
  });

  const columns: any[] = [
    {
      id: "staffName",
      align: "center",
      label: "氏名",
      width: "100px",
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
            <Link
              to={`/staffManagement/edit/${row?.id}`}
              className={classes.cssNameTitle}
            >
              {`${row?.last_name} ${row?.first_name}` || ""}
            </Link>
          </TableCell>
        );
      },
    },
    {
      id: "mailAddress",
      align: "center",
      label: "メールアドレス",
      width: "200px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            className={classes.cssRowTable}
          >
            {row?.email || ""}
          </TableCell>
        );
      },
    },
    {
      id: "group",
      align: "center",
      label: "グループ",
      width: "150px",
      content(row: any, index: number, i: number) {
        return (
          <TableCell
            key={index}
            align={this.align}
            className={classes.cssRowTable}
          >
            {row?.groups || ""}
          </TableCell>
        );
      },
    },
    // {
    //   id: "action",
    //   align: "center",
    //   label: "",
    //   width: "50px",
    //   content(row: any, index: number) {
    //     return (
    //       <TableCell key={index} align={this.align}>
    //         <div
    //           className={classes.cssDeleteBtn}
    //           onClick={(e) => {
    //             e.preventDefault();
    //             handleClickOpen();
    //             setDeleteId(row?.id);
    //           }}
    //         >
    //           <Delete color="disabled" />
    //         </div>
    //       </TableCell>
    //     );
    //   },
    // },
  ];

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    if (!selectedRows.length) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectItem = (itemSelected: number[]) =>
    setSelectedRows(itemSelected);

  const handleDeleteItem = async () => {
    // if (!deleteId) return;
    try {
      setLoading(true);

      const deletedIds = selectedRows.map((index) => listStaff[index].id);

      const res = await deleteStaffDetailApi(deletedIds);
      enqueueSnackbar(USING_TEXT_LIST.succeedDelete, { variant: "success" });
      fetchData();
      setSelectedRows([]);
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
      setOpen(false);
    }
  };

  const handleExportCsv = async () => {
    try {
      setLoading(true);
      const fileName = `スタッフ管理-${moment().format("YYYYMMDDHHmmss")}`;

      await getListStaffFileCSV(fileName);
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

  const handleUploadCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    try {
      setLoading(true);

      await updateListStaffFileCSV(file);
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
          error.response.data.messages || error.response.data.errors || "サーバー側でエラーが発生しました。",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
      ref.current.value = "";
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await adminGetStaffListApi();

      if (isArray(data)) setListStaff(data);
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
  }, []);

  return (
    <ScreenLoader isLoading={isLoading}>
      <Box className={classes.root} maxWidth="1200px">
        <DataTable
          data={listStaff || []}
          columns={columns}
          // showDeleteAndCheckBoxIcon={false}
          setHeaderColor="#e7e7e7"
          rowsPerPageOptions={ROWS_PER_PAGES}
          onItemSelect={handleSelectItem}
          onItemDelete={handleClickOpen}
        />

        <Box className={classes.lineSpace} />

        <Box style={{ margin: "1rem" }}>
          <RoundedDisableButton component="label" className={classes.cssButton}>
            <Link to={"/staffManagement/add"}>＋スタッフを追加する</Link>
          </RoundedDisableButton>
        </Box>

        <Box style={{ margin: "1rem" }}>
          <RoundedDisableButton component="label" className={classes.cssButton}>
            <a style={{ textDecoration: "underline" }}>CSVアップロード</a>
            <input
              id="fileInput"
              type="file"
              ref={ref}
              hidden={true}
              onChange={handleUploadCsv}
            />
          </RoundedDisableButton>

          <RoundedDisableButton
            component="label"
            className={classes.cssButton}
            onClick={handleExportCsv}
          >
            <a style={{ textDecoration: "underline" }}>CSV雛形ダウンロード</a>
          </RoundedDisableButton>
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

export default StaffManagement;
