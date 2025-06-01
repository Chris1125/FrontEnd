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

export type ProductListResponse = {
  productName: string;
  packingUnit: string;
  quantity: number;
};

export type TableListItem = {
  id: number;
  orderNo: number;
  buyerName: string;
  consignee: string;
  consigneeMobile: string;
  consigneeAddress: string;
  supplierId: number;
  productList: Array[ProductListResponse];
};

export type DetailItem = {
  id: number;
  orderNo: number;
  // buyerName: string;
  // consignee: string;
  // consigneeMobile: string;
  // consigneeAddress: string;
  // supplierId: number;
};
