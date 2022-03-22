import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { sendVerifyCodeApi } from "../../../api/authApi";
import PillButton from "../../../components/atoms/Buttons/PillButton";
import { setLoading } from "../../../redux/auth/actions";
import useStyles from "../style";
import { ForgetPasswordInputs } from "../type";

const ForgetPassword: React.FC = () => {
  const [isSubmit, setSubmit] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const validateSchema = yup.object().shape<any>({
    mailAddress: yup
      .string()
      .required("メールアドレスを入力してください。")
      .email("メールアドレス形式が無効です。"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgetPasswordInputs>({
    resolver: yupResolver(validateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      mailAddress: "",
    },
  });

  const submit = async (submitForm: ForgetPasswordInputs) => {
    try {
      setSubmit(true);
      dispatch(setLoading(true));

      const companyCode = await sendVerifyCodeApi(submitForm.mailAddress);

      history.push(`/resetPassword?mailAddress=${submitForm.mailAddress}`);
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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img
          src="../../img/logo/当直管理くん.png"
          style={{ maxWidth: "500px" }}
        ></img>
        <Box className={classes.cssBoxContainer}>
          <form className={classes.form} onSubmit={handleSubmit(submit)}>
            <Controller
              control={control}
              name="mailAddress"
              render={({ field, ...rest }) => (
                <TextField
                  {...rest}
                  inputRef={field.ref}
                  fullWidth={true}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors?.mailAddress}
                  helperText={errors?.mailAddress?.message}
                  variant="outlined"
                  margin="normal"
                  label="メールアドレス"
                  autoFocus={true}
                  style={{
                    width: "400px",
                  }}
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
                再設定
              </PillButton>
            </Box>
          </form>
        </Box>
      </div>
    </Container>
  );
};
export default ForgetPassword;
