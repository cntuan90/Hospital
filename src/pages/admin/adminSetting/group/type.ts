export interface IRowBodyType {
  groupName: string,
  listStaff: any[],
}
export interface Group {
    id: number;
    group_name: string;
}

export interface ListStaff {
    staff_id: number;
    user_name: string;
}

export interface Assignment {
    group: Group;
    list_staff: ListStaff[];
}

export interface IAdminGroupSettingGetApi {
    assignment: Assignment[];
}

export interface IListStaffGetApi {
  id: number;
  user_name: string;
}

export interface IAdminGroupSettingPostApi {
    // listGroupDelete: any[];
    assignment: Assignment[];
}