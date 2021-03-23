import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  // console.log("🚀 ~ file: login.ts ~ line 11 ~ fakeAccountLogin ~ params", params)
  return request(API_PREFIX + '/auth/login', {
    method: 'POST',
    data: params,
  });
}
