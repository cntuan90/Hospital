import { Button, ButtonProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

type Props = {
  disabled: boolean
}

const useStyles = makeStyles<Theme, Props>((Theme) => ({
  root: {
    height: '50px',
    borderRadius: '999px',
    padding: '8px 3rem',
    boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    background: (props) => (props.disabled ? Theme.palette.grey[300] : ''),
    '&:disabled': {
      backgroundColor: '#e0e0e0 !important',
      color: '#a7a7a7 !important',
    },
  },
}));

const PillButton: React.FC<ButtonProps> = ({
  variant, color = 'inherit', disabled = false, children, style, className = '', onClick, ...rest
}) => {
  const classes = useStyles({ disabled });
  return (
    <Button {...rest} onClick={onClick} style={style} className={`${classes.root} ${className}`} variant={variant} color={color} disabled={disabled}>{children}</Button>
  );
};

export default PillButton;
