import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request('/goods', {
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

export async function addGoods(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/goods/', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateGoods(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/goods/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function deleteGoods(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/goods/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
