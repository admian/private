<template>
  <div id='storyDetails'>
    <x-header :left-options="{backText: ''}">
      <!--<a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a>-->
    </x-header>
    <div class="start-info">
      <p class="story-title">{{storeInfo.storyName}}</p>
      <div class="user-info clearfix">
        <router-link :to="'/person?userId='+ storeInfo.userId" class="link fl clearfix">
          <img :src="storeInfo.headUrl" class="user-p"/>
          <div class="user-n">
            <p>{{filtName(storeInfo.nickName)}}</p>
            <p class="label-n" v-if="storeInfo.storyTitleName">{{storeInfo.storyTitleName}}</p>
          </div>
        </router-link>
        <div class="focus" :class="storeInfo.isAttention ?'focus-yes': 'focus-no'"
             @click="clickFocus(storeInfo.userId,storeInfo.isAttention)"
             v-if="storeInfo.userId!=my_userId">{{storeInfo.isAttention ? '已关注' : '关注'}}
        </div>
      </div>
      <div v-if="storeInfo.voiceList && storeInfo.voiceList.length" class="video-info" @click="palyAudio">
        <img src="../../assets/img/self/vvv.png" class="vvv">
        <span v-if="isPlay" class="v-time">{{filtTimeM(currentTime)}}</span>
        <div v-if="!isPlay" class="wrap-play">
          <img class="play-ico" src="../../assets/img/play_music.png">
        </div>
      </div>
      <p class="story-connect">{{storeInfo.storyBody}}</p>
      <div class="list-pic" v-if="storeInfo.pictureList">
        <img v-if="showPic(index)" v-for="i,index in picList" :key="index" :src="i.sourceUrl">
      </div>

      <div class="loadMore" @click="showMore = !showMore" v-if="storeInfo.pictureList && storeInfo.pictureList.length > 3">
        <span>{{showMore ? '查看更多' : '收齐'}}</span>
        <Icon size="24" color="#FECF74" :type="showMore ? 'ios-arrow-down' : 'ios-arrow-up'"></Icon>

      </div>
      <p class="pulish">发布于{{getTime(storeInfo.fcd)}} 著作权归作者所有</p>
    </div>
    <div class="reply-wrap">
      <p class="title-com">{{comments}}条评论</p>
      <div class="comment_item" v-for="i,index in commentList" :key="index">
        <div class="comment_item_bd">
          <div class="clearfix">
            <router-link :to="'/person?userId='+i.userId" class="fl link">
              <img :src="i.headUrl" class="fl nick-p">
              <div class="nickname">
                <p>{{filtName(i.nickName)}}</p>
                <p>{{getTime(i.fcd)}}</p>
              </div>
            </router-link>
            <div class="fr comment_l" @click="showPopup(i.id)">
              <!--
                            <span><img src="../../assets/img/self/s_like.png" class="s_like"><span class="like-num">52</span></span>
              -->
              <span><img src="../../assets/img/self/s_leave.png" class="s_leave"></span>
            </div>
          </div>
          <p class="comment_txt">{{i.evaluateBody}}</p>
        </div>
        <div class="reply clearfix" v-if="i.storyEvaluateReplies">
          <ul>
            <li v-for="k,indexK in i.storyEvaluateReplies" :key="indexK">
              <router-link class="link" :to="'/person?userId='+k.userId">{{filtName(k.nickName)}}</router-link>
              ：<span class="com_txt">{{k.replyBody}}</span></li>
          </ul>
          <Icon v-if="i.replyCount > 1" class="fr ico" size="24" type="ios-arrow-down" @click="getReply(i.id,index)"/>
        </div>

      </div>

      <p class="comment_end">END</p>
    </div>
    <!--输入文本-->
    <div class="comment_info">
      <p class="comment_user" v-show="">回复@ <span>1111</span></p>
      <textarea class="input-txt" v-model="txtarea" placeholder="写下你的评论">{{commentTxt}}</textarea>
      <button v-if="txtarea" class="input-btn" @click="goComment()">发送</button>
      <img v-if="!txtarea"
           :src="storeInfo.isFavorite ? require('../../assets/img/like_sel_ico.png'):require('../../assets/img/self/like_story.png')"
           class="like_story fr" @click="likeStory(storeInfo.isFavorite)">
    </div>
    <!--评论区结束-->
    <audio v-if="storeInfo.voiceList && storeInfo.voiceList.length" style="display: none" controls :src="storeInfo.voiceList[0].sourceUrl"
           ref="audio"
           @play="ready"
           @timeupdate="updateTime"
           @ended="ended"
    >
    </audio>
    <popup v-model="popupState" id="popup">
      <div class="wrap">
        <div class="top clearfix">
          <span class="fl comment_num">{{commentNum}}条回复</span>
          <Icon class="fr close_ico" type="md-close" @click="popupState = false"/>
        </div>
        <Scroller v-model="scrollerStatus" height="7rem" lock-x scrollbar-y ref="scroller"
                  :bounce="true"
                  :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                  @on-pullup-loading="selPullUp">

          <ul>
            <li v-for="i,index in replyList" :key="index" class="clearfix msg_item">
              <router-link :to="'/person?userId='+i.userId"><img :src="i.headUrl" class="fl user_pic"/>
              </router-link>
              <div class="fl cont">
                <router-link :to="'/person?userId='+i.userId"><p class="nick">{{filtName(i.nickName)}}</p></router-link>
                <p class="txt">{{i.replyBody}}</p>
                <p class="time">{{getTimestamp(i.fcd)}}</p>
              </div>
              <!--<div class="fr">
                <img
                  :src="i.isPraise ? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"
                  class="like_ico" @click="upCommentNum(index)"/>
                <p class="praiseCount">{{i.praiseCount}}</p>
              </div>-->
            </li>
          </ul>
        </Scroller>

      </div>
      <div class="input-wrap">
        <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
        <span @click="goReply">发送</span>
      </div>
    </popup>

    <confirm v-model="show"
             title="您还没有登录"
             confirm-text="去登录"
             cancel-text="知道了"
             @on-confirm="onConfirm">
      <p style="text-align:center;">执行下一步需要先登录哟~~</p>
    </confirm>
  </div>
</template>

<script>
  import {XHeader, cookie, Popup, Scroller,Confirm} from 'vux'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "storyDetails",
    components: {XHeader, Popup, Scroller,Confirm},

    data() {
      return {
        //isStory: false,
        isLoading: false,
        showMore: true,
        needAdd: true,
        storePage: 1,
        commentList: [],
        picList: [],
        storeInfo: {},
        comments: '',
        commentTxt: '',
        id: '',
        txtarea: '',
        currentTime: '',
        duration: '',
        isPlay: false,
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
        popupState: false,
        isShow: false,
        commentNum: 0,
        inputTxt: '',
        replyPage: 1,
        replyId: '',
        replyList: [],
        show:false,
      }
    },
    mounted() {
      this.scroll()
    },
    computed: {
      ...mapState([

        'my_userId',
        'is_login'
      ])
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      //未登录
      onConfirm(){
        window.location.href='/login';
      },
      getData(){
        this.$post('/api/offline/story/getStoryInfoById/' + this.id, {}).then(res => {
            this.storeInfo = res;
            console.log(this.storeInfo);
            if (res.pictureList) {
              this.picList = res.pictureList
            }
          }
        )
      },
      goComment() {
        if (!this.txtarea) {
          this.$Message.warning('评论内容不能为空');
          return
        }
        if(!this.is_login){
          this.show=true;
          return
        }
        this.$post('/api/story/saveProductionEvaluate', {
          evaluateBody: this.txtarea,
          storyId: this.storeInfo.id
        }).then(res => {
          let obj = {
            fcd: Date.parse(new Date()),
            id: cookie.get('iy_userId'),
            nickName: cookie.get('iy_userNick'),
            headUrl: cookie.get('iy_userHeadPic'),
            evaluateBody: this.txtarea
          }
          this.commentList.unshift(obj)
        })
      },
      getComment(isEmpty) {
        let limit = 10;

        this.$post('/api/offline/story/queryAllEvaluatePageByStoryId/', {
          storyId: this.id,
          pageSize: limit,
          pageNum: this.storePage
        }).then(res => {
          this.comments = res.total;
          let obj = []
          this.isLoading = false;
          res.list.map(function (i) {
            i.replyPage = 0;
            obj.push(i)
          })
          if (isEmpty) {
            this.commentList = obj;
          } else {
            this.commentList.push(...obj);
          }
          if (res.list && res.pages <= this.storePage) {
            this.needAdd = false;
            return
          }
          if (!isEmpty) {
            this.$nextTick(() => {
            })
          }
        })
      },
      goReply() {
        if(!this.inputTxt){
          this.$Message.warning('回复内容不能为空');
          return
        }
        if(!this.is_login){
          this.show=true;
          return
        }
        this.$post('/api/story/saveProductionEvaluateReply', {
          replyBody: this.inputTxt,
          storyEvaluateId:this.replyId
        }).then(res => {
          let obj = {
            fcd: Date.parse(new Date()),
            id: cookie.get('iy_userId'),
            nickName: cookie.get('iy_userNick'),
            headUrl: cookie.get('iy_userHeadPic'),
            replyBody: this.inputTxt
          }
          this.replyList.unshift(obj)
        })
      },
      clickFocus(id, isAttention) {
        if(!this.is_login){
          this.show=true;
          return
        }
        if (isAttention) {
          this.$router.push({path: '/person?userId=' + id})
        } else {
          this.$post('/api/user/saveUserAttention/' + id).then(
            res => {
              this.storeInfo.isAttention = true
            }
          )
        }
      },
      getReply(id, index, popup) {
        let limit = 2;
        let page = '';
        if (popup == 'popup') {
          page = this.replyPage;
        } else {
          page = this.commentList[index].replyPage + 1;
        }
        //评论回复
        this.$post('/api/offline/story/queryAllEvaluateReplyPageByEvaluateId', {
          replayUserId: id,
          pageSize: limit,
          pageNum: page
        }).then(res => {
          if (res.pages < page) {
            this.$Message.warning('没有更多!');
            //console.log(222)
            this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉

            return
          }
          if (popup == 'popup') {

            this.replyList.push(...res.list);
            this.commentNum = res.total;
            if (res.list && res.pages <= this.replyPage) {
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
            }
            return
          }
          if (this.commentList[index].replyPage == 1) {
            this.commentList[index].storyEvaluateReplies.push(...res.list.slice(2, limit));
          } else {
            this.commentList[index].storyEvaluateReplies.push(...res.list)
          }
          this.commentList[index].replyPage = page;
        })

      },
      showPopup(id) {
        this.popupState = true;
        this.replyList = [];
        this.replyId = id;
        this.getReply(this.replyId, '', 'popup')
      },
      selPullUp() {
        this.replyPage++;
        this.getReply(this.replyId, '', 'popup');
        console.log(111)
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

      showPic(i) {
        if (this.showMore && i <= 2 || !this.showMore) {
          return true
        } else {
          return false
        }
      },
      likeStory() {
        if(!this.is_login){
          this.show=true;
          return
        }
        this.$post('/api/story/updateStoryFavorite', {channelItemId: this.storeInfo.id,channelId:4}).then(res => {
          //this.isStory = !this.isStory
          this.storeInfo.isFavorite = !this.storeInfo.isFavorite
        })
      },

      getTime(time) {
        let date = new Date(time);
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;

        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + h + ':' + minute ; //+ ':' + second
        return currentdate;
      },
      scroll() {
        this.isLoading = false;
        window.onscroll = () => {
          // 距离底部200px时加载一次
          let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200

          if (bottomOfWindow && this.isLoading == false) {
            this.isLoading = true
            if (this.needAdd) {
              this.storePage++;
              this.getComment(false)
            }
          }
        }
      },
      palyAudio() {
        if (this.$refs.audio.paused) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
          this.isPlay = false;

        }
      },
      /*      pauseAudio() {
              this.$refs.audio.pause();
            },*/
      ready() {
        console.log('play');
        this.isPlay = true;
      },
      updateTime(e) {
        this.currentTime = parseInt(e.target.currentTime);
        this.duration = parseInt(e.target.duration);
      },
      ended() {
        console.log('ended');
        this.isPlay = false;
      },
      filtTimeM(time) {
        let txt = '';
        if (time < 60) {
          let s = time < 10 ? '0' + time : time;
          txt = '00:' + s;
        } else {
          let m = parseInt(time / 60);
          let s = time % 60
          m = m < 10 ? '0' + m : m;
          s = s < 10 ? '0' + s : s;
          txt = m + ':' + s
        }
        return txt;
      }
    },
    created() {
      this.id = this.$route.query.id;
      console.log(this.id);
      if (this.id) {
        this.getData()
        this.getComment(true)
      }
    }
  }
</script>
<style>
  #storyDetails .weui-dialog{
    background-color: #1F173E;
  }
  #storyDetails .weui-dialog__bd:first-child,
  #storyDetails .weui-dialog__btn_primary,
  #storyDetails .weui-dialog__bd{
    color: #fff;
  }
</style>
<style scoped>
  .start-info {
    border-bottom: .2rem solid #251740;
  }

  .story-title {
    font-size: .34rem;
    color: #fff;
    line-height: .56rem;
    padding: 0 .3rem;
  }

  .user-info {
    padding: 0 .3rem;
  }

  .list-pic {
    width: 92%;
    margin: 0 auto .4rem;
  }

  .link {
    color: #fff;
  }

  .wrap-play {
    position: absolute;
    top: 1.4rem;
    left: 3.26rem;
    padding: .26rem;
    background-color: #1A184B;
    border: 1px solid #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .play-ico {
    width: .3rem;
    height: .3rem;
  }

  .loadMore {
    margin: 0 auto .4rem;
    width: max-content;
    color: #FECF74;
    font-size: .2rem;
  }

  .user-p {
    width: .7rem;
    height: .7rem;
    border: 2px solid rgba(255, 255, 255, .8);
    border-radius: 50%;
    float: left;
    margin-right: .14rem;
  }

  .user-n {
    font-size: .3rem;
    display: inline-block;
  }

  .label-n {
    padding: 0 6px;
    height: .34rem;
    line-height: .3rem;
    text-align: center;
    border: 2px solid rgba(100, 83, 185, 1);
    border-radius: .17rem;
    color: rgba(226, 213, 255, 1);
    font-size: .18rem;
    display: inline-block;
    margin-top: .14rem;
  }

  .focus {
    float: right;
    width: 1.02rem;
    height: .52rem;
    font-size: .22rem;
    border-radius: .26rem;
    text-align: center;
  }

  .focus-no {
    color: #130C21;
    background: #FECF74;
    line-height: .52rem;
    margin-top: .1rem;
  }

  .focus-yes {
    color: #fff;
    border: 2px solid rgba(76, 53, 115, 1);
    line-height: .48rem;
    margin-top: .1rem;
  }

  /*语音*/
  .video-info {
    margin-top: .5rem;
    height: 3.38rem;
    background: url("../../assets/img/self/video-bg.png");
    background-size: 100% 100%;
    position: relative;
  }

  .vvv {
    position: absolute;
    width: 3.52rem;
    height: .7rem;
    top: 1.46rem;
    left: 1.88rem;
  }

  .v-time {
    position: absolute;
    top: 1.7rem;
    left: 3.26rem;
    font-size: .3rem;
  }

  /*故事*/
  .story-connect {
    color: #D9D7D7;
    font-size: .34rem;
    line-height: .56rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding: 0 .3rem;
  }

  .pulish {
    margin-bottom: .5rem;
    font-size: .22rem;
    color: #d3d2d4;
    padding: 0 .3rem;
  }

  /*评论*/
  .reply-wrap {
    padding: 0 .3rem;
    margin-top: .3rem;
  }

  .title-com {
    padding-bottom: .3rem;
    border-bottom: .02rem solid #251740;
  }

  .comment_item {
    border-bottom: .02rem solid #251740;
    padding: .3rem 0;
  }

  .nick-p {
    width: .5rem;
    height: .5rem;
    border: 2px solid rgba(255, 255, 255, .8);
    border-radius: 50%;
  }

  .nickname {
    margin-top: .12rem;
    margin-left: .18rem;
    float: left;
  }

  .nickname p:first-child {
    font-size: .26rem;
  }

  .nickname p:last-child {
    font-size: .24rem;
    margin-top: .1rem;
  }

  .comment_l {
    font-size: .22rem;
    height: .3rem;
  }

  .comment_l span {
    margin-right: .1rem;
    float: left;
  }

  .like-num {
    margin-top: .05rem;
    color: #6453B9;
  }

  .s_like {
    width: .32rem;
    height: .3rem;
    float: left;
    margin-right: .04rem;
  }

  .s_leave {
    width: .32rem;
    height: .3rem;
  }

  .comment_txt {
    margin-top: .38rem;
    font-size: .32rem;
    color: #fff;
  }

  .comment_item .reply {
    background: #251740;
    margin-top: .39rem;
  }

  .comment_item .reply .ico {
    margin-right: .24rem;
    margin-bottom: .28rem;
  }

  .comment_item ul li {
    padding: .21rem .26rem;
    color: #FECF74;
    font-size: .3rem;
    line-height: .4rem;
  }

  .comment_item ul li:first-of-type {
    padding-bottom: 0;
  }

  .comment_item ul li span {
    padding: 0 .06rem 0 0;
  }

  .com_txt {
    color: #fff;
  }

  .comment_end {
    color: #251740;
    font-size: .28rem;
    margin-bottom: 1.02rem;
    text-align: center;
    margin-top: .2rem;
  }

  /*评论输入*/
  .comment_info {
    background: #251740;
    height: 1.02rem;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .input-txt {
    width: 5.25rem;
    height: .66rem;
    font-size: .26rem;
    border: none;
    background-color: transparent;
    color: #59389A;
    padding: .2rem .34rem;
    border-radius: 33px;
    margin-top: .18rem;
    margin-left: .29rem;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #59389A;
    font-size: .26rem;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #59389A;
    font-size: .26rem;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #59389A;
    font-size: .26rem;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #59389A;
    font-size: .26rem;
  }

  .input-btn {
    float: right;
    width: .8rem;
    height: .48rem;
    color: #fff;
    font-size: .26rem;
    text-align: center;
    line-height: .48rem;
    -border: .02rem solid #8A60FF;
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: .1rem;
    margin-top: .25rem;
    margin-right: .5rem;
  }

  .like_story {
    width: .40rem;
    height: .36rem;
    margin-top: .35rem;
    margin-right: .5rem;
  }

  .comment_user {
    position: absolute;
    left: .6rem;
    top: -.25rem;
    font-size: .26rem;
    color: #59389A;
  }

  .comment_user span {
    margin-left: .05rem;
  }
</style>
