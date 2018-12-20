
/**
 ** 封装axios方法，利于复用 **
 **/

import Qs from 'qs' //POST时 将参数转换为query参数
import axios from 'axios';
import store from '../store'
import router from '../router'
import {Message} from 'iview';
// 弹窗函数 *******************
const showTip = function (msg, time) {
  Message.destroy()
  Message.warning({
    content: msg,
    duration: time ? time : 0
  });
};

// 设置初始参数 ****************
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://192.168.1.66:8082/';
//axios.defaults.baseURL = 'https://api.niyouxi77.com';
//axios.defaults.baseURL = 'http://47.93.229.67:1521/';
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
          //showTip('请重新登录');
          window.location.href='/login'
         /*this.$router.push({
            path:'/login'
          })*/
        }else if(resData.code == 303){
          showTip('账号异常')
        }
      }, reject => {
       // showTip('网络错误,请稍后重试')
      })
  })
}
function filtName(txt) {
  if(txt == null){
    return ' '
  }
  if(txt.length < 4 ){
    return txt
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
  let deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) {
    deviceWidth = 750;
  };
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
};
// 返回模块 *****************



function getTimestamp(old_time) { //数据时间戳 int
  let newDate = new Date();
  let timestamp = Date.parse(new Date());
  old_time = parseInt(old_time / 1000);
  timestamp = timestamp / 1000;
  let year = newDate.getFullYear();
  let timer = timestamp - old_time;
  let htmlTime = '';
  newDate.setTime(old_time * 1000);
  let y = newDate.getFullYear();
  let m = newDate.getMonth();
  let d = newDate.getDate();
  d = d < 10 ? '0' + d : d;
  m = m < 9 ? '0' + (m + 1) : m;
  let all_time = y + '/ ' + (m + 1) + '/' + d;

  if (timer >= 3600 * 24 * 365) {
    htmlTime =  all_time;
  } else if (timer >= 3600 * 24) {
    htmlTime = year == y ? m  + '/' + d : all_time;
  } else if (timer >= 3600) {
    htmlTime = parseInt(timer / 3600);
    htmlTime = htmlTime + ' h' + ' 前'
  } else if (timer >= 60) {
    htmlTime =  parseInt(timer / 60);
    htmlTime =  htmlTime + ' min' + ' 前'
  } else if (timer >= 0) {
    htmlTime = timer
    htmlTime =  htmlTime + ' s' + ' 前'
  } else {
    htmlTime = '0';
    htmlTime =  htmlTime + ' s' + ' 前'
  }
  return htmlTime;
}




export default {
  get,
  post,
  setAutoSize,
  filtName,
  filtNunm,
  getTimestamp
};
