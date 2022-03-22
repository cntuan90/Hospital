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
import moment from "moment";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getShiftBoardManagementListApi } from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import useQuery from "../../../../hooks/useQuery";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";
import useStyles from "./styles";

const PrintOrDownload: React.FC = () => {
  const classes = useStyles();
  // const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const URLSearchParams = useQuery();
  const id = URLSearchParams.get('id') || '';
  const period_start_date = URLSearchParams.get('period_start_date') || '';
  const period_end_date = URLSearchParams.get('period_end_date') || '';

  const [listAssignment, setListAssignment] = useState<any>([]);

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

  // const formatPostObject = (data: any): any => {
  //   return {
  //     id: initializationSetting?.id || null,
  //     shift_cycle_type: Number(shiftInitializationCycle) || 0,
  //     shift_cycle:
  //       shiftInitializationCycle === "0" ? data?.byMonth : data?.byWeek,
  //     shift_start_day: data?.shiftStartDay || 1,
  //     shift_start_week_day: data?.shiftWeekday || 1,
  //     start_accept_request_type: Number(registerStartDay) || 0,
  //     start_accept_request:
  //       registerStartDay === "0"
  //         ? data?.expectedRegisterStartDayUpper
  //         : data?.expectedRegisterStartDayLower,
  //     desired_submission_deadline_type: Number(submitDeadline) || 0,
  //     desired_submission_deadline:
  //       submitDeadline === "0"
  //         ? data?.expectedSubmitDeadlineUpper
  //         : data?.expectedSubmitDeadlineLower,
  //     calendar_start_week_day: data?.expectedStartOfWeekday || 2,
  //     display_type: data?.dateClassification || 0,
  //     del_flag: initializationSetting?.del_flag || 0,
  //   };
  // };

  const submit = async (formData: any) => {
    // const formattedObject = formatPostObject(data);

    try {
      // setLoading(true);
      // const res = await adminInitializationSettingApi(formattedObject);
      // enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
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
      const res = await getShiftBoardManagementListApi();
      console.log(res)
      const filteredData = res.filter((item) => item?.status === '公開済');
      setListAssignment(filteredData.sort((a: any, b: any) => +new Date(b.date_submit) - +new Date(a.date_submit)));
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
          <Typography variant="h5">詳細指定</Typography>
          <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
            説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
          </span>

          <Box className={classes.lineSpace} />

          {/* Block 2 */}
          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>対象</Typography>
            </Grid>
            <Grid item md={9} className={classes.cssTitleLeft}>
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
                      className={classes.setWidthDropdown}
                    >
                      {listAssignment?.length > 0 && listAssignment?.map((item: any, index: number) => (
                        <MenuItem
                          key={`startDay_${String(index)}`}
                          value={item?.id}
                        >
                          {`${moment(item?.period_start_date ?? '').format('YYYY/MM/DD')}～${moment(item?.period_end_date ?? '').format('YYYY/MM/DD')}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container style={{ height: '80px' }}>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>ファイル形式</Typography>
            </Grid>

            <Grid item md={9} className={classes.cssTitleLeft}>
              <Typography>PDFフォーマットでダウンロードされます</Typography>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          {/* <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>フォーマット</Typography>
            </Grid>
            <Grid item md={9}>
              <FormControlLabel
                value="0"
                control={<Radio color="primary" />}
                label="カレンダー"
              />

              <div className={classes.setDisplayFlexStart} style={{ width: '200px', height: '100px', border: '1px solid #000', margin: '1rem 0' }}>
                aaa
              </div>
            </Grid>
          </Grid> */}

          <Box className={classes.cssFooter}>
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
                // setIsEdit(true);
              }}
            >
              印刷
            </PillButton>
            <PillButton
              type="button"
              className={classes.cssSaveButton}
              style={{ background: "#27a8e0", color: "#fff", fontSize: "20px" }}
            // onClick={showPopupPublish}
            >
              ダウンロード
            </PillButton>
          </Box>
        </form>
      </Box>
    </ScreenLoader>
  );
};

export default PrintOrDownload;
