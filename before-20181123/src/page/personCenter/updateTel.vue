<template>
    <div id='updateTel'>
        {{SETSTATE({type:'headerTxt',val:'绑定手机号'})}}
        <div class="containter">
          <div class="log_phone">
            <input type="text" placeholder="请输入更改的手机号码" v-model="phone"/>
          </div>
          <div class="codes">
            <input type="text" v-model="code" maxlength="6" placeholder="请输入验证码"/>
            <span @click="getCode">{{codeTxt}}</span>
          </div>
          <div class="sub-btn" @click="confirmInput">确定</div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    export default {
        name: "updateTel",
        data() {
            return {
              phone:'',
              code:'',
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
          getCode(){

          },
          confirmInput(){
            this.$router.push({path: '/'});
          }
        }

    }
</script>
<style>
</style>
<style scoped>
  .containter{
    padding: 0 .3rem;
    font-size: .34rem;
  }
  .log_phone{
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
    height: .7rem;
    margin-bottom: .3rem;
  }
  .log_phone input{
    width: 100%;
    height: .7rem;
    font-size: .34rem;
    border: none;
    background-color: transparent;
    color: #7B7982;
  }
  .codes{
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
    height: .7rem;
    font-size: .34rem;
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
    font-size: .34rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #7B7982;
    font-size: .34rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #7B7982;
    font-size: .34rem;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #7B7982;
    font-size: .34rem;
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
