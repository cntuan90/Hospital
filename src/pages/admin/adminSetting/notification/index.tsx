import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  adminNotificatinSettingGetApi,
  adminNotificatinSettingSaveApi,
} from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import useStyles from "./styles";
import { IAdminNotificatinSettingGetApi } from "./type";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";

const numberArr = Array.from({ length: 31 }, (_, i) => i + 1);

const NotificationSetting: React.FC = () => {
  const classes = useStyles();
  // const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [notificationData, setNotificationData] =
    useState<IAdminNotificatinSettingGetApi>();

  const { handleSubmit, control, watch, setValue, getValues } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      type1: notificationData?.type1 === 1 ?? false,
      type2: notificationData?.type2 === 1 ?? false,
      type3: notificationData?.type3 === 1 ?? false,
      type4: notificationData?.type4 === 1 ?? false,
      selectDays: 20,
      textMessage: "",
    },
  });

  const watchType2 = watch('type2');

  const formatPostObject = (data: any): any => {
    return {
      submission_reminder: data?.selectDays ?? 20,
      type1: data?.type1 ? 1 : 0,
      type2: data?.type2 ? 1 : 0,
      type3: data?.type3 ? 1 : 0,
      type4: data?.type4 ? 1 : 0,
      notice: data?.textMessage ?? "",
    };
  };

  const submit = async (formData: any) => {
    const formattedPostObject = formatPostObject(formData);
    try {
      setLoading(true);
      await adminNotificatinSettingSaveApi(formattedPostObject);

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

      const res = await adminNotificatinSettingGetApi();

      setNotificationData(res);
      setValue("type1", res?.type1 === 1 ?? false);
      setValue("type2", res?.type2 === 1 ?? false);
      setValue("type3", res?.type3 === 1 ?? false);
      setValue("type4", res?.type4 === 1 ?? false);
      setValue("selectDays", res?.submission_reminder ?? 20);
      setValue("textMessage", res?.notice ?? "");
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
          <Typography variant="h5">スタッフへの通知設定</Typography>
          <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
            説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
          </span>

          {/* Block 2 */}
          <Typography variant="h5" style={{ paddingTop: "10px" }}>
            通知設定
          </Typography>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitle}>
              <Typography>提出リマインド</Typography>
            </Grid>
            <Grid item md={9}>
              <Grid container>
                <FormControl variant="outlined" fullWidth={true}>
                  <Controller
                    name="type1"
                    control={control}
                    // defaultValue={notificationData?.type1 === 1 ?? false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            inputRef={field.ref}
                            checked={field.value}
                          />
                        }
                        label="受付開始時にメッセージ送信"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid container className={classes.setDisplayFlexStart}>
                <Grid item>
                  <FormControl variant="outlined" fullWidth={true}>
                    <Controller
                      name="type2"
                      control={control}
                      // defaultValue={notificationData?.type2 || false}
                      render={({ field }) => (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...field}
                                inputRef={field.ref}
                                checked={field.value}
                              />
                            }
                            label="期限の"
                          />
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid>
                  <Controller
                    name="selectDays"
                    control={control}
                    // defaultValue={notificationData?.submission_reminder || 20}
                    render={({ field }) => (
                      <FormControl variant="outlined">
                        <Select
                          inputRef={field.ref}
                          {...field}
                          disabled={!watchType2}
                          displayEmpty={true}
                          size="small"
                          className={classes.setWidthDropdown}
                        >
                          {numberArr.map((item, index) => (
                            <MenuItem
                              key={`selectDays${String(index)}`}
                              value={item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item>
                  <span>日前にメッセージ送信</span>
                </Grid>
              </Grid>

              <Grid container>
                <FormControl variant="outlined" fullWidth={true}>
                  <Controller
                    name="type3"
                    control={control}
                    // defaultValue={notificationData?.type3 || false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            inputRef={field.ref}
                            checked={field.value}
                          />
                        }
                        label="期限当日にメッセージ送信"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid container>
                <FormControl variant="outlined" fullWidth={true}>
                  <Controller
                    name="type4"
                    control={control}
                    // defaultValue={notificationData?.type4 || false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            inputRef={field.ref}
                            checked={field.value}
                          />
                        }
                        label="期限日以降の未提出者へのメッセージ送信"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitle}>
              <Typography>お知らせ</Typography>
            </Grid>
            <Grid item md={9}>
              <Grid container className={classes.setMargin}>
                <Typography>
                  記入した文言がスタッフ画面に表示されます。
                </Typography>
              </Grid>

              <Grid container className={classes.setMargin}>
                <Typography>空白の場合はなにも表示されません。</Typography>
              </Grid>

              <Grid container className={classes.setMargin}>
                <FormControl variant="outlined" fullWidth={true}>
                  <Controller
                    name="textMessage"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        // label="印字内容"
                        multiline={true}
                        rows={5}
                        variant="outlined"
                        className={classes.printingTextStyle}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
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

export default NotificationSetting;
