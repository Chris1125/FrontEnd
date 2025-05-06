import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  console.log(params)
  console.log(options)
  return request('/orders', {
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

export async function updateOrder(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/orders/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
