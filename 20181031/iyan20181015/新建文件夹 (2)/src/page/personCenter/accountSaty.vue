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
           <div class="fr">
             <img src="../../assets/img/self/back.png" class="backicon">
           </div>
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
           <div class="mb fr">绑定</div>
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
    </div>
</template>

<script>

  import {mapMutations,mapState} from 'vuex'
  export default {
      name: "setlog", //设置
      data(){
          return{}
      },
      computed:{
        ...mapState([
          'headerTxt'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        )
      }

    }
</script>

<style scoped>
  .containter{
    padding: 0 .3rem;
  }
  ul li{
    height: .7rem;
    list-style: none;
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
