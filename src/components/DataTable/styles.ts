import { createStyles, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useTableStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  pagination: {
    position: 'absolute',
    zIndex: 10,
    right: '0',
    top: '0',
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
      '& li:not(:nth-child(1)):not(:nth-last-child(1)) .MuiPaginationItem-page:not(.Mui-selected)': {
        backgroundColor: '#9e9e9e',
        color: 'white',
      },
    },
  },
  bottomPagination: {
    // color: theme.palette.grey[500],
    color: '#9e9e9e',
  },
  tableContainer: {
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  table: {
    minWidth: 750,
    tableLayout: 'fixed',
  },
  tableLogoSetting: {
    minWidth: 350,
    tableLayout: 'fixed',
  },
  tableHead: {
    '& th': {
      fontSize: '18px',
    },
  },
  tableTh: {
    // color: theme.palette.grey.A400,
    '& svg': {
      color: '#000!important',
    },
  },
  tableTooltipDelete: {
    position: 'absolute',
    zIndex: 10,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableOnly: {
    borderRadius: 0,
    boxShadow: 'none',
    '& td , & th': {
      borderBottom: 'none',
    },
  },
  widthTableHead: {
    width: '5%',
  },
  stickyTableCell: {
    '& th:first-child': {
      left: 0,
      position: 'sticky',
      backgroundColor: theme.palette.primary.light,
    },
    '& td:first-child': {
      left: 0,
      position: 'sticky',
    },
    '&:not(.Mui-selected) td:first-child': {
      backgroundColor: theme.palette.background.paper,
    },
    '&.Mui-selected td:first-child': {
      backgroundColor: '#fdedf3',
    },
    '&:not(.Mui-selected):hover td:first-child': {
      backgroundColor: '#f5f5f5',
    },
  },
  stickyTableFull: {
    maxWidth: '100%',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '8px',
      background: '#E5E5E5',
      borderRadius: '10px',
      marginTop: '10px',
      marginBottom: '10px',
      overflow: 'hidden',
    },
    '&::-webkit-scrollbar-thumb:horizontal': {
      background: '#606060',
      borderRadius: '10px',
      height: '8px',
      width: '8px',
    },
  },
  stickyTableBody: {
    minWidth: '100%',
    marginBottom: '16px',
    '& thead th:nth-child(2) ': {
      left: '5%',
      position: 'sticky',
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody th:nth-child(2)': {
      left: '5%',
      position: 'sticky',
    },
    '& tbody tr:not(.Mui-selected) th:nth-child(2)': {
      backgroundColor: theme.palette.background.paper,
    },
    '& tbody tr.Mui-selected th:nth-child(2)': {
      backgroundColor: '#fdedf3',
    },
    '& tbody tr:not(.Mui-selected):hover th:nth-child(2)': {
      backgroundColor: '#f5f5f5',
    },
  },
  borderRightLineTableCell: {
    '& th': {
      '&:not(:last-child)': {
        borderRight: '1px solid rgba(0, 0, 0, 0.14)',
      },
    },
  },
  borderRightLineTableCellWithDeleteCheckbox: {
    '& th': {
      '&:not(:first-child):nth-last-child(n+3)': {
        borderRight: '1px solid rgba(0, 0, 0, 0.14)',
      },
    },
  },
  borderRightLineTableCellWithDeleteCheckboxHaveFirst: {
    '& th': {
      '&:nth-last-child(n+3)': {
        borderRight: '1px solid rgba(0, 0, 0, 0.14)',
      },
    },
  },
  borderRightTableCell: {
    '& th': {
      '&:not(:first-child):not(:last-child)': {
        borderRight: '1px solid rgba(0, 0, 0, 0.14)',
      },
    },
  },
  hidePagiBox: {
    display: 'none',
  },
}));

export default useTableStyles;
