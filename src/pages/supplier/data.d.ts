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
  records: TableListItem[];
};

export type TableListItem = {
  id: number;
  supplierName: string;
  supplierCode: string;
  createTime: string;
  updateTime: string;
  status: number;
};
