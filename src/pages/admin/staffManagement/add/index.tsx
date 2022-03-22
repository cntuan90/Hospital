import { FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import ScreenLoader from "../../../../components/organisms/ScreenLoader";
import useStyles from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PillButton from "../../../../components/atoms/Buttons/PillButton";
import { USING_TEXT_LIST } from "../../../../utility/usingTexts";
import {
  adminAddStaffPostApi,
  adminGetStaffDetailApi,
  adminUpdateStaffPostApi,
} from "../../../../api/adminApi";
import { IGetStaffDetailApi, UrlParamsType } from "../type";

const StaffManagementAdd: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<UrlParamsType>();

  const [isLoading, setLoading] = useState(true);
  const [staffDetail, setStaffDetail] = useState<IGetStaffDetailApi>();
  const { enqueueSnackbar } = useSnackbar();

  const validateSchema = yup.object().shape<any>({
    mailAddress: yup
      .string()
      .required("メールアドレスを入力してください。")
      .email("メールアドレス形式が無効です。"),
    familyName: yup.string().required("姓を入力してください。"),
    firstName: yup.string().required("名を入力してください。"),
    department: yup.string().required("診療科を入力してください。"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      mailAddress: "",
    },
  });

  const formatParamsObj = (formData: any) => {
    if (id) {
      return {
        id: staffDetail?.id || null,
        first_name: formData?.firstName,
        last_name: formData?.familyName,
        first_name_kana: formData?.firstNameKana,
        last_name_kana: formData?.familyNameKana,
        nick_name: formData?.nickName,
        email: formData?.mailAddress,
        department: formData?.department,
        position: formData?.position,
      };
    } else {
      return {
        first_name: formData?.firstName,
        last_name: formData?.familyName,
        first_name_kana: formData?.firstNameKana,
        last_name_kana: formData?.familyNameKana,
        nick_name: formData?.nickName,
        email: formData?.mailAddress,
        department: formData?.department,
        position: formData?.position,
      };
    }
  };

  const submit = async (formData: any) => {
    try {
      setLoading(true);
      const formattedParamObj = formatParamsObj(formData);

      if (id) {
        await adminUpdateStaffPostApi(formattedParamObj);
      } else {
        await adminAddStaffPostApi(formattedParamObj);
      }
      enqueueSnackbar(USING_TEXT_LIST.successText, { variant: "success" });
      history.push("/staffManagement");
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
      if (id) {
        const data = await adminGetStaffDetailApi(id);

        setValue("firstName", data?.first_name || "");
        setValue("familyName", data?.last_name || "");
        setValue("firstNameKana", data?.first_name_kana || "");
        setValue("familyNameKana", data?.last_name_kana || "");
        setValue("nickName", data?.nick_name || "");
        setValue("mailAddress", data?.email || "");
        setValue("department", data?.department || "");
        setValue("position", data?.position || "");

        setStaffDetail(data);
      }
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
      <form onSubmit={handleSubmit(submit)}>
        <Box className={classes.root}>
          <Box className={classes.lineSpace} />

          <Grid container className={classes.cssFlexCenter} spacing={3}>
            <Grid item className={classes.cssLabel}>
              <Typography>氏名（必須）</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="familyName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        error={!!errors?.familyName}
                        helperText={errors?.familyName?.message}
                        variant="outlined"
                        size="small"
                        label="姓"
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                        variant="outlined"
                        size="small"
                        label="名"
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container className={classes.cssFlexCenter} spacing={3}>
            <Grid item className={classes.cssLabel}>
              <Typography>フリガナ</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="familyNameKana"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        variant="outlined"
                        size="small"
                        label="セイ"
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="firstNameKana"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        variant="outlined"
                        size="small"
                        label="メイ"
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container className={classes.cssFlexCenter} spacing={3}>
            <Grid item className={classes.cssLabel}>
              <Typography>当直上での表記名</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="nickName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        variant="outlined"
                        size="small"
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container className={classes.cssFlexCenter} spacing={3}>
            <Grid item className={classes.cssLabel}>
              <Typography>メールアドレス（必須）</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="mailAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        variant="outlined"
                        size="small"
                        error={!!errors?.mailAddress}
                        helperText={errors?.mailAddress?.message}
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container className={classes.cssFlexCenter} spacing={3}>
            <Grid item className={classes.cssLabel}>
              <Typography>診療科（必須）</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        variant="outlined"
                        size="small"
                        className={classes.cssTextField}
                        error={!!errors?.department}
                        helperText={errors?.department?.message}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.lineSpace} />

          <Grid container className={classes.cssFlexCenter} spacing={3}>
            <Grid item className={classes.cssLabel}>
              <Typography>役職</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="position"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined">
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        variant="outlined"
                        size="small"
                        className={classes.cssTextField}
                      />
                    </FormControl>
                  )}
                />
              </FormControl>
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
        </Box>
      </form>
    </ScreenLoader>
  );
};

export default StaffManagementAdd;
