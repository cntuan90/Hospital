import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, TableCell, TableRow, FormControl } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export interface props {
  data: any;
  index: number;
  classes: any;
  isEdit: boolean;
  handleUpdateRowBodyFromChild: (
    index: number,
    data: any,
    type: string
  ) => void;
}

const RowBody: React.FC<props> = (props) => {
  const { data, index, classes, isEdit, handleUpdateRowBodyFromChild } = props;

  // const validateSchema = yup.object().shape<any>({
  //   //
  // });

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<any>({
    mode: "onChange",
    // resolver: yupResolver(validateSchema),
    defaultValues: {
      groupName: data.groupName || "",
      mon: data.mon || "",
      tue: data.tue || "",
      wed: data.wed || "",
      thu: data.thu || "",
      fri: data.fri || "",
      sat: data.sat || "",
      sun: data.sun || "",
    },
  });

  const handleUpdateRowBody = (
    index: number,
    rowData: string,
    type: string
  ) => {
    handleUpdateRowBodyFromChild(index, rowData, type);
  };

  return (
    <TableRow className={classes.cssRowBody}>
      <TableCell
        key={`rowBody${data.groupName}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {/* {rowData?.groupName || ''} */}
        {getValues("groupName") || ""}
      </TableCell>

      {/* Monday */}
      <TableCell
        key={`rowBodyMon${data.mon}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="mon"
              control={control}
              // defaultValue={data.mon}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "mon");
                  }}
                  inputProps={{ maxLength: 3 }}
                  error={!!errors?.mon}
                  helperText={errors?.mon?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.mon || ''}</>
          <>{getValues("mon") || ""}</>
        )}
      </TableCell>

      {/* Tuesday */}
      <TableCell
        key={`rowBodyTue${data.tue}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="tue"
              control={control}
              defaultValue={data.tue}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "tue");
                  }}
                  error={!!errors?.tue}
                  helperText={errors?.tue?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.tue || ''}</>
          <>{getValues("tue") || ""}</>
        )}
      </TableCell>

      {/* Wednesday */}
      <TableCell
        key={`rowBodyWed${data.wed}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="wed"
              control={control}
              defaultValue={data.wed}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "wed");
                  }}
                  error={!!errors?.wed}
                  helperText={errors?.wed?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.wed || ''}</>
          <>{getValues("wed") || ""}</>
        )}
      </TableCell>

      {/* Thurday */}
      <TableCell
        key={`rowBodyThu${data.thu}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="thu"
              control={control}
              defaultValue={data.thu}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "thu");
                  }}
                  error={!!errors?.thu}
                  helperText={errors?.thu?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.thu || ''}</>
          <>{getValues("thu") || ""}</>
        )}
      </TableCell>

      {/* Friday */}
      <TableCell
        key={`rowBodyFri${data.fri}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="fri"
              control={control}
              defaultValue={data.fri}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "fri");
                  }}
                  error={!!errors?.fri}
                  helperText={errors?.fri?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.fri || ''}</>
          <>{getValues("fri") || ""}</>
        )}
      </TableCell>

      {/* Saturday */}
      <TableCell
        key={`rowBodySat${data.sat}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="sat"
              control={control}
              defaultValue={data.sat}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "sat");
                  }}
                  error={!!errors?.sat}
                  helperText={errors?.sat?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.sat || ''}</>
          <>{getValues("sat") || ""}</>
        )}
      </TableCell>

      {/* Sunday */}
      <TableCell
        key={`rowBodySun${data.sun}_${index}`}
        align="center"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        {isEdit ? (
          <FormControl variant="outlined">
            <Controller
              name="sun"
              control={control}
              defaultValue={data.sun}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value.replace(/[^0-9]/g, "") || "";
                    field.onChange(val);
                    handleUpdateRowBody(index, val, "sun");
                  }}
                  error={!!errors?.sun}
                  helperText={errors?.sun?.message}
                  size="small"
                />
              )}
            />
          </FormControl>
        ) : (
          // <>{rowData?.sun || ''}</>
          <>{getValues("sun") || ""}</>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowBody;
