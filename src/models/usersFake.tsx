import { getStateFromStore, getPageQuery } from '@/utils/utils'
import { Effect, Reducer, formatMessage, history } from 'umi'
import { login, getMe } from '@/services/users'
import { notification } from 'antd'
import { stringify } from 'querystring'
import store from 'store'

export interface UserItem {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  gender: string
  number: string
}

export interface UserModelState {
  currentUser?: UserItem
  accessToken?: string
}

interface UserModelType {
  namespace: string
  state: UserModelState
  effects: {
    login: Effect
    logout: Effect
    getMe: Effect
  }
  reducers: {
    saveCurrentUser: Reducer<UserModelState>
    setAccessToken: Reducer<UserModelState>
  }
}

export interface LoginParamsType {
  email: string
  password: string
}

const UsersModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: getStateFromStore('currentUser'),
    accessToken: getStateFromStore('accessToken'),
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { success, token, data } = yield call(login, payload)
      console.log("*login -> data", data)
      if (success == '1') {
        yield put({
          type: 'setAccessToken',
          payload: token,
        })
        yield put({type: 'saveCurrentUser', payload: data,})
        // const { ...userInfo } = yield call(getMe)
        // if (!success) {
          notification.success({
            message: formatMessage({ id: 'login.success' }),
          })
          const urlParams = new URL(window.location.href)
          const params = getPageQuery()
          let { redirect } = params as { redirect: string }
          if (redirect) {
            const redirectUrlParams = new URL(redirect)
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length)
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1)
              }
            } else {
              window.location.href = '/'
              return
            }
          }
          history.replace(redirect || '/')
        // } else {
        //   notification.error({
        //     message: formatMessage({ id: 'login.permission' }),
        //   })
        // }
      }
    },
    logout() {
      const { redirect } = getPageQuery()
      if (window.location.pathname !== '/login') {
        store.set('currentUser', {})
        store.set('accessToken', null)

        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: redirect || window.location.href,
          }),
        })
      }
    },
    *getMe({ payload }, { call, put })  {
      const { success, ...userInfo } = yield call(login, payload)
      console.log("*getMe -> ...userInfo", ...userInfo)
      // if (!success) {
      //   yield put({
      //     type: 'saveCurrentUser',
      //     payload: userInfo.data, //
      //   })
      // }
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }): UserModelState {
      console.log("saveCurrentUser -> payload", payload)
      store.set('currentUser', payload)
      return {
        ...state,
        currentUser: payload || {},
      }
    },
    setAccessToken(state, { payload }): UserModelState {
      console.log("setAccessToken -> payload", payload)
      store.set('accessToken', payload)
      return {
        ...state,
        accessToken: payload,
      }
    },
  },
}

export default UsersModel
