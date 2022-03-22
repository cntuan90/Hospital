import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '1rem',
    color: theme.palette.grey[700],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  setButton: {
    color: theme.palette.grey[600],
    borderRadius: '1px solid #000',
    width: '150px',
  },
  cssText: {
    position: 'absolute',
    width: '100%',
    top: '-60px',
    textAlign: 'center',
    '& p': {
      margin: '0',
      fontWeight: '100px',
    }
  },
  cssBoxContainer: {
    position: 'relative', width: '100%', textAlign: 'center',
  },
  cssTextField: {
    maxWidth: '400px', display: 'block',
  }
}));
export default useStyles;
