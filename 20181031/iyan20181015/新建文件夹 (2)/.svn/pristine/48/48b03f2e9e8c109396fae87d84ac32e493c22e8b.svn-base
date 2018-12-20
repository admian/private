<template>
    <div id="setlog">
      {{SETSTATE({type:'headerTxt',val:'设置'})}}
      <div class="containter">
       <ul>
         <li>
            账号安全
           <router-link class="fr" to="/account">
             <img src="../../assets/img/self/back.png" class="backicon">
           </router-link>
         </li>
         <li>
           检查更新
           <div class="fr">
             <img src="../../assets/img/self/back.png" class="backicon">
           </div>
         </li>
         <li>
           关于爱演
           <div class="fr">
             <img src="../../assets/img/self/back.png" class="backicon">
           </div>
         </li>
         <li>
           清除缓存
           <div class="mb fr">
             221.9MB
             <img src="../../assets/img/self/back.png" class="backicon fr">
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
    list-style: none;
    color: #fff;
    font-size: .34rem;
    margin-bottom: .87rem;
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
</style>
