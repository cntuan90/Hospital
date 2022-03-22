import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { setIsShowCalendar, setIsShowTargetSetting } from "../../hook/actions";
import CloseIcon from "@mui/icons-material/Close";
import CheckboxStatus from "../CheckboxStatus";
import { Circle } from "@mui/icons-material";
import TodosDispatch from "../../edit/context";
import { returnLeftWidth, returnWidthOfDateType } from "../functions";

export default function RowChild({
  classes,
  data,
  index,
  groupId,
  staffId,
  dateType,
  isShowColumn,
}: any) {
  const { dispatch } = useContext(TodosDispatch);
  const handleShowTableCellColor = (col: any) => {
    if (col.isAlert) {
      return '#fce4de' // Red Alert
    } else if (col.shift_detail_status === 1 && col.admin_assign_status === 1) {
      return '#fef6e2' // Yellow warning
    } else if (col.admin_assign_status === 1) {
      return '#deedd8' // Green Selecting 
    } else if (col.shift_detail_status === 1 || col.isGrey) {
      return '#efefef' // Grey
    } else {
      return ''
    }
  }

  return (
    <>
      {/* Row Expected Shifts of Staff */}
      <TableRow className={`${classes.setRowBodyStyle} ${classes.setBorderNone}`}>
        <TableCell
          key={`staffAssignment1_${data?.staff_name || ''}_${String(index)}`}
          align="left"
          style={{
            cursor: "pointer",
            paddingLeft: '5px',
            background: '#fff', position: 'sticky', left: 0, zIndex: 900,
          }}
          onClick={() => {
            dispatch(setIsShowCalendar({
              isShowCalendar: true,
              staffInfoOnCalendar: {
                staffId,
                staffName: data?.staff_name ?? '',
                shift_detail: data?.shift_detail ?? [],
              }
            }));
          }}
        >
          {data?.staff_name || ''}
        </TableCell>

        {isShowColumn && (
          <>
            <TableCell
              key={`staffAssignment2_${data?.group_name}2_${String(index)}`}
              align="right"
              style={{
                minWidth: '115px',
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                whiteSpace: 'nowrap',
                left: '140px',
              }}
            >
              {'年間実績当直数'}
            </TableCell>

            <TableCell
              key={`staffAssignment3_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                left: '255px', // 140: 1st columnd width + 115: width of 	年間実績当直数	
              }}
            >
              {dateType === 0 ? (data?.target_shift_number_weekday + data?.target_shift_number_saturday + data?.target_shift_number_sunday + data?.target_shift_number_holiday) : (data?.target_shift_number_weekday || 0)}
            </TableCell>
            {
              dateType > 0 && (
                <TableCell
                  key={`staffAssignment4_${data?.group_name}2_${String(index)}`}
                  align="center"
                  style={{
                    borderLeft: 'none',
                    background: '#fff', position: 'sticky', zIndex: 10,
                    left: `${255 + returnWidthOfDateType(dateType ?? 0)}px`,
                  }}
                >
                  {dateType === 1 ? (data?.target_shift_number_saturday + data?.target_shift_number_sunday + data?.target_shift_number_holiday) : (data?.target_shift_number_saturday || 0)}
                </TableCell>
              )
            }
            {
              dateType > 1 && (
                <TableCell
                  key={`staffAssignment5_${data?.group_name}2_${String(index)}`}
                  align="center"
                  style={{
                    borderLeft: 'none',
                    background: '#fff', position: 'sticky', zIndex: 10,
                    left: `${255 + (returnWidthOfDateType(dateType ?? 0) * 2)}px`,
                  }}
                >
                  {dateType === 2 ? (data?.target_shift_number_sunday + data?.target_shift_number_holiday) : (data?.target_shift_number_sunday || 0)}
                </TableCell>
              )
            }
            {
              dateType > 2 && (
                <TableCell
                  key={`staffAssignment6_${data?.group_name}2_${String(index)}`}
                  align="center"
                  style={{
                    borderLeft: 'none',
                    background: '#fff', position: 'sticky', zIndex: 10,
                    left: `${255 + (returnWidthOfDateType(dateType ?? 0) * 3)}px`,
                  }}
                >
                  {data?.target_shift_number_holiday || 0}
                </TableCell>
              )
            }
          </>
        )}

        <TableCell
          key={`staffAssignment2_${data?.group_name}2_${String(index)}`}
          align="right"
          style={{
            minWidth: '90px',
            borderLeft: 'none',
            cursor: "pointer",
            background: '#fff', position: 'sticky', zIndex: 10,
            whiteSpace: 'nowrap',
            // left: '140px',
            left: `${isShowColumn
              ? (140 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1)) // 115: width of 	年間実績当直数	
              : '140'}px`,
          }}
          onClick={() => {
            dispatch(setIsShowTargetSetting({
              isShowTargetSetting: true,
              staffDetailTargetSetting: {
                staff_name: data?.staff_name ?? '',
                shift_assignment_id: data?.shift_assignment_id ?? '',
                target_shift_number_holiday: data?.target_shift_number_holiday || 0,
                target_shift_number_saturday: data?.target_shift_number_saturday || 0,
                target_shift_number_sunday: data?.target_shift_number_sunday || 0,
                target_shift_number_weekday: data?.target_shift_number_weekday || 0,
              },
            }));
          }}
        >
          {'目標当直数'}
        </TableCell>

        <TableCell
          key={`staffAssignment3_${data?.group_name}2_${String(index)}`}
          align="center"
          style={{
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 10,
            // left: '230px',
            left: `${isShowColumn
              ? (230 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
              : '230'}px`,
          }}
        >
          {dateType === 0 ? (data?.target_shift_number_weekday + data?.target_shift_number_saturday + data?.target_shift_number_sunday + data?.target_shift_number_holiday) : (data?.target_shift_number_weekday || 0)}
        </TableCell>
        {
          dateType > 0 && (
            <TableCell
              key={`staffAssignment4_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                // left: `${230 + returnWidthOfDateType(dateType ?? 0)}px`,
                left: `${isShowColumn
                  ? (230 + returnWidthOfDateType(dateType ?? 0) + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
                  : (230 + returnWidthOfDateType(dateType ?? 0))}px`,
              }}
            >
              {dateType === 1 ? (data?.target_shift_number_saturday + data?.target_shift_number_sunday + data?.target_shift_number_holiday) : (data?.target_shift_number_saturday || 0)}
            </TableCell>
          )
        }
        {
          dateType > 1 && (
            <TableCell
              key={`staffAssignment5_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                // left: `${230 + (returnWidthOfDateType(dateType ?? 0) * 2)}px`,
                left: `${isShowColumn
                  ? (230 + returnWidthOfDateType(dateType ?? 0) * 2 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
                  : (230 + returnWidthOfDateType(dateType ?? 0) * 2)}px`,
              }}
            >
              {dateType === 2 ? (data?.target_shift_number_sunday + data?.target_shift_number_holiday) : (data?.target_shift_number_sunday || 0)}
            </TableCell>
          )
        }
        {
          dateType > 2 && (
            <TableCell
              key={`staffAssignment6_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                // left: `${230 + (returnWidthOfDateType(dateType ?? 0) * 3)}px`,
                left: `${isShowColumn
                  ? (230 + returnWidthOfDateType(dateType ?? 0) * 3 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
                  : (230 + returnWidthOfDateType(dateType ?? 0) * 3)}px`,
              }}
            >
              {data?.target_shift_number_holiday || 0}
            </TableCell>
          )
        }

        <TableCell
          key={`staffAssignment2_${data?.staff_name || ''}_${String(index)}`}
          align="right"
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            borderRight: '1px solid rgba(196, 196, 196, 0.4)',
            background: '#fff', position: 'sticky',
            zIndex: 10,
            // left: `${returnLeftWidth(dateType ?? 0)}px`,
            left: `${isShowColumn
              ? (returnLeftWidth(dateType ?? 0) + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
              : returnLeftWidth(dateType ?? 0)}px`,
          }}
        >
          希望
        </TableCell>

        {data?.shift_detail?.length > 0 && data?.shift_detail.map((col: any, i: number) => (
          <TableCell
            key={`staffAssignment_${col?.number_staff ?? '0'}_${String(index)}_${String(i)}`}
            align="center"
          // style={{ background: "#fff8ea" }}
          // style={{ background: "inherit" }}
          >
            {col?.isSelectedOtherGrp ? '選択中' : (
              (col?.shift_detail_status === 2) ? (
                <Circle className={classes.setStyleShiftStatusCircle} />
              ) : (
                col?.shift_detail_status === 1 ? (
                  <CloseIcon className={classes.setStyleShiftStatusClose} />
                ) : ''
              )
            )}
          </TableCell>
        ))}
      </TableRow>

      {/* Row Checkbox */}
      <TableRow className={classes.setRowBodyStyle}>
        <TableCell
          key={`staffAssignment3_${data?.staff_name || ''}_${String(index)}`}
          align="left"
          style={{
            background: '#fff', position: 'sticky', left: 0, zIndex: 900, paddingLeft: '5px', color: '#b7bbbf'
          }}
        >
          提出済
        </TableCell>

        {
          isShowColumn && (
            <>
              <TableCell
                key={`staffAssignment2_${data?.group_name}2_${String(index)}`}
                align="right"
                style={{
                  borderLeft: 'none',
                  background: '#fff', position: 'sticky', zIndex: 10,
                  whiteSpace: 'nowrap',
                  left: '140px',
                }}
              >
                {'前回実績当直数'}
              </TableCell>

              <TableCell
                key={`staffAssignment3_${data?.group_name}2_${String(index)}`}
                align="center"
                style={{
                  borderLeft: 'none',
                  background: '#fff', position: 'sticky', zIndex: 10,
                  left: '255px',
                }}
              >
                {dateType === 0 ? (data?.admin_assigned_weekday + data?.admin_assigned_saturday + data?.admin_assigned_sunday + data?.admin_assigned_holiday) : (data?.admin_assigned_weekday || 0)}
              </TableCell>
              {
                dateType > 0 && (
                  <TableCell
                    key={`staffAssignment4_${data?.group_name}2_${String(index)}`}
                    align="center"
                    style={{
                      borderLeft: 'none',
                      background: '#fff', position: 'sticky', zIndex: 10,
                      left: `${255 + returnWidthOfDateType(dateType ?? 0)}px`,
                    }}
                  >
                    {dateType === 1 ? (data?.admin_assigned_saturday + data?.admin_assigned_sunday + data?.admin_assigned_holiday) : (data?.admin_assigned_saturday || 0)}
                  </TableCell>
                )
              }
              {
                dateType > 1 && (
                  <TableCell
                    key={`staffAssignment5_${data?.group_name}2_${String(index)}`}
                    align="center"
                    style={{
                      borderLeft: 'none',
                      background: '#fff', position: 'sticky', zIndex: 10,
                      left: `${255 + (returnWidthOfDateType(dateType ?? 0) * 2)}px`,
                    }}
                  >
                    {dateType === 2 ? (data?.admin_assigned_sunday + data?.admin_assigned_holiday) : (data?.admin_assigned_sunday || 0)}
                  </TableCell>
                )
              }
              {
                dateType > 2 && (
                  <TableCell
                    key={`staffAssignment6_${data?.group_name}2_${String(index)}`}
                    align="center"
                    style={{
                      borderLeft: 'none',
                      background: '#fff', position: 'sticky', zIndex: 10,
                      left: `${255 + (returnWidthOfDateType(dateType ?? 0) * 3)}px`,
                    }}
                  >
                    {data?.admin_assigned_holiday || 0}
                  </TableCell>
                )
              }
            </>
          )
        }

        <TableCell
          key={`staffAssignment2_${data?.group_name}2_${String(index)}`}
          align="right"
          style={{
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 10,
            whiteSpace: 'nowrap',
            // left: '140px',
            left: `${isShowColumn
              ? (140 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
              : '140'}px`,
          }}
        >
          {'今回当直数'}
        </TableCell>

        <TableCell
          key={`staffAssignment3_${data?.group_name}2_${String(index)}`}
          align="center"
          style={{
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 10,
            // left: '230px',
            left: `${isShowColumn
              ? (230 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
              : '230'}px`,
          }}
        >
          {dateType === 0 ? (data?.admin_assigned_weekday + data?.admin_assigned_saturday + data?.admin_assigned_sunday + data?.admin_assigned_holiday) : (data?.admin_assigned_weekday || 0)}
        </TableCell>
        {
          dateType > 0 && (
            <TableCell
              key={`staffAssignment4_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                // left: `${230 + returnWidthOfDateType(dateType ?? 0)}px`,
                left: `${isShowColumn
                  ? (230 + returnWidthOfDateType(dateType ?? 0) + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
                  : (230 + returnWidthOfDateType(dateType ?? 0))}px`,
              }}
            >
              {dateType === 1 ? (data?.admin_assigned_saturday + data?.admin_assigned_sunday + data?.admin_assigned_holiday) : (data?.admin_assigned_saturday || 0)}
            </TableCell>
          )
        }
        {
          dateType > 1 && (
            <TableCell
              key={`staffAssignment5_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                // left: `${230 + (returnWidthOfDateType(dateType ?? 0) * 2)}px`,
                left: `${isShowColumn
                  ? (230 + returnWidthOfDateType(dateType ?? 0) * 2 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
                  : (230 + returnWidthOfDateType(dateType ?? 0) * 2)}px`,
              }}
            >
              {dateType === 2 ? (data?.admin_assigned_sunday + data?.admin_assigned_holiday) : (data?.admin_assigned_sunday || 0)}
            </TableCell>
          )
        }
        {
          dateType > 2 && (
            <TableCell
              key={`staffAssignment6_${data?.group_name}2_${String(index)}`}
              align="center"
              style={{
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                // left: `${230 + (returnWidthOfDateType(dateType ?? 0) * 3)}px`,
                left: `${isShowColumn
                  ? (230 + returnWidthOfDateType(dateType ?? 0) * 3 + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
                  : (230 + returnWidthOfDateType(dateType ?? 0) * 3)}px`,
              }}
            >
              {data?.admin_assigned_holiday || 0}
            </TableCell>
          )
        }

        <TableCell
          key={`staffAssignment4_${data?.staff_name || ''}_${String(index)}`}
          align="right"
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            borderRight: '1px solid rgba(196, 196, 196, 0.4)',
            background: '#fff', position: 'sticky',
            zIndex: 10,
            // left: `${returnLeftWidth(dateType ?? 0)}px`,
            left: `${isShowColumn
              ? (returnLeftWidth(dateType ?? 0) + 115 + returnWidthOfDateType(dateType) * Number(dateType + 1))
              : returnLeftWidth(dateType ?? 0)}px`,
          }}
        >
          勤務
        </TableCell>

        {data?.shift_detail?.length > 0 && data?.shift_detail.map((col: any, i: number) => (
          <TableCell
            key={`staffAssignmentCheckbox_${col?.number_staff ?? '0'}_${String(index)}_${String(i)}`}
            align="center"
            style={{ background: `${handleShowTableCellColor(col)}` }}
          >
            <CheckboxStatus data={col} groupId={groupId} staffId={staffId} staffName={data?.staff_name ?? ''} date={col.date_register} />
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}
