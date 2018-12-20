<template>
  <div id='demo'>
    <x-header :left-options="{backText: ''}" title="找回密码"></x-header>
    <div class="cont">
      <p class="title">视频演示</p>
      <div class="video-wrap">
        <video-player class="vjs-custom-skin"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true">
        </video-player>
      </div>
      <div class="tips clearfix">
        <i class="ico fl"></i>
        <span class="fl">注意事项</span>
      </div>
      <div class="notice">1.同一时间内只能报名一个角色，报名后不能更改。</div>
      <div class="notice">2.视频录制限制时间为30秒，注意控制时长。</div>
    </div>
    <div class="succ">我已知晓</div>
  </div>
</template>

<script>
  import {XInput,XHeader } from 'vux'

  export default {
    name: "demo",
    components: {
      XHeader,
      XInput
    },
    data() {
      return {
        playerOptions: {
          autoplay: false,
          muted: true,
          preload: 'auto',
          fluid: true,
          language: 'en',
          loop: true,
          aspectRatio:'16:9',
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
          controls: false,
          commentMsg: [],
        }

      }
    },
    mounted() {
      // console.log('this is current player instance object', this.player)
      this.id = this.$route.query.id;

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
  }
</script>

<style scoped>
  #demo{
    font-size: .28rem;
  }
.cont{
  padding:.8rem .3rem 0;

}

  .video-wrap{
    margin: .3rem auto;
    width: 6.9rem;
    height: 4.3rem;
  }
  .tips{
    margin-bottom: .2rem;
    color:#FECF74;

  }
  .tips .ico{
    margin-top: .1rem;
    margin-right: .15rem;
    width: .08rem;
    height: .08rem;
    border-radius: 50%;
    background-color: #FECF74;
  }
  .notice{
    margin-left: .15rem;
    margin-bottom: .18rem;
    color:#A8A6AB;
  }
  .succ{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    background-color: #6D46C3;
    font-size: .32rem;
    font-weight: bold;
  }
</style>
