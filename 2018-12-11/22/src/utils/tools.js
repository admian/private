
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
axios.defaults.baseURL = 'http://192.168.1.66:8082/';

axios.defaults.withCredentials = true;
 // axios.defaults.baseURL = '/api_base';
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
    let contentType = 'application/json;charset=UTF-8';
    if(url == '/login'){
      data = Qs.stringify(data);
      contentType = 'application/x-www-form-urlencoded'
    }
    let head ={
      headers: {'Content-Type': contentType, 'X-CSRF-TOKEN': store.state.token}
    }

    axios.post(url, data, head)
      .then(response => {
        const resData = response.data;
        if(resData.code == 200){
          resolve(resData.data);
        }else if(resData.code == 302){
          showTip('请重新登录')
        }else if(resData.code == 303){
          showTip('账号异常')
        }
      }, reject => {
        showTip('网络错误,请稍后重试')
      })
  })
}
function filtName(txt) {
  if(txt == null){
    return ' '
  }
  if(txt.length < 4 ){
    return txt;
  }
  return txt.slice(0,4) + '...'

}
function filtNunm(num) {
  if(num >= 10000){
    return (num / 10000).toFixed(1) + 'W'
  }
  return num
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
  setAutoSize,
  filtName,
  filtNunm,

};
