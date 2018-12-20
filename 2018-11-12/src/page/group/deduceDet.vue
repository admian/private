<template>
  <div id="deduceDet">
    <x-header :left-options="{backText: ''}" :title="title"><a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a></x-header>
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
    <popup v-model="popupState" id="popup">
      <div class="wrap">

        <div class="top clearfix">
          <span class="fl comment_num">123条评论</span>
          <Icon class="fr close_ico" type="md-close" @click="popupState = false"/>
        </div>
        <ul>
          <li v-for="i,index in 6" :key="index" class="clearfix msg_item">
            <img src="" class="fl user_pic"/>
            <div class="fl cont">
              <p class="nick">喜欢猫的鱼</p>
              <p class="txt">哈哈这个也太可爱了吧这个每天这么做 玩玩的话应该会瘦。</p>
              <p class="time">getTimestamp(i.fcd)</p>
            </div>
            <!--<div class="fr">
            <img :src="is_like? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"
                 class="like_ico" @click="changeLike(index)"/>
              <p>58</p>
            </div>-->
          </li>
        </ul>
      </div>

      <div class="input-wrap">
        <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
        <span>发送</span>
      </div>    </popup>
  </div>
</template>

<script>
  import {Popup, XTextarea,XHeader} from 'vux'
  import {mapState ,mapMutations} from "vuex";

  export default {
    name: "deduceDet",
    components: {
      Popup,
      XTextarea,
      XHeader
    },
    data() {
      return {
        id: '',
        type:'',
        title:'',
        is_like: false,
        popupState: false,
        placeholder: '我也来说两句',
        inputTxt: '',
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
    computed: {
      ...mapState([
        'showShare'
      ]),
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
      ...mapMutations(
        ['SETSTATE']
      ),
      addLike() {
        this.is_like = !this.is_like
      },
      showPopup() {
        this.popupState = true;
      },
      changeLike(index) {
        console.log(index)
      },
      playerOptions(index){
            data[index].src
      }
    },
    created(){
      this.id = this.$route.query.id;
      this.title = this.$route.query.title;
      this.type = this.$route.query.type;

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
    margin: .5rem auto .2rem;
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
    width: 1.85rem;
    height: 1.85rem;
    overflow: hidden;
  }

  .video_list_item .video_info {
    position: absolute;
    bottom: .08rem;
    left: .08rem;
    line-height: .34rem;
  }

  .video_info .pic {
    margin-right: .1rem;
    width: .34rem;
    height: .34rem;
  }

  .video_list_item .banner {
    width: 100%;
    height: 100%;
  }

  #popup {
    max-height: 75%;
  }
  #popup .wrap{
    padding: .26rem .3rem .88rem;
  }
  #popup .close_ico {
    line-height: .34rem;
  }

  #popup .top {
    margin-bottom: .4rem;
  }

  #popup .comment_num {
    font-size: .34rem;
  }

  #popup .user_pic {
    margin-right: .12rem;
    width: .6rem;
    height: .6rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  #popup .cont {
    max-width: 4.8rem;
  }

  #popup .txt {
    font-size: .28rem;
    line-height: .4rem;
  }

  #popup .nick {
    font-size: .26rem;
    margin-bottom: .12rem;
    color: #BFBDC4;
  }

  #popup .time {
    margin-top: .06rem;
    font-size: .26rem;
    color: #5C5170;
  }

  #popup .msg_item {
    margin-bottom: .62rem;
  }

  #popup .like_ico{
    margin-bottom: .14rem;
  }
  #popup .input-wrap {
    padding: 0 .87rem .84rem .3rem;
    position: relative;
  }
  #popup .input-wrap input{
    width: 100%;
    padding-left: .3rem;
    padding-right: .9rem;
    background-color: #1B112E;
    color: #AFA3C7;
    font-size: .28rem;
    outline: none;
    border: none;
    line-height: .68rem;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  #popup .input-wrap span{
    position: absolute;
    top: .22rem;
    right: 1.1rem;
    color:#fff;
    font-size: .24rem;
  }

</style>
