import { ReactNode } from "react";

export interface subMenuTypes {
  name: string;
  type: string;
  icon: ReactNode;
  action_type: string;
  text_color: string;
  modal_name: string;
  is_multiple: boolean;
}
export interface timeStamps {
  created_at: string | null | undefined;
  updated_at: string | null | undefined;
}
export interface docketBankqueryParams extends queryParams {
  tag?: string;
}
export interface queryParams {
  page: string | number;
  items?: number;
  search?: string;
  type?: string;
}
