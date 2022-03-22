import { Box, CircularProgress, LinearProgress } from '@mui/material';
import moment from 'moment';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect, useParams,
} from 'react-router-dom';
import useValidateToken from './hooks/useValidateToken';
import Page403 from './pages/error/Page403';
import Page404 from './pages/error/Page404';
import { Store } from './redux/store';
import { renderPrivateRoutes, renderPublicRoutes } from './router/routeElements';

// momentの日本語設定
moment.locale('ja', {
  months: ['１月', '2月', '3月', '4月', '5月', '６月', '７月', '８月', '９月', '１０月', '１１月', '１２月'],
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

const App = () => {
  const { isLoading } = useSelector((state: Store) => state.auth);
  const { isTokenChecked } = useValidateToken();

  if (!isTokenChecked) return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <CircularProgress size={30} />
    </div>
    )
    
  return (
    <>
      {isLoading && (
        <Box position="absolute" width="100%">
          <LinearProgress />
        </Box>
      )}
      <Router>
        <Switch>
          <Route
            path="/:url*(/+)"
            exact
            strict
            render={({ location }) => (
              <Redirect to={location.pathname.replace(/\/+$/, '')} />
            )}
          />

          <Route path="/:companyCode/403">
            <Page403 />
          </Route>

          <Route path="/:companyCode/404">
            <Page404 />
          </Route>

          {renderPublicRoutes()}
          {renderPrivateRoutes()}
        </Switch>
      </Router>
    </>
  );
}

export default App;
