<template>
  <div id='groupDet'>
    <x-header :left-options="{backText: '活动详情'}"></x-header>
    <div class="wrap">
      <div class="video">
        <video-player class="vjs-custom-skin"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true">
        </video-player>
      </div>
      <div class="cont">
        <div class="top clearfix">
          <h3 class="fl">剧情介绍</h3>
          <span class="fr" @click="checkAll">查看全部</span>
        </div>
        <p class="txt">dsadsadadadsaddsadasddsadsadadadsaddsadasddsadsadadadsaddsadasddsadsadadadsaddsadasddsadsadadadsaddsadasd</p>
      </div>
      <ul class="info">
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">剧组分类</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">剧组题材</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">拍摄地点</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">开机时间</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">拍摄周期</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">编&emsp;&emsp;剧</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">导&emsp;&emsp;演</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
        <li class="clearfix">
          <i class="ico fl"></i>
          <h4 class="fl">出品公司</h4>
          <p class="fl">Sdadasdasd</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {XHeader} from 'vux';

  export default {
    name: "groupDet",
    components: {XHeader},

    data() {
      return {
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
            src: "",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
        },

      }
    },
    methods:{
      checkAll(){

      }
    }
  }
</script>

<style scoped>
  #groupDet{
    color:#E4E4E4;
  }
.wrap{
  width: 92%;
  margin:.6rem auto 0;
}
  .video{
    margin-bottom: .4rem;
    height: 4.3rem;
    width: 100%;
  }
  .cont h3{
    font-size: .3rem;
  }
  .cont span{
    font-size: .24rem;
    color:#FECF74;
  }
  .cont p{
    margin-top: .25rem;
    margin-bottom: .35rem;
    font-size: .28rem;
    line-height: .3rem;
    word-break: break-word;
  }
  .info .ico{
    margin-top: .1rem;
    margin-right: .2rem;
    width: .1rem;
    height: .1rem;
    background-color: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .info h4{
    font-size: .3rem;
    width: 1.35rem;
  }
  .info p {
    font-size: .28rem;
  }
  .info li{
    margin-bottom: .3rem;
  }
</style>
