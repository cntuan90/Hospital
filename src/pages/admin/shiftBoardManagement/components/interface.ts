import React from 'react';
import useTableStyles from '../edit/styles';

export interface DataTableColumn extends HeadCell {
  content: (row: any, index: number, order: number) => React.ReactElement,
  width?: string
  alignCenterTitle?: boolean
}
export interface DataTableProps {
  data: any[]
  // columns?: DataTableColumn[]
  tableHeaderListDate: any[]
  nonDataText?: string
  rowsPerPageOptions?: number[],
  cospen?: any[];
  isCustomerTable?: boolean,
  // isSticky?: boolean,
  widthTable?: string,
  rowColor?: string,
  haveBorderRight?: boolean;
  hasTableHeader?: boolean;
  firstColumnWidth?: string;
}
export interface DataTableToolbarProps {
  numSelected: number;
}

export interface DataTableHeadProps {
  classes: ReturnType<typeof useTableStyles>;
  haveBorderRight?: boolean;
  isShowColumn?: boolean;
  // firstColumnWidth?: string;
  data?: any[];
  tableHeaderListDate: any[];
  tableHeaderTotalAssignedStaffs: any[];
}

export interface HeadCell {
  disablePadding?: 'checkbox' | 'default' | 'none';
  id: string;
  label?: string;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
}
