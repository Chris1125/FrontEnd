export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  name?: string;
  pageSize?: number;
  current?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type TableListPageItem = {
  current: number;
  pageSize: number;
  total: number;
  datas: TableListItem[];
};

export type TableListItem = {
  id: number;
  name: string;
  code: string;
  price: number;
  releaseTime: string;
};
