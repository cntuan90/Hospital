import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGenerateClassName, makeStyles, StylesProvider, ThemeProvider } from '@mui/styles';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import store from './redux/store';
import globalTheme from './components/GlobalTheme';


const useStyles = makeStyles({
  root: {
    '& > *': {
      fontSize: '18px !important',
    },
  }
});

const generateClassName = createGenerateClassName({
  seed: 'App1',
});

const MainComponent = () => {
  const classes = useStyles();
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
          <SnackbarProvider
            classes={{
              root: classes.root,
            }}
            maxSnack={6}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {/* apply Normalize.css */}
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </StylesProvider>
  );
};



ReactDOM.render(
  <MainComponent />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
