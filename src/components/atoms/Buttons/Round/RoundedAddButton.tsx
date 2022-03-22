import { ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const RoundedAddButton = withStyles(({ palette }) => ({
  root: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    background: palette.primary.main,
    transition: 'opacity 0.2s linear',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '14px',
      height: '2px',
      background: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '2px',
      height: '14px',
      background: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '&:hover': {
      opacity: 0.6,
    },
    '&:disabled': {
      backgroundColor: '#e0e0e0',
      color: '#a7a7a7',
    },
  },
}))(ButtonBase);
export default RoundedAddButton;
