<template>
  <!--故事-->
  <div id="story">
      <x-nav></x-nav>
      <div class="banner">
        <Carousel v-if="banner.length"
                  class="carousel"
                  :autoplay="true"
                  :autoplay-speed="3000"
                  dots="none"
                  arrow="always">
          <CarouselItem v-for="i,index in banner" :key="index">
            <div class="carousel-item"><img :src="i.imageUrl"></div>
          </CarouselItem>

        </Carousel>
      </div>
      <div class="hot bg21">
        <h3>热门推荐</h3>
        <div class="item clearfix" v-for="i,index in topList" :key="index">
          <div class="ico fl">
            <img v-if="!i.isPlay" class="fl"
                 :src="i.voiceList.length > 0 ? require('../../assets/img/music_ico.png'): require('../../assets/img/txt_ico.png')"
                 @click="palyAudio(index,'top')">
            <div v-if="i.isPlay" class="demo-music fl" @click="pauseAudio(index,'top')">
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
              <router-link class="link" :to="'/storyDetails?id='+ i.id">
                <p class="title">我的故事有人听吗</p>
                <p v-if="i.voiceList.length <= 0" class="cont">我的心我的夜，到底放在哪里？</p>
              </router-link>

              <Slider v-if="i.voiceList.length > 0 " disabled v-model="i.value" :show-input="false"
                      :show-tip="'never'"></Slider>
            </div>
          </div>
        </div>
      </div>
      <!--
          <scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scrollerStore" :bounce="true"
                    :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                    @on-pullup-loading="addStore">
      -->
      <ul class="list">
        <li class="bg21 item" v-for="i,index in storeList" :key="index">
          <!--非音频-->
          <div class="wrap" v-if="!i.voiceList.length">
            <div class="clearfix top">
              <router-link class="link" :to="'/storyDetails?id='+i.id">
                <h4 class="fl">{{i.storyName}}</h4>
              </router-link>
              <span class="fr tag" v-if="i.storyTitleName">{{i.storyTitleName}}</span>
            </div>
            <router-link class="link" :to="'/storyDetails?id='+i.id">

              <p class="content">{{filtTxt(i.storyBody)}}</p>
            </router-link>
            <div class="list-pic clearfix" v-if="i.pictureList.length">
              <div @click="prev(index,k)" v-for="pic,k in i.pictureList" :key="k"
                   class="list-pic-item fl previewer-demo-img"
                   :style="{backgroundImage: 'url('+pic.sourceUrl+')'}"
                   v-if="k < 3"></div>
            </div>
          </div>
          <!--非音频-->

          <!--音频-->
          <div class="wrap isMusic clearfix" v-if="i.voiceList.length">
            <div class="music-pic fl" @click.stop="palyAudio(index,'store')">
              <!--
                          <img src="" class="pic">
              -->
              <img v-if="!i.isPlay" class="play" src="../../assets/img/play_music.png">
              <div v-if="i.isPlay" class="demo-music fl" @click.stop="pauseAudio(index,'store')">
                <div class="music">
                  <ul id="waves" class="movement">
                    <li class="li1"><span class="ani-li"></span></li>
                    <li class="li2"><span class="ani-li"></span></li>
                    <li class="li3"><span class="ani-li"></span></li>
                    <li class="li4"><span class="ani-li"></span></li>
                    <li class="li5"><span class="ani-li"></span></li>
                  </ul>
                  <div class="music-state"></div>
                </div>

              </div>

            </div>
            <div class="music-info fl">
              <router-link class="link" :to="'/storyDetails?id='+i.id">

                <h4>{{i.storyName}}</h4>
              </router-link>
              <!--
                            <p class="cont">{{i.storyBody}}</p>
              -->
              <Slider v-model="i.value" disabled :show-input="false" :show-tip="'never'" class="slider"></Slider>

            </div>
            <span class="fr tag">{{i.storyTitleName}}</span>
          </div>

          <!--音频-->
          <div class="info clearfix">
            <router-link :to="'/person?userId='+i.userId" class="fl user clearfix">
              <div class="user-pic fl">
                <img :src="i.headUrl">
              </div>
              <span class="user_nick">{{filtName(i.nickName)}}</span>
            </router-link>
            <div class="fr nums clearfix">
              <div class="fl likes clearfix" @click="upCommentNum(index,'store')">
                <img
                  :src="i.isFavorite ? require('../../assets/img/like_p_sel.png') : require('../../assets/img/like_p.png')"
                  class="fl like_ico"/>
                <span class="fl num">{{filtNunm(i.favoriteCount)}}</span>
              </div>
              <div class="fl comment clearfix" @click="showPopup(i.id)">
                <img src="../../assets/img/comment_p.png" class="fl comment_ico"/>
                <span class="fl num">{{filtNunm(i.evaluateCount)}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!--
          </scroller>
      -->
      <div v-transfer-dom>
        <previewer :list="picList" :options="options" ref="previewer"></previewer>
      </div>
      <popup v-model="popupState" id="popup">
        <div class="wrap">
          <div class="top clearfix">
            <span class="fl comment_num">{{commentNum}}条评论</span>
            <Icon class="fr close_ico" type="md-close" @click="popupState = false"/>
          </div>
          <scroller v-show="isShow" v-model="scrollerStatus" height="7rem" lock-x scrollbar-y ref="scroller"
                    :bounce="true"
                    :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                    @on-pullup-loading="selPullUp">

            <ul>
              <li v-for="i,index in commentList" :key="index" class="clearfix msg_item">
                <router-link :to="'/person?userId='+i.userId"><img :src="i.headUrl" class="fl user_pic"/>
                </router-link>
                <div class="fl cont">
                  <router-link :to="'/person?userId='+i.userId"><p class="nick">{{filtName(i.nickName)}}</p></router-link>
                  <p class="txt">{{i.evaluateBody}}</p>
                  <p class="time">{{getTimestamp(i.fcd)}}</p>
                </div>
                <!--
                              <div class="fr">
                                <img
                                  :src="i.isPraise ? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"
                                  class="like_ico" @click="upCommentNum(index,'comment')"/>
                                <p class="praiseCount">{{i.praiseCount}}</p>
                              </div>
                -->
              </li>
            </ul>
          </scroller>

        </div>
        <div class="input-wrap">
          <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
          <span @click="goComment">发送</span>
        </div>
      </popup>
      <router-link to="/" class="post_story">
        <img src="../../assets/img/story_btn.png">
      </router-link>
      <audio style="display: none" controls :src="audio_url"
             ref="audio"
             @play="ready"
             @timeupdate="updateTime"
             @ended="ended"
      >
      </audio>

    </div>

</template>

<script>
  import {Popup, XTextarea, Scroller, Previewer, TransferDom} from 'vux'
  import XNav from "../../components/x-nav";
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "story",
    components: {
      Popup,
      XTextarea,
      XNav,
      Scroller,
      Previewer
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState([

      ]),
    },
    data() {
      return {
        audio_url: '',
        banner: [],
        storeList: [],
        commentList: [],
        picList: [],
        topList: [],
        inputTxt: '',
        is_txt: false,
        isShow: false,
        storePage: 1,
        commentPage: 1,
        commentNum: 0,
        is_like: true,
        popupState: false,
        placeholder: '我也来说两句',
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
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        currentTime: '',
        duration: "",
        audioType: '',
        audioIndex: '',
        isLoading: false,
        needAdd: true,
        storeId: '',

      }
    },
        mounted() {
          this.scroll()
        },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      prev(index, k) {
        this.picList = [];
        let arr = [];
        for (let i = 0; i < this.storeList[index].pictureList.length; i++) {
          let obj = {
            src: this.storeList[index].pictureList[i].sourceUrl,
            msrc: this.storeList[index].pictureList[i].sourceUrl
          }
          arr.push(obj);
        }
        this.picList = arr;
        this.show(k);
      },
      show(index) {
        this.$refs.previewer.show(index)
      },
      filtTxt(i) {
        let txt = i;
        if (i.length > 64) {
          txt = i.slice(0, 64);
        }
        return txt
      },
      showPopup(id) {
        if (!this.commentList.length) {
          this.storeId = id;
          this.popupState = true;
          this.getComment(true)
        }
      },
      changeLike(index) {
        console.log(index)
      },
      selPullUp() {
        this.commentPage++;
        this.getComment(false)
      },
      addStore() {
        this.storePage++;
        this.getStore(false)
      },
      getStore(isEmpty) {
        let limit = 10;
        let obj = [];
        this.$post('/api/offline/story/queryStroyList', {pageSize: limit, pageNum: this.storePage}).then(
          res => {
            this.isLoading = false;
            res.list.map(function (i) {
              i.isPlay = false;
              i.value = 0;
              obj.push(i)
            })
            if (isEmpty){
              this.storeList = obj;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.storeList.push(...obj);
            }

            if (res.list && res.pages <= this.storePage) {
              this.needAdd = false;
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {

              })
            }
          }
        )
      },
      getComment(isEmpty) {
        let limit = 10;
        let url = '/api/offline/story/queryAllEvaluatePageByStoryId';

        this.$post(url, {productionId: this.storeId, pageSize: limit, pageNum: this.commentPage}).then(
          res => {
            this.commentNum = res.total;
            if (isEmpty) {
              this.commentList = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.commentList.push(...res.list);
            }
            if (res.list && res.list.length < limit) {
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              this.isShow = true;
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {

              })
            }
          }
        )
      },
      upCommentNum(i, type) {
        let id = type == 'store' ? this.storeList[i].id : this.commentList[i].id
        let url = '/api/story/updateStoryFavorite';
        this.$post(url, {storyId: id}).then(
          res => {
            if (type == 'store') {
              this.storeList[i].isPraise = !this.storeList[i].isPraise
            } else {
              this.commentList[i].isPraise = !this.commentList[i].isPraise

            }
          }
        )
      },
      goComment() {
        if (!this.inputTxt) {
          this.$Message.warning({
            content: '评论不能为空!'
          });
          return
        }
        let data = {
          productionId: this.storeId,
          evaluateBody: this.inputTxt
        }
        let url = '/api/entertainment/saveProductionEvaluate';
        if (this.isImpromptu) {
          url = '/api/impromptu/saveProductionEvaluate'
        }
        this.$post(url, data).then(
          res => {
            this.commentList[i].isPraise = !this.commentList[i].isPraise
          }
        )
      },
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
      palyAudio(index, type) {
        let url = type == 'store' ? this.storeList[index].voiceList[0].sourceUrl : this.topList[index].voiceList[0].sourceUrl
        if (this.audioType != type || this.audioIndex != index) {
          this.$refs.audio.src = url;
          this.$refs.audio.play();
          this.topList.map(function (i) {
            i.value = 0;
            i.isPlay = false;
          })
          this.storeList.map(function (i) {
            i.value = 0;
            i.isPlay = false;
          })
          this.audioType = type;
          this.audioIndex = index;
        } else {
          if (this.$refs.audio.paused) {
            this.$refs.audio.play();
          } else {
            if (type == 'top') {
              this.topList[index].isPlay = false;
            } else {
              this.storeList[index].isPlay = false;
            }
            this.$refs.audio.pause();
          }
        }
      },
      pauseAudio(index, type) {
        if (type == 'top') {
          this.topList[index].isPlay = false;
        } else if (type == 'store') {
          this.storeList[index].isPlay = false;
        }
        this.$refs.audio.pause();
      },
      ready() {
        if (this.audioType == 'top') {
          this.topList[this.audioIndex].isPlay = true;
        } else {
          this.storeList[this.audioIndex].isPlay = true;
        }
      },
      updateTime(e) {
        this.currentTime = parseInt(e.target.currentTime);
        this.duration = parseInt(e.target.duration);
        this.storeList[this.audioIndex].value = this.currentTime / this.duration * 100;
        if (this.audioType == 'top') {
          this.topList[this.audioIndex].value = this.currentTime / this.duration * 100;
        } else {
          this.storeList[this.audioIndex].value = this.currentTime / this.duration * 100;
        }
      },
      ended() {
        console.log('ended')
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
              this.storePage++;
              this.getStore(false)
            }
          }
        }
      }
    }
    ,
    created() {
      /*获取轮播图*/
      let _this = this;
      this.$post('/api/offline/banner/queryAllBannerByChannelId/' + 4, {}).then(res => {
        this.banner = res;
      })
      /*热门*/
      this.$post('/api/offline/story/queryStroyRecommendList', {}).then(res => {
        let arr = [];
        res.map(function (i) {
          let obj = i;
          obj.isPlay = false;
          obj.value = 0;
          arr.push(obj)
        })
        this.topList = arr;
      })
      this.getStore(true);
    }


  }
</script>
<style>
  #story .ivu-slider-wrap {
    margin-top: .35rem;
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

  #story .isMusic .ivu-slider-wrap {
    margin-top: .35rem;
  }

  .ivu-slider-disabled {
    width: 3rem;
  }
</style>
<style scoped>
  /*  #popup .wrap {
      height: 4.3rem;
    }*/

  .carousel {
    margin: .35rem auto 0;
    width: 92%;
  }

  .carousel-item {
    height: 3.4rem;
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
  }

  .bg21 {
    background-color: #211934;
  }

  .hot {
    padding-top: .3rem;
    width: 92%;
    margin: 0 auto;
  }

  .hot h3 {
    margin-bottom: .3rem;
    text-align: right;
    font-size: .34rem;
    margin-right: .54rem;
    color: #fff;
  }

  .hot .cont {
    font-size: .24rem;
    margin-bottom: .28rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .hot .ico img {
    margin-top: .46rem;
    margin-left: .3rem;
    width: .6rem;
    height: .6rem;
  }

  .hot .txt {
    width: 6rem;
    padding-left: .22rem;
    border-top: 1px solid #30214A;
  }

  .hot .txt .link {
    color: #fff;
    display: block;
  }

  .hot .item:first-of-type .txt {
    border-top: none;
  }

  .hot .txt .title {
    margin-top: .46rem;
    font-size: .3rem;
    margin-bottom: .12rem;
  }

  .list {
    margin: .24rem auto;
    width: 92%;
  }

  .list .link {
    display: block;
    color: #fff;
  }

  .list .item {
    padding: .3rem;
    margin-bottom: .24rem;
  }

  .list .item .wrap .top {
    padding-bottom: .3rem;
  }

  .list .item .wrap h4 {
    font-size: .34rem;
  }

  .list .item .wrap .tag {
    padding: 0 .1rem;
    font-size: .18rem;
    line-height: .34rem;
    height: .34rem;
    border: 1px solid #6453B9;
    -webkit-border-radius: .17rem;
    -moz-border-radius: .17rem;
    border-radius: .17rem;
  }

  .list .item .info {
    margin-top: .4rem;
  }

  .list-pic {
    margin-left: -.16rem;
    margin-bottom: .4rem;
  }

  .list-pic-item {
    margin-left: .15rem;
    width: 2rem;
    height: 1.8rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .list .content {
    font-size: .26rem;
    line-height: .36rem;
    margin-bottom: .38rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .info .user {
    color: #fff;
  }

  .info .user-pic img {
    margin-right: .17rem;
    width: .58rem;
    height: .58rem;
  }

  .info .user_nick {
    font-size: .28rem;
    line-height: .58rem;
  }

  .info .nums {
    padding-top: .08rem;
    font-size: .24rem;
    line-height: .3rem;
  }

  .info .nums img {
    margin-right: .1rem;
    width: .3rem;
    height: .3rem;
  }

  .info .nums .likes {
    margin-right: .2rem;
  }

  .isMusic .music-pic {
    margin-right: .2rem;
    position: relative;
    width: 1.34rem;
    height: 1.34rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 2px solid #fff;
    background: -webkit-linear-gradient(#6453b9, #342c6c); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#6453b9, #342c6c); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#6453b9, #342c6c); /* Firefox 3.6 - 15 */
    background: linear-gradient(#6453b9, #342c6c); /* 标准的语法 */
  }

  .isMusic h4 {
    margin-top: .25rem;
    margin-bottom: .2rem;
  }

  .isMusic .play {
    width: .36rem;
    height: .44rem;
    position: absolute;
    top: .45rem;
    left: .5rem;
  }

  .isMusic .cont {
    width: 3.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .music-info {
    width: 3rem;
    font-size: .24rem;
  }

  .post_story {
    width: .9rem;
    height: .9rem;
    position: fixed;
    bottom: 1.2rem;
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
    top: .1rem;
    left: .1rem;
  }

  .isMusic .demo-music .music {
    top: 0;
    left: .15rem;
    transform: scale(1.4);
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

  .isMusic .demo-music #waves li {
    width: 10%;
    margin-right: 2px;
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


</style>
