import { Backdrop, CircularProgress, Theme } from '@mui/material';
import {createStyles, makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ScreenLoader: React.FC<{
  isLoading?: boolean;
}> = ({ children, isLoading = false }) => {
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {children}
    </>
  );
};
export default ScreenLoader;
