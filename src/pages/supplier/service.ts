import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request('/suppliers', {
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

export async function addSupplier(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/suppliers/update', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateOrder(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/suppliers/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function deleteSupplier(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/suppliers/update', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}