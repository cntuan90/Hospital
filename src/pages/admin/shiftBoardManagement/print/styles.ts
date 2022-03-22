import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    padding: '2rem',
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
    width: '250px',
    height: '40px',
    margin: '1rem 1rem 1rem 0',
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
    marginTop: '2rem',
    display:'flex',
    justifyContent:'center',
  }
}));
export default useStyles;
