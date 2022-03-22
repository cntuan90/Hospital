export type SearchListType = {
  keyWord: string,
}

  export interface IRequiredStaffSettingGetApi {
      id: number;
      group_name: string;
      number_staff_monday?: any;
      number_staff_tuesday?: any;
      number_staff_wednesday?: any;
      number_staff_thursday?: any;
      number_staff_friday?: any;
      number_staff_saturday?: any;
      number_staff_sunday?: any;
      del_flag: number;
      created_by?: number;
      created_at: string;
      updated_by?: number;
      updated_at: string;
      deleted_by?: any;
      deleted_at?: any;
  }

export interface IListGroup {
    id: number;
    number_staff_monday: number;
    number_staff_tuesday: number;
    number_staff_wednesday: number;
    number_staff_thursday: number;
    number_staff_friday: number;
    number_staff_saturday: number;
    number_staff_sunday: number;
}

export interface IRequiredStaffSettingPostObj {
    listGroup: IListGroup[];
}
