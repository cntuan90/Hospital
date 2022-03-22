import MomentUtils from "@date-io/moment";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { FormControl } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

export interface props {
  data: any;
  index: number;
  isEdit: boolean;
  handleUpdateTargetDateFromChild: (index: number, date: string) => void;
}

const RenderHolidayListSetting: React.FC<props> = ({
  data,
  index,
  isEdit,
  handleUpdateTargetDateFromChild,
}) => {
  const validateSchema = yup.object().shape<any>({
    targetDate: yup
      .date()
      .typeError("適用日を選択して下さい。")
      .required("適用日を選択して下さい。"),
  });

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
    defaultValues: {
      targetDate: data?.holiday_date || "",
    },
  });

  const handleUpdateTargetDate = (index: number, date: string) => {
    handleUpdateTargetDateFromChild(index, date);
  };

  useEffect(() => {
    setValue("targetDate", data?.holiday_date);
  }, [data]);

  return (
    <FormControl variant="outlined">
      <Controller
        name="targetDate"
        control={control}
        render={({ field }) =>
          isEdit ? (
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                {...field}
                inputRef={field.ref}
                style={{ maxWidth: '220px' }}
                variant="inline"
                inputVariant="outlined"
                format="YYYY年MM月DD日"
                disableToolbar={true}
                autoOk={true}
                size="small"
                onChange={(e) => {
                  field.onChange(moment(e).format("YYYY-MM-DD"));
                  handleUpdateTargetDate(index, moment(e).format("YYYY-MM-DD"));
                }}
                // label="適用日"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                error={!!errors?.targetDate}
                helperText={errors?.targetDate?.message}
              />
            </MuiPickersUtilsProvider>
          ) : (
            <p style={{ fontSize: "1rem" }}>
              {moment(getValues("targetDate") ?? "").format("YYYY年MM月DD日")}
            </p>
          )
        }
      />
    </FormControl>
  );
};

export default RenderHolidayListSetting;
