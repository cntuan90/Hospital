export interface IAdminEntrySettingPostApi {
  id: number | null;
  shift_cycle_type: number;
  shift_cycle: number;
  shift_start_day: number;
  shift_start_week_day: number;
  start_accept_request_type: number;
  start_accept_request: number;
  desired_submission_deadline_type: number;
  desired_submission_deadline: number;
  calendar_start_week_day: number;
  display_type: number;
  del_flag: number;
}

  export interface IAdminEntrySettingGetApi {
      id: number;
      shift_cycle_type: number;
      shift_cycle: number;
      shift_start_day: number;
      shift_start_week_day: number;
      start_accept_request_type: number;
      start_accept_request: number;
      desired_submission_deadline_type: number;
      desired_submission_deadline: number;
      calendar_start_week_day: number;
      display_type: number;
      del_flag: number;
  }
