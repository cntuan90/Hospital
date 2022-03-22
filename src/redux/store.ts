import { createStore, combineReducers } from 'redux';
import auth, { AuthState } from './auth';

export interface Store {
    auth: AuthState
}

export default createStore(combineReducers<Store>({
    auth
}));
