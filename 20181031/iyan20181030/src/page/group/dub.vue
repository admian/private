<template>
    <div id="dub">
        <div class="bgOpacity">
          <div class="tabs">
            <x-nav>{{SETSTATE({type:'indexTabIndex',val:2})}}</x-nav>
          </div>
          <div class="banner">
            <div v-show="nplay==1" class="warp-n"><img src="../../assets/img/dub/bannerBg.png"></div>
            <div v-show="nplay==2">
              <div class="playing">
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
                <div class="iplay">
                  <ul>
                    <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                  </ul>
                </div>
              </div>
              <div class="playings">
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
                <div class="iplays"></div>
              </div>
            </div>
            <img src="../../assets/img/dub/banner.png" class="image">
          </div>
        </div>
      <!------------------------------------------------------------------------------------>
      <div>

        <div class="bob">
          <div class="bobtop">
            <div class="fl">
              <p class="title">流行文体</p>
              <p class="des">与世无争</p>
            </div>
            <div class="sum fr">
              <router-link to="/dubDetails?type='配音类型'"><i class="sumi">999 >></i></router-link>
              <img src="../../assets/img/dub/h1.png" class="sumImg">
            </div>
          </div>
          <div class="dubbanner">
            <!----------------------------->
            <div class="list-info-wrap">
              <ul class="list-info clearfix">
                <li class="list-info-item fl" v-for="i in 5" @click="openPlay">
                  <img src="" class="pic">
                  <!--<div class="play-wrap"><x-play></x-play></div>-->
                  <!--<span class="play-ico" @click="onPlay"><img src="../../assets/img/dub/play.png" class="play-image"></span>-->
                  <div class="user-info clearfix">
                    <img class="user-ico fl" src="">
                    <span class="user-name fl">拜托啦学妹</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="divider">
              <x-dialog v-model="showHideOnBlur" hide-on-blur>
                <div style="max-width:100%">
                  <video-player class="vjs-custom-skin"
                                ref="videoPlayer"
                                :options="playerOptions"
                                :playsinline="true">
                  </video-player>
                  <!--<img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">-->
                </div>
               <!-- <div @click="showHideOnBlur=false">
                  <span class="vux-close"></span>
                </div>-->
              </x-dialog>
            </div>

          </div>
        </div>
        <!--  1    -->
       <!-- <div class="bob">
          <div class="bobtop">
            <div class="fl">
              <p class="title">国产动漫</p>
              <p class="des">声优</p>
            </div>
            <div class="sum fr">
              <i class="sumi">999 >></i>
              <img src="../../assets/img/dub/h1.png" class="sumImg">

            </div>
          </div>
          <div class="dubbanner">
            &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;
            <div class="list-info-wrap">
              <ul class="list-info clearfix">
                <li class="list-info-item fl" v-for="i in 4">
                  <img src="" class="pic">
                  <div class="play-wrap"><x-play></x-play></div>
                  &lt;!&ndash;<span class="play-ico"><img src="../../assets/img/dub/play.png" class="play-image"></span>&ndash;&gt;
                  <div class="user-info clearfix">
                    <img class="user-ico fl" src="">
                    <span class="user-name fl">拜托啦学妹</span>
                  </div>

                </li>
              </ul>
            </div>

            <div class="divider" v-show="isShowplay"></div>

          </div>
        </div>-->
        <!--     2    -->
      </div><!--  All  -->

    </div>
</template>

<script>
  import XNav from "../../components/x-nav";
  import {mapState ,mapMutations} from "vuex";
  import { XDialog } from 'vux'
  import XPlay from "../../components/x-play";
    export default {
      data() {
        return {
          nplay: 1,
          isShowplay: false,
          showHideOnBlur: false,
          playerOptions: {
            autoplay: true,
            muted: true,
            preload: 'auto',
            fluid: true,
            language: 'en',
            loop: true,
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
            controls: false
          }
        }
      },
      mounted(){
          // console.log('this is current player instance object', this.player)
          setTimeout(() => {
            // change src
            // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

            // change item
            // this.$set(this.playerOptions.sources, 0, {
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // })

            // change array
            // this.playerOptions.sources = [{
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // }]
            this.player.muted(false)
          }, 5000)
      },
      components:{XPlay, XNav,XDialog},
      computed:{
        ...mapState([
          'indexTabIndex'
        ]),
          player(){
          return this.$refs.videoPlayer.player
        }
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        ),
       //遮罩层视频/背景动画
        openPlay(){
          this.showHideOnBlur=true
          this.nplay=2;
        }
      },
      created(){},
      name: "dub"//配音
    }
</script>
<style scoped>
  .bgOpacity{
    /*background-color:  #660988 ;*/
    background: -webkit-linear-gradient(#660988, #30214a); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#660988, #30214a); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#660988, #30214a); /* Firefox 3.6 - 15 */
    background: linear-gradient(#660988, #30214a); /* 标准的语法 */
    /*border-bottom: 1px solid #fff;*/
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
    margin: 0 4%;
    z-index: 99;
  }
  .bob{
    margin: 0 .11rem .24rem .31rem;
    width: 7.08rem;
    height: 4.04rem;
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
