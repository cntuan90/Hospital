import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  cssSaveButton: {
    width: '150px',
  },
  setStyleCalendar: {
    minHeight: '480px',
    maxWidth: '500px',
    '& .MuiButtonBase-root': {
      cursor: 'default',
    },
    '& .MuiTypography-root':{
      width: '100px',
      fontSize: '24px !important',
      margin: 0,
      border: '1px solid #fff',
      color: '#fff',
      background: theme.palette.primary.light,
    },
    '& .MuiPickersCalendarHeader-switchHeader':{
      '& p':{
        position: 'none !important',
        backgroundColor: '#fff !important',
        color: '#000 !important',
      },
      // '& .Mui-disabled': {
      //   pointerEvents: 'none',
      //   cursor: 'not-allowed',
      //   opacity: '0.65',
      //   boxShadow: 'none',
      // },
    },
    '& .MuiPickersCalendarHeader-daysHeader':{
      maxHeight: 'none',
    },
    '& .MuiPickersCalendarHeader-transitionContainer':{
      display: 'flex',
      alignItem: 'center',
      justifyContent: 'center',
      border: '1px solid #fff',
      color: '#fff',
      background: '#fff',
      height: '40px !important',
      '& p' : {
        display: 'inline-block',
        width: '100%',
      },
      '& button': {
        disabled: true,
      }
    },
    '& .MuiTypography-caption':{
      padding: '5px 0',
    },
  },
  setStyleDayInCalendar: {
    '& p': {
      backgroundColor: '#fff !important',
      color: '#000 !important',
    },
    '& button:hover': {
      backgroundColor: 'inherit',
      cursor: 'default',
    },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: '#fff !important',
    },
    '& .MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItem: 'center',
      justifyContent: 'center',
    },
  },
  setStyleShiftStatusCircle: {
    display: 'block !important', 
    marginTop: '1px',
    margin: 'auto', 
    border: '2px solid #000', 
    borderRadius: '100%', 
    color: '#fff',
    width: '23px !important',
    height: '23px !important',
  },
  setStyleShiftStatusTriangle: {
    display: 'block !important', 
    margin: 'auto', 
  },
  setStyleShiftStatusClose: {
    display: 'block !important', 
    margin: 'auto', 
  },

  paddingTooltip: {
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
    display: 'inline-block',
    '& .makeStyles-setStyleCalendar-137 p': {
      fontSize: '5px',
      display: 'inline-block',
    }
  },
  tableEllipsis: {
    display: 'inline-block',
    textAlign: 'center',
    // width: '40px !important',
    width: 'auto',
    whiteSpace: 'nowrap',
    lineHeight: '16px',
    fontSize: '15px !important',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
    maxHeight: '30px',
    tableLayout: 'fixed',
  },
  setColorCalendarDay: {
    '& p': {
      color: '#b7bbbf !important',
    },
  }
}));
export default useStyles;
