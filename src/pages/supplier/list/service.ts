import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request('/supplier/list', {
    params,
    method: 'GET',
    ...(options || {}),
  }).then(function (response) {
    const d = response.data;
    return {
      data: d.records,
      total: d.total,
      success: response.success,
    };
  });
}

export interface SupplierAddParams {
  supplierName: string;
  supplierCode: string;
  supplierId: string;
}

export async function addSupplier(data: SupplierAddParams, options?: { [key: string]: any }) {
  return request('/supplier/add', {
    data,
    method: 'POST',
    ...(options || {}),
    requestInterceptors: [],
  }).then(function (response) {
    console.log('addSupplier', response);
    return { data: response };
  });
}

export async function updateSupplier(data: SupplierAddParams, options?: { [key: string]: any }) {
  return request('/supplier/update', {
    data,
    method: 'POST',
    ...(options || {}),
    requestInterceptors: [],
  }).then(function (response) {
    console.log('addSupplier', response);
    return { data: response };
  });
}

export async function deleteSupplier(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<TableListItem>('/suppliers/update', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
