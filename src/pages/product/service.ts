import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request('/product/list', {
    params,
    method: 'GET',
    ...(options || {}),
  }).then(function (response) {
    const d = response.data;
    return {
      data: d.records,
      total: d.total,
    };
  });
}

export async function add(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/product/', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/product/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function remove(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/product/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
