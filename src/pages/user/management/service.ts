import { request } from '@umijs/max';
import { TableListItem } from './data';

export async function pageList(
  params: { current?: number; pageSize?: number },
  options?: { [key: string]: any },
) {
  return request('/user/list', {
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

export interface UserAddParams {
  username: string;
  password: string;
  name: string;
  mobile: string;
}

export async function add(data: UserAddParams, options?: { [key: string]: any }) {
  console.log("addUser: ", data)
  return request('/user/add', {
    data,
    method: 'POST',
    ...(options || {}),
    requestInterceptors: [],
  }).then(function (response) {
    return { data: response };
  });
}

export async function updateOrder(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/user/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
