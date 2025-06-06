import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request('/supplier/account/list', {
    params,
    method: 'GET',
    ...(options || {}),
  }).then(function (response) {
    const d = response.data;
    return {
      data: d.records,
      total: d.total,
      success: true,
    };
  });
}

export interface SupplierAddParams {
  supplierName: string;
  supplierCode: string;
  supplierId: string;
}

export async function addSupplierAccount(data: SupplierAddParams, options?: { [key: string]: any }) {
  return request('/supplier/account/add', {
    data,
    method: 'POST',
    ...(options || {}),
    requestInterceptors: [],
  }).then(function (response) {
    console.log('addSupplier', response);
    return { data: response };
  });
}

export async function updateSupplierAccount(data: SupplierAddParams, options?: { [key: string]: any }) {
  return request('/supplier/account/update', {
    data,
    method: 'POST',
    ...(options || {}),
    requestInterceptors: [],
  }).then(function (response) {
    console.log('addSupplier', response);
    return { data: response };
  });
}

export async function deleteSupplierAccount(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<TableListItem>('/suppliers/account/update', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
