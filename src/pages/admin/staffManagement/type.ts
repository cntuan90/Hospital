export interface IAdminGetListStaffApi {
    id: number;
    user_name_kana: string;
    email: string;
    groups: string;
}

export interface UrlParamsType {
    id: string;
}

export interface IGetStaffDetailApi {
    id: number;
    user_type: number;
    first_name: string;
    last_name: string;
    first_name_kana: string;
    last_name_kana: string;
    email: string;
    nick_name: string;
    department: string;
    position: string;
    last_login?: any;
    verify_code: number;
    date_expire?: any;
    del_flag: number;
    created_by?: any;
    created_at: string;
    updated_by?: any;
    updated_at: string;
    deleted_by?: any;
    deleted_at?: any;
}
