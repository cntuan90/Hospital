import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { adminChangeInfoSettingSaveApi } from "../../../../api/adminApi";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import useStyles from "./styles";
import * as yup from "yup";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";

const ChangeInfo: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const validateSchema = yup.object().shape<any>({
    oldPassword: yup.string(),
    newPassword: yup.string(),
    oldMailAddress: yup.string().email("メールアドレス形式が無効です。"),
    newMailAddress: yup.string().email("メールアドレス形式が無効です。"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      oldMailAddress: "",
      newMailAddress: "",
    },
  });

  const validateSubmitForm = (formData: any): boolean => {
    let isError = false;

    if (
      formData.newMailAddress === "" &&
      formData.oldMailAddress === "" &&
      formData.newPassword === "" &&
      formData.oldPassword === ""
    ) {
      isError = true;
      return isError;
    }

    if (formData.oldPassword !== "" && formData.newPassword === "") {
      isError = true;
      setError("newPassword", {
        type: "manual",
        message: "パスワードを入力してください。",
      });
    }

    if (formData.newPassword !== "" && formData.oldPassword === "") {
      isError = true;
      setError("oldPassword", {
        type: "manual",
        message: "パスワードを入力してください。",
      });
    }

    if (formData.oldPassword.length < 8 && formData.oldPassword !== "") {
      isError = true;
      setError("oldPassword", {
        type: "manual",
        message: "最低８桁を入力してください。",
      });
    }

    if (formData.newPassword.length < 8 && formData.newPassword !== "") {
      isError = true;
      setError("newPassword", {
        type: "manual",
        message: "最低８桁を入力してください。",
      });
    }

    if (formData.oldMailAddress !== "" && formData.newMailAddress === "") {
      isError = true;
      setError("newMailAddress", {
        type: "manual",
        message: "メールアドレスを入力してください。",
      });
    }

    if (formData.newMailAddress !== "" && formData.oldMailAddress === "") {
      isError = true;
      setError("oldMailAddress", {
        type: "manual",
        message: "メールアドレスを入力してください。",
      });
    }

    return isError;
  };

  const submit = async (formData: any) => {
    const checkValidate: boolean = validateSubmitForm(formData);
    if (checkValidate) return;

    try {
      setLoading(true);

      const params = {
        password_old: formData?.oldPassword || "",
        password_new: formData?.newPassword || "",
        email_old: formData?.oldMailAddress || "",
        email_new: formData?.newMailAddress || "",
      };

      const res = await adminChangeInfoSettingSaveApi(params);
      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
      history.push("/login");
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
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          {/* Block 1 */}
          <Typography variant="h5">設定</Typography>
          <span style={{ margin: "15px 0 15px 30px", display: "block" }}>
            説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
          </span>

          {/* Block 2 */}

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>パスワード変更</Typography>
            </Grid>

            <Grid item md={9}>
              <Grid container className={classes.setDisplayFlexStart}>
                <Grid item>
                  <span>旧：</span>
                </Grid>
                <Grid item>
                  <Controller
                    name="oldPassword"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <FormControl component="fieldset">
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          type="password"
                          size="small"
                          style={{ width: "400px", margin: "0.5rem" }}
                          error={!!errors?.oldPassword}
                          helperText={errors?.oldPassword?.message}
                          autoComplete="off"
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.setDisplayFlexStart}>
                <Grid item>
                  <span>新：</span>
                </Grid>
                <Grid item>
                  <Controller
                    name="newPassword"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <FormControl component="fieldset">
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          type="password"
                          size="small"
                          style={{ width: "400px", margin: "0.5rem" }}
                          error={!!errors?.newPassword}
                          helperText={errors?.newPassword?.message}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container>
            <Grid item md={3} className={classes.cssTitleLeft}>
              <Typography>メールアドレス変更</Typography>
            </Grid>

            <Grid item md={9}>
              <Grid container className={classes.setDisplayFlexStart}>
                <Grid item>
                  <span>旧：</span>
                </Grid>
                <Grid item>
                  <Controller
                    name="oldMailAddress"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <FormControl component="fieldset">
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          size="small"
                          style={{ width: "400px", margin: "0.5rem" }}
                          error={!!errors?.oldMailAddress}
                          helperText={errors?.oldMailAddress?.message}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.setDisplayFlexStart}>
                <Grid item>
                  <span>新：</span>
                </Grid>
                <Grid item>
                  <Controller
                    name="newMailAddress"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <FormControl component="fieldset">
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          size="small"
                          style={{ width: "400px", margin: "0.5rem" }}
                          error={!!errors?.newMailAddress}
                          helperText={errors?.newMailAddress?.message}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          {/* <Grid container>
							<Grid item md={3} className={classes.cssTitleLeft}>
								<Typography>通知設定</Typography>
							</Grid>

							<Grid item md={9}>
								<Controller
									name="expectedStartOfWeekday"
									control={control}
									defaultValue='0'
									render={({ field }) => (
										<FormControl component="fieldset">
											<RadioGroup
												{...field}
												row={false}
											>
												<FormControlLabel value='0' control={<Radio color="primary" />} label="する" />
												<FormControlLabel value='1' control={<Radio color="primary" />} label="しない" />
											</RadioGroup>
										</FormControl>
									)}
								/>
							</Grid>
						</Grid>

						<Box className={classes.lineSpace} /> */}

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

export default ChangeInfo;
