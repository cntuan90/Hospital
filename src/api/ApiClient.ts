import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utility/browserStorageUtil';
// import { refreshToken } from './authApi';

type QueryObject = { [key: string]: string | number | boolean }

// const domainUrl = process.env.REACT_APP_API_BASE_URL;
const domainUrl = 'https://stg-demo.tochok.jp';
const refreshTokenUrl = '/oauth/token';
// const validateStatus = (status: number) => status < 500;

// Status to check is calling api to refresh token
let refreshTokenRequest: any = null;
export default class ApiClient {
  /**
   * GETリクエスト
   *
   * @param url リクエストURL
   * @param params GETパラメータ
   */
  static async get(
    url: string, params: object, query?: undefined | { [key: string]: string } | string,
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url;
    if (typeof query === 'string') {
      requestUrl = `${url}?${query}`;
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders(),
      // validateStatus,
      // @see https://github.com/axios/axios/issues/86#issuecomment-311788525
      data: {},
    });

    return response;
  }

  static async getV2(
    url: string, params: object, query?: undefined | { [key: string]: string } | string,
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query, { arrayFormat: 'repeat' })}` : url;
    if (typeof query === 'string') {
      requestUrl = `${url}?${query}`;
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders(),
      // validateStatus,
      // @see https://github.com/axios/axios/issues/86#issuecomment-311788525
      data: {},
    });

    return response;
  }

  static async getNoAuthV2(
    url: string,
  ): Promise<AxiosResponse> {
    const response = await axios.get(domainUrl + url, {});

    return response;
  }

  /**
   * GETリクエスト
   * 自分のドメインのURLにリクエストを投げる
   *
   * @param url リクエストURL
   * @param params GETパラメータ
   */

  /**
   * GETリクエスト
   * 自分のドメインのURLにリクエストを投げる
   *
   * @param url リクエストURL
   * @param params GETパラメータ
   */

  static async getDownloadFile(
    url: string, params: object, query?: undefined|{[key: string]: string}|string,
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url;
    if (typeof query === 'string') {
      requestUrl = `${url}?${query}`;
    }
    const response = await axios.get(domainUrl + requestUrl, {
      params,
      headers: await this.getHeaders(),
      // validateStatus,
      // @see https://github.com/axios/axios/issues/86#issuecomment-311788525
      data: {},
      responseType: 'blob',
    });
    return response;
  }

  /**
   * POSTリクエスト
   *
   * @param url リクエストURL
   * @param params リクエストパラメータ
   */
  static async post(url: string, query: QueryObject, params: any, appendUrl?: string): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}${appendUrl || ''}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const param = this.convertToPostData(params, undefined, undefined);
    const response = await axios.post(domainUrl + requestUrl, param, config);
    return response;
  }

  /**
   * POSTリクエスト(ログイン履歴用)
   *
   * @param url リクエストURL
   * @param params リクエストパラメータ
   */

  static async postJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.post(domainUrl + requestUrl, params, config);
    return response;
  }

  static async postJsonDataArr(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query, { arrayFormat: 'repeat' })}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.post(domainUrl + requestUrl, params, config);
    return response;
  }

  static async putJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.put(domainUrl + requestUrl, params, config);
    return response;
  }

  static async putJsonDataArr(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query, { arrayFormat: 'repeat' })}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.put(domainUrl + requestUrl, params, config);
    return response;
  }


  static async patchJsonDataArr(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };

    const response = await axios.patch(domainUrl + requestUrl, params, config);
    return response;
  }


  static async put(url: string, query: QueryObject, params?: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axios.put(domainUrl + requestUrl, params, config);
    return response;
  }

  static async putMutipartData(
    url: string, query: QueryObject, params: any,
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
      // validateStatus,
    };
    const form = new FormData();
    const param = this.convertToPostData(params, form, undefined);
    const response = await axios.put(domainUrl + requestUrl, param, config);
    return response;
  }

  static async postMutipartData(
    url: string, query: QueryObject, params: any,
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
      // validateStatus,
    };
    const form = new FormData();
    const param = this.convertToPostData(params, form, undefined);
    const response = await axios.post(domainUrl + requestUrl, param, config);
    return response;
  }

  /**
   * POSTリクエスト
   *
   * @param url リクエストURL
   * @param params リクエストパラメータ
   */
  // static async postOriginalData(url: string, query: QueryObject, params: any):
  // Promise<AxiosResponse> {
  //   const requestUrl = `${url}?${stringify(query)}`;

  /**
   * DELETE
   *
   * @param url
   * @param params
   */
  static async delete(url: string, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${typeof (params) === 'string' ? params : stringify(params)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axios.delete(domainUrl + requestUrl, config);
    return response;
  }

  static async deleteBody(url: string, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
      data: params,
    };
    const response = await axios.delete(domainUrl + requestUrl, config);
    return response;
  }

  static async postFile(
    url: string, query: QueryObject, fileKey: string, file: File,
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const formData = new FormData();
    formData.append(fileKey, file);
    const response = await axios.post(domainUrl + requestUrl, formData, config);
    return response;
  }

  /**
   * CSVファイルダウンロード
   */
  static async downloadCsv(url: string, params: object, downloadFileName: string, query?: string) {
    const response = await this.get(url, params, query);
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, response.data], {
      type: 'text/csv',
    });
    saveAs(blob, downloadFileName);
  }

  static async downloadExcel(url: string, query: QueryObject, downloadFileName: string) {
    const requestUrl = `${url}?${stringify(query)}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      responseType: 'blob',
    };
    const response = await axios.get(domainUrl + requestUrl, config);

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
    });
    saveAs(blob, downloadFileName);
    return response;
  }

  static async downloadExcelV2(url: string, query: QueryObject, downloadFileName: string) {
    const requestUrl = `${url}?${stringify(query, { arrayFormat: 'repeat' })}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      responseType: 'blob',
    };
    const response = await axios.get(domainUrl + requestUrl, config);

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
    });
    saveAs(blob, downloadFileName);
    return response;
  }

  static async downloadExcelJsonData(url: string, params: QueryObject, downloadFileName: string, query?: any) {
    const requestUrl = `${url}?${stringify(query)}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      responseType: 'blob',
      data: params,
    };
    const response = await axios.post(domainUrl + requestUrl, params, config);

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
    });
    saveAs(blob, downloadFileName);
    return response;
  }

  static async downloadToLocal(url: string, params: object, downloadFileName: string, query?: string) {
    const response = await axios.get(domainUrl + url, {
      headers: await this.getHeaders('application/json'),
      responseType: 'blob',
      params: query,
    });

    return response;
  }

  static async downloadCsvBody(url: string, params: QueryObject, downloadFileName: string, query?: string) {
    const response = await this.postJsonData(url, params, query);
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, response.data], {
      type: 'text/csv',
    });
    saveAs(blob, downloadFileName);
  }

  static async downloadCsvPostRequest(url: string, params: QueryObject, downloadFileName: string, query?: any) {
    const response = await this.postJsonData(url, params, query);
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, response.data], {
      type: 'text/csv',
    });
    saveAs(blob, downloadFileName);
  }

  /**
   * CSVファイルダウンロード
   */
  static async downloadOriginalCsv(url: string, query: string | undefined, downloadFileName: string) {
    const response = await this.get(url, {}, query);
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, response.data], {
      type: 'text/csv',
    });
    saveAs(blob, downloadFileName);
  }

  static async downloadOriginalPdf(url: string, query: object, downloadFileName: string) {
    const response = await this.getDownloadFile(url, query, undefined);
    saveAs(response.data, downloadFileName);
  }

  /**
   * headersを取得
   */
  private static async getHeaders(contentType: string = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      authorization: await this.getToken(),
    };
  }

  /**
   * accessTokenを取得
   */
  private static async getToken() {
    // Check token expired moment(targetDay).utcOffset(9).format('YYYY-MM-DD')
    const timeNow = moment().utcOffset(9).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const expiredToken = getLocalStorage('expiredToken');
    const isTokenExpired = expiredToken ? moment(expiredToken).isBefore(timeNow, 'minutes') : false; // check token is expired
    if (isTokenExpired) {
      refreshTokenRequest = refreshTokenRequest || this.refreshToken();
      const accessToken = await refreshTokenRequest;
      refreshTokenRequest = null;
      return `Bearer ${accessToken}`;
    }
    const accessToken = getLocalStorage('accessToken');
    return `Bearer ${accessToken}`;
  }

  private static async refreshToken(): Promise<string> {
    try {
      const refreshToken = getLocalStorage('accessRefreshToken');
      const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };
      const response = await axios.post(domainUrl + refreshTokenUrl, stringify({ refreshToken }), config);
      setLocalStorage('expiredToken', moment().utcOffset(9).add(Math.floor(Number(response?.data?.expiresIn || 0) / 60), 'minutes').format('YYYY-MM-DD HH:mm:ss'));
      setLocalStorage('accessToken', response?.data?.accessToken);
      setLocalStorage('accessRefreshToken', response?.data?.refreshToken);
      return response?.data?.accessToken || '';
    } catch (error) {
      removeLocalStorage('accessToken');
      removeLocalStorage('accessRefreshToken');
      removeLocalStorage('expiredToken');
      return '';
    }
  }

  private static convertToPostData(obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams();
    let formKey;

    for (const property in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`;
          } else {
            formKey = `${namespace}.${property}`;
          }
        } else {
          formKey = property;
        }

        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object'
          && !(obj[property] instanceof File)
          && !(obj[property] instanceof Blob)) {
          this.convertToPostData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }
}
