<template>
  <div id="header" class="clearfix">
    <img src="../assets/img/goBack.png" class="goBack fl" @click="$router.go(-1)">
    <span :class="isCenter? 'ff' : 'fl'">{{headerTxt}}</span>
    <div class="fr">
      <router-link v-if="showNew" to="/setlog"><img src="../assets/img/....png" class="fr simg" ></router-link>
      <span v-if="isShowShare" @click="SETSTATE({type:'showShare',val:true})"><img src="../assets/img/icon_share.png" class="fr shareimg" ></span>
      <router-link v-if="showNew" to="/new"><img src="../assets/img/icon_new.png" class="fr newimg"></router-link>
      <router-link v-if="showFocus" to="/myfocus" class="onfocus">我的关注</router-link>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from "vuex";

  export default {
    name: "x-header",
    computed: {
      ...mapState([
        'headerTxt',
        'showShare',
        'showFocus',
        'showNew',
        'isShowShare',
        'editPut',
        'isCenter'
      ]),

    },
    methods:{
      ...mapMutations([
        'SETSTATE'
      ])
    },
    created(){

    }
  }
</script>

<style scoped>
  #header {
    position: fixed;
    top:0;
    padding: .68rem .2rem .54rem;
    width: 100%;
    text-align: center;
    font-size: .34rem;
    background-color: transparent;

  }
  .goBack {
    left: 20px;
    width: .2rem;
    height: .34rem;
    margin-right: .1rem;
  }
  .ff{
    text-align: center;
  }
  .fl{
    font-size: .34rem;
  }
  .fr{
    font-size: .34rem;
    color: #fff;
  }
  .simg{
    width: .46rem;
    height: .08rem;
    margin-left: .5rem;
    margin-top: .1rem;
  }
  .newimg{
    width: .33rem;
    height: .39rem;
    margin-top: -.1rem;
    margin-right: .5rem;
  }
  .shareimg{
    width:  .4rem ;
    height: .24rem;
    margin-left: .1rem;
  }
  .onfocus{color: #fff; font-size: .34rem;}
</style>
