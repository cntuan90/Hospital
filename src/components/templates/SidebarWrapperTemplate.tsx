import { Box, LinearProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { privateRoutesForAdmin } from '../../router/routes';
import Sidebar from '../organisms/Sidebar';


/**
 * Sidebar on the left.
 * All pages are rendered on the right.
 * Used in PrivateRoute.
 */
const SidebarWrapperTemplate: React.FC = ({ children }) => {
  const pageWithoutSidebar = privateRoutesForAdmin.filter((route) => route.hasAppbar === false || route.hasNotSidebar).map((r) => r.path);// url of page
  const location = useLocation();
  const { companyCode } = useParams<{ companyCode: string }>();
  // const setHeight = Number(window.innerHeight) - 50; // -50 of header height

  return (
    <Box display="flex" style={{ height: `${Number(window.innerHeight)}px` }}>
      {/* <Box display="flex" style={{ height: `${setHeight}px` }}> */}
      {pageWithoutSidebar.includes(location.pathname.replace(`/${companyCode}`, '')) ? <></> : <Sidebar />}
      <Suspense fallback={<LinearProgress />}>
        {children}
      </Suspense>
    </Box>
  );
};

export default SidebarWrapperTemplate;
