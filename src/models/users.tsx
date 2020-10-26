// import { getStateFromStore, getPageQuery } from '@/utils/utils'
// import { Effect, Reducer, formatMessage, history } from 'umi'
// import { login, getMe } from '@/services/users'
// import { notification } from 'antd'
// import { stringify } from 'querystring'
// import store from 'store'

// export interface UserItem {
//   id: number
//   email: string
//   password: string
//   status: number
//   role: string
//   type: number
//   lastLogin: Date
//   created_at: Date
//   updated_at: Date
//   oauthGoogleId: string
//   oauthFacebookId: string
//   fullName: string
//   description: string
//   phone: string
//   address: string
//   city: string
//   country: string
//   avatarUrl: string
//   contact_person: string
//   position: string
//   industry: string
//   tax_code: string
//   website: string
//   employee_size: string
//   provider_type: number
//   subscribed_date: Date
//   is_active_pricing_plan: Date
//   is_super: number
//   pricingPlanId: number
//   temptLogined: number
//   verify: number
// }

// export interface UserModelState {
//   currentUser?: UserItem
//   accessToken?: string
// }

// interface UserModelType {
//   namespace: string
//   state: UserModelState
//   effects: {
//     login: Effect
//     logout: Effect
//     getMe: Effect
//   }
//   reducers: {
//     saveCurrentUser: Reducer<UserModelState>
//     setAccessToken: Reducer<UserModelState>
//   }
// }

// export interface LoginParamsType {
//   email: string
//   password: string
// }

// const UsersModel: UserModelType = {
//   namespace: 'user',
//   state: {
//     currentUser: getStateFromStore('currentUser'),
//     accessToken: getStateFromStore('accessToken'),
//   },
//   effects: {
//     *login({ payload }, { call, put }) {
//       const { success, access_token: accessToken } = yield call(login, payload)
//       if (success) {
//         yield put({
//           type: 'setAccessToken',
//           payload: accessToken,
//         })
//         const { ...userInfo } = yield call(getMe)
//         if (userInfo.user.role !== 'CUSTOMER') {
//           notification.success({
//             message: formatMessage({ id: 'login.success' }),
//           })
//           const urlParams = new URL(window.location.href)
//           const params = getPageQuery()
//           let { redirect } = params as { redirect: string }
//           if (redirect) {
//             const redirectUrlParams = new URL(redirect)
//             if (redirectUrlParams.origin === urlParams.origin) {
//               redirect = redirect.substr(urlParams.origin.length)
//               if (redirect.match(/^\/.*#/)) {
//                 redirect = redirect.substr(redirect.indexOf('#') + 1)
//               }
//             } else {
//               window.location.href = '/'
//               return
//             }
//           }
//           history.replace(redirect || '/')
//         } else {
//           notification.error({
//             message: formatMessage({ id: 'login.permission' }),
//           })
//         }
//       }
//     },
//     logout() {
//       const { redirect } = getPageQuery()
//       if (window.location.pathname !== '/login') {
//         store.set('currentUser', {})
//         store.set('accessToken', null)

//         history.replace({
//           pathname: '/login',
//           search: stringify({
//             redirect: redirect || window.location.href,
//           }),
//         })
//       }
//     },
//     *getMe({}, { call, put }) {
//       const { success, ...userInfo } = yield call(getMe)
//       if (success) {
//         yield put({
//           type: 'saveCurrentUser',
//           payload: userInfo.user,
//         })
//       }
//     },
//   },
//   reducers: {
//     saveCurrentUser(state, { payload }): UserModelState {
//       store.set('currentUser', payload)
//       return {
//         ...state,
//         currentUser: payload || {},
//       }
//     },
//     setAccessToken(state, { payload }): UserModelState {
//       store.set('accessToken', payload)
//       return {
//         ...state,
//         accessToken: payload,
//       }
//     },
//   },
// }

// export default UsersModel
