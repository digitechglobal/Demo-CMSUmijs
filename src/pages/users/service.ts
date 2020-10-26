import { fetch, fetchAuth } from '@/utils/request'
import { LoginParamsType } from '@/models/usersFake'
import request from 'umi-request'
import { TableListItem, Login } from './data'
import { extend } from 'umi-request'
import store from 'store'

const routes = {
  getUsers: 'api/users',
  createUser: 'api/users',
  updateUser: 'api/users',
  deleteUser: 'api/users',
} 

const requestAPI = extend({
  prefix: 'http://192.168.1.3:3000',
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getToken() {
  return store.get('accessToken');
}

export function getCurrentUser() {
  return store.get('currentUser');
}

export function getUsers() {
  return fetch({
    url: routes.getUsers,
    method: 'GET',
  })
}

export function createUser(params: TableListItem) {
  console.log("createUser -> data", params)
  // return fetchAuth({
  //   url: routes.createUser,
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  //   method: 'POST',
  //   params,
  // })
  requestAPI
    .post('/api/users', {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'post',
      data: params,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function updateUser(data) {
  // return fetchAuth({
  //   url: routes.updateUser,
  //   method: 'POST',
  //   data,
  // })
  requestAPI
    .patch('/api/users', {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'patch',
      data: data,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function deleteUser(params: TableListItem) {
  // return fetchAuth({
  //   url: routes.deleteUser,
  //   method: 'DELETE',
  //   data: params,
  // })
  requestAPI
    .delete('/api/users/' + params.id, {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'delete',
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}

export async function Userlogin(params: Login) {
  console.log('Service -> here');
  requestAPI
    .post('/api/users/login2', {
      method: 'post',
      data: params,
    })
    .then(function (response) {
      console.log(response);
      console.log('Service -> data', response.data);
      store.set('currentUser', response.data);
      store.set('accessToken', response.token); //save token
    })
    .catch(function (error) {
      console.log(error);
    })
}

// export async function updateUser(params: TableListParams, token: string) {
//   return request('http://192.168.100.26:4000/api/users', {
//     method: 'POST',
//     mode: 'no-cors',
//     credentials: 'same-origin',
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       authorization: `Bearer ${token}`,
//     },
//     data: {
//       ...params,
//       method: 'update',
//     },
//   });
// }