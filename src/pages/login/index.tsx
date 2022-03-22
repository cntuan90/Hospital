import { Box, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import PillButton from "../../components/atoms/Buttons/PillButton";
import useStyles from "./style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { LoginInputs } from "./type";
import useAuth from "../../hooks/useAuth";
import useQuery from "../../hooks/useQuery";

const Login: React.FC = () => {
  const [isSubmit, setSubmit] = useState(false);
  const history = useHistory();
  const { signin } = useAuth();
  const classes = useStyles();
  const ref = useRef<any>(null);
  const URLSearchParams = useQuery();
  const mailAddressQuery = URLSearchParams.get("mailAddress") || "";
  const { enqueueSnackbar } = useSnackbar();

  const validateSchema = yup.object().shape<any>({
    mailAddress: yup
      .string()
      .required("メールアドレスを入力してください。")
      .email("メールアドレス形式が無効です。"),
    password: yup.string().required("パスワードを入力してください。"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(validateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      mailAddress: mailAddressQuery || "",
      password: "",
    },
  });

  const submit = async (submitForm: LoginInputs) => {
    try {
      setSubmit(true);
      await signin(submitForm.mailAddress, submitForm.password);
    } catch (error: any) {
      if (error?.response?.status === 500) {
        enqueueSnackbar("Server error", { variant: "error" });
        return;
      }
      enqueueSnackbar(
        error.response.data.messages || error.response.data.errors,
        { variant: "error" }
      );
    } finally {
      setSubmit(false);
    }
  };

  // const processUrlToken = async (accessToken: string) => {
  //   try {
  //     setLocalStorage('accessToken', accessToken);
  //     const staffId = getLocalStorage('staffId');
  //     const companyCode = getSessionStorage('companyCode');
  //     const path = `/${companyCode}`;
  //     await validateAccessTokenApi(companyCode, staffId);
  //     dispatch(setIsAuth(true));
  //     redirectDashboard(path);
  //   } catch (error) {
  //     removeLocalStorage('accessToken');
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   // const accessToken = searchParams.get('accessToken');
  //   const accessToken = getLocalStorage('accessToken');
  //   if (accessToken) {
  //     processUrlToken(accessToken);
  //   }
  // }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/* <Typography component="h1" variant="h2" className={classes.title}>
          Tochok
        </Typography> */}
        <img
          src="../../img/logo/当直管理くん.png"
          style={{ maxWidth: "500px" }}
        ></img>
        <Box className={classes.cssBoxContainer}>
          <form
            className={classes.form}
            onSubmit={handleSubmit(submit)}
            ref={ref}
          >
            <Controller
              control={control}
              name="mailAddress"
              render={({ field }) => (
                <TextField
                  inputRef={field.ref}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className={classes.cssTextField}
                  error={!!errors?.mailAddress}
                  helperText={errors?.mailAddress?.message}
                  variant="outlined"
                  margin="normal"
                  // required={true}
                  fullWidth={true}
                  label="メールアドレス"
                  autoFocus={true}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  inputRef={field.ref}
                  variant="outlined"
                  margin="normal"
                  fullWidth={true}
                  className={classes.cssTextField}
                  label="パスワード"
                  type="password"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  // id="password"
                  autoComplete="current-password"
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
              )}
            />
            <Box className={classes.submit}>
              <PillButton
                variant="contained"
                className={classes.setButton}
                disabled={isSubmit}
                type="submit"
              >
                ログイン
              </PillButton>
            </Box>
          </form>
          <Box alignItems="left" mt={2}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
              onClick={() => {
                history.push("/forgetPassword");
              }}
              style={{ cursor: "pointer" }}
            >
              パスワードを忘れた場合
            </Typography>
          </Box>
        </Box>
      </div>
    </Container>
  );
};
export default Login;
