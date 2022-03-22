import reducer from './reducer';
import * as authActions from './actions';
export interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    loginData: any;
    // drawerState: boolean,
}
export {
    authActions,
};

export default reducer;
