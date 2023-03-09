import { timeStamps } from "./common";

export interface bundyClockDetails extends timeStamps {
  id: number;
  bundy_clock_id: number;
  docket_id: number;
  employee_id: number;
  extra_value: string | null;
  docket_info: string | null;
}
export interface jobsiteDetails extends timeStamps {
  id?: number;
  job_site?: string;
  start_time?: string;
  end_time?: string;
  latitude?: number | string;
  longitude?: number | string;
  file?: string;
  geofence?: string | null;
  is_required_time?: boolean;
  required_time_in?: string;
  required_time_out?: string;
  visitors?: visitorsElements[];
  alert_when_sign_in_out: boolean;
  alert: boolean;
  // recipients?: visitorsElements;
  created_at: string | null | undefined;
  updated_at: string | null | undefined;
}
export interface visitorsElements {
  user_id: number;
  name: string;
  email: string;
  company_name: string;
  total_hours: string;
  sign_in_off_id: number;
  type: string;
}
export interface jobsiteRecipientsList extends timeStamps {
  id: number;
  user_type: number;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  device_type: number;
  is_active: boolean;
  receive_docket_copy: boolean;
  device_token: string;
  hash_token: string;
}
