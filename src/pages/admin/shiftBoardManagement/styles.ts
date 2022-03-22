import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  cssNameTitle: {
    color: theme.palette.primary.main,
  },
  cssRowTable: {
    fontSize: '16px !important',
  },
}));
export default useStyles;
