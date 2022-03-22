import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/auth/actions';
import { JwtPayloadType } from '../types/authType';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utility/browserStorageUtil';

/**
 * Check token's validity
 * if valid, set isAuth to True
 */
const useValidateToken = () => {
  const dispatch = useDispatch();
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const accessToken = getLocalStorage('accessToken');

  const decodeJwt = (token: string): JwtPayloadType => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
  };

  /**
   * companyCode from URL
   * @returns string
   */
  // const urlCompanyCode = () => {
  //   const path = window.location.pathname;
  //   return path.split('/')[1];
  // };

  /**
   * Make sure user doesn't change companyCode in URL after logged in
   * @returns boolean
   */
  // const checkCompanyCode = () => {
  //   const urlCompCode = urlCompanyCode();
  //   const { companyCode } = decodeJwt(accessToken);

  //   return urlCompCode !== companyCode;
  // };

  /**
   * Fetch API to validate accessToken from localStorage
   */
  const validate = async (tokenToValidate: string) => {
    if (isTokenChecked) return;
    try {
      if (!tokenToValidate) throw new Error();
      // if (checkCompanyCode()) throw new Error();

      const res = decodeJwt(tokenToValidate);

      setLocalStorage('accessToken', tokenToValidate);
      // setSessionStorage('companyCode', companyCode);

      dispatch(setIsAuth(true));
    } catch (error) {
      if (!getLocalStorage('accessRefreshToken')) {
        removeLocalStorage('accessToken');
        // removeLocalStorage('staffId');
        // removeLocalStorage('user');
      }
      // removeLocalStorage('accessRefreshToken');
      // removeLocalStorage('expiredToken');
    } finally {
      setIsTokenChecked(true);
    }
  };

  useEffect(() => {
    validate(accessToken);
  }, [isTokenChecked]);

  return {
    isTokenChecked,
  };
};

export default useValidateToken;
