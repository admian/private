<template>
  <div id='forgotPwd'>
    <x-header :left-options="{backText: ''}" title="找回密码"></x-header>
    <ul class="list-input">
      <li class="item">
        <x-input mask="999 9999 9999" placeholder="请输入手机号" v-model="tel" :max="13" is-type="china-mobile"></x-input>
      </li>
      <li class="item code-input">
        <x-input v-model="code" placeholder="请输入验证码" :min="4" :max="8" type="text"></x-input>
        <span class="code" @click="getCode">{{codeTxt}}</span>
      </li>
      <li class="item">
        <x-input v-model="pwd" placeholder="请输入密码" :min="6" :max="40" type="password"></x-input>
      </li>
    </ul>
    <div class="succ">确定</div>
  </div>
</template>

<script>
  import {XInput,XHeader } from 'vux'
  export default {
    name: "forgotPwd",
    components: {
      XHeader,
      XInput
    },
    data() {
      return {
        tel: '',
        pwd: '',
        code: '',
        codeTxt: '获取验证码',
        is_code: false
      }
    },
    methods: {
      getCode() {
        if (this.is_code) {
          return
        }
        let _this = this;
        let codeTimer = '';
        let codeTm = 5;
        this.codeTxt = codeTm + '秒后再试';
        this.is_code = true;
        codeTimer = setInterval(function () {
          codeTm--;
          _this.codeTxt = codeTm + '秒后再试';
          if (codeTm < 0) {
            clearInterval(codeTimer)
            _this.codeTxt = '获取验证码';
            _this.is_code = false;
          }
        }, 1000)
      }
    },
    created(){

    }
  }
</script>
<style>
  #forgotPwd {
    font-size: .34rem;
    color: #7B7982;
  }

  #forgotPwd .weui-input {
    line-height: 1;
  }
</style>
<style scoped>

  .weui-cell {
    padding: 0;
  }

  .list-input {
    padding: 0 .3rem;
  }

  .item {
    padding: .75rem 0 .1rem;
    border-bottom: 1px solid #7B7982;
  }

  .code-input {
    position: relative;
  }

  .code {
    position: absolute;
    right: 0;
    bottom: .12rem;
    color: #fff;
  }

  .succ {
    margin: 4.9rem auto 0;
    width: 84%;
    height: .88rem;
    line-height: .88rem;
    font-size: .34rem;
    text-align: center;
    background-color: #6D46C3;
    -webkit-border-radius: .44rem;
    -moz-border-radius: .44rem;
    border-radius: .44rem;
    color: #fff;
  }
</style>
