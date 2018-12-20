<template>
  <div id="activityDetails">
    <x-header :left-options="{backText:activeInfo.dreamName}"><a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img
      class="share_ico" src="../../assets/img/share_ico.png"></a></x-header>
    <div class="container">
      <div class="act clearfix" v-if="activeInfo.dreamId">
        <div class="fl">
          <p class="actDes">{{activeInfo.productionName}}</p>
          <p class="actTime"><i>截止日期</i>{{getDate(activeInfo.dreamEndDate)}}</p>
        </div>
        <router-link :to="'/details?id='+activeInfo.dreamId" class="fontDetail fr">详情</router-link>
      </div>
      <!--------------------------------------------------------->
      <div class=" is_act">

        <!--
        <div class="actVideo is_act">
-->
        <!--竖屏、横屏-->

        <!--活动标签-->
        <div class="actLabel">{{activeInfo.dreamName}}</div>

        <div id="video-container" style="margin: 0px auto;">

        </div>
        <div class="actNotice">{{activeInfo.description}}</div>
        <!--push动效暂用图片-->
        <div v-if="activeInfo.dreamId" class="icon-push" @click="push"></div>

      </div>
      <!------------------------------------------------------------------>
      <div class="actUser clearfix" v-if="activeInfo">
        <div class="fl" @click="isAttention(activeInfo.userId,activeInfo.isAttention)">
          <div class="userPhoto fl">
            <img :src="baseUrl + activeInfo.headUrl" class="userP">
            <div class="focus"><img v-if="!activeInfo.isAttention" src="../../assets/img/dream/focus.png"></div>
          </div>
          <div class="userMessage fr">
            <p class="userName">{{filtName(activeInfo.nickName)}}</p>
            <!--
                          <span class="actNo">no.{{list[listIndex].dreamTop}}</span>
            -->
          </div>
        </div>
        <div class="llTwo fr">
          <div class="fl" @click="upActNum" :class="activeInfo.isFavorite ? 'like_sel' : 'like'"><i class="num">{{activeInfo.favoriteCount}}</i>
          </div>
          <div class="leave fl" @click="showPopup"><i class="num">{{activeInfo.evaluateCount}}</i></div>
        </div>
      </div>
      <!------------------------------------------------------------------------->
      <div class="recommended">
        <div class="slider-wrap">
          <ul class="list-nav clearfix">
            <li class="list-item fl" v-for="i,index in list" :key="index" @click="changeVideo(index)">
              <img :src="i.productionCover">
              <router-link :to="'/person?userId='+i.userId" class="recom clearfix">
                <div class="fl recoml">
                  <img :src="baseUrl + i.headUrl" class="recomImg">
                  <!--
                       <span class="remNo">no.{{i.dreamTop}}</span>
                  -->
                </div>
                <div class="fr recomr">
                  <p class="recomName">{{filtName(i.nickName)}}</p>
                  <p v-if="i.pushCount" class="recomPush"><i>{{i.pushCount}}</i>push</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
              <router-link :to="'/person?userId='+i.userId"><img :src="baseUrl+ i.headUrl" class="fl user_pic"/></router-link>
              <div class="fl cont">
                <router-link :to="'/person?userId='+i.userId"><p class="nick">{{filtName(i.nickName)}}</p></router-link>
                <p class="txt">{{i.evaluateBody}}</p>
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
        </scroller>

      </div>
      <div class="input-wrap">
        <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
        <span @click="goComment">发送</span>
      </div>
    </popup>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {Popup, XHeader, dateFormat,Scroller} from 'vux';
  import {Message} from 'iview';

  function getParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }

  export default {
    name: "dubDetails",
    components: {XHeader, Popup, Scroller,Message},
    data() {
      return {
        title: '',
        id: '',
        type: '',
        list: [],
        routerType:'',
        commentList: [],
        commentNum: 0,
        isShow: false,
        listIndex: 0,
        page:1,
        inputTxt: '',
        activeInfo: {},
        popupState: false,
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
        pushNum: 0,
        timert:''
      }
    },
    computed: {
      ...mapState([
        'baseUrl',
        'is_login'
      ]),
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      showPopup() {
        this.popupState = true;
        if (!this.commentList.length) {
          this.getComment(true)
        }
      },
      //查询作品详情
      getVideoInfo() {
        this.$post('/api/offline/common/getProductionInfoById/' + this.list[this.listIndex].id, {}).then(res => {
          this.activeInfo = res;
          this.playerOptions.sources[0].src = res.videoUrl;
          this.playerOptions.poster = res.productionCover;
        })
      },
      getDate(date) {
        return dateFormat(new Date(date), 'YYYY-MM-DD')
      },
      //关注
      isAttention(id, isAttention) {
        if (isAttention){
          this.$router.push({path: '/person?userId=' + id})
        } else {
          this.$post('/api/user/saveUserAttention/' + id).then(
            res => {

            }
          )
        }
      },
      //查询评论
      getComment(isEmpty) {
        let limit = 10;
        let url = '/api/offline/common/queryAllEvaluatePageByProductionId';
       /* if (this.routerType == 'impromptu') {
          url = '/api/offline/impromptu/queryAllEvaluatePageByProductionId';
        }*/
        this.$post(url, {productionId: this.activeInfo.id, pageSize: limit, pageNum: this.page}).then(
          res => {
            this.commentNum = res.total;
            if (isEmpty) {
              this.commentList = res.list;
              //console.log(this.commentList);
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
      /*作品点赞*/
      upActNum() {
          let url = '/api/common/updateProductionFavorite';
         /* if (this.routerType == 'impromptu') {
            url = '/api/impromptu/updateProductionFavorite';
          }*/
          this.$post(url, {
            channelItemId: this.activeInfo.id,
            channelId: this.activeInfo.channelId
          }).then(
            res => {
              this.isFavorite = !this.isFavorite
            }
          )
      },
      /*评论点赞*/
      upCommentNum(i) {
        let url = '/api/common/updateProductionEvaluatePraise';
       /* if (this.routerType == 'impromptu') {
          url = '/api/impromptu/updateProductionEvaluatePraise';
        }*/
        this.$post(url, {evaluateId: this.commentList[i].productionId}).then(
          res => {
            this.commentList[i].isPraise = !this.commentList[i].isPraise
            console.log(this.commentList, i)
          }
        )
      },
      changeVideo(i) {
        this.activeInfo = this.list[i];
        this.playerOptions.sources[0].src = this.activeInfo.videoUrl;
        this.playerOptions.poster = this.activeInfo.productionCover;
      },
      //作品评论
      goComment() {
        if (!this.inputTxt) {
          this.$Message.warning({
            content: '评论不能为空!'
          });
          return
        }
        let data = {
          productionId: this.activeInfo.id,
          evaluateBody: this.inputTxt
        }
        let url = '/api/common/saveProductionEvaluate';
      /* if (this.routerType == 'impromptu') {
          url = '/api/impromptu/saveProductionEvaluate'
        }*/
        this.$post(url, data).then(
          res => {
            this.commentList[i].isPraise = !this.commentList[i].isPraise
          }
        )
      },
      selPullUp() {
        this.page++;
        this.getComment(false)
      },
      showLoadTxt:function () {
        if (this.showLoad) {

        } else {
          this.showLoad = true;
          setTimeout(() => {
            this.$nextTick(() => {
            })
          }, 500)
        }
      },
      push() {
        let _this = this;
        this.pushNum++;
        clearTimeout(this.timert);
        this.timert = setTimeout(function () {
          _this.$post('/dream/push', {productionId: _this.activeInfo.id,pushSum:_this.pushNum}).then(res => {
          })
        }, 1000)
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.title = this.$route.query.title;
      this.type = this.$route.query.type;
      //this.routerType = this.$route.query.routerType;
      this.dreamId = this.$route.query.dreamId;
      //console.log(this.dreamId);
      //let _this=this;

      if(this.dreamId){
          //作品详情列表
          this.$post('/api/offline/dream/queryDreamProductionInfoList',{
            dreamId:this.dreamId
          }).then(res=>{
            this.list=res.list
            this.$post('/api/offline/common/getProductionInfoById/'+res.list[0].id).then(res=>{
              this.activeInfo=res;
            })
          })

          //作品详情

        //}
        //相同作品列表
       /* this.$post('/api/offline/dream/queryDreamProductionInfoList',{dreamId:this.dreamId}).then(res=>{
          //console.log(res);

        })*/
      }else if(this.type){
        let data = {};
        let url = '/api/offline/entertainment/queryProductionTypeProductionInfoList'
         if (this.routerType == 'impromptu') {
          data = {
            channelId: this.type,
            pageNum: 1,
            pageSize: 10
          }
          url = '/api/offline/impromptu/queryProductionTypeProductionInfoList'
        }else{
          data = {productionType: this.type}
        }
        this.$post(url, data).then(
          res => {
            this.list = res.list;
            this.getVideoInfo();
          }
        )
      }else if (this.id) {
        //查询作品详情
        this.$post('/api/offline/common/getProductionInfoById/' + this.id, {}).then(res => {
          this.activeInfo = res;
          this.$post('/api/offline/entertainment/queryProductionTypeProductionInfoList', {productionType: res.channelId}).then(
            res => {
              this.list = res.list;
            }
          )
        })
      }
      if (this.is_login) {
        this.$post('/api/push/getPushSum', {}).then(res => {

        })
      }

    },
    mounted(){
      let rtmp = getParams('rtmp'),
        flv = getParams('flv'),
        m3u8 = getParams('m3u8'),
        mp4 = getParams('mp4'),
        live = (getParams('live') == 'true' ? true : false),
        coverpic = getParams('coverpic'),
        width = getParams('width'),
        height = getParams('height'),
        autoplay = (getParams('autoplay') == 'true' ? true : false);

      let options = {
        rtmp: rtmp,
        flv: flv,
        m3u8: m3u8 ,
        mp4: mp4 || '//1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4',
        coverpic: coverpic || {
          style: 'cover',
          src: '//vodplayerinfo-10005041.file.myqcloud.com/3035579109/vod_paster_pause/paster_pause1469013308.jpg'
        },
        autoplay: autoplay ? true : false,
        live: live,
        width: '100%' || document.documentElement.clientWidth * .92,
        height: 'auto' || '320'
      };

      let player = new TcPlayer('video-container', options);
      window.qcplayer = player;

    }

  }
</script>

<style>
  #activityDetails .vux-popup-dialog {
    background: #33254C;
  }
</style>
<style scoped>
  .container {
    /*  padding-top: .6rem;*/
    width: 100%;
    padding-bottom: .36rem;

  }

  .act {
    color: #fff;
    padding-left: .28rem;
    padding-right: .3rem;
  }

  .actDes {
    font-size: .3rem;
    margin-bottom: .16rem;
  }

  .actTime {
    font-size: .28rem;
  }

  .actTime i {
    font-size: .2rem;
    margin-right: .18rem;
  }

  .fontDetail {
    font-size: .28rem;
    color: #FECF74;
  }

  .is_act {
    padding: 1.7rem 0 1.4rem;
  }

  /*--------------------视频--------------------------*/
  .actVideo {
    height: 7rem;
    margin-top: .4rem;
    /*    background-color: #f1f1f1;*/
    padding: 0 .3rem;
  }

  /*-------------------------------------------*/
  .actUser {
    height: 1.1rem;
    margin: 0 .44rem;
    border-bottom: .03rem solid #25183F;
    padding-left: .1rem;
  }

  .userPhoto {
    position: relative;
    padding-top: .03rem;
  }

  .userP {
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    border: 1px solid #fff;
  }

  .actNotice {
    position: absolute;
    bottom: .2rem;
    left: .5rem;
    font-size: .28rem;

  }

  .focus {
    width: .32rem;
    height: .32rem;

    /*background:rgba(103,91,255,1);*/
    border-radius: 50%;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .userMessage {
    margin-left: .2rem;
    color: #fff;
  }

  .userName {
    font-size: .28rem;
    margin-top: .18rem;
  }

  .actNo {
    padding: 0 2px;
    height: .25rem;
    line-height: .25rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-top: .1rem;
    text-align: center;
  }

  .llTwo {
    color: #fff;
    margin-top: .43rem;
  }

  .like {
    height: .35rem;
    background: url("../../assets/img/dream/like.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }

  .like_sel {
    height: .35rem;
    background: url("../../assets/img/dream/like_sel.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }

  .leave {
    height: .35rem;
    background: url("../../assets/img/dream/leave.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
  }

  .num {
    font-size: .2rem;
  }

  /*---------------------------------------------------------------------------*/
  .recommended {
    margin-top: .3rem;
    margin-left: .28rem;
  }

  .slider-wrap {
    overflow-y: hidden;
  }

  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {
    display: none;
  }

  .list-nav {
    width: max-content;
    height: max-content;
  }

  .list-item {
    width: 1.86rem;
    height: 1.86rem;
    margin-right: .1rem;
    position: relative;
  }

  .recom {
    position: absolute;
    bottom: 0;
    z-index: 10;
    height: .6rem;
    width: 100%;
  }

  .recoml {
    margin-left: .12rem;
  }

  .recomImg {
    width: .34rem;
    height: .34rem;
    border-radius: 50%;
  }

  .remNo {
    display: block;
    padding: 0 2px;
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

  .recomName {
    font-size: .14rem;
    color: #fff;
  }

  .recomPush {
    font-size: .16rem;
    color: #fff;
    margin-top: .1rem;
  }

  .recomPush i {
    margin-right: .05rem;
  }
</style>
