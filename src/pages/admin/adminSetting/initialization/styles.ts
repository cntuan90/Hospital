import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    padding: '0 0 20px 10px',
    '& .MuiSelect-select': {
      padding: '2px 5px',
    }
  },
  lineSpace: {
    borderBottom: '1px solid rgba(196, 196, 196, 0.4)',
    width: '100%',
    margin: '10px 0',
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
  cssSaveButton: {
    // background: theme.palette.primary.light,
    width: '200px', 
  },
  cssFooter: {
    alignItems:'right',
    display:'flex',
    justifyContent:'flex-end',
  }
}));
export default useStyles;
