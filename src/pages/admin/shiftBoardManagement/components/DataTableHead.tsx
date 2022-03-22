import { Grid, TableCell, TableHead, TableRow, Tooltip, Typography, Zoom } from '@mui/material';
import moment from 'moment';
import { returnLeftWidth, returnWidthOfDateType, showDateTypeColumn } from './functions';
import { DataTableHeadProps } from './interface';

export default function DataTableHeadCalendar({
  classes, tableHeaderListDate = [], data = [], tableHeaderTotalAssignedStaffs = [], isShowColumn,
}: DataTableHeadProps) {

  return (
    <TableHead className={classes.cssHeaderBorder}>
      {/* Assigned Staff Names - 当直者 */}
      {data?.length > 0 && (
        data?.map((item: any, index: number) => (
          <TableRow key={`assignedStaffName_tableRow_${String(index)}`} className={`${classes.setHeaderPosition} ${index === 0 && classes.setBorderTopColor} ${classes.setBorderLeftAndRightColor} ${index === 0 && classes.setBorderTopRight}`}>
            <TableCell
              key={`assignedStaffName_title_${String(index)}`}
              align='left'
              colSpan={isShowColumn ? Number(showDateTypeColumn(item?.display_type ?? 0) * 2 + 3) : Number(showDateTypeColumn(item?.display_type ?? 0) + 2)}
              style={{
                color: '#27a8e0',
                fontSize: '16px',
                background: '#fff', zIndex: 999,
                borderTopLeftRadius: `${index === 0 && '5px'}`,
                borderBottom: `${index !== (data.length - 1) && 'none'}`
              }}
            >
              {index === 0 ? '当直者' : ' '}
            </TableCell>

            <TableCell
              key={`assignedStaffName_group_name_${String(index)}`}
              align='right'
              style={{
                borderLeft: 'none',
                whiteSpace: 'nowrap',
                borderRight: '1px solid rgba(196, 196, 196, 0.4)',
                background: '#fff',
                zIndex: 999,
                position: 'sticky',
                // left: `${returnLeftWidth(item?.display_type ?? 0)}px`,
                left: `${isShowColumn
                  ? (returnLeftWidth(item?.display_type ?? 0) + 115 + returnWidthOfDateType(item?.display_type) * Number(item?.display_type + 1)) // 115: width of 	年間実績当直数	
                  : returnLeftWidth(item?.display_type ?? 0)}px`,
                borderBottom: `${index !== (data.length - 1) && 'none'}`
              }}
            >
              {item?.group_name ?? ''}
            </TableCell>

            {item?.date_info.map((value: any, i: number) => (
              <TableCell
                key={`assignedStaffName_${String(i)}`}
                style={{
                  minWidth: '100px',
                  borderTop: `${index === 0 && '1px solid #27a8e0'}`,
                  borderBottom: `${index !== (data.length - 1) && 'none'}`
                }}
              >
                {value?.assigned_staffs > value?.number_staff ? (
                  <Typography
                    style={{ textAlign: "left", fontSize: '14px' }}
                  >
                    人数オーバー
                  </Typography>
                ) : (
                  <Tooltip
                    title={value?.assigned_staff_name?.length > 0 && value?.assigned_staff_name?.map((item: any) => item?.staff_name ?? '')?.join(', ')}
                    arrow={true}
                    TransitionComponent={Zoom}
                    placement="top"
                    classes={{ tooltip: classes.paddingTooltip }}
                  >
                    <Typography
                      className={classes.tableEllipsis}
                      style={{ textAlign: "left", fontSize: '14px' }}
                    >
                      {value?.assigned_staff_name?.length > 0 && value?.assigned_staff_name?.map((item: any) => item?.staff_name ?? '')?.join(', ')}
                    </Typography>
                  </Tooltip>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}

      {/* Total Assigned Staffs - 合計 */}
      {tableHeaderTotalAssignedStaffs?.length > 0 && (
        <TableRow key={`totalAssignedStaff_requiredStaff_1`} className={`${classes.setHeaderPosition} ${classes.setBorderLeftAndRightColor}`}>
          <TableCell
            key={`totalAssignedStaff_title1_1`}
            align='left'
            colSpan={isShowColumn ? Number(showDateTypeColumn(data[0]?.display_type ?? 0) * 2 + 3) : Number(showDateTypeColumn(data[0]?.display_type ?? 0) + 2)}
            style={{
              color: '#27a8e0',
              fontSize: '16px',
              borderBottom: 'none'
            }}>
            合計
          </TableCell>

          <TableCell
            key={`totalAssignedStaff_title2_1`}
            align='right'
            style={{
              borderLeft: 'none',
              borderRight: '1px solid rgba(196, 196, 196, 0.4)',
              background: '#fff', zIndex: 999,
              position: 'sticky',
              // left: `${returnLeftWidth(data[0]?.display_type ?? 0)}px`,
              left: `${isShowColumn
                ? (returnLeftWidth(data[0]?.display_type ?? 0) + 115 + returnWidthOfDateType(data[0]?.display_type) * Number(data[0]?.display_type + 1))
                : returnLeftWidth(data[0]?.display_type ?? 0)}px`,
              borderBottom: 'none',
              whiteSpace: 'nowrap',
            }}>
            必要人数
          </TableCell>

          {tableHeaderTotalAssignedStaffs.map((value: any, i: number) => (
            <TableCell
              key={`totalAssignedStaff_number_staff_${String(i)}`}
              align='center'
              style={{
                borderBottom: 'none',
              }}>{value?.number_staff}</TableCell>
          ))}
        </TableRow>
      )}
      {tableHeaderTotalAssignedStaffs?.length > 0 && (
        <TableRow key={`totalAssignedStaff_tableRow_2`} className={`${classes.setHeaderPosition} ${classes.setBorderLeftAndRightColor}`}>
          <TableCell
            key={`totalAssignedStaff_title1_1`}
            align='left'
            colSpan={isShowColumn ? Number(showDateTypeColumn(data[0]?.display_type ?? 0) * 2 + 3) : Number(showDateTypeColumn(data[0]?.display_type ?? 0) + 2)}
          >
            {' '}
          </TableCell>

          <TableCell
            key={`totalAssignedStaff_title2_1`}
            align='right'
            style={{
              borderLeft: 'none',
              borderRight: '1px solid rgba(196, 196, 196, 0.4)',
              background: '#fff', zIndex: 999,
              position: 'sticky',
              // left: `${returnLeftWidth(data[0]?.display_type ?? 0)}px`,
              left: `${isShowColumn
                ? (returnLeftWidth(data[0]?.display_type ?? 0) + 115 + returnWidthOfDateType(data[0]?.display_type) * Number(data[0]?.display_type + 1))
                : returnLeftWidth(data[0]?.display_type ?? 0)}px`,
            }}>
            配置人数
          </TableCell>

          {tableHeaderTotalAssignedStaffs.map((value: any, i: number) => (
            <TableCell
              key={`totalAssignedStaff_number_staff_${String(i)}`}
              align='center'
              style={{
                borderBottom: 'none',
              }}>{value?.assigned_staffs}</TableCell>
          ))}
        </TableRow>
      )}

      {/* Blank Row */}
      {/* <TableRow className={`${classes.stickyTableCell}`} style={{ height: '20px', background: '#fff' }}>
        <TableCell style={{ height: '20px' }}>{' '}</TableCell>
      </TableRow> */}

      {/* Render date & type*/}
      <TableRow key={`header_date_type_title_tableRow1`} className={`${classes.rowOnHead} ${classes.setHeaderPosition} ${classes.setBorderLeftAndRightColor}`}>
        {tableHeaderListDate?.length > 0 && (
          <>
            <TableCell
              key={`header_date_type_title`}
              align='center'
              style={{
                color: '#000',
                borderBottom: 'none',
                background: '#fff',
                borderLeft: '1px solid #27a8e0',
                zIndex: 999,
                position: 'sticky',
                left: 0,
              }}
              colSpan={isShowColumn ? Number(showDateTypeColumn(data[0]?.display_type ?? 0) * 2 + 3) : Number(showDateTypeColumn(data[0]?.display_type ?? 0) + 2)}
              width='100px'
            >
              {' '}
            </TableCell>

            <TableCell
              key={`totalAssignedStaff_blankRow_3`}
              align='left'
              colSpan={showDateTypeColumn(data[0]?.date_type ?? 0)}
              style={{
                background: '#fff',
                borderLeft: 'none',
                borderBottom: 'none',
                borderRight: '1px solid rgba(196, 196, 196, 0.4)',
                position: 'sticky',
                zIndex: 999,
                // left: `${returnLeftWidth(data[0]?.display_type ?? 0)}px`,
                left: `${isShowColumn
                  ? (returnLeftWidth(data[0]?.display_type ?? 0) + 115 + returnWidthOfDateType(data[0]?.display_type) * Number(data[0]?.display_type + 1))
                  : returnLeftWidth(data[0]?.display_type ?? 0)}px`,
              }}
            >
              {' '}
            </TableCell>
          </>
        )}

        {tableHeaderListDate?.length > 0 && tableHeaderListDate?.map((col: any, i: number) => (
          <TableCell
            key={`header_date_type_title_${String(i)}`}
            align={col.alignCenterTitle ? 'center' : col.align}
            className={classes.tableTh}
            width={col.width ?? 'auto'}
          >
            {moment(col?.date ?? '').format('MM/DD')}
          </TableCell>
        ))}
      </TableRow>

      <TableRow key={`header_date_type_title_tableRow2`} className={`${classes.rowOnHead} ${classes.setHeaderPosition} ${classes.setBorderBottomColor} ${classes.setBorderLeftAndRightColor}`}>
        {tableHeaderListDate?.length > 0 && (
          <>
            <TableCell
              key={`header_date_type_title`}
              align='center'
              colSpan={2}
              style={{ backgroundColor: '#fff', color: '#000', position: 'sticky', left: 0, }}
            >
              {' '}
            </TableCell>
            {/* <TableCell
              key={`header_date_type_title_dateType1`}
              align='center'
              style={{
                background: '#fff', zIndex: 999,
                borderLeft: 'none',
                color: '#000', position: 'sticky',
              }}
            >
              {' '}
            </TableCell> */}

            {/* Render Weekday type */}
            {isShowColumn && (
              <>
                <TableCell
                  key={`header_date_type_title_dateType2`}
                  align='center'
                  style={{
                    background: '#fff', zIndex: 999,
                    borderLeft: 'none',
                    color: '#000',
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                    left: '255px', // 255 width = (140: 1st column width + 115: width of 	年間実績当直数	)
                  }}
                >
                  {data[0]?.display_type === 0 ? '平土日祝' : '平'}
                </TableCell>
                {
                  data[0]?.display_type > 0 && (
                    <TableCell
                      key={`header_date_type_title_dateType3`}
                      align='center'
                      style={{
                        background: '#fff', zIndex: 999,
                        borderLeft: 'none',
                        color: '#000',
                        whiteSpace: 'nowrap',
                        minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                        left: `${255 + returnWidthOfDateType(data[0]?.display_type)}px`,
                      }}
                    >
                      {data[0]?.display_type === 1 ? '土日祝' : '土'}
                    </TableCell>
                  )
                }
                {
                  data[0]?.display_type > 1 && (
                    <TableCell
                      key={`header_date_type_title_dateType4`}
                      align='center'
                      style={{
                        background: '#fff', zIndex: 999,
                        borderLeft: 'none',
                        color: '#000',
                        whiteSpace: 'nowrap',
                        minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                        left: `${255 + (returnWidthOfDateType(data[0]?.display_type) * 2)}px`,
                      }}
                    >
                      {data[0]?.display_type === 2 ? '日祝' : '日'}
                    </TableCell>
                  )
                }
                {
                  data[0]?.display_type > 2 && (
                    <TableCell
                      key={`header_date_type_title_dateType5`}
                      align='center'
                      style={{
                        background: '#fff', zIndex: 999,
                        borderLeft: 'none',
                        color: '#000',
                        minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                        left: `${255 + (returnWidthOfDateType(data[0]?.display_type) * 3)}px`,
                      }}
                    >
                      {'祝'}
                    </TableCell>
                  )
                }
                <TableCell
                  key={`header_date_type_title_dateType1`}
                  align='center'
                  style={{
                    background: '#fff', zIndex: 999,
                    borderLeft: 'none',
                    color: '#000', position: 'sticky',
                    left: `${255 + (returnWidthOfDateType(data[0]?.display_type) * Number(data[0]?.display_type + 1))}px`,
                  }}
                >
                  {' '}
                </TableCell>

                {/* Render Weekday type */}
              </>
            )}

            <TableCell
              key={`header_date_type_title_dateType2`}
              align='center'
              style={{
                background: '#fff', zIndex: 999,
                borderLeft: 'none',
                color: '#000',
                whiteSpace: 'nowrap',
                position: 'sticky',
                minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                left: `${isShowColumn ?
                  (230 + (returnWidthOfDateType(data[0]?.display_type) * (data[0]?.display_type + 1)) + 115)
                  : 230}px`, // 230 width = (140: 1st column width + 90: 2nd column width)
              }}
            >
              {data[0]?.display_type === 0 ? '平土日祝' : '平'}
            </TableCell>
            {
              data[0]?.display_type > 0 && (
                <TableCell
                  key={`header_date_type_title_dateType3`}
                  align='center'
                  style={{
                    background: '#fff', zIndex: 999,
                    borderLeft: 'none',
                    color: '#000',
                    whiteSpace: 'nowrap',
                    minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                    // left: `${230 + returnWidthOfDateType(data[0]?.display_type)}px`,
                    left: `${isShowColumn ?
                      (230 + (returnWidthOfDateType(data[0]?.display_type) * (data[0]?.display_type + 1)) + (115 + returnWidthOfDateType(data[0]?.display_type)))
                      : (230 + returnWidthOfDateType(data[0]?.display_type))}px`,
                  }}
                >
                  {data[0]?.display_type === 1 ? '土日祝' : '土'}
                </TableCell>
              )
            }
            {
              data[0]?.display_type > 1 && (
                <TableCell
                  key={`header_date_type_title_dateType4`}
                  align='center'
                  style={{
                    background: '#fff', zIndex: 999,
                    borderLeft: 'none',
                    color: '#000',
                    whiteSpace: 'nowrap',
                    minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                    // left: `${230 + (returnWidthOfDateType(data[0]?.display_type) * 2)}px`,
                    left: `${isShowColumn ?
                      (230 + (returnWidthOfDateType(data[0]?.display_type) * (data[0]?.display_type + 1)) + (115 + returnWidthOfDateType(data[0]?.display_type) * 2))
                      : (230 + (returnWidthOfDateType(data[0]?.display_type) * 2))}px`,
                  }}
                >
                  {data[0]?.display_type === 2 ? '日祝' : '日'}
                </TableCell>
              )
            }
            {
              data[0]?.display_type > 2 && (
                <TableCell
                  key={`header_date_type_title_dateType5`}
                  align='center'
                  style={{
                    background: '#fff', zIndex: 999,
                    borderLeft: 'none',
                    color: '#000',
                    minWidth: `${returnWidthOfDateType(data[0]?.display_type)}px`,
                    // left: `${230 + (returnWidthOfDateType(data[0]?.display_type) * 3)}px`,
                    left: `${isShowColumn ?
                      (230 + (returnWidthOfDateType(data[0]?.display_type) * (data[0]?.display_type + 1)) + (115 + returnWidthOfDateType(data[0]?.display_type) * 3))
                      : (230 + (returnWidthOfDateType(data[0]?.display_type) * 3))}px`,
                  }}
                >
                  {'祝'}
                </TableCell>
              )
            }
            {/* Render Weekday type */}


            <TableCell
              key={`header_date_type_title_dateType6`}
              align='center'
              style={{
                background: '#fff', zIndex: 999,
                borderLeft: 'none',
                color: '#000',
                borderRight: '1px solid rgba(196, 196, 196, 0.4)',
                position: 'sticky',
                // left: `${returnLeftWidth(data[0]?.display_type ?? 0)}px`,
                left: `${isShowColumn
                  ? (returnLeftWidth(data[0]?.display_type ?? 0) + 115 + returnWidthOfDateType(data[0]?.display_type) * Number(data[0]?.display_type + 1))
                  : returnLeftWidth(data[0]?.display_type ?? 0)}px`,
              }}
            >
              {' '}
            </TableCell>
          </>
        )}

        {tableHeaderListDate?.length > 0 && tableHeaderListDate?.map((col: any, i: number) => (
          <TableCell
            key={`header_date_type_title_${String(i)}`}
            align={col.alignCenterTitle ? 'center' : col.align}
            className={classes.tableTh}
            width={col.width ?? 'auto'}
            style={{ backgroundColor: `${(col?.label !== '祝' && col?.label !== '日' && col?.label !== '土') ? '#fff' : ((col?.label !== '祝' && col?.label !== '日') ? '#A8D08D' : '#f4c7c3')}`, color: '#000' }}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
