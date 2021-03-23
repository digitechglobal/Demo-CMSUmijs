/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';
import { history } from '@/.umi/core/history';

const codeMessage: { [status: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


const access_token: string = localStorage.getItem('access_token')
const expires_time: number =  localStorage.getItem('expires_time')
const login_time: number = localStorage.getItem('login_time')

function isAccessTokenError(): boolean {
  if (!localStorage.getItem('access_token') || !localStorage.getItem('expires_time') || !localStorage.getItem('login_time')) {
    return true
  }
  if (new Date().getTime() - login_time >= expires_time) {
    return true
  }
  return false
}

const _apiPrefix = API_PREFIX

interface FetchOptions extends RequestOptionsInit {
  url: string
  autoPrefix?: boolean
}

interface FetchResponseType {
  statusCode: number
  result: object
  error: ErrorType
  message: ErrorType
  response: object
}

interface ErrorType {
  message: any
}

const errorHandler = (error: { response: Response; data: any }): Response => {
  const { response } = error
  if (!response) {
    notification.error({
      description:
        'Mạng của bạn không bình thường và không thể kết nối với máy chủ',
      message: 'Mạng bất thường',
    })
  }
  return error.data
}

const request = extend({
  errorHandler,
  timeout: 15000,
})

interface FetchOptions extends RequestOptionsInit {
  url: string
  autoPrefix?: boolean
}

const generateUrl = (url: string, _autoPrefix = false) => {
  if (!_autoPrefix) return url
  return `${_apiPrefix}/${url}`
}

// const errorHandler = (error: { response: Response; data: any }): Response => {
//   const { response } = error
//   if (!response) {
//     notification.error({
//       description:
//         'Mạng của bạn không bình thường và không thể kết nối với máy chủ',
//       message: 'Mạng bất thường',
//     })
//   }
//   return error.data
// }

// const request = extend({
//   errorHandler,
//   timeout: 15000,
// })

export const fetch = ({
  url,
  headers,
  autoPrefix = true,
  ...options
}: FetchOptions) => {
  if (isAccessTokenError()) {
    localStorage.clear()
    history.replace(`/user/login`)
    return { success: false }
  }

  return request(generateUrl(url, autoPrefix), {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  })
    .then(response => {
      if (response) {
        const { access_token, statusCode, message } = response
        if (access_token) {
          return { ...response, success: true }
        }
        if (message) {
          notification.error({
            message: `Lỗi yêu cầu`,
            description: 'Không thể lấy dữ liệu',
          })
          return { ...response, success: false }
        }
        return { ...response }
      }
    })
    .catch(error => {
      const { message, statusCode } = error
      notification.error(message)
      return false
    })
}
//__________________________________________________________________________

export const fetchAuth = async ({
  url,
  headers,
  autoPrefix = true,
  ...options
}: FetchOptions) => {
  if (isAccessTokenError()) {
    localStorage.clear()
    history.replace(`/user/login`)
    return { success: false }
  }

  const response = await request(generateUrl(url, autoPrefix), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
    ...options,
  })

  if (response) {
    return { success: true, ...response }
  } else {
    return { success: false }
  }
}


// /** 异常处理程序 */
// const errorHandler = (error: { response: Response }): Response => {
//   const { response } = error;
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;

//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   } else if (!response) {
//     notification.error({
//       description: '您的网络发生异常，无法连接服务器',
//       message: '网络异常',
//     });
//   }
//   return response;
// };

// /** 配置request请求时的默认参数 */
// const request = extend({
//   errorHandler, // 默认错误处理
//   credentials: 'include', // 默认请求是否带上cookie
// });

export default request;
