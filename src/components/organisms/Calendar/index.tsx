import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import momentUtils from "@date-io/moment";
import {
  Badge,
  createTheme,
  Grid,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import ScreenLoader from "../ScreenLoader";
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@mui/styles";
import { Circle } from "@mui/icons-material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import PillButton from "../../atoms/Buttons/PillButton";
import TodosDispatch from "../../../pages/admin/shiftBoardManagement/edit/context";
import { setHeaderAssignedStaffName } from "../../../pages/admin/shiftBoardManagement/hook/actions";

function CustomCalendar({
  handleSaveFromChild,
}: {
  handleSaveFromChild: (list: any) => void;
}) {
  const classes = useStyles();
  const { state: { staffInfoOnCalendar, tableHeaderAssignedStaffname }, dispatch } = useContext(TodosDispatch);

  class LocalizedUtils extends momentUtils {
    // eslint-disable-next-line class-methods-use-this
    getCalendarHeaderText(date: moment.MomentInput) {
      // return moment(date).format('YYYY年M月');
      return `${staffInfoOnCalendar.staffName}先生 希望表`;
    }
  }

  const [selectedDate, setSelectedDate] = useState<moment.Moment>(
    moment(tableHeaderAssignedStaffname[0]?.date_info[0]?.date)
  );

  const [daysOnCalendar, setDaysOnCalendar] = useState<any[]>([]);

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(moment(date !== null ? date : tableHeaderAssignedStaffname[0]?.date_info[0]?.date));
  };

  const [shiftStatusList, setShiftStatusList] = useState<any[]>(
    Array.from({ length: moment(tableHeaderAssignedStaffname[0]?.date_info[0]?.date).daysInMonth() }, (_, i) => {
      return {
        date: `${moment(tableHeaderAssignedStaffname[0]?.date_info[0]?.date).format("YYYY")}-${moment(tableHeaderAssignedStaffname[0]?.date_info[0]?.date).format("MM")}-${i + 1}`,
        status: "0",
      };
    })
  );

  const showShiftStatus = (date: any) => {
    let isShow = "0";
    shiftStatusList.forEach((item) => {
      if (
        moment(item.date).format("YYYY-MM-DD") ===
        moment(date).format("YYYY-MM-DD")
      ) {
        isShow = item.status;
      }
    });

    switch (isShow) {
      case "0":
        return;
      case "1":
        return <CloseIcon className={classes.setStyleShiftStatusClose} />;
      case "2":
        return <Circle className={classes.setStyleShiftStatusCircle} />
      // case "3":
      //   return (
      //     <ChangeHistoryIcon className={classes.setStyleShiftStatusTriangle} />
      //   );
      default:
        break;
    }
  };

  const handleChangeShiftStatusOnCalendar = (date: string) => {
    let tempArr = [...shiftStatusList];
    shiftStatusList.forEach((item, index) => {
      if (moment(item.date).format("YYYY-MM-DD") === date) {
        tempArr[index].status = String(Number(tempArr[index].status) + 1);
        if (Number(tempArr[index].status) > 2) tempArr[index].status = "0";
      }
    });
    setShiftStatusList(tempArr);
  };

  const theme = createTheme({
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            background: "#D8E3C0",
          },
        },
      },
    },
  });

  moment.locale("ja", {
    months: [
      "１月",
      "2月",
      "3月",
      "4月",
      "5月",
      "６月",
      "７月",
      "８月",
      "９月",
      "１０月",
      "１１月",
      "１２月",
    ],
    weekdays: tableHeaderAssignedStaffname[0]?.calendar_start_week_day === 0 ? [
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
      "日曜日",
    ] : [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    weekdaysShort: tableHeaderAssignedStaffname[0]?.calendar_start_week_day === 0 ? ["月", "火", "水", "木", "金", "土", "日"] : ["日", "月", "火", "水", "木", "金", "土"],
  });

  useEffect(() => {
    if (staffInfoOnCalendar?.shift_detail?.length === 0) return;
    const formattedShiftDetail = staffInfoOnCalendar?.shift_detail?.map((item: any) => {
      return {
        date: item?.date_register,
        status: item?.shift_detail_status === 2 ? '2' : (item?.shift_detail_status === 1 ? '1' : ''),
      }
    })

    setShiftStatusList(formattedShiftDetail || []);
    setSelectedDate(moment(tableHeaderAssignedStaffname[0]?.date_info[0]?.date));
    setDaysOnCalendar(tableHeaderAssignedStaffname[0]?.date_info?.map((item: any) => item?.date).map((val: any) => Number(moment(val).format('DD'))))
  }, [staffInfoOnCalendar])

  return (
    <>
      <div style={{ padding: "16px auto", border: '2px solid grey' }} className={classes.setStyleCalendar}>
        <ScreenLoader isLoading={false}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider
              libInstance={moment}
              utils={LocalizedUtils}
              locale="ja"
            >
              <div
                style={{
                  maxWidth: "460px",
                }}
              >
                <Calendar
                  rightArrowButtonProps={{
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                    },
                  }}
                  leftArrowButtonProps={{
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                    },
                  }}
                  date={selectedDate}
                  onChange={handleDateChange}
                  allowKeyboardControl={true}
                  renderDay={(
                    day,
                    selectedDate,
                    dayInCurrentMonth,
                    dayComponent
                  ) => {
                    return (
                      <Badge
                        style={{
                          opacity: dayComponent ? 1 : 0,
                          width: "66px",
                          height: "70px",
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          marginRight: "-1px",
                          marginTop: "-1px",
                          minWidth: "24px",
                        }}
                        onClick={() => {
                          handleChangeShiftStatusOnCalendar(
                            moment(day).format("YYYY-MM-DD")
                          );
                        }}
                      >
                        <Grid
                          item={true}
                          className={classes.setStyleDayInCalendar}
                        >
                          <div className={`${!daysOnCalendar.includes(Number(moment(day).format('DD'))) ? classes.setColorCalendarDay : ''}`}>
                            {dayComponent}
                          </div>
                          {!!dayInCurrentMonth && showShiftStatus(day)}
                        </Grid>
                      </Badge>
                    );
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </ScreenLoader>
      </div>
      <PillButton
        type="button"
        className={classes.cssSaveButton}
        style={{ background: "#27a8e0", color: "#fff", fontSize: "20px", marginTop: '2rem' }}
        onClick={() => handleSaveFromChild(shiftStatusList)}
      >
        保存
      </PillButton>
    </>
  );
}

export default CustomCalendar;
