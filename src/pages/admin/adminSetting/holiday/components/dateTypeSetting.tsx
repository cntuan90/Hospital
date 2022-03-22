import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
export interface props {
  data: any;
  classes: any;
  index: number;
  isEdit: boolean;
  handleUpdateDateTypeFromChild: (index: number, type: string) => void;
}

const RenderDateTypeSetting: React.FC<props> = ({
  classes,
  data,
  index,
  isEdit,
  handleUpdateDateTypeFromChild,
}) => {
  const { control, setValue } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      dateType: String(data?.date_type) || "3",
    },
  });

  const handleUpdateDateType = (index: number, type: string) => {
    handleUpdateDateTypeFromChild(index, type);
  };

  const renderDateType = (type: string) => {
    switch (type) {
      case "3":
        return "祝日";
      case "2":
        return "日曜日";
      case "1":
        return "土曜日";
      case "0":
        return "平日";

      default:
        break;
    }
  };

  useEffect(() => {
    setValue("dateType", String(data?.date_type));
  }, [data]);

  return (
    <Controller
      name="dateType"
      control={control}
      render={({ field }) =>
        isEdit ? (
          <FormControl component="fieldset">
            <RadioGroup
              {...field}
              row={true}
              onChange={(e) => {
                e.preventDefault();
                field.onChange(e);
                handleUpdateDateType(index, e.target.value);
              }}
            >
              <FormControlLabel
                value="0"
                control={<Radio color="primary" />}
                label="平日"
              />
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="土曜日"
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="日曜日"
              />
              <FormControlLabel
                value="3"
                control={<Radio color="primary" />}
                label="祝日"
              />
            </RadioGroup>
          </FormControl>
        ) : (
          <p style={{ fontSize: "1rem" }}>
            {renderDateType(String(data?.date_type))}
          </p>
        )
      }
    />
  );
};

export default RenderDateTypeSetting;
