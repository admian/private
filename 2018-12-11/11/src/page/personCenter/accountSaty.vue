<template>
    <div id="setlog">
      {{SETSTATE({type:'headerTxt',val:'账号安全'})}}
      <div class="containter">
       <ul>
         <li>
            手机号
           <router-link class="mb fr" to="/telmsg">
             137****7553
             <img src="../../assets/img/self/back.png" class="backicon fr">
           </router-link>
         </li>
         <li>
           修改密码
           <router-link class="fr" to="/newpass">
             <img src="../../assets/img/self/back.png" class="backicon">
           </router-link>
         </li>
         <li>
           <p class="lo-icon">
             <img src="../../assets/img/self/qq.png" class="fl">QQ
           </p>
           <div class="mb fr">
             未绑定<img src="../../assets/img/self/back.png" class="backicon fr">
           </div>
         </li>
         <li>
           <p class="lo-icon">
             <img src="../../assets/img/self/wx.png" class="fl">微信
           </p>
           <div class="mb fr" @click="unbundInput">解绑</div>
         </li>
         <li>
           <p class="lo-icon">
             <img src="../../assets/img/self/wb.png" class="fl">微博
           </p>
           <div class="mb fr">
             未绑定<img src="../../assets/img/self/back.png" class="backicon fr">
           </div>
         </li>
       </ul>
        <div class="logut">
          退出登陆
        </div>
      </div>
     <!-- <Modal v-model="model">&lt;!&ndash;style="background-color:#33254C;"&ndash;&gt;
        <p slot="header" style="text-align:center">
         &lt;!&ndash; <Icon type="ios-information-circle"></Icon>&ndash;&gt;
          <span>提示</span>
        </p>
        <div style="text-align:center">
         <p>解绑后，将无法使用微信快捷登陆，您可以用137****5533继续登陆。</p>
        </div>
        <div slot="footer">
          <div class="okbtn">确定解绑</div>
          <div class="cancel">取消</div>
         &lt;!&ndash; <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>&ndash;&gt;
        </div>
      </Modal>-->
      <div v-transfer-dom>
        <confirm v-model="model"
           :title="title"
           @on-cancel="onCancel"
           @on-confirm="onConfirm"
           :confirm-text="确定解绑"
           :cancel-text="取消"
           @on-show="onShow"
           @on-hide="onHide">
          <p>解绑后，将无法使用微信快捷登陆，您可以用137****5533继续登陆。</p>
        </confirm>
      </div>
    </div>
</template>

<script>

  import {mapMutations,mapState} from 'vuex'
  import { Confirm } from 'vux'
  export default {
      name: "setlog", //设置
      data(){
          return{
            model:false,
            title:'提示'
          }
      },
      components:{Confirm},
      computed:{
        ...mapState([
          'headerTxt'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        ),
        unbundInput(){
          this.model=true
         console.log(0);

        }
      }

    }
</script>
<style>
  #setlog >.ivu-modal-content{
    background-color: #33254C;
  }
  #setlog .ivu-modal-close{
    display: none;
  }
  #setlog .weui-dialog{
    background-color: #33254C;
  }
  #setlog .weui-dialog__bd:first-child{
    color: #fff;
    font-size: .28rem;
  }
  #setlog .weui-dialog__bd{
    color: #fff;
    font-size: .28rem;
  }
  #setlog .weui-dialog__btn_default{
    color: #fff;
    font-size: .28rem;
  }
  #setlog .weui-dialog__btn{
    color: #fff;
    font-size: .28rem;
  }
</style>
<style scoped>
  .containter{
    padding: 0 .3rem;
  }
  ul li{
    height: .7rem;
    color: #fff;
    font-size: .34rem;
   padding: .55rem 0;
    overflow: hidden;
  }
  .backicon{
    width: .14rem;
    height: .24rem;
    margin-left: .15rem;
  }
  .mb{
    color: #8C8896;
    font-size: .28rem;
  }
  .logut{
    margin-top: 4rem;
    color: #8C8896;
    font-size: .34rem;
    text-align: center;
  }
  .lo-icon{
   display: inline-block;
    text-align: center;
  }
  .lo-icon img{
    width: .7rem;
    height: .7rem;
    margin-top: -.2rem;
    margin-right: .2rem;
  }
</style>
