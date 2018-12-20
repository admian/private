<template>
  <!--故事-->
  <div id="story">
    <x-nav></x-nav>
    <div class="banner">
      <img src="">
    </div>
    <div class="hot bg21">
      <h3>热门推荐</h3>
      <div class="item clearfix">
        <div class="ico fl">
          <img v-if="true" class="fl"
               :src="is_txt ? require('../../assets/img/music_ico.png'): require('../../assets/img/txt_ico.png')">
          <div v-if="false" class="demo-music fl">
            <div class="music">
              <ul id="waves" class="movement">
                <li class="li1"><span class="ani-li"></span></li>
                <li class="li2"><span class="ani-li"></span></li>
                <li class="li3"><span class="ani-li"></span></li>
                <li class="li4"><span class="ani-li"></span></li>
                <li class="li5"><span class="ani-li"></span></li>
                <li class="li6"><span class="ani-li"></span></li>
              </ul>
              <div class="music-state"></div>
            </div>

          </div>
          <div class="txt fl">
            <p class="title">我的故事有人听吗</p>
            <p class="cont">我的心我的夜，到底放在哪里？</p>
            <Slider v-model="value1" :show-input="false" :show-tip="'never'"></Slider>
          </div>
        </div>
      </div>
      <div class="item clearfix">
        <div class="ico fl">
          <img v-if="false" class="fl"
               :src="is_txt ? require('../../assets/img/music_ico.png'): require('../../assets/img/txt_ico.png')">
          <div v-if="true" class="demo-music fl">
            <div class="music">
              <ul id="waves" class="movement">
                <li class="li1"><span class="ani-li"></span></li>
                <li class="li2"><span class="ani-li"></span></li>
                <li class="li3"><span class="ani-li"></span></li>
                <li class="li4"><span class="ani-li"></span></li>
              </ul>
              <div class="music-state"></div>
            </div>

          </div>
          <div class="txt fl">
            <p class="title">我的故事有人听吗</p>
            <p class="cont">我的心我的夜，到底放在哪里？</p>
            <Slider v-model="value1" :show-input="false" :show-tip="'never'"></Slider>
          </div>
        </div>
      </div>
    </div>
    <ul class="list">
      <li class="bg21 item" v-for="i in 3">
        <!--非音频-->
        <div class="wrap" v-if="false">
          <div class="clearfix top">
            <h4 class="fl">武神王:誓言</h4>
            <span class="fr tag">玄幻修真</span>
          </div>
          <p class="content">本土嫡女vs重生女、穿越女 端木徳淑最近发现身边总围绕着些奇奇怪怪的人。 比如:莫名其妙要跟皇上一生一世一双人的；莫名其妙自立</p>
        </div>
        <!--非音频-->

        <!--音频-->
        <div class="wrap isMusic clearfix">
          <div class="music-pic fl">
            <img src="" class="pic">
            <img class="play" src="../../assets/img/play_music.png">
          </div>
          <div class="music-info fl">
            <h4>这不是童话</h4>
            <p>测试打  啊实打实</p>
            <Slider v-model="value1" :show-input="false" :show-tip="'never'" class="slider"></Slider>

          </div>
          <span class="fr tag">玄幻修真</span>
        </div>

        <!--音频-->
        <div class="info clearfix">
          <div class="fl user clearfix">
            <div class="user-pic fl">
              <img src="">
            </div>
            <span class="user_nick">章鱼不是鱼</span>
          </div>
          <div class="fr nums clearfix">
            <div class="fl likes clearfix" @click="addLike">
              <img
                :src="is_like? require('../../assets/img/like_p_sel.png') : require('../../assets/img/like_p.png')"
                class="fl like_ico"/>
              <span class="fl num">103W</span>
            </div>
            <div class="fl comment clearfix" @click="showPopup">
              <img src="../../assets/img/comment_p.png" class="fl comment_ico"/>
              <span class="fl num">103W</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
              <p class="time">10分钟前</p>
            </div>
            <div class="fr">
              <img
                :src="is_like? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"
                class="like_ico" @click="changeLike(index)"/>
              <p>58</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="input-wrap">
        <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
        <span>发送</span>
      </div>
    </popup>
    <router-link to="/" class="post_story">
      <img src="../../assets/img/story_btn.png">
    </router-link>
  </div>
</template>

<script>
  import {Popup, XTextarea} from 'vux'
  import XNav from "../../components/x-nav";
  import {mapState ,mapMutations} from "vuex";
  export default {
    name: "story",
    components: {
      Popup,
      XTextarea,
      XNav
    },
    computed: {
      ...mapState([
        'indexTabIndex'
      ]),
    },
    data() {
      return {
        is_txt: false,
        value1: 10,
        is_like: true,
        popupState: false,
        placeholder: '我也来说两句',
        inputTxt: '',
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
    }
  }
</script>
<style>
  #story .ivu-slider-wrap {
    margin-top: .15rem;
    margin-bottom: .36rem;
    background-color: #3B2B61;
  }

  #story .ivu-slider-bar {
    background-color: #8071CD;
  }

  #story .ivu-slider-button-wrap {
    top: -5px;
  }

  #story .ivu-slider-button {
    border: none;
    background-color: #9F8CFF;
  }
  #story .isMusic .ivu-slider-wrap{
    margin-top: .2rem;
  }
</style>
<style scoped>
  .bg21 {
    background-color: #211934;
  }
  .banner{
    margin:35px auto;
    width: 6.76rem;
    height: 3.4rem;
  }
  .hot{
    padding-top: .3rem;
    width: 92%;
    margin:0 auto;
  }
.hot h3{
  margin-bottom: .3rem;
  text-align: right;
  font-size: .34rem;
  margin-right: .54rem;
  color:#fff;
}
  .hot .cont {
    font-size: .24rem;
    margin-bottom: .28rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hot .ico img{
    margin-top: .46rem;
    margin-left: .3rem;
    width: .6rem;
    height: .6rem;
  }
  .hot .txt{
    padding-left: .22rem;
    border-top: 1px solid #30214A;
  }
  .hot .item:first-of-type .txt{
    border-top: none;
  }
  .hot .txt .title{
    margin-top: .46rem;
    font-size: .3rem;
    margin-bottom: .12rem;
  }
  .list{
    margin: .24rem auto;
    width: 92%;
  }
  .list .item{
    padding:.3rem;
    margin-bottom: .24rem;
  }
  .list .item .wrap .top{
    padding-bottom: .3rem;
  }
  .list .item .wrap h4{
    font-size: .34rem;
  }
  .list .item .wrap .tag{
    padding:0 .1rem;
    font-size: .18rem;
    line-height: .34rem;
    height: .34rem;
    border: 1px solid #6453B9;
    -webkit-border-radius: .17rem;
    -moz-border-radius: .17rem;
    border-radius: .17rem;
  }
  .list .content{
    font-size: .26rem;
    line-height: .36rem;
    margin-bottom: .38rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .info .user-pic img{
    margin-right: .17rem;
    width: .58rem;
    height: .58rem;
  }
  .info .user_nick{
    font-size: .28rem;
    line-height: .58rem;
  }
  .info .nums{
    padding-top: .08rem;
    font-size: .24rem;
    line-height: .3rem;
  }
  .info .nums img{
    margin-right: .1rem;
    width: .3rem;
    height: .3rem;
  }
  .info .nums .likes{
    margin-right: .2rem;
  }
  .isMusic .music-pic{
    margin-right: .2rem;
    position: relative;
    width:1.34rem;
    height: 1.34rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border:2px solid #fff;
  }
  .isMusic h4{
    margin-top: .25rem;
    margin-bottom: .2rem;
  }
  .isMusic .play{
    width: .36rem;
    height: .44rem;
    position: absolute;
    top:.45rem;
    left: .5rem;
  }
  .music-info{
    font-size: .24rem;
  }

  .post_story{
    width: .9rem;
    height: .9rem;
    position: fixed;
    bottom:1.2rem;
    right: .3rem;
    z-index: 10;
    background-color: #6d4cc9;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }


  .demo-music {
    margin-top: .46rem;
    margin-left: .3rem;
    width: .6rem;
    height: .6rem;
    position: relative;
  }

  .demo-music .music {
    width: .4rem;
    height: .4rem;
    position: absolute;
    top:.1rem;
    left: .1rem;
  }
  .demo-music #waves {
    width: .4rem;
    height: .4rem;

  }

  .demo-music #waves li {
    position: relative;
    float: left;
    height: 100%;
    width: 18%;
    overflow: hidden;
    margin-right: 1px;
  }

  .demo-music #waves li span {
    position: absolute;
    bottom: 0;
    display: block;
    height: 100%;
    width: 100px;
    background: #fff;
  }

  .demo-music #waves .li1 span {
    animation: waves 0.6s linear 0s infinite alternate;
    -webkit-animation: waves 0.6s linear 0s infinite alternate;
  }

  .demo-music #waves .li2 span {
    animation: waves 0.9s linear 0s infinite alternate;
    -webkit-animation: waves 0.9s linear 0s infinite alternate;
  }

  .demo-music #waves .li3 span {
    animation: waves 1s linear 0s infinite alternate;
    -webkit-animation: waves 1s linear 0s infinite alternate;
  }

  .demo-music #waves .li4 span {
    animation: waves 0.8s linear 0s infinite alternate;
    -webkit-animation: waves 0.8s linear 0s infinite alternate;
  }

  .demo-music #waves .li5 span {
    animation: waves 0.7s linear 0s infinite alternate;
    -webkit-animation: waves 0.7s linear 0s infinite alternate;
  }

  .demo-music #waves .li6 span {
    animation: waves 0.5s linear 0s infinite alternate;
    -webkit-animation: waves 0.5s linear 0s infinite alternate;
  }

  @-webkit-keyframes waves {
    10% {
      height: 20%;
    }
    20% {
      height: 60%;
    }
    40% {
      height: 40%;
    }
    50% {
      height: 100%;
    }
    100% {
      height: 50%;
    }
  }

  @keyframes waves {
    10% {
      height: 20%;
    }
    20% {
      height: 60%;
    }
    40% {
      height: 40%;
    }
    50% {
      height: 100%;
    }
    100% {
      height: 50%;
    }
  }

  #popup {
    max-height: 75%;
  }

  #popup .wrap {
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

  #popup .like_ico {
    margin-bottom: .14rem;
    width: .38rem;
  }

  #popup .input-wrap {
    padding: 0 .87rem .84rem .3rem;
    position: relative;
  }

  #popup .input-wrap input {
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

  #popup .input-wrap span {
    position: absolute;
    top: .22rem;
    right: 1.1rem;
    color: #fff;
    font-size: .24rem;
  }
</style>
