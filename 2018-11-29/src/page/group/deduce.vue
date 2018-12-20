<template>
  <!--演艺-->
  <div id="group">
    <div class="bgOpacity">
      <img src="../../assets/img/dream/banner/ded_bg.png" class="bg"><!--png-->
      <!--<div class="zIndex">-->
      <div class="tabs">
        <x-nav>{{SETSTATE({type:'indexTabIndex',val:0})}}</x-nav>
      </div>
      <div class="banner">
        <Carousel v-model="value" loop autoplay :autoplay-speed="4000">
          <CarouselItem v-for="item,index in banner" :key="index">
            <div class="demo-carousel"><img :src="baseUrl+item.imageUrl" :alt="item.description"></div>
            <!--<div class="demo-carousel"><img src="../../assets/img/dream/banner/ded.png" :alt="item.description"></div>-->
          </CarouselItem>
        </Carousel>
      </div>
      <!--</div>-->
    </div>
    <!--<div class="banner">
      <x-nav></x-nav>
      <div class="wrap" :style="{backgroundImage:'url('+bgImg+')'}">
        <Carousel v-if="banner.length"
          class="carousel"
          :autoplay="true"
          :autoplay-speed="3000"
          dots="none"
          arrow="always">
          <CarouselItem v-for="i,index in banner" :key="index">
            <div class="carousel-item"><img :src="baseUrl+i.imageUrl"></div>
          </CarouselItem>

        </Carousel>

      </div>
    </div>-->
    <div class="container">
    <ul id="list" v-if="list.length">
      <li class="item-wrap" v-for="i,index in list" :key="index">
        <div class="title clearfix">
          <div class="fl">
            <h3>{{i.name}}</h3>
            <p>{{i.description}}</p>
          </div>
          <router-link :to="'/deduceDetails?type='+i.id+'&&termName='+i.name" class="fr num">
            <i class="hot-ico"></i>
            <span>{{i.productionCount}} >></span>
          </router-link>
        </div>
        <div class="list-info-wrap">
          <scroller lock-y :scrollbar-x=false>
            <div class="list-info clearfix">
              <div class="list-info-item fl" v-for="item,k in i.productionList" :key="k">
                <router-link :to="'/deduceDetails?id='+item.id+'&&termName='+i.name" class="pic-wrap">
                  <img :src=" item.productionCover" class="pic">
                 <!-- <img class="play_ico" src="../../assets/img/play_ico.png">-->
                </router-link>
                <!--<i class="play-ico"></i>-->
                <router-link :to="'/person?userId='+item.userId" class="user-info clearfix">
                  <img class="user-ico fl" :src="baseUrl+item.headUrl">
                  <span class="user-name fl">{{filtName(item.nickName)}}</span>
                </router-link>
              </div>
            </div>
          </scroller>
<!--
          <ul class="list-info clearfix">
            <li class="list-info-item fl" v-for="i in 4">
              <router-link :to="'/deduce_det'" class="pic-wrap">
                <img src="" class="pic">
                <img class="play_ico" src="../../assets/img/play_ico.png">
              </router-link>
              <i class="play-ico"></i>
              <div class="user-info clearfix">
                <img class="user-ico fl">
                <span class="user-name fl">拜托啦学妹</span>
              </div>
            </li>
          </ul>
-->
        </div>

        <div class="divider"></div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
  import xNav from "@/components/x-nav";
  import { Scroller,XHeader} from 'vux'
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "index",
    components:{
      xNav,
      Scroller,
      XHeader
    },

    data(){
      return{
        value:0,
        bgImg:'',
        banner:[],
        list:[],
        onFetching:false
      }
    },
    computed: {
      ...mapState([
        'indexTabIndex',
        'baseUrl',
        'is_login',
        'token'
      ]),
    },
    methods:{
      ...mapMutations(
        ['SETSTATE']
      ),
      onScroll(p) {
        console.log(p)
      },

    },
    created(){

      //window.location.reload();
      /*获取背景图*/
      this.$post('/api/offline/channel/getChannelById/'+1,{}).then(res => {
        this.bgImg = res.backGround
      })
      /*获取轮播图*/
      this.$post('/api/offline/banner/queryAllBannerByChannelId/'+1,{}).then(res => {
        this.banner = res;
      })
      /*获取列表*/
      this.$post('/api/offline/entertainment/queryProductionTypeInfoList',{pageNum:1,pageSize:10,channelId:1}).then(res => {
        this.list = res.list;
      })
     //this.$router.replace('/back');
      //alert('is_login:'+this.is_login + '    token:'+this.token)
    }
  }
</script>

<style scoped>
  .bgOpacity{
    background: #3D3089 ;
    background-size: 100% ;
    position: relative;
    height: 6rem;
  }
  .bg{
    width: 100%;
    height: 4.28rem;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }
  .tabs{
    width: 100%;
    /*height: 1.60rem;*/
    /*border-bottom: 1px solid #fff;*/
    padding-bottom: 0.3rem;
  }
  .banner{
    margin-left: 4%;
    margin-right: 4%;
    margin-top: .05rem;
    width: 6.9rem;
    height: 3.48rem;
  }
 /* .container{
    margin-top: .98rem;
  }*/


  #group{
    color:rgba(255,255,255,.8);
    -background-color: #211934;
    min-height: 100vh;
  }
  .wrap{
    height: 4.3rem;
  }
  .carousel{
    margin: .35rem auto 0;
    width: 92%;
  }
  .carousel-item{
    background-color: coral;
    height: 2.6rem;
  }
  .carousel-item img{
    width: 100%;
    height: 100%;
  }

  /*----------------------------------*/
  #list{
    padding-left: .3rem;
  }
  #list h3{
    color:#fff;
    margin:.2rem 0;
    font-size: .3rem;
  }
  #list {
    font-size: .24rem;
  }
  #list .title p{
    margin-bottom: .4rem;
  }
  #list .num{
    padding-right: .28rem;
    margin-top:.26rem;
    color:#FECF74;
    line-height: .28rem;
  }
  .item-wrap{
    background-color: #211934;
  }
  .list-info-wrap{
    margin-bottom: .3rem;
    width: 96%;
    overflow-y: auto;
  }
  .list-info-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-info-item{
    margin-right: .24rem;
  }
  .pic-wrap{
    position: relative;
    display: inline-block;
  }
  .list-info-item .play_ico{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: .3rem;
    height: .35rem;
  }
  .list-info{
    width: max-content;
    height: max-content;
  }
  .list-info-item .pic{
    width: 1.78rem;
    height: 2.4rem;
  }
  .user-info{
    display: block;
    margin-top: .12rem;
  }
  .user-ico{
    margin-right: .12rem;
    width: .46rem;
    height: .46rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user-name{
    margin-top: .1rem;
    color:rgba(255,255,255,.4);
    font-size: .24rem;
  }
  /*--------------------------------*/
  .divider{
    margin-left: -.3rem;
    width: 100vw;
    height: .25rem;
    background-color: #30214a;
  }
</style>
