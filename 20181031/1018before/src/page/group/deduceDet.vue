<template>
  <div id="deduceDet">
    <div class="video-wrap">
      <video-player class="vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true">
      </video-player>
    </div>
    <div class="cont-wrap">
      <div class="info clearfix">
        <div class="fl user clearfix">
          <div class="user-pic fl">
            <img src="">
            <img src="../../assets/img/add_ico.png" class="add_ico"/>
          </div>
          <span class="user_nick">章鱼不是鱼</span>
        </div>
        <div class="fr nums clearfix">
          <div class="fl likes clearfix" @click="addLike">
            <img :src="is_like? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"
                 class="fl like_ico"/>
            <span class="fl num">103W</span>
          </div>
          <div class="fl comment clearfix" @click="showPopup">
            <img src="../../assets/img/comment.png" class="fl comment_ico"/>
            <span class="fl num">103W</span>
          </div>
        </div>
      </div>
      <p class="title">同类视频</p>
      <div class="video_list_wrap">
        <ul class="video_list clearfix">
          <li class="video_list_item fl" v-for="i,index in 5" :key="index">
            <img src="" class="banner">
            <div class="video_info clearfix">
              <img class="pic fl">
              <span class="fl">喜欢猫</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <popup v-model="popupState" height="75%">
      1111
    </popup>
  </div>
</template>

<script>
  import { Popup } from 'vux'
  export default {
    name: "deduceDet",
    components: {
      Popup
    },
    data() {
      return {
        is_like: false,
        popupState:true,
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
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      addLike(){
        this.is_like = !this.is_like
      },
      showPopup(){
        this.popupState = true;
      }
    }
  }
</script>
<style>
  .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
    display: none;
  }
</style>
<style scoped>
  .video-wrap {
    margin: 0 auto .2rem;
    width: 5.24rem;
    height: 7.02rem;
  }

  .video-player {
    height: 100%;
  }

  .cont-wrap {
    padding: 0 .3rem .5rem
  }

  .user-pic {
    position: relative;
  }

  .user-pic img {
    width: .86rem;
    height: .86rem;
    border-radius: 50%;
  }

  .user-pic .add_ico {
    position: absolute;
    bottom: .05rem;
    right: .05rem;
    width: .32rem;
    height: .32rem;
  }

  .user_nick {
    margin-left: .18rem;
    font-size: .28rem;
    line-height: .86rem;
    font-weight: bold;
  }

  .like_ico {
    width: .38rem;
    height: .34rem;
  }

  .nums {
    margin-top: .3rem;
    line-height: .36rem;
  }

  .likes {
    margin-right: .28rem;
  }

  .comment_ico {
    width: .38rem;
    height: .36rem;
  }

  .num {
    margin-left: .08rem;
  }

  .title {
    padding-bottom: .1rem;
    margin-top: .66rem;
    border-bottom: 2px solid #25183F;
    font-size: .3rem;
  }

  .video_list_wrap {
    padding-top: .14rem;
    overflow-y: auto;
  }

  .video_list_wrap::-webkit-scrollbar {
    display: none;
  }

  .video_list {
    width: max-content;
    font-size: .14rem;
    height: max-content;
    overflow-x: hidden;
  }

  .video_list_item {
    margin-right: .1rem;
    position: relative;
    width: 1.48rem;
    height: 2.05rem;
    overflow: hidden;
  }

  .video_list_item .video_info {
    position: absolute;
    bottom: .08rem;
    left: .08rem;
    line-height: .34rem;
  }
.video_info .pic{
  margin-right: .1rem ;
  width: .34rem;
  height: .34rem;
}
  .video_list_item .banner {
    width: 100%;
    height: 100%;
  }
</style>
