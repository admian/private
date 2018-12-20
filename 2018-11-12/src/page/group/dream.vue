<template>
  <div id="dream">
    <div class="bgOpacity">
      <img src="../../assets/img/dream/bg.png" class="dream_bg">
      <div class="zIndex">
        <div class="tabs">
          <x-nav>{{SETSTATE({type:'indexTabIndex',val:1})}}</x-nav>
        </div>
        <div class="banner">
          <Carousel v-model="value" loop autoplay :autoplay-speed="4000">
            <CarouselItem v-for="item,index in bannerList" :key="index">
              <div class="demo-carousel"><img :src="baseUrl+ item.imageUrl" :alt="item.description"></div>
            </CarouselItem>
           <!-- <CarouselItem>
              <div class="demo-carousel"><img src="../../assets/img/dream/banner1.png"></div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel"><img src="../../assets/img/dream/banner1.png"></div>
            </CarouselItem>-->
          </Carousel>
        </div>
      </div>
    </div>

   <scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="true"
              :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
              @on-pullup-loading="selPullUp">

      <div class="selectAct" v-for="(item,index) in actList" :key="index">
        <!--主题背景-->
        <img :src="baseUrl+ item.dreamCover" class="bgImg">

        <div class="contentAct fcolor1">
          <div class="dreamtop">
            <div class="fl">
              <p class="title">{{item.dreamName}}</p>
              <p class="des">{{item.description}}</p>
            </div>
            <div class="sum fr">
             <router-link class="sumi" :to="'/activityDetails?dreamId='+item.id+'&&routerType=dream'">{{item.productionCount}} >></router-link>
              <img src="../../assets/img/dub/h1.png" class="sumImg">
            </div>
          </div>
          <div class="bannerAct">
            <!-------------------------->
            <div class="list-info-wrap">
              <ul class="list-info clearfix">
                <li class="list-info-item fl" v-for="i in item.productionList">

                  <router-link :to="'/activityDetails?id='+i.id+'&&dreamName='+i.dreamName+'&&videoType='+i.videoType+'&&routerType=dream'">
                      <!--封面-->
                      <img :src="baseUrl+i.productionCover" class="pic">
                  </router-link>
                    <router-link :to="'/person?userId='+i.userId" class="recom clearfix">
                      <div class="fl recoml">
                        <img :src="baseUrl+i.headUrl" class="recomImg">
                        <span class="remNo">no.</span>
                      </div>
                      <div class="fl recomr">
                        <p class="recomName">{{filtName(i.nickName)}}</p>
                        <p v-if="i.pushCount" class="recomPush"><i>{{i.pushCount}}</i>push</p>
                      </div>
                    </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>

</template>

<script>
  import XNav from "../../components/x-nav";
  import {mapState ,mapMutations} from "vuex";
  import XPlay from "../../components/x-play";
  import { Scroller } from 'vux'

  export default {
    name: "Dream",
      data(){
        return{
          value:0,
          actList:[],//梦想活动集合
          bannerList:[],//banner列表
          pageIndex: 1,
          showLoad: false,
         upobj: {
            content: '',//常驻提示文字
            pullUpHeight: 60,
            height: 40,
            autoRefresh: false,
            downContent: '上拉加载',//上拉提示文字
            upContent: '',//下拉提示文字
            loadingContent: 'loading...',//加载中
            clsPrefix: 'xs-plugin-pullup-'
          },
          scrollerStatus: {
            pullupStatus: 'default'
          },
        }
      },
      components:{XPlay, XNav,Scroller },
      computed: {
        ...mapState([
          'indexTabIndex',
          'baseUrl'
        ]),
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        ),
        showLoadTxt: function () {
          if (this.showLoad) {

          } else {
            this.showLoad = true;
            setTimeout(() => {
              this.$nextTick(() => {
              })
            }, 500)
          }
        },
        selPullUp() {
          this.pageIndex++;
          this.getData(false);
        },
        getData(isEmpty) {
           let limit = 10;
           //获取梦想活动列表
           this.$post('/api/offline/dream/queryDreamInfoList', {
             limit: limit,
             page: this.pageIndex
           }).then(res => {
             this.actList.push(...res.list);
               if (isEmpty) {
                 this.actList = [];
                 this.actList = res.list;
               } else {
                 //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                 if (res.list && res.list.length < limit) {
                   this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
                   return
                 }
               }
               if (!isEmpty) {
                 this.scrollerStatus.pullupStatus = 'default'
                 this.$nextTick(() => {
                   this.showLoad = false;
                 })
               }
           })
        }
      },
      created(){
        this.getData(true);
        //轮播
        this.$post('/api/offline/banner/queryAllBannerByChannelId/'+5).then(res =>{
          this.bannerList= res.list;

        })
      }
    }
</script>
<style>
  #dream .ivu-carousel-dots li button{
    background: #fff;
  }
</style>

<style scoped>

  /*background-color: #30214a;*/
 #dream .selectAct:last-child{margin-bottom: .98rem;}
  .bgOpacity{
    background: url("../../assets/img/dream/tabs_bg.png") no-repeat;
    background-size: 100% ;
    position: relative;
    height: 6rem;
  }
  .dream_bg{
    width: 100%;
    height: 5rem;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }
  .zIndex{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 33;
    height: 6rem;
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
    width: 6.9rem;
    height: 3.48rem;
  }
  .selectAct{
    width: 100%;
    height: 4.98rem;
    position: relative;
  }
  .bgImg{
    position: absolute;
    z-index:9;
    width: 100%;
    height: 4.88rem;
  }
  .contentAct{
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 4.98rem;
  }
  /*控制模块字体的颜色*/
  .fcolor1{color: #FECF74;}
  .fcolor2{color: #A0D9EC;}

  .dreamtop{
    width:100%;
    margin-bottom:.36rem;
    padding-left: 0.29rem;
    overflow: hidden;
  }
  .title{
    font-size: .34rem;
    padding-top: .28rem;
  }
  .des{
    font-size: .24rem;
    /*display: inline-block;*/
    opacity: 0.8;
    margin-top: 0.21rem;
  }
  .sum{
    font-size: 0.24rem;
    padding-top: .3rem;
    margin-right: .28rem;
  }
  .sumImg{
    width: .2rem;
    height: .27rem;
  }
  .sumi,.sumImg{
    float: right;
    margin-right: .08rem;
    opacity: 0.9;
    color: #fff;
    font-size: .24rem;
  }
  .bannerAct{
    margin: .30rem 0 0 .30rem;
    height: 3.25rem;
    /*2.26+1.01*/
  }
  .list-info-wrap{
    margin-bottom: .3rem;
    width: 100%;
    overflow-y: auto;
  }
  .list-info-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-info{
    width: max-content;
    height: max-content;
  }
  .bannerAct .list-info-wrap .list-info .list-info-item{
    position: relative;
  }
  .bannerAct .list-info-wrap .list-info .list-info-item .pic{
    width: 2.66rem;
    height: 2.26rem;
    margin-right: .14rem;
    border-radius: .05rem;
    margin-bottom: .1rem;
  }
  .user-name{
    margin-top: .1rem;
    color:rgba(255,255,255,1);
    margin-left: .05rem;
    line-height: .5rem;
    font-size: .24rem;
  /*  width: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;*/
  }
  /*.recom {
    position: absolute;
    bottom: 0;
    z-index: 10;
    height: .6rem;
    width: 100%;
  }*/
  .recoml {
    margin-left: .12rem;
  }
  .recomr{
    margin-left: .15rem;
  }
  .recomImg {
    width: .46rem;
    height: .46rem;
    border-radius: 50%;
  }

  .remNo {
    display: block;
    padding: 0 2px;
    height: .22rem;
    line-height: .22rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-top: -.05rem;
    z-index: 20;
    text-align: center;
  }

  .recomName {
    font-size: .14rem;
    color: #fff;
    margin-top: .12rem;
  }
  .recomPush {
    font-size: .16rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush i {
    margin-right: .05rem;
  }
  /*--------------------------------------------------------------*/


</style>
<!--
<style>
  #dream .ivu-carousel-dots li {
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 0 2px;
    padding: 0.06rem .01rem;
    cursor: pointer;
  }
  #dream .ivu-carousel-dots li button {
    border: 0;
    cursor: pointer;
    background: #fff;
    opacity: .3;
    display: block;
    width: .06rem;
    height: .06rem;
    border-radius: 50%;
    outline: 0;
    font-size: 0;
    color: transparent;
    transition: all .5s;
  }
  #dream .ivu-carousel-dots li.ivu-carousel-active>button {
    opacity: 1;
    width: .06rem;
  }
  #dream .ivu-carousel-dots-inside {
    display: block;
    position: absolute;
    bottom: .03rem;
  }
</style>-->
