/* eslint-disable no-nested-ternary */
import React from "react";
import clsx from "clsx";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from "@material-ui/core/Checkbox";
import { DataTableHeadProps } from "./interface";
import useTableStyles from "./styles";

export default function DataTableHead({
  order,
  orderBy,
  columns,
  setHeaderColor,
  onSelectAllClick,
  showDeleteAndCheckBoxIcon,
  numSelected, rowCount, selectedPageStatus
}: DataTableHeadProps) {
  const classes = useTableStyles();
  return (
    <TableHead>
      <TableRow
        className={classes.tableHead}
        style={{ background: `${setHeaderColor}` }}
      >
        {showDeleteAndCheckBoxIcon && (
          <TableCell padding="checkbox" className={classes.widthTableHead}>
            <Checkbox
              className={classes.tableTh}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={selectedPageStatus}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
              disabled={rowCount === 0}
            />
          </TableCell>
        )}

        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.alignCenterTitle ? "center" : col.align}
            padding={col.disablePadding ?? "normal"}
            sortDirection={orderBy === col.id ? order : false}
            className={`${clsx(classes.tableTh)}`}
            width={col.width ?? "auto"}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
