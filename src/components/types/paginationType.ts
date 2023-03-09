export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number | string;
  to: number;
  total: number;
  links: Link[];
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}
