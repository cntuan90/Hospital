import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    padding: '0 0 20px 10px',
  },
  lineSpace: {
    borderBottom: '1px solid rgba(196, 196, 196, 0.4)',
    width: '100%',
    margin: '10px 0',
  },
  indeterminateColor: {
    color: '#f50057',
  },
  selectAllText: {
    fontWeight: 500,
  },
  notchedOutline: {
    // NOTE: the legend element is a child of the notchedOutline component
    '& legend': {
      maxWidth: '1000px',
    },
  },
  selectedAll: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  cssRadioGroup: {
    '& label': {
      padding: '7px',
    },
    '& span': {
      padding: '0',
    },
    '& .MuiRadio-root': {
      paddingRight: '10px',
    }
  },
  setWidthDropdown: {
    width: '60px',
    marginRight: '5px',
  },
  setDisplayFlexStart: {
    display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
    '& label': {
      marginRight: '0',
      paddingRight: '5px',
    }
  },
  cssTitleLeft: {
    display: 'flex', alignItems: 'center', paddingLeft: '30px',
  },
  cssFlexCenter: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  cssFlexStart: {
    display: 'flex', alignItems: 'center'
  },
  cssSaveButton: {
    // background: theme.palette.primary.light,
    width: '200px', 
  },
  paddingTooltip: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // display: 'flex',
    color: '#fff',
    padding: '8px',
    fontSize: '0.7rem',
    maxWidth: '300px',
    wordWrap: 'break-word',
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 500,
    letterSpacing: '1px',
    lineHeight: '1.4em',
    borderTadius: '4px',
    backgroundColor: 'rgba(96, 96, 96, 0.9)',
  },
  tableEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // maxWidth: '400px',
    tableLayout: 'fixed',
    textAlign: 'left',
  },
  cssFooter: {
    alignItems:'right',
    display:'flex',
    justifyContent:'flex-end',
  },
  btnAddStyle: {
    transition: 'opacity 0.2s linear',
    cursor: "pointer",
    '&:hover': {
      opacity: 0.6,
    },
  },
  cssDeleteText: {
    display: 'inline-block',
    color: theme.palette.primary.light,
    cursor: 'pointer',
  },
  cssDropdown: {
    '& .MuiSelect-select MuiSelect-outlined': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },
  cssDeleteBtn: {
    width: '30px',
    height: '30px',
    borderRadius: 999,
    background: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: 'rgba(196, 196, 196, 0.4)',
      cursor: 'pointer',
    },
  },
  tableTooltipDelete: {
    position: 'absolute',
    zIndex: 10,
  },
}));
export default useStyles;
