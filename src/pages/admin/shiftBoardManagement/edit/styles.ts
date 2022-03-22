import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useTableStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  table: {
    tableLayout: 'fixed',
    overflowX: 'scroll',
    minWidth: '100%',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '8px',
      background: '#E5E5E5',
      borderRadius: '10px',
      marginTop: '10px',
      marginBottom: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#606060',
      borderRadius: '10px',
      height: '8px',
      width: '8px',
    },
    '& th': {
      padding: '4px 10px 4px 10px',
    },
    '& td': {
      padding: '4px 10px 4px 10px',
    },
  },
  setHeaderPosition: {
    width: '100%',
    background: '#fff',
    zIndex: 999,
    '& th': {
      padding: '5px',
      background: '#fff',
    },
    '& th:first-child': {
      left: 0,
      position: 'sticky',
      zIndex: 999,
    },
    '& td:first-child': {
      left: 0,
      position: 'sticky',
    },
  },
  setBorderTopColor: {
    '& th': {
      borderTop: '1px solid #27a8e0',
    }
  },
  setBorderBottomColor: {
    '& th': {
      borderBottom: '1px solid #27a8e0',
    }
  },
  setBorderLeftAndRightColor: {
    '& th': {
      '&:not(:first-child)': {
        borderLeft: '1px solid rgba(196, 196, 196, 0.3)',
      },
    },
    '& th:first-child': {
      borderLeft: '1px solid #27a8e0',
    },
    '& th:last-child': {
      borderRight: '1px solid #27a8e0',
    },
  },
  cssHeaderRow: {
    // width: '100%',
    // background: '#fff',
    // zIndex: 999,
    // '& th': {
    //   padding: '5px',
    //   background: '#fff',
    // },
  },
  setStyleShiftStatusClose: {
    display: 'block !important', 
    margin: 'auto', 
  },
  setStyleShiftStatusCircle: {
    display: 'block !important', 
    margin: 'auto', 
    border: '2px solid #000', 
    borderRadius: '100%', 
    color: '#fff',
    width: '18px !important',
    height: '18px !important',
  },
  tableEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
    maxWidth: '100px',
    tableLayout: 'fixed',
    textAlign: 'left',
  },
  paddingTooltip: {
    color: '#fff',
    padding: '8px',
    fontSize: '1rem !important',
    maxWidth: '300px',
    wordWrap: 'break-word',
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 500,
    letterSpacing: '1px',
    lineHeight: '1.4em',
    borderTadius: '4px',
    backgroundColor: 'rgba(96, 96, 96, 0.9)',
  },
  rowOnHead: {
    '& th': {
      background: theme.palette.primary.light, // set background date
      color: '#fff',
      padding: '0',
      minWidth: '40px'
    },
  },
  setRowBodyStyle: {
    height: '40px',
    '& td': {
      padding: '0',
      '&:not(:first-child)': {
        borderLeft: '1px solid rgba(196, 196, 196, 0.3)',
      },
    },
  },
  setBorderNone: {
    '& td': {
      border: "none",
    },
  },
  setBorderRight: {
    borderRight: '1px solid rgba(196, 196, 196, 0.4)',
  },
  tableTh: {
    background: 'inherit',
  },
  cssSaveButton: {
    width: '300px', 
    '&:disabled': {
      backgroundColor: '#e0e0e0',
      color: '#a7a7a7',
    },
  },
  cssSaveButtonSmallSize: {
    width: '100px', 
  },
  cssFooter: {
    marginTop: '2rem',
    display:'flex',
    justifyContent:'center',
  },
  cssHeaderBorder: {
    // width: '100%',
    background: 'inherit',
    left: 0,
    top: 0,
    position: 'sticky',
    zIndex: 999,
  },
  stickyTableCell: {
    '& th:first-child': {
      left: 0,
      position: 'sticky',
      zIndex: 999,
      border: 'none',
    },
    '& td:first-child': {
      left: 0,
      position: 'sticky',
    },
  },
  stickyTableFull: {
    maxHeight: '1600px',
    '& th': {
      fontSize: '16px',
    },
    '& td': {
      fontSize: '16px',
    },
  },
  setBorderTopRight: {
    '& th:last-child': {
      borderTopRightRadius: '5px',
    },
  },
  tableContainerRadiusTop: {
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  cssPopup2: {
    display: "flex", alignItems: 'center', justifyContent: "flex-start", flexDirection: 'column', width: '700px', height: '300px'
  },
  cssPopup2Checkbox: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0',
  },
  cssAddRemoveColumnBtn: {
    '&:hover': {
      cursor: 'pointer',
    },
  }
}));
export default useTableStyles;
