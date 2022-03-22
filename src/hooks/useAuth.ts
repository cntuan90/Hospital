import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginApi, logoutApi } from "../api/authApi";

import {
  setIsAuth, setLoading, setLoginData,
} from '../redux/auth/actions';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utility/browserStorageUtil";

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  // const { companyCode } = useParams<{ companyCode: string }>();
  const signin = async (email: string, password: string) => {
    const params = {
      email,
      password,
    };
    try {
      // reset to default
      dispatch(setLoading(true));
      dispatch(setIsAuth(false));
      
      const data = await loginApi(params);
      
      setLocalStorage('accessToken', data?.token);
      setLocalStorage('userType', data?.user_type);
      dispatch(setLoginData(data));
      dispatch(setIsAuth(true));

      console.log(data?.user_type);
      data?.user_type === 0 ? history.push('/staffTop') : history.push('/shiftBoardManagement');
      
      // setLocalStorage('staffId', staffId);
      // setLocalStorage('user', loginCode);
      
      // BEGIN::Setting to refresh token
      // const res = await loginApi(params);
      // const {
        //   accessToken, refreshToken, expiresIn, staffId,
        // } = await loginApi(params);
        // return setInfoLogin(accessToken, refreshToken, expiresIn, staffId, loginCode);
      } catch (error:any) {
				if (error?.response?.status === 403) {
				  enqueueSnackbar('アクセス権限がありません。', { variant: 'error' });
				} else {
          enqueueSnackbar(error.response.data.messages || error.response.data.errors, { variant: 'error' });
        }
			} finally {
        dispatch(setLoading(false));
    }
  };

  const signout = async () => {
    // dispatch(setStaffDetail({
    //   staffDetail: {} as StaffDetailType,
    //   roles: {},
    // }));
    dispatch(setLoginData(null));
    // removeSessionStorage('companyCode');
    // const token = getLocalStorage('accessToken')
    await logoutApi();
    removeLocalStorage('accessToken');
    removeLocalStorage('userType');
    history.push('/login');
  };

  return {
    signin,
    // signup,
    signout,
  };
};

export default useAuth;
