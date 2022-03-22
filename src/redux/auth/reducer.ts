import { AuthState } from '.';
import { Actions, types } from './actions';

// const matches = window.innerWidth > 1024;
const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    loginData: null,
    // drawerState: matches,
}

const reducer = (state = initialState, actions: Actions) => {
    const newState = { ...state };
    switch (actions.type) {
        case 'SET_LOADING':
            newState.isLoading = actions.payload;
            return newState;

        // case types.SET_DRAWER_STATE:
        //     return {
        //         ...state,
        //         previosDrawerState: state.drawerState,
        //         drawerState: actions.payload,
        //     };
        
        case types.SET_IS_AUTH:
            newState.isAuth = actions.payload;
            return newState;
        
            case types.SET_LOGIN_DATA:
                newState.loginData = actions.payload;
                return newState;
            
        default:
            return state;
    }
}

export default reducer;