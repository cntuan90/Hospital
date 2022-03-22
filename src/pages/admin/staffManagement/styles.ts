import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: '1rem',
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
  cssSaveButton: {
    width: '200px', 
  },
  cssFooter: {
    alignItems:'right',
    display:'flex',
    justifyContent:'flex-end',
  },
  cssButton: {
    background: 'inherit',
    width: '220px'
  },
  cssRowTable: {
    fontSize: '16px !important',
  },
  cssNameTitle: {
    color: theme.palette.primary.main,
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
}));
export default useStyles;
