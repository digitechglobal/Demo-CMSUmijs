import { Component } from 'react';
import { Effect, Reducer } from 'umi'
import store from 'store'

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface TableListItem {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  number: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface UserModelState {
  currentUser?: TableListItem
  accessToken?: string
}

// const UsersModel: UserModelType = {
  
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