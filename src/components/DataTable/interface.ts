import React from 'react';

export interface DataTableColumn extends HeadCell {
  content: (row: any, index: number, order: number) => React.ReactElement,
  width?: string
  alignCenterTitle?: boolean
}
export interface DataTableProps {
  data: any[]
  columns: DataTableColumn[]
  setHeaderColor?: string
  onItemSelect?: (selected: number[]) => void
  onItemSelectAll?: (selected: number[]) => void;
  onItemDelete?: () => void
  selectedRowsIndex?: number[]
  setFullRow?: number
  showDeleteAndCheckBoxIcon?: boolean
  nonDataText?: string
  rowsPerPageOptions?: number[],
  isSelectedRowCheckBox?: boolean,
  isSelectedOnlyRowCheckBox?: boolean,
  showPagination?: boolean,
  showTablePagination?: boolean,
  isSelectedOnlyCheckBox?: boolean,
  cospen?: any[];
  isOnlyShowCheckIcon?: boolean
  isCustomerTable?: boolean,
  isSticky?: boolean,
  haveBorderRight?: boolean,
  haveBorderRightWithDeleteCheckbox?: boolean,
  isTableLogoSetting?: boolean,
  widthTable?: string,
  rowColor?: string,
  hasBorderNotForCheckBox?: boolean,
  hidePaginationBox?: boolean,
}
export interface DataTableToolbarProps {
  numSelected: number;
}

export interface DataTableHeadProps extends Pick<DataTableProps, 'columns' | 'showDeleteAndCheckBoxIcon' | 'isSelectedOnlyCheckBox' | 'isOnlyShowCheckIcon'> {
  // classes: ReturnType<typeof useTableStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  setHeaderColor?: string;
  orderBy: string;
  rowCount: number;
  selectedPageStatus: boolean;
  isSticky: boolean;
  haveBorderRight: boolean;
  haveBorderRightWithDeleteCheckbox: boolean;
  hasBorderNotForCheckBox?: boolean;
  isHaveData: boolean;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding?: 'checkbox' | 'default' | 'none';
  id: string;
  label: string;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
}
