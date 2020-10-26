// import { fetch, fetchAuth } from '@/utils/request'
// import { LoginParamsType } from '@/models/users'

// const routes = {
//   login: 'auth/login',
//   register: 'auth/register',
//   resetPassword: 'auth/reset-password',
//   getMe: 'user/cms-me',
// }

// export function login(data: LoginParamsType) {
//   return fetch({
//     url: routes.login,
//     method: 'POST',
//     data,
//   })
// }

// export function register(data) {
//   return fetchAuth({
//     url: routes.register,
//     method: 'POST',
//     data,
//   })
// }

// export function resetPassword(data) {
//   return fetchAuth({
//     url: routes.resetPassword,
//     method: 'POST',
//     data,
//   })
// }

// export function getMe() {
//   return fetchAuth({
//     url: routes.getMe,
//     method: 'GET',
//   })
// }

import { fetch, fetchAuth } from '@/utils/request' // fetchAuth
import { LoginParamsType } from '@/models/usersFake'

const routes = {
  login: 'api/users/login2',
  register: 'auth/register',
  resetPassword: 'auth/reset-password',
  getMe: 'api/users'
}

export function login(data: LoginParamsType) {
  return fetch({
    url: routes.login,
    method: 'POST',
    data,
  })
}

export function register(data) {
  return fetchAuth({
    url: routes.register,
    method: 'POST',
    data,
  })
}

export function resetPassword(data) {
  return fetchAuth({
    url: routes.resetPassword,
    method: 'POST',
    data,
  })
}

export function getMe() {
  return fetchAuth({
    url: routes.getMe,
    method: 'GET',
  })
}
