import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PillButton from "../../../components/atoms/Buttons/PillButton";
import useStyles from "../style";
import * as yup from "yup";
import { ResetPasswordInputs } from "../type";
import useQuery from "../../../hooks/useQuery";
import { resetPasswordApi } from "../../../api/authApi";
import { setLoading } from "../../../redux/auth/actions";

const ResetPassword: React.FC = () => {
  const [isSubmit, setSubmit] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const classes = useStyles();
  const URLSearchParams = useQuery();
  const mailAddressQuery = URLSearchParams.get("mailAddress") || "";

  const validateSchema = yup.object().shape<any>({
    newPassword: yup
      .string()
      .required("新しいパスワードを入力してください。")
      .min(8, "最低８桁を入力してください。"),
    confirmCode: yup.string().required("確認コードを入力してください。"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: yupResolver(validateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmCode: "",
    },
  });

  const submit = async (submitForm: ResetPasswordInputs) => {
    try {
      setSubmit(true);
      dispatch(setLoading(true));
      const params = {
        password: submitForm.newPassword || "",
        verify_code: submitForm.confirmCode || "",
        email: mailAddressQuery || "",
      };
      const res = await resetPasswordApi(params);
      history.push(`/login?mailAddress=${mailAddressQuery}`);
    } catch (error: any) {
      enqueueSnackbar(
        error.response.data.messages || error.response.data.errors,
        { variant: "error" }
      );
    } finally {
      setSubmit(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <img
          src="../../img/logo/当直管理くん.png"
          style={{ maxWidth: "500px" }}
        ></img>
        <Box className={classes.cssBoxContainer}>
          <Box className={classes.cssText}>
            <p>
              新しく設定するパスワードをご入力ください。
            </p>
            <p>
              確認コードは、ご登録メールアドレスに送信されます。
            </p>
            <p>
              メールをご確認いただき、記載されている確認コードをご入力ください。
            </p>
          </Box>
          <form
            className={classes.form}
            noValidate={true}
            onSubmit={handleSubmit(submit)}
            style={{ marginTop: '1rem' }}
          >
            <Controller
              control={control}
              name="newPassword"
              render={({ field, ...rest }) => (
                <TextField
                  {...rest}
                  inputRef={field.ref}
                  className={classes.cssTextField}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors?.newPassword}
                  helperText={errors?.newPassword?.message}
                  variant="outlined"
                  margin="normal"
                  fullWidth={true}
                  label="新しいパスワード"
                  autoFocus={true}
                  type="password"
                />
              )}
            />
            <Controller
              control={control}
              name="confirmCode"
              render={({ field, ...rest }) => (
                <TextField
                  {...rest}
                  inputRef={field.ref}
                  className={classes.cssTextField}
                  variant="outlined"
                  margin="normal"
                  label="確認"
                  fullWidth={true}
                  type="confirmCode"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  autoComplete="current-confirmCode"
                  error={!!errors?.confirmCode}
                  helperText={errors?.confirmCode?.message}
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
                決定
              </PillButton>
            </Box>
          </form>
        </Box>
      </div >
    </Container >
  );
};
export default ResetPassword;
