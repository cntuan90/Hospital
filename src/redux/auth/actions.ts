// actions auth here

export const types = {
    SET_IS_AUTH: 'SET_IS_AUTH' as const,
    SET_LOADING: 'SET_LOADING' as const,
    SET_LOGIN_DATA: 'SET_LOGIN_DATA' as const,
    // SET_DRAWER_STATE: 'SET_DRAWER_STATE' as const,
};

export const setIsAuth = (payload: boolean) => ({
    type: types.SET_IS_AUTH,
    payload,
  });

export const setLoading = (payload: boolean) => ({
    type: types.SET_LOADING,
    payload,
});
export const setLoginData = (payload: any) => ({
    type: types.SET_LOGIN_DATA,
    payload,
});

// export const setDrawerStateRedux = (drawerState:boolean) => ({
//     type: types.SET_DRAWER_STATE,
//     payload: drawerState,
//   });

export type Actions = (
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setLoginData>
    // | ReturnType<typeof setDrawerStateRedux>
);
