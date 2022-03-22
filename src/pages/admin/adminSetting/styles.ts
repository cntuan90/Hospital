import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '10px', width: '100%',
  },
  setTextColor: {
    display: 'block',
    alignItems: 'flex-start',
    minWidth: '250px',
    '& p': {
      fontSize: '15px',
    },
    '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      alignItems: 'flex-start',
      width: '100%',
      background: theme.palette.primary.light,
      color: '#fff',
    },
    '& button': {
      alignItems: 'flex-start',
      width: '100%',
      fontSize: '17px',
      color: theme.palette.primary.light,
    }
  },
  cssSidebar: {
    flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '10px ',
    '& .MuiTabs-flexContainer':{
      minWidth: '250px',
      alignItems: 'flex-start',
    }
  }
}));
export default useStyles;
