import { request } from '@umijs/max';

export async function login(body: USER.LoginParams, options?: { [key: string]: any }) {
  return request<USER.LoginResult>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: USER.CurrentUser;
  }>('/user/currentUser', {
    method: 'GET',
    params: { token: localStorage.getItem("token") },
    ...(options || {}),
  }).then((res) => {
    return res.data;
  });
}

export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
