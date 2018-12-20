<template>
  <div id='login'>
    <img class="logo" src="../../assets/img/logo.png">
    <p class="notice">有没有戏你说了算</p>
    <div class="input-box">
      <div class="item">
        <p>账号</p>
        <x-input mask="999 9999 9999" placeholder="请输入手机号" v-model="tel" :max="13" is-type="china-mobile"></x-input>
      </div>
      <div v-if="is_pwd" class="item">
        <p>密码</p>
        <x-input v-model="pwd" placeholder="请输入密码" :min="6" :max="40" type="password"></x-input>
        <div class="btns clearfix">
          <span class="fl" @click="is_pwd = false">验证码登录</span>
          <router-link class="forgotPwd fr" to="/forgotPwd">找回密码</router-link>
        </div>
        <div class="login-btn">登录</div>
      </div>
      <div v-if="!is_pwd" class="item">
        <p>密码</p>
        <div class="wrap">
          <x-input v-model="pwd" placeholder="验证码" :min="6" :max="40" type="password"></x-input>
          <span @click="getCode">{{codeTxt}}</span>
        </div>
        <div class="btns clearfix">
          <span class="fl" @click="is_pwd = true">密码登录</span>
          <router-link class="forgotPwd fr" to="/forgotPwd">找回密码</router-link>
        </div>
        <div class="login-btn">登录</div>
      </div>

    </div>
    <div class="login-ico clearfix">
      <img src="../../assets/img/login_wechar.png" class="wechar fl"/>
      <img src="../../assets/img/login_qq.png" class="qq fl"/>
      <img src="../../assets/img/login_wb.png" class="wb fl"/>
    </div>
  </div>
</template>

<script>
  import {XInput} from 'vux'

  export default {
    name: "login",

    data() {
      return {
        tel: '',
        pwd:'',
        is_pwd:true,
        codeTxt:"获取验证码",
        is_code:false
      }
    },
    components: {
      XInput
    },
    methods:{

      getCode(){
        if(this.is_code){
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
    }
  }
</script>
<style>
  #login .weui-cell{
    padding:0;
  }
  #login .weui-cell:before{
    border-top: none;
  }
  #login .weui-input{
    border-bottom: 1px solid #7B7982;

  }
</style>
<style scoped>
  #login{
    padding:0 .6rem;
  }
.logo{
  margin: 1.5rem auto .26rem;
  width: 1.2rem;
  height: 1.2rem;
}
  .notice{
    font-size: .28rem;
    text-align: center;
  }
  .item{
    padding-top: .79rem;
  }
  .item p{
    margin-bottom: .4rem;
    font-size: .24rem;
  }
  .item input{
    padding-bottom: .11rem;
    color:#7B7982;
    font-size: .34rem;
  }
  .item .wrap{
    position: relative;
  }
  .item .wrap span{
    position: absolute;
    bottom: .1rem;
    right: 0;
    font-size: .34rem;
  }
  .btns{
    margin-top: .36rem;
    margin-bottom: .88rem;
    font-size: .28rem;
  }
  .btns .forgotPwd{
    color:#fff;
  }
  .login-ico{
    width: max-content;
    margin:1.67rem auto .75rem;
  }
  .login-btn{
    margin: 0 auto;
    width: 84%;
    height: .88rem;
    line-height: .88rem;
    font-size: .34rem;
    text-align: center;
    background-color: #6D46C3;
    -webkit-border-radius: .44rem;
    -moz-border-radius: .44rem;
    border-radius: .44rem;
  }
  .login-ico img{
    width: .94rem;
    height: .94rem;
  }
.login-ico .qq{
  margin:0 1rem;
}
</style>
