
/**
 ** 封装axios方法，利于复用 **
 **/

import Qs from 'qs' //POST时 将参数转换为query参数
import axios from 'axios';
import store from '../store'
import {Message} from 'iview';
// 弹窗函数 *******************
const showTip = function (msg, time) {
  Message.warning({
    content: msg,
    duration: time ? time : 2
  });
};

// 设置初始参数 ****************
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api';
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    let contentType = 'application/json;charset=UTF-8'
    if(url == '/login'){
      data = Qs.stringify(data);
      contentType = 'application/x-www-form-urlencoded'
    }
    axios.post(url, data, {headers: {'Content-Type': contentType, 'X-CSRF-TOKEN': store.state.token }})
      .then(response => {
        const resData = response.data;
        if(resData.code == 200){
          resolve(resData.data);
        }else if(resData == 403){
          showTip('请重新登录')
        }
      }, reject => {
        showTip('网络错误,请稍后重试')
      })
  })
}

function setAutoSize() {
  var deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) {
    deviceWidth = 750;
  };
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
};
// 返回模块 *****************
export default {
  get,
  post,
  setAutoSize
};
