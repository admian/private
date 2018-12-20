<template>
    <div id='forgetpass'>
        {{SETSTATE({type:'headerTxt',val:'找回密码'})}}
      <div class="containter">
        <div class="sp">
          <p class="fl">绑定手机</p>
          <p class="fr">13760307553</p>
        </div>
        <div class="codes">
          <input type="text" v-model="code" maxlength="6" placeholder="请输入验证码"/>
          <span @click="getCode">{{codeTxt}}</span>
        </div>
        <div class="newpass">
          <input type="text" placeholder="请输入新的密码（6~18个字符）" v-model="newpass" />
        </div>
        <div class="sub-btn" @click="confirmInput">确定</div>
      </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "forgetpass",
        data() {
          return {
            code:'',
            newpass:'',
            codeTxt:'获取验证码'
          }
        },
        computed: {
          ...mapState([
              'headerTxt'
          ])
        },
        methods: {
          ...mapMutations(
              ['SETSTATE']
          ),
          confirmInput(){
            this.$router.push({path: '/'});
          }
        }
    }
</script>

<style scoped>
  .containter{
    padding: 0 .3rem;
    font-size: .34rem;
  }
  .sp{
    height: .6rem;
    margin-bottom: .3rem;
  }
  .sp p{display: inline-block;}
  .sp .fr{
    color: #8C8896;
  }
  .codes{
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
    height: .7rem;
    font-size: .34rem;
    margin-bottom: .3rem;
  }
  .codes input{
    width: 73%;
    height: .7rem;
    font-size: .34rem;
    border: none;
    background-color: transparent;
    color: #7B7982;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #7B7982;
    font-size: .28rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #7B7982;
    font-size: .28rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #7B7982;
    font-size: .28rem;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #7B7982;
    font-size: .28rem;
  }
  .newpass{
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
    height: .7rem;
    font-size: .34rem;
  }
  .newpass input{
    width: 100%;
    height: .7rem;
    font-size: .34rem;
    border: none;
    background-color: transparent;
    color: #7B7982;
  }
  .sub-btn{
    width: 6.3rem;
    height: .88rem;
    text-align: center;
    color: #fff;
    line-height: .88rem;
    border-radius: .44rem;
    background-color: #6D46C3;
    margin: auto;
    margin-top: 6rem;
  }
</style>
