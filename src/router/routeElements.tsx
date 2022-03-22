import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Redirect, Route, Switch } from "react-router-dom";
import { privateRoutesForAdmin, privateRoutesForStaff, publicRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import { flattenRouteArr } from "./routeMethods";
import SidebarWrapperTemplate from "../components/templates/SidebarWrapperTemplate";
import { getLocalStorage } from "../utility/browserStorageUtil";

/**
 * Render list of public Routes.
 * @returns JSX.Element[]
 */
export const renderPublicRoutes = () =>
  publicRoutes.map(({ path, ...rest }, i) => {
    if (!rest.hasAppbar)
      return (
        <Route key={path + String(i)} exact path={path} {...rest}>
          <rest.loadComponent />
        </Route>
      );
    return (
      <Route key={path + String(i)} exact path={path} {...rest}>
        <Box position="relative">
          {/*#CUSTOMIZE: PUT your app-bar,side-bar here */}
          <h1>AppBar here</h1>
          <Box paddingTop={10} paddingX={4}>
            <rest.loadComponent />
          </Box>
        </Box>
      </Route>
    );
  });

/**
 * Return a PrivateRoutes wrapper with a list of Routes inside.
 * @returns JSX.Element
 */
export const renderPrivateRoutes = () => {
  const userType = getLocalStorage('userType');

  const getStyle = (path: string) => ({
    minHeight: "100%",
    backgroundColor: "#FFF",
    width: "100%",
    overflow: "auto",
  });

  return (
    <PrivateRoute path="/">
      <Switch>
        {userType !== '0' ? (
          flattenRouteArr(privateRoutesForAdmin).map(
            ({ path, title, hasAppbar = true, hasTitle = true, ...rest }) => (
              <Route key={path} path={path} exact={true} {...rest}>
                <>
                  <Box position="relative">
                    {/* <div
                      style={{
                        height: "50px",
                        backgroundColor: "#000",
                        minWidth: "100%",
                      }}
                    ></div> */}
                    {/*#CUSTOMIZE: PUT your app-bar,side-bar here */}
                    <SidebarWrapperTemplate>
                      <Box style={getStyle(path)}>
                        {hasTitle && (
                          <div style={{ padding: "8px", minHeight: "40px" }}>
                            <Typography variant="h5">{title}</Typography>
                          </div>
                        )}
                        <rest.loadComponent />
                      </Box>
                    </SidebarWrapperTemplate>
                  </Box>
                </>
              </Route>
            )
          )
        ) : (
          flattenRouteArr(privateRoutesForStaff).map(
            ({ path, title, hasAppbar = true, hasTitle = true, ...rest }) => (
              <Route key={path} path={path} exact={true} {...rest}>
                <>
                  <Box position="relative">
                    {/* <div
                      style={{
                        height: "50px",
                        backgroundColor: "#000",
                        minWidth: "100%",
                      }}
                    ></div> */}
                    {/*#CUSTOMIZE: PUT your app-bar,side-bar here */}
                    <SidebarWrapperTemplate>
                      <Box style={getStyle(path)}>
                        {hasTitle && (
                          <div style={{ padding: "8px", minHeight: "40px" }}>
                            <Typography variant="h5">{title}</Typography>
                          </div>
                        )}
                        <rest.loadComponent />
                      </Box>
                    </SidebarWrapperTemplate>
                  </Box>
                </>
              </Route>
            )
          )
        )}

        {/* If not match, redirect to login */}
        <Redirect to="/login" />
      </Switch>
    </PrivateRoute>
  );
};
