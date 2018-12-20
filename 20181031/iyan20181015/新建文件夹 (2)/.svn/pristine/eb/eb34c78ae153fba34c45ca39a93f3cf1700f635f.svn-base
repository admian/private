<template>
    <div id="dubDetails">
      {{SETSTATE({type:'headerTxt',val:'11111'})}}
      <!-------------------------------------------->
      <div class="dubVideo is_act">
          <!--活动标签-->
          <div class="actLabel">皓镧传选角</div>

          <video-player class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true">
          </video-player>

           <!--push动效暂用图片-->
          <div class="icon-push"></div>
          <!-- <img src="../../assets/img/push.png" class="pushimg">-->

      </div>
      <!------------------------------------------------>
      <div class="actUser clearfix">
        <div class="fl">
          <div class="userPhoto fl">
            <img src="" class="userP">
            <div class="focus">
              <img src="../../assets/img/dream/关注@2x.png">
              <!--<Icon type="ios-add"/>-->
            </div>
          </div>
          <div class="userMessage fr">
            <p class="userName">xxxx</p>
            <p class="actNo">no.23</p><!--不参加活动时，隐藏-->
          </div>
        </div>
        <div class="llTwo fr"><!--like_sel选中-->
          <div class="fl" @click="isLike" :class="is_like ? 'like' : 'like_sel'"><i class="num">103W</i></div>
          <div class="leave fl" @click="showPopup"><i class="num">103W</i></div>
        </div>
      </div>
      <!----------------------------同类视频------------------------------------------------->
      <div class="similarVideo">
        <p class="similarTitle">同类视频</p>
        <!----------------------------------->
        <div class="slider-wrap">
          <ul class="list-nav clearfix">
            <li class="list-item fl" v-for="i in 4">

              <img src="" class="pic">
              <i class="play-ico"></i>
              <div class="user-info clearfix">
                <div><!--不参加活动-->
                 <!-- <img class="user-ico fl">
                  <span class="user-name fl">拜托啦学妹</span>-->
                </div>
                <div><!--参加活动-->
                  <div class="fl recoml">
                    <img src="../../assets/img/dream/d.png" class="recomImg">
                    <p class="remNo">no.2</p>
                  </div>
                  <div class="fl recomr">
                    <p class="recomName">喜欢猫的咸鱼</p>
                    <p class="recomPush"><i>5168</i>push</p>
                  </div>
                </div>
              </div>

            </li>
          </ul>
          <ul class="list-nav clearfix">
            <li class="list-item fl" v-for="i in 4">

            </li>
          </ul>
        </div>

      </div>
      <popup v-model="popupState" height="65%">
        1111
      </popup>
    </div>
</template>

<script>
    import XHeader from "../../components/x-header";
    import { Popup } from 'vux';
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "dubDetails",
        components: {XHeader,Popup},
      data(){
          return{
            is_like:true,
            popupState:false,
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
      mounted() {
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
      computed: {
        ...mapState([
          'indexTabIndex'
        ]),
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods:{
        ...mapMutations([
          'SETSTATE'
         ]),
        isLike(){
          this.is_like =! this.is_like
        },
        showPopup(){
          this.popupState = true;
        }
      },
      created(){

      }
    }
</script>
<style>
  #dubDetails .vux-popup-dialog{background: #33254C;}
</style>
<style scoped>
  .dubVideo{
    /*margin-top: .3rem;*/
    height: 4.3rem;
   /* background: #f1f1f1;*/
  }
  .video-player {
    height: 100%;
  }
  .actLabel{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  .actUser{
    height: 1.1rem;
    margin: .22rem .32rem;
    padding-left: .1rem;
  }
  .userPhoto{
    position: relative;
    padding-top: .01rem;
  }
  .userP{
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .focus{
    width: .32rem;
    height:.32rem;
    /*background:rgba(103,91,255,1);*/
    border-radius:50%;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .userMessage{
    margin-left: .2rem;
    color: #fff;
  }
  .userName{
    font-size: .28rem;
    margin-top: .18rem;
  }
  .actNo{
    width: .54rem;
    height: .25rem;
    line-height: .25rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-top: .1rem;
    text-align: center;
  }
  .llTwo{
    color: #fff;
    margin-top: .43rem;
  }
  .like{
    height: .35rem;
    background: url("../../assets/img/dream/like.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }
  .like_sel{
    height: .35rem;
    background: url("../../assets/img/dream/like_sel.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }
  .leave{
    height: .35rem;
    background: url("../../assets/img/dream/leave.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
  }
  .num{
    font-size: .2rem;
  }
  /*--------------------------------------------------------------------------------*/
  .similarVideo{
    margin-top: .22rem;
    padding-left: .32rem;
    padding-bottom: .3rem;
  }
  .similarTitle{
    color: #fff;
    font-size: .3rem;
    border-bottom: .02rem solid #25183F;
    padding-bottom: .1rem;
  }
  .slider-wrap{
    overflow-y: auto;
  }
  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-nav{
    margin-top: .3rem;
    width: max-content;
    height: max-content;
  }
  .list-item{
    width: 2.66rem;
    height: 2.36rem;
    border: #fff 1px solid;
    border-radius: .05rem;
    margin-right: .14rem;
  }
  .pic{
    width: 2.66rem;
    height: 1.82rem;

  }
  .user-ico{
    position: relative;
    z-index: 10;
    margin-left: .24rem;
    margin-right: .16rem;
    margin-top: -.08rem;
    width: .39rem;
    height: .39rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: .05rem solid #211934;
  }
  .user-name{
    font-size: .24rem;
    margin-top: .1rem;
    color:rgba(255,255,255,1);
  }
  .recoml{
    position: relative;
    z-index: 20;
    margin-left: .14rem;
  }
  .recomr{
    margin-left: .14rem;
  }
  .recomImg{
    z-index: 10;
    margin-top: -.08rem;
    width: .39rem;
    height: .39rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: .05rem solid #211934;
  }
  .remNo{
    width: .47rem;
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
  .recomName{
    font-size: .14rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush{
    font-size: .16rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush i{
    margin-right: .05rem;
  }
</style>
