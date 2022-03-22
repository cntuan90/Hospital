import {
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  adminInitializationGetListApi,
  adminInitializationSettingApi,
} from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";
import useStyles from "./styles";
import { IAdminEntrySettingPostApi } from "./type";

const numberArr = Array.from({ length: 31 }, (_, i) => i + 1);
const numberArrOfMonth = Array.from({ length: 6 }, (_, i) => i + 1);
const numberArrOfWeek = Array.from({ length: 5 }, (_, i) => i + 1);
const weekdayArr = [
  {
    label: "月",
    value: 2,
  },
  {
    label: "火",
    value: 3,
  },
  {
    label: "水",
    value: 4,
  },
  {
    label: "木",
    value: 5,
  },
  {
    label: "金",
    value: 6,
  },
  {
    label: "土",
    value: 7,
  },
  {
    label: "日",
    value: 8,
  },
];

const Initialization: React.FC = () => {
  const classes = useStyles();
  // const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [initializationSetting, setInitializationSetting] = useState<any>({});

  const [shiftInitializationCycle, setShiftInitializationCycle] =
    useState<string>("0");
  const [registerStartDay, setRegisterStartDay] = useState<string>("0");
  const [submitDeadline, setSubmitDeadline] = useState<string>("0");

  const { handleSubmit, control, watch, setValue, getValues } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      //
    },
  });

  const watchShiftCycle = watch("byMonth");

  const formatPostObject = (data: any): IAdminEntrySettingPostApi => {
    return {
      id: initializationSetting?.id || null,
      shift_cycle_type: Number(shiftInitializationCycle) || 0,
      shift_cycle:
        shiftInitializationCycle === "0" ? data?.byMonth : data?.byWeek,
      shift_start_day: data?.shiftStartDay || 1,
      shift_start_week_day: data?.shiftWeekday || 1,
      start_accept_request_type: Number(registerStartDay) || 0,
      start_accept_request:
        registerStartDay === "0"
          ? data?.expectedRegisterStartDayUpper
          : data?.expectedRegisterStartDayLower,
      desired_submission_deadline_type: Number(submitDeadline) || 0,
      desired_submission_deadline:
        submitDeadline === "0"
          ? data?.expectedSubmitDeadlineUpper
          : data?.expectedSubmitDeadlineLower,
      calendar_start_week_day: data?.expectedStartOfWeekday || 2,
      display_type: data?.dateClassification || 0,
      del_flag: initializationSetting?.del_flag || 0,
    };
  };

  const submit = async (formData: any) => {
    const data = {
      ...formData,
      registerStartDay,
      submitDeadline,
      shiftInitializationCycle,
    };
    const formattedObject = formatPostObject(data);

    try {
      setLoading(true);
      const res = await adminInitializationSettingApi(formattedObject);
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await adminInitializationGetListApi();

      setValue("byMonth", data?.shift_cycle_type === 0 ? data?.shift_cycle : 1);
      setValue("byWeek", data?.shift_cycle_type === 1 ? data?.shift_cycle : 1);
      setValue("dateClassification", data?.display_type || 0);
      setValue(
        "expectedRegisterStartDayUpper",
        data?.start_accept_request_type === 0 ? data?.start_accept_request : 20
      );
      setValue(
        "expectedRegisterStartDayLower",
        data?.start_accept_request_type === 1 ? data?.start_accept_request : 20
      );
      setValue("expectedStartOfWeekday", data?.calendar_start_week_day || 0);
      setValue(
        "expectedSubmitDeadlineUpper",
        data?.desired_submission_deadline_type === 0
          ? data?.desired_submission_deadline
          : 10
      );
      setValue(
        "expectedSubmitDeadlineLower",
        data?.desired_submission_deadline_type === 1
          ? data?.desired_submission_deadline
          : 10
      );
      setValue("shiftStartDay", data?.shift_start_day || 1);
      setValue("shiftWeekday", data?.shift_start_week_day || 2);

      setInitializationSetting(data);
      setShiftInitializationCycle(data?.shift_cycle_type === 1 ? "1" : "0");
      setRegisterStartDay(data?.start_accept_request_type === 1 ? "1" : "0");
      setSubmitDeadline(
        data?.desired_submission_deadline_type === 1 ? "1" : "0"
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
    fetchData();
  }, []);

  return (
    <ScreenLoader isLoading={isLoading}>
      <Box className={classes.root}>
        <form onSubmit={handleSubmit(submit)}>
          {/* Block 1 */}
          <Typography variant="h5">作成設定</Typography>
          <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
            説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
          </span>

          {/* Block 2 */}
          <Typography variant="h5" style={{ paddingTop: "10px" }}>
            当直表作成の周期
          </Typography>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>シフト作成の周期</Typography>
            </Grid>
            <Grid item md={9}>
              <RadioGroup
                row={true}
                value={shiftInitializationCycle}
                onChange={(e) => {
                  e.preventDefault();
                  setShiftInitializationCycle(e.target.value as string);
                }}
                defaultValue="0"

              >
                <Grid container>
                  <Grid item md={6} className={classes.setDisplayFlexStart}>
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label=" "
                    />

                    <Controller
                      name="byMonth"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <Select
                            {...field}
                            inputRef={field.ref}
                            disabled={shiftInitializationCycle === "1"}
                            displayEmpty={true}
                            size="small"
                            className={classes.setWidthDropdown}
                          >
                            {numberArrOfMonth.map((item, index) => (
                              <MenuItem
                                key={`startDay_${String(index)}`}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <span>ヶ月</span>
                  </Grid>
                  <Grid item md={6} className={classes.setDisplayFlexStart}>
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label=" "
                    />

                    <Controller
                      name="byWeek"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <Select
                            {...field}
                            inputRef={field.ref}
                            disabled={shiftInitializationCycle === "0"}
                            displayEmpty={true}
                            size="small"
                            className={classes.setWidthDropdown}
                          >
                            {numberArrOfWeek.map((item, index) => (
                              <MenuItem
                                key={`startDay_${String(index)}`}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <span>週間</span>
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>シフト開始日</Typography>
            </Grid>

            <Grid item md={9}>
              <Grid container>
                {shiftInitializationCycle === "0" && (
                  <Grid
                    item
                    md={6}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Controller
                      name="shiftStartDay"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <Select
                            inputRef={field.ref}
                            {...field}
                            // disabled={shiftInitializationCycle === '1'}
                            displayEmpty={true}
                            size="small"
                            className={classes.setWidthDropdown}
                          >
                            {numberArr.map((item, index) => (
                              <MenuItem
                                key={`shiftStartDay_${String(index)}`}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <span>日</span>
                  </Grid>
                )}

                {shiftInitializationCycle === "1" && (
                  <Grid
                    item
                    md={6}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Controller
                      name="shiftWeekday"
                      control={control}
                      defaultValue={2}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <Select
                            inputRef={field.ref}
                            {...field}
                            // disabled={shiftInitializationCycle === '0'}
                            displayEmpty={true}
                            size="small"
                            className={classes.setWidthDropdown}
                          >
                            {weekdayArr.map((item, index) => (
                              <MenuItem
                                key={`shiftWeekday${String(index)}`}
                                value={item.value}
                              >
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <span>曜日</span>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>希望受付開始</Typography>
            </Grid>
            <Grid item md={9}>
              <RadioGroup
                row={false}
                value={registerStartDay}
                onChange={(e) => {
                  e.preventDefault();
                  setRegisterStartDay(e.target.value as string);
                }}
                defaultValue="0"

              >
                <div className={classes.setDisplayFlexStart}>
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="期限の"
                  />

                  <Controller
                    name="expectedRegisterStartDayUpper"
                    control={control}
                    defaultValue={20}
                    render={({ field }) => (
                      <FormControl variant="outlined">
                        <Select
                          {...field}
                          inputRef={field.ref}
                          disabled={registerStartDay === "1"}
                          displayEmpty={true}
                          size="small"
                          className={classes.setWidthDropdown}
                        >
                          {numberArr.map((item, index) => (
                            <MenuItem
                              key={`startDay_${String(index)}`}
                              value={item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span>日前に開始する</span>
                </div>

                <div className={classes.setDisplayFlexStart}>
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="シフト開始日の"
                  />

                  <Controller
                    name="expectedRegisterStartDayLower"
                    control={control}
                    defaultValue={20}
                    render={({ field }) => (
                      <FormControl variant="outlined">
                        <Select
                          {...field}
                          inputRef={field.ref}
                          disabled={registerStartDay === "0"}
                          displayEmpty={true}
                          size="small"
                          className={classes.setWidthDropdown}
                        >
                          {numberArr.map((item, index) => (
                            <MenuItem
                              key={`startDay_${String(index)}`}
                              value={item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span>日前に開始する</span>
                </div>
              </RadioGroup>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>希望提出期限</Typography>
            </Grid>
            <Grid item md={9}>
              <RadioGroup
                row={false}
                defaultValue="0"
                value={submitDeadline}
                onChange={(e) => {
                  e.preventDefault();
                  setSubmitDeadline(e.target.value as string);
                }}

              >
                {watchShiftCycle < 2 && (
                  <div className={classes.setDisplayFlexStart}>
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="毎月"
                    />

                    <Controller
                      name="expectedSubmitDeadlineUpper"
                      control={control}
                      defaultValue={10}
                      render={({ field }) => (
                        <FormControl variant="outlined">
                          <Select
                            {...field}
                            inputRef={field.ref}
                            disabled={submitDeadline === "1"}
                            displayEmpty={true}
                            size="small"
                            className={classes.setWidthDropdown}
                          >
                            {numberArr.map((item, index) => (
                              <MenuItem
                                key={`startDay_${String(index)}`}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <span>日を期限にする</span>
                  </div>
                )}

                <div className={classes.setDisplayFlexStart}>
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="シフト開始日の"
                  />

                  <Controller
                    name="expectedSubmitDeadlineLower"
                    control={control}
                    defaultValue={10}
                    render={({ field }) => (
                      <FormControl variant="outlined">
                        <Select
                          {...field}
                          inputRef={field.ref}
                          disabled={submitDeadline === "0"}
                          displayEmpty={true}
                          size="small"
                          className={classes.setWidthDropdown}
                        >
                          {numberArr.map((item, index) => (
                            <MenuItem
                              key={`startDay_${String(index)}`}
                              value={item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span>日前を期限にする</span>
                </div>
              </RadioGroup>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          {/* Block 3 */}
          <Typography variant="h5" style={{ paddingTop: "10px" }}>
            カレンダー表示設定
          </Typography>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>開始曜日</Typography>
            </Grid>

            <Grid item md={9}>
              <Controller
                name="expectedStartOfWeekday"
                control={control}
                defaultValue="0"
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <RadioGroup
                      {...field}
                      row={true}

                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label="月曜日"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="日曜日"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>カウント区分</Typography>
            </Grid>

            <Grid item md={9}>
              <Controller
                name="dateClassification"
                control={control}
                defaultValue="0"
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <RadioGroup {...field} >
                      <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label="すべての曜日が同列"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="平日、土日祝"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="平日、土曜日、日祝"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio color="primary" />}
                        label="平日、土曜日、日曜日、祝日"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Box className={classes.cssFooter}>
            <PillButton
              type="submit"
              className={classes.cssSaveButton}
              style={{ background: "#27a8e0", color: "#fff", fontSize: "20px" }}
            >
              保存
            </PillButton>
          </Box>
        </form>
      </Box>
    </ScreenLoader>
  );
};

export default Initialization;
