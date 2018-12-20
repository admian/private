<template>
    <div id="dub">
        <div class="bgOpacity">
          <div class="tabs">
            <x-nav>{{SETSTATE({type:'indexTabIndex',val:2})}}</x-nav>
          </div>
          <div class="banner">
              <div class="playing">
                <div class="iplay" v-for="k in 16">
                  <ul>
                    <li v-for="i in 14"></li>
                  </ul>
                </div>
              </div>
              <div class="playings">
                <div class="iplays" v-for="i in 16"></div>
              </div>
           <div  class="image">
            <img :src="bannerList.imageUrl">
           </div>
          </div>
        </div>
      <!------------------------------------------------------------------------------------>
      <div>

        <!--<scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="true"-->
                  <!--:use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"-->
                  <!--@on-pullup-loading="selPullUp">-->

        <div class="bob" v-for="(item,index) in dubList" :key="index">
          <div class="bobtop">
            <div class="fl">
              <p class="title">{{item.name}}</p>
              <p class="des">{{item.description}}</p>
            </div>
            <div class="sum fr">
              <router-link :to="'/dubDetails?dubId='+item.id"><i class="sumi">{{item.productionCount}} >></i></router-link>
              <img src="../../assets/img/dub/h1.png" class="sumImg">
            </div>
          </div>
          <div class="dubbanner">
            <!----------------------------->
            <div class="list-info-wrap">
              <ul class="list-info clearfix">
                <li class="list-info-item fl" v-for="i in item.productionList">
                  <router-link :to="'/dubDetails?id='+i.id" class="user-info clearfix">
                  <img :src="i.productionCover" class="pic">
                  </router-link>

                  <div class="play-wrap"><x-play></x-play></div>
                    <router-link :to="'/person?userId='+i.userId" class="user-info clearfix">
                    <img class="user-ico fl" :src="i.headUrl">
                    <span class="user-name fl">{{filtName(i.nickName)}}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--</scroller>-->
        <!--  1    -->
      </div><!--  All  -->

    </div>
</template>

<script>
  import XNav from "../../components/x-nav";
  import {mapState ,mapMutations} from "vuex";
  import { XDialog,Scroller } from 'vux'
  import XPlay from "../../components/x-play";
    export default {
      data() {
        return {
          bannerList:[],
          dubList:[],
          pageIndex: 1,
          scrollerStatus: {
            pullupStatus: 'default'
          },
          isLoading: false,
          needAdd: true,
        }
      },
      components:{XPlay, XNav,XDialog,Scroller},
      computed:{
        ...mapState([
          'indexTabIndex',

        ]),
      },
      mounted() {
        this.scroll()
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        ),
        getData: function (isEmpty) {
          let limit = 10;
          this.$post('/api/offline/dub/queryProductionTypeInfoList', {pageSize: limit, pageNum: this.pageIndex}, true).then(res => {

            // this.dubList.push(...res.list);
            this.isLoading = false;
            if (isEmpty) {
              this.dubList = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.dubList.push(...res.list);
            }
            if (res.list && res.pages <= this.pageIndex){
              this.needAdd = false;
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {
              })
            }

          })
        },
        scroll() {
          this.isLoading = false;
          window.onscroll = () => {
            // 距离底部200px时加载一次
            let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200;
            this.sc_txt = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

            if (bottomOfWindow && this.isLoading == false) {
              this.isLoading = true
              if (this.needAdd) {
                this.pageIndex++;
                this.getData(false)
              }
            }
          }
        }
       /* showLoadTxt: function () {
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
        },*/
      },
      created(){
        this.getData(true);
        //配音的宣传图
        this.$post('/api/offline/banner/queryAllBannerByChannelId/'+2).then(res=>{
          //console.log(res);
          this.bannerList=res[0];
        })
      },
      name: "dub"//配音
    }
</script>
<style scoped>
  #dub .bob:last-child{margin-bottom: .98rem;}
  .bgOpacity{
    /*background-color:  #660988 ;*/
    background: -webkit-linear-gradient(#660988, #30214a); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#660988, #30214a); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#660988, #30214a); /* Firefox 3.6 - 15 */
    background: linear-gradient(#660988, #30214a); /* 标准的语法 */
    /*border-bottom: 1px solid #fff;*/
    width: 100%;
  }
  .tabs{
    width: 100%;
    padding-bottom: 0.2rem;
    /*height: 1.60rem;*/
    /*border-bottom: 1px solid #fff;*/
  }
  .banner{
   position: relative;
    width: 100%;
    height: 4.29rem;
  }

  .warp-n{
    position: absolute;
    bottom: 0;
  }
  .playing{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3.01rem;
    display: flex;
    align-items: flex-end;
  }
  .playings{
    position: absolute;
    bottom: .5rem;
    width: 100%;
    height: 3.01rem;
    display: flex;
    align-items: flex-start;
    z-index:10;
  }
  .iplay{
    width: .34rem;
    height: 3.01rem;
    float: left;
    margin-right: 0.13rem;
  }
  .iplay ul{list-style: none;}
  .iplay ul li{
    width: .34rem;
    height: .14rem;
    background-color: #660988;
    opacity: 0.7;
    margin-top: .07rem;
  }
  .iplays{
    width: .47rem;
    height: 3.01rem;
    float: left;
    background: linear-gradient(#660988, #30214a);
    opacity: 1;
    -webkit-animation: playings alternate linear infinite;
  }
  .playings >div:first-child{
    -webkit-animation-duration: .5s;/*动画持续的时间*/
  }
  .playings>div:nth-child(2){
    -webkit-animation-duration: .6s;
  }
  .playings>div:nth-child(3){
    -webkit-animation-duration: .7s;
    -webkit-animation-delay: .6s; /*用来指定开始的时间*/
  }
  .playings>div:nth-child(4){
    -webkit-animation-duration: .5s;
  }
  .playings>div:nth-child(5){
    -webkit-animation-duration: .7s;
  }
  .playings>div:nth-child(6){
    -webkit-animation-duration: .7s;
    -webkit-animation-delay: .6s; /*用来指定开始的时间*/
  }
  .playings>div:nth-child(7){
    -webkit-animation-duration: .5s;
  }
  .playings>div:nth-child(8){
    -webkit-animation-duration: .6s;
  }
  .playings>div:nth-child(9){
    -webkit-animation-duration: .8s;
    -webkit-animation-delay: .6s; /*用来指定开始的时间*/
  }
  .playings>div:nth-child(10){
    -webkit-animation-duration: .7s;
  }
  .playings>div:nth-child(11){
    -webkit-animation-duration: .9s;
  }
  .playings>div:nth-child(12){
    -webkit-animation-duration: .8s;
    -webkit-animation-delay: .6s; /*用来指定开始的时间*/
  }
  .playings>div:nth-child(13){
    -webkit-animation-duration: .5s;
  }
  .playings>div:nth-child(14){
    -webkit-animation-duration: .9s;
  }
  .playings>div:nth-child(15){
    -webkit-animation-duration: .6s;
  }
  .playings>div:last-child{
    -webkit-animation-duration: .8s;
  }
  @-webkit-keyframes playings{
    0%{height: 0.3rem;}
    100%{height: 3.3rem;}
  }
  .image{
    width:92%;
    height: 3.48rem;
    position: absolute;
    margin: 0 .3rem;

    z-index: 99;
  }
  .bob{
    margin: 0 .11rem .24rem .31rem;
    /*width: 7.08rem;*/
    height: 4.1rem;
    border-radius: 0.05rem;
    background: #211934;
    color: #fff;
    position: relative;
  }
  .bobtop{
     width:100%;
     overflow: hidden;
     margin-bottom:.36rem;
  }
  .bobtop .title{
    font-size: 0.34rem;
    margin: 0 0 0.22rem 0.19rem;
    padding-top: 0.29rem;
  }
  .bobtop .des{
    font-size: 0.24rem;
    margin-left: 0.2rem;
  }
  .bobtop .sum{
    padding-top: .3rem;
    font-size: 0.24rem;
    margin-right: .39rem;
  }
  .sumImg{
    width: 0.2rem;
    height: 0.27rem;
  }
  .sumi,.sumImg{
    float: right;
    margin-right: 0.08rem;
    color: #FECF74;
    opacity: 0.9;
  }
  .dubbanner{
    /*border:1px solid #fff;*/
    height: 2.59rem;
    margin-left: .26rem;
    margin-top: .38rem;
  }
  .list-info-wrap{

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
  .list-info-item{
    position: relative;
  }
  .list-info-item .pic{
    width: 1.94rem;
    height: 1.95rem;
    margin-right: .14rem;
    border-radius: .05rem;
  }
 /* .play-ico{
    position: absolute;
    z-index: 10;
    top:.675rem;
    left:.635rem;
    width: .59rem;
    height: .68rem;
  }
  .play-image{
    width: .59rem;
    height: .68rem;
  }*/
  .play-wrap{
    position: absolute;
    z-index: 10;
    bottom: .50rem;
    left: .1rem;
  }
  .user-ico{
    position: relative;
    z-index: 10;
    margin-right: .11rem;
    margin-top: .08rem;
    width: .34rem;
    height: .34rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .user-name{
    margin-top: .17rem;
    color:rgba(255,255,255,1);
    font-size: .2rem;
  }
  .divider{
    width: 100%;
    height: 100%;
  }

</style>
