import { fetchAuth } from './../utils/request';
import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/');
}

// Hàm xử lý gọi api url get user info
export async function queryCurrentUser(): Promise<any> {
  // Được kế thừa từ hàm fetchAuth đã có get accessToken bên request
  // Vì hàm fetchAuth bên request lấy accessToken từ local storage được lưu khi đăng nhập
  return fetchAuth({
    url: 'user/me',
    method: 'GET',
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
