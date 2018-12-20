/**
 ** 封装axios方法，利于复用 **
 **/
import router from '../router/index';
import axios from 'axios';
import {Message} from 'iview';
// 弹窗函数 *******************
const showTip = function (msg, time) {
  Message.warning({
    content: msg,
    duration: time ? time : 2
  });
};

// 设置初始参数 ****************
const http = axios.create({
  baseURL: '192.168.1.66',
  withCredentials: false,
  timeout: 10000,
});

// axios请求
const apiAxios = function (method, url, params, success, failure) {
  http({
    method: method,
    url: url,
    headers: {
      'Authorization': window.localStorage.getItem('ayan')
    },
    data: method === 'post' ? params : null,
    params: method === 'get' ? params : null
  }).then(res => {
    // 请求成功后处理
    const resData = res.data;
    if (resData.code === 1 && success instanceof Function) {
      success(resData.content);
    } else if (resData.code === 403) {
      showTip('登录超时，请重新登录！');
      window.localStorage.removeItem('ayan');
      //router.push('/login');
    } else {
      showTip(resData.msg);
      if (failure instanceof Function) {
        failure(resData);
      }
    }
  }).catch(err => {
    // 失败后的处理
    showTip('网络请求异常，请重试！');
    if (failure instanceof Function) {
      failure(err);
    }
  });
};

function setAutoSize() {
  var deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) {
    deviceWidth = 750;
  };
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
};
function get(url, params, success, failure) {
  apiAxios('get', url, params, success, failure);
}
function post(url, params, success, failure) {
  apiAxios('post', url, params, success, failure);
}
// 返回模块 *****************
export default {
  get,
  post,
  setAutoSize
};
