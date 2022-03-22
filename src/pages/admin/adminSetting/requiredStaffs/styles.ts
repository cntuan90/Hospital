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
  cssRowHeader: {
    '& th': {
      border: '1px solid rgba(196, 196, 196, 0.4)'
    }
  },
  cssRowBody: {
    '& td': {
      border: '1px solid rgba(196, 196, 196, 0.4)'
    }
  },
  cssFooter: {
    marginTop: '3rem',
    alignItems:'right',
    display:'flex',
    justifyContent:'flex-end',
  },
  cssSaveButton: {
    width: '200px', 
  },
}));
export default useStyles;
