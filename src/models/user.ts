import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers, queryCurrentUser } from '@/services/user';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {

    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // Hàm chờ lấy user infomation để set xuống redux store
    *fetchCurrent(_, { call, put }) {
      // Gọi qua service user xử lý api lấy user infomation về
      const response = yield call(queryCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {

    // Lưu user infomation xuống store của redux
    saveCurrentUser(state, action) {
      // Vì thằng umi cần đúng 1 trường name của mình để hiển thị cái tên trên góc phải màn hình
      // Nên phải structure lại response trả về từ api rồi mới lưu xuống store của redux
      // Trường name sẽ được gọi trong HeaderDropdown component
      const formatUser = {
        ...action.payload,
        name: action.payload.firstName
      }
      return {
        ...state,
        currentUser: formatUser || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
