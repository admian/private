<template>
    <div id='newPass'>
        {{SETSTATE({type:'headerTxt',val:'修改密码'})}}
      <div class="containter">
        <div class="oldpass">
          <input type="text" placeholder="请输入原始密码" v-model="oldpass" />
        </div>
        <div class="newpass">
          <input type="text" placeholder="请输入新的密码（6~18个字符）" v-model="newpass" />
        </div>
        <router-link to="/forgetpass"><span class="fr forget">忘记密码</span></router-link>
        <div class="sub-btn" @click="confirmInput">确定</div>
      </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "newPass",
        data() {
          return {
            oldpass:'',
            newpass:''
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
  .oldpass{
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
    height: .7rem;
    margin-bottom: .3rem;
  }
  .oldpass input{
    width: 100%;
    height: .7rem;
    font-size: .34rem;
    border: none;
    background-color: transparent;
    color: #7B7982;
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
  .forget{
    margin-top: .55rem;
    color: #fff;
    font-size: .28rem;
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
    margin-top: 5.3rem;
  }
</style>
