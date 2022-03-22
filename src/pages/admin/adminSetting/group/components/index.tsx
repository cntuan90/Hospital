import { yupResolver } from "@hookform/resolvers/yup";
import { Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { IRowBodyType } from "../type";

export interface props {
  listStaffData: any[];
  data: any;
  classes: any;
  index: number;
  isEdit: boolean;
  handleUpdateGroupNameFromChild: (index: number, data: string) => void;
  handleUpdateStaffListFromChild: (index: number, data: string[]) => void;
  handleDeleteRow: (index: number) => void;
}

const RenderGroupAndStaffList: React.FC<props> = ({
  listStaffData,
  classes,
  data,
  index,
  isEdit,
  handleUpdateStaffListFromChild,
  handleUpdateGroupNameFromChild,
  handleDeleteRow,
}) => {
  const listStaffDataId: string[] = listStaffData?.map((item: any) => item.id);

  const errMsg = "スタッフを選択してください。";
  const [selected, setSelected] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const isAllSelected =
    selected.length > 0 && selected.length === selected.length;

  const validateSchema = yup.object().shape<any>({
    groupName: yup.string().required("グルーブ名を入力してください。"),
    listStaff: yup.array().required("スタッフを選択してください。"),
  });

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<IRowBodyType>({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
    defaultValues: {
      groupName: data?.group?.groupName || "",
      listStaff: data.listStaff || [],
    },
  });

  const handleUpdateGroupName = (index: number, data: any) => {
    handleUpdateGroupNameFromChild(index, data);
  };

  const handleUpdateStaffList = (index: number, value: any) => {
    if (value[value.length - 1] === "all") {
      const newList =
        selected?.length === listStaffDataId?.length ? [] : listStaffDataId;

      setSelected(newList);
      setValue("listStaff", newList);
      handleUpdateStaffListFromChild(index, newList);
      return;
    }
    setSelected(value);
    handleUpdateStaffListFromChild(index, value);
  };

  useEffect(() => {
    setValue("groupName", data?.group?.groupName);
    setValue("listStaff", data?.listStaff);
  }, [data, setValue, index]);

  useEffect(() => {
    setSelected(data?.listStaff?.map((item: any) => item.id) || []);
  }, [data, index]);

  useEffect(() => {
    if (selected.length === 0) {
      setError("listStaff", {
        type: "manual",
        message: "スタッフを選択してください。",
      });
      setIsError(true);
    } else {
      setIsError(false);
      clearErrors("listStaff");
    }
    if (getValues("groupName") === "") {
      setError("groupName", {
        type: "manual",
        message: "グルーブ名を入力してください。",
      });
    } else {
      clearErrors("groupName");
    }
  }, [getValues, selected]);

  return (
    <form>
      <Grid key={String(index)} container spacing={2}>
        {/* Group */}
        <Grid item lg={3} className={classes.cssFlexStart}>
          <FormControl variant="outlined">
            <Controller
              name="groupName"
              control={control}
              defaultValue={data.group.groupName}
              render={({ field }) => (
                <div className={classes.cssFlexStart}>
                  <div
                    style={{
                      width: "6px",
                      height: "50px",
                      background: "rgba(196, 196, 196, 0.4)",
                      marginRight: "10px",
                    }}
                  ></div>
                  {isEdit ? (
                    <TextField
                      {...field}
                      inputRef={field.ref}
                      onChange={(e) => {
                        e.preventDefault();
                        field.onChange(e);
                        handleUpdateGroupName(index, e.target.value as string);
                      }}
                      error={!!errors?.groupName}
                      helperText={errors?.groupName?.message}
                      size="small"
                    />
                  ) : (
                    <p>{data.group.groupName}</p>
                  )}
                </div>
              )}
            />
          </FormControl>
        </Grid>

        {/* Staff  */}
        <Grid item lg={6} className={classes.cssFlexStart}>
          <Controller
            name="listStaff"
            control={control}
            defaultValue={data.listStaff || []}
            render={({ field }) =>
              isEdit ? (
                <FormControl
                  variant="outlined"
                  margin="normal"
                  fullWidth={true}
                  style={{ width: '500px' }}
                  error={!!errors?.listStaff}
                >
                  <Select
                    inputRef={field.ref}
                    {...field}
                    className={classes.cssDropdown}
                    labelId="mutiple-select-label"
                    error={!!errors?.listStaff}
                    multiple={true}
                    value={selected}
                    displayEmpty={true}
                    onChange={(e) => {
                      e.preventDefault();
                      field.onChange(e);
                      handleUpdateStaffList(index, e.target.value as string);
                    }}
                    renderValue={(value: any) => {
                      if (Array.isArray(value)) {
                        const tempArr = listStaffData.filter((item) =>
                          selected.some((i: any) => i === item.id)
                        );
                        return (
                          <Typography
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: 1,
                            }}
                          >
                            {tempArr.map((k) => k.name).join(", ")}
                          </Typography>
                        );
                      }
                      return "";
                    }}
                  >
                    <MenuItem
                      value="all"
                      classes={{
                        root: isAllSelected ? classes.selectedAll : "",
                      }}
                      style={{ display: "flex", gap: "6px" }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelected}
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < listStaffData.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.selectAllText }}
                        primary="全員"
                      />
                    </MenuItem>
                    {listStaffData.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        style={{ display: "flex", gap: "6px" }}
                      >
                        <ListItemIcon>
                          <Checkbox checked={selected.indexOf(item.id) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {isError && (
                    <FormHelperText
                      error={!!errors.listStaff}
                      style={{ color: "#d32f2f" }}
                    >
                      {errMsg}
                    </FormHelperText>
                  )}
                  {/* {errors.listStaff && (
                  <FormHelperText error={!!errors.listStaff}>
                    {(errors.listStaff as any).message}
                  </FormHelperText>
                  )} */}
                </FormControl>
              ) : (
                // <p>{data?.listStaff?.map((k:any) => k.name).join(', ')}</p>
                <Tooltip
                  title={data?.listStaff?.map((k: any) => k.name).join(", ")}
                  arrow={true}
                  TransitionComponent={Zoom}
                  placement="top"
                  classes={{ tooltip: classes.paddingTooltip }}
                >
                  <Typography
                    className={classes.tableEllipsis}
                    style={{ textAlign: "left" }}
                  >
                    {data?.listStaff?.map((k: any) => k.name).join(", ")}
                  </Typography>
                </Tooltip>
              )
            }
          />
        </Grid>

        <Grid item lg={3} className={classes.cssFlexCenter}>
          {/* <span className={classes.cssDeleteText} style={{ padding: '0 30px'}}>スタッフ編集</span> */}
          {/* <span
            onClick={() => handleDeleteRow(index)}
            className={classes.cssDeleteText}
            style={{ paddingLeft: "30px" }}
          >
            削除
          </span> */}
          <div
            className={classes.cssDeleteBtn}
            onClick={() => handleDeleteRow(index)}
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
        </Grid>

        <Box className={classes.lineSpace} />
      </Grid>
    </form>
  );
};

export default RenderGroupAndStaffList;
