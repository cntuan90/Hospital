import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import CheckboxStatus from "./CheckboxStatus";
import { returnLeftWidth, returnWidthOfDateType, showDateTypeColumn } from "./functions";
import RowChild from "./rowChild";

export default function DataTableBody({
  classes,
  data,
  index,
  isShowColumn,
}: any) {
  return (
    <>
      {/* Blank Row */}
      <TableRow className={`${classes.setRowBodyStyle} ${classes.setBorderNone}`} style={{ height: '20px' }}>
        <TableCell
          key={`bodyCell_BlankRowHeader1_${String(index)}`}
          // colSpan={Number(showDateTypeColumn(data?.display_type ?? 0) + 2)}
          colSpan={isShowColumn ? Number(showDateTypeColumn(data?.display_type ?? 0) * 2 + 3) : Number(showDateTypeColumn(data?.display_type ?? 0) + 2)}
          style={{ background: '#fff', position: 'sticky', left: 0, }}
        >
          {" "}
        </TableCell>

        <TableCell
          key={`bodyCell_BlankRowHeader4_${String(index)}`}
          style={{
            background: '#fff', position: 'sticky',
            // left: `${returnLeftWidth(data?.display_type ?? 0)}px`,
            left: `${isShowColumn ? (returnLeftWidth(data?.display_type ?? 0) + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1)) : returnLeftWidth(data?.display_type ?? 0)}px`,
            borderLeft: 'none', borderRight: '1px solid rgba(196, 196, 196, 0.4)',
          }}
        >
          {" "}
        </TableCell>

        {data?.date_info?.length > 0 && data?.date_info.map((col: any, i: number) => (
          <TableCell
            key={`bodyCell_BlankRow_${String(index)}_${String(i)}`}
            align="center"
            style={{ background: "inherit" }}
          >
            {' '}
          </TableCell>
        ))}
      </TableRow>
      {/* Blank Row */}

      {/* Render Subtotal of Each Group */}
      <TableRow className={`${classes.setRowBodyStyle} ${classes.setBorderNone}`}>
        <TableCell
          key={`bodyCellRequiredStaffs_${data?.group_name}1_${String(index)}`}
          align="left"
          style={{
            paddingLeft: '5px',
            color: '#27a8e0',
            position: 'sticky',
            left: 0,
            background: '#fff',
            zIndex: 100,
            minWidth: '140px', //140: 1st column width
          }}
        >
          {data?.group_name || ''}
        </TableCell>

        {isShowColumn && (
          <>
            <TableCell
              key={`bodyCellRequiredStaffs_${data?.group_name}2_${String(index)}`}
              align="right"
              style={{
                paddingRight: '5px',
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 900,
                left: '140px', //140: 1st column width
              }}
            >
              {' '}
            </TableCell>
            <TableCell
              key={`bodyCellRequiredStaffs_${data?.group_name}3_${String(index)}`}
              align="right"
              colSpan={showDateTypeColumn(data?.display_type ?? 0)}
              style={{
                paddingRight: '5px',
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 900,
                left: '255px', // 140: 1st width column + 115: width of 	年間実績当直数	
              }}
            >
              {' '}
            </TableCell>
          </>
        )}

        <TableCell
          key={`bodyCellRequiredStaffs_${data?.group_name}2_${String(index)}`}
          align="right"
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 900,
            // left: '140px',
            left: `${isShowColumn
              ? (140 + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1))
              : '140'}px`,
          }}
        >
          {' '}
        </TableCell>
        <TableCell
          key={`bodyCellRequiredStaffs_${data?.group_name}3_${String(index)}`}
          align="right"
          colSpan={showDateTypeColumn(data?.display_type ?? 0)}
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 900,
            // left: '230px',
            left: `${isShowColumn
              ? (230 + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1))
              : '230'}px`,
          }}
        >
          {' '}
        </TableCell>

        <TableCell
          key={`bodyCellRequiredStaffs_${data?.group_name}4_${String(index)}`}
          align="right"
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            borderRight: '1px solid rgba(196, 196, 196, 0.4)', background: '#fff',
            position: 'sticky',
            zIndex: 10,
            // left: `${returnLeftWidth(data?.display_type ?? 0)}px`,
            left: `${isShowColumn
              ? (returnLeftWidth(data?.display_type ?? 0) + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1))
              : returnLeftWidth(data?.display_type ?? 0)}px`,
          }}
        >
          必要人数
        </TableCell>

        {data?.date_info?.length > 0 && data?.date_info.map((col: any, i: number) => (
          <TableCell
            key={`bodyCellRequiredStaffs_${col?.number_staff}_${String(index)}_${String(i)}`}
            align="center"
            style={{ background: "inherit" }}
          // style={{ background: "#FFF8EA", border: "1px solid #fff" }}
          >
            {col?.number_staff ?? '0'}
          </TableCell>
        ))}
      </TableRow>

      <TableRow className={`${classes.setRowBodyStyle}`}>
        <TableCell
          key={`bodyCellAssignedStaff_${data?.group_name}1_${String(index)}`}
          align="right"
          style={{
            background: '#fff',
            position: 'sticky',
            left: 0,
            zIndex: 10,
          }}
        >
          {" "}
        </TableCell>

        {isShowColumn && (
          <>
            <TableCell
              key={`bodyCellAssignedStaff_${data?.group_name}2_${String(index)}`}
              align="right"
              style={{
                paddingRight: '5px',
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                left: '140px',
              }}
            >
              {' '}
            </TableCell>
            <TableCell
              key={`bodyCellAssignedStaff_${data?.group_name}3_${String(index)}`}
              align="right"
              colSpan={showDateTypeColumn(data?.display_type ?? 0)}
              style={{
                paddingRight: '5px',
                borderLeft: 'none',
                background: '#fff', position: 'sticky', zIndex: 10,
                left: '255px',
              }}
            >
              {' '}
            </TableCell>
          </>
        )}

        <TableCell
          key={`bodyCellAssignedStaff_${data?.group_name}2_${String(index)}`}
          align="right"
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 10,
            // left: '140px',
            left: `${isShowColumn
              ? (140 + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1))
              : '140'}px`,
          }}
        >
          {' '}
        </TableCell>
        <TableCell
          key={`bodyCellAssignedStaff_${data?.group_name}3_${String(index)}`}
          align="right"
          colSpan={showDateTypeColumn(data?.display_type ?? 0)}
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            background: '#fff', position: 'sticky', zIndex: 10,
            // left: '230px',
            left: `${isShowColumn
              ? (230 + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1))
              : '230'}px`,
          }}
        >
          {' '}
        </TableCell>

        <TableCell
          key={`bodyCellAssignedStaff_${data?.group_name}4_${String(index)}`}
          align="right"
          style={{
            paddingRight: '5px',
            borderLeft: 'none',
            borderRight: '1px solid rgba(196, 196, 196, 0.4)',
            background: '#fff', position: 'sticky',
            zIndex: 10,
            // left: `${returnLeftWidth(data?.display_type ?? 0)}px`,
            left: `${isShowColumn
              ? (returnLeftWidth(data?.display_type ?? 0) + 115 + returnWidthOfDateType(data?.display_type) * Number(data?.display_type + 1))
              : returnLeftWidth(data?.display_type ?? 0)}px`,
          }}
        >
          配置人数
        </TableCell>

        {data?.date_info?.length > 0 && data?.date_info.map((col: any, i: number) => (
          <TableCell key={`bodyCellAssignedStaff_${col?.assigned_staffs}_${String(index)}_${String(i)}`} align="center" style={{ width: '100px' }}>
            {col?.assigned_staffs ?? '0'}
          </TableCell>
        ))}
      </TableRow>

      {/* Render Staff List Assignment */}
      {data?.list_staff_detail?.length > 0 && data?.list_staff_detail?.map((col: any, i: number) => (
        <RowChild key={`table_body_staff_detail_${String(i)}`} data={col} groupId={data.group_id} staffId={col.staff_id} classes={classes} index={i} dateType={data?.display_type} isShowColumn={isShowColumn} />
      ))}

      {/* Blank Row */}
      {/* <TableRow className={`${classes.setRowBodyStyle} ${classes.setBorderNone}`}>
        <TableCell
          key={`bodyCell_BlankRowFooter_${String(index)}`}
        >
          {" "}
        </TableCell>
      </TableRow> */}
    </>
  );
}
