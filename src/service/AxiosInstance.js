import axios from 'axios';
import NProgress from 'nprogress';
// To add to window  解决promise 在ie中未定义的问题
if (!window.Promise) {
  window.Promise = Promise;
}
let ccpAxios = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 60 * 1000,
  withCredentials: false,
});

NProgress.configure({
  minimum: 0.1,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    console.log('first', 123)
    NProgress.start();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) return NProgress.done();
}


ccpAxios.interceptors.request.use(
  config => {
    showFullScreenLoading();
    return config;
  },
  err => {
    return window.Promise.reject(err);
  }
);


// http response 拦截器
ccpAxios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    return response;
  },
  err => {
    tryHideFullScreenLoading();
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = 'Bad Request(400)';
          break;
        case 401:
          err.message = 'Please re-login without authorization(401)';
          break;
        case 403:
          err.message = 'Forbidden(403)';
          break;
        case 404:
          err.message = 'Not Found(404)';
          break;
        case 408:
          err.message = 'Request Timeout(408)';
          break;
        case 500:
          err.message = 'Internal Server Error(500)';
          break;
        case 501:
          err.message = 'Not Implemented(501)';
          break;
        case 502:
          err.message = 'Bad Gateway(502)';
          break;
        case 503:
          err.message = 'Service Unavailable(503)';
          break;
        case 504:
          err.message = 'Gateway Timeout(504)';
          break;
        case 505:
          err.message = 'HTTP Version Not Supported(505)';
          break;
        default:
          err.message = `Connection error(${err.response.status})!`;
      }
    } else {
      err.message = 'CCP Agent Connection failure!';
    }
    return window.Promise.reject(err);
  }
);

export default ccpAxios;
