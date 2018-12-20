<template>
  <div id="activityDetails">
    <x-header :left-options="{backText:activeInfo.dreamName}">
      <!--<a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a>-->
    </x-header>
    <div class="container">
      <div class="act clearfix">
        <div class="fl">
          <p class="actDes">{{description}}</p>
          <p class="actTime"><i>截止日期</i>{{getDate(activeInfo.dreamEndDate)}}</p>
        </div>
        <router-link :to="'/details?id='+activeInfo.dreamId" class="fontDetail fr">详情</router-link>
      </div>
      <!--------------------------------------------------------->
      <div :class="activeInfo.videoType==1?'video-con_s':'video-con_h'"><!--:class="activeInfo.videoType==1?'is_act':'is_aat'"-->

        <!--活动标签-->
        <div :class="activeInfo.videoType==1?'actLabel_s':'actLabel_h'">{{activeInfo.dreamName}}</div>
        <video :class="activeInfo.videoType==1?'video-s' :'video-h'" :src="activeInfo.videoUrl"
          ref="video_el" @click="palyAudio" loop="loop"  autoplay
          x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline>
<!--:poster="activeInfo.productionCover"-->
        </video>
        <img src="../../assets/img/play_music.png" class="play-icon" v-show="pause" @click="palyAudio">
        <div :class="activeInfo.videoType==1?'actNotice_s':'actNotice_h'">{{activeInfo.productionName}}</div>
        <!--push动效暂用图片-->
        <div class="icon-push" @click="pushClick" disabled="isDisPush">
          <div class="push-slice" v-show="pushOne">
            <img src="../../assets/img/push/push.gif" class="pushs">
            <div class="pushSum">{{pushSum}}</div>
          </div>
          <div class="push-play" v-show="!pushOne">
            <img src="../../assets/img/push/push.png" :class="ismax?'pushmax':'pushImg'">
            <div class="pushNum" :class="ismax?'push1':'push2'">{{pushSum}}</div>
          </div>
        </div>
      </div>
      <!------------------------------------------------------------------>
      <div class="actUser clearfix" v-if="activeInfo">
        <div class="fl" >
          <div class="userPhoto fl">
            <router-link :to="'/person?userId='+activeInfo.userId">
            <img :src="baseUrl+activeInfo.headUrl" class="userP">
            </router-link>
            <div class="focus" @click="isAttention(activeInfo.userId,activeInfo.isAttention)">
              <img v-if="!activeInfo.isAttention && activeInfo.userId!=my_userId " src="../../assets/img/dream/focus.png" :disabled="isDisabled">
            </div>
          </div>
          <div class="userMessage fr">
            <p class="userName">{{filtName(activeInfo.nickName)}}</p>
          </div>
        </div>
        <div class="llTwo fr">
          <div class="fl" @click="upActNum" :class="activeInfo.isFavorite ? 'like_sel' : 'like'"><i class="num">{{activeInfo.favoriteCount ? activeInfo.favoriteCount : 0}}</i>
          </div>
          <div class="leave fl" @click="showPopup"><i class="num">{{activeInfo.evaluateCount ? activeInfo.evaluateCount : 0 }}</i></div>
        </div>
      </div>
      <!------------------------------------------------------------------------->
      <div class="recommended">
        <div class="slider-wrap">
          <ul class="list-nav clearfix">
            <li class="list-item fl" v-for="i,index in list" :key="index" >

                <img :src="i.productionCover" @click="changeVideo(i.id)" class="pic">
                <div class="recom clearfix">
                  <!--<router-link :to="'/person?userId='+i.userId">-->
                  <div class="fl recoml">
                    <img :src="baseUrl+i.headUrl" class="recomImg">
                  </div>
                  <!--</router-link>-->
                  <div class="fl recomr">
                    <p class="recomName">{{filtName(i.nickName)}}</p>
                    <p class="recomPush"><i>{{i.pushCount?i.pushCount : 0 }}</i>push</p>
                  </div>
                </div>

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
<!--v-show="isShow"-->
        <scroller  v-model="scrollerStatus" height="7rem" lock-x scrollbar-y ref="scroller"
                  :bounce="true"
                  :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                  @on-pullup-loading="selPullUp">

          <ul>
            <li v-for="(item,index) in commentList" :key="index" class="clearfix msg_item">
              <router-link :to="'/person?userId='+item.userId"><img :src="baseUrl+item.headUrl" class="fl user_pic"/></router-link>
              <div class="fl cont">
                <p class="nick">{{filtName(item.nickName)}}</p>
                <p class="txt">{{item.evaluateBody}}</p>
                <p class="time">{{getTimestamp(item.fcd)}}</p>
              </div>
              <div class="fr">
               <p align="center">
                 <img v-if="item.isPraise" src='../../assets/img/dream/like_sel_ico.png' class="like_ico" @click="upCommentNum(index)"/>
                 <img v-else src='../../assets/img/dream/like_ico.png' class="like_ico" @click="upCommentNum(index)"/>
               </p>
                <p :class="item.isPraise ? 'like_pra' : 'no_pra'" align="center">{{item.praiseCount}}</p>
              </div>
            </li>
          </ul>
        </scroller>

      </div>
      <div class="input-wrap">
        <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
        <span @click="goComment">发送</span>
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
  import {mapState, mapMutations} from "vuex";
  import {Popup, XHeader, dateFormat, Scroller,Confirm} from 'vux';
  import {Message} from 'iview';

 /* function getParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }*/
  let number = 0 ;

  export default {
    name: "dubDetails",
    components: {XHeader, Popup, Scroller,Message,Confirm},

  data() {
      return {
        id: '',
        type: '',
        list: [],
        routerType: '',
        commentList: [],
        commentNum: 0,
       // isShow: false,
        listIndex: 0,
        page: 1,
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
        timert:'',
        show:false,
        isPush:false,//push
        ismax:false,
        pushSum:0,
        pushOne:true,
        pushTwo:false,
        isDisPush:false,
        isDisabled:false,
        clickIndex:0,
        setTime:null,
        pause:false
      }
    },
    computed: {
      ...mapState([
        'baseUrl',
        'is_login',
        'my_userId'
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
        this.getComment(true)
      },
      //未登录
      onConfirm(){
        window.location.href='/login';
      },
      getDate(date) {
        return dateFormat(new Date(date), 'YYYY-MM-DD')
      },
      //关注
      isAttention(id, isAttention) {
        if(!this.is_login){
          this.show=true;
          return
        }
        if(isAttention) {
          this.activeInfo.isAttention=false
        }else{
          this.activeInfo.isAttention=true
          this.isDisabled=true;
        }
        this.$post('/api/user/saveUserAttention/' + id).then(res => {
          console.log('操作成功');
        })
      },
      //查询评论
      getComment(isEmpty) {


        //普通评论
        let limit = 10;
        let url = '/api/offline/common/queryAllEvaluatePageByProductionId';
        this.$post(url, {productionId: this.activeInfo.id, pageSize: limit, pageNum: this.page}).then(res => {
            this.commentNum = res.total;
            this.popupState = true;

            if (isEmpty) {
              this.commentList = res.list;
              //精选评论
              this.$post('/api/offline/common/queryGoodsEvaluatesByProductionId',{productionId: this.activeInfo.id}).then(res=>{
                this.commentList.unshift(...res);
              });
             /* let _this=this;
              let list=[];
              if(this.replyList.length){
                for(let i=0;i<_this.replyList.length;i++){
                   _this.commentList.forEach(function (k) {
                       if(k.id!==_this.replyList[i].id){
                         console.log(k);
                         list.push(k);
                       }
                   })
                  list.unshift(_this.replyList[i]);
                }
                this.commentList=list;
              }*/

            }else{
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.commentList.push(...res.list);
            }
            if (res.list && res.list.length < limit) {
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {
              })
            }
          })
      },
      /*作品点赞*/
      upActNum() {
         /* if(!this.is_login){
            this.show=true;
            return
          }*/
          this.$post('/api/common/updateProductionFavorite', {
            channelItemId: this.activeInfo.id,
            channelId: this.activeInfo.channelId
          }).then(res => {
              this.activeInfo.isFavorite = !this.activeInfo.isFavorite
            if(this.activeInfo.isFavorite==true){
              this.activeInfo.favoriteCount=parseFloat(this.activeInfo.favoriteCount)+1;
            }else{
              this.activeInfo.favoriteCount=parseFloat(this.activeInfo.favoriteCount)-1;
            }
          })
      },
      /*评论点赞*/
      upCommentNum(i){
        if(!this.is_login){
          this.show=true;
          return
        }
        this.$post('/api/common/updateProductionEvaluatePraise', {evaluateId: this.commentList[i].id}).then(res => {
            this.commentList[i].isPraise = !this.commentList[i].isPraise
           // console.log(this.commentList, i)
            if(this.commentList[i].isPraise==true){
              this.commentList[i].praiseCount=parseFloat(this.commentList[i].praiseCount)+1;
            }else{
              this.commentList[i].praiseCount=parseFloat(this.commentList[i].praiseCount)-1;
            }
          }
        )
      },
      //作品评论
      goComment() {
        if (!this.inputTxt) {
          this.$Message.warning({
            content: '评论不能为空!'
          });
          return
        }
        if(!this.is_login){
          this.show=true;
          return
        }
        let data = {
          productionId: this.activeInfo.id,
          evaluateBody: this.inputTxt
        }
        this.$post('/api/common/saveProductionEvaluate', data).then(res => {
          this.$Message.warning({
            content: '评论成功!'
          });
          this.getComment(true);
          this.inputTxt='';
          this.activeInfo.evaluateCount=parseInt(this.activeInfo.evaluateCount)+1
        })
      },
      selPullUp() {
        this.page++;
        this.getComment(false)
      },
      showLoadTxt: function () {
        if (this.showLoad) {

        } else {
          this.showLoad = true;
          setTimeout(() => {
            this.$nextTick(() => {
            })         }, 500)
        }
      },
      pushClick(){
        this.clickIndex = 0;
        this.clickIndex+=1;
        number+=1;
        if(!this.is_login){
          this.show=true;
          return
        }
        if(this.pushSum==0){
          this.isDisPush=true;
          return
        }
        if(this.clickIndex==20){return;}
        if(this.pushSum > 1){
          this.pushSum--;
        }else{
          this.pushSum=0;
          this.isDisPush=true;
          return
        }
        this.pushOne=false;
        this.ismax=true;
        let _this=this;
        setTimeout(function () {
          _this.ismax=false;
        }, 100)
       //一次单击
        clearTimeout(this.setTime);
        this.setTime= setTimeout(function () {
          _this.pushOne=true;
          _this.$post('/api/push/push', {productionId: _this.activeInfo.id,pushSum:number}).then(res => {
            console.log('提交单次push');
            number = 0 ;
          })
        }, 1000)
        console.log(this.pushSum);
      },
      pushNum(){
        //console.log(this.is_login);
        if (this.is_login) {
          this.$post('/api/push/getPushSum').then(res => {
            this.pushSum=res.pushSum;
          })
        }
      },
      changeVideo(id){
       /* this.$router.push({path:'/activityDetails?id='+id});
        location.reload();*/
        this.$post('/api/offline/common/getProductionInfoById/' + id,).then(res => {
          this.activeInfo = res;
          this.pause=false;
        })
      },
      palyAudio(){

        if(this.$refs.video_el.paused) {
          this.$refs.video_el.play();
          this.pause=false;
        } else {
          this.$refs.video_el.pause();
          this.pause=true;
        }
      },
      /*showVideo(mp4Url,Cover,videoType){
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
          m3u8: m3u8,
          mp4: mp4 || mp4Url,
          coverpic: coverpic || {
            style: 'cover',
            src: Cover
          },
          plugins: {
            ContextMenu: {
              mirror: true
            }
          },
          autoplay:true,//autoplay ? true : false,
          live: live,
          width: '100%' || document.documentElement.clientWidth * .92,
          height:videoType=='0'?'214' : '434'
        };
        let player = new TcPlayer('video-container', options );
        window.qcplayer = player;

      },*/

    },
      created(){
      this.id = this.$route.query.id;
      this.routerType = this.$route.query.routerType;
      this.dreamId = this.$route.query.dreamId;
      this.dreamType=this.$route.query.dreamType;
      this.dreamPush=this.$route.query.dreamPush;
      this.description=this.$route.query.description;
      /*---------------------------------------*/
      this.pushNum();
        if(this.dreamId){
          /*----梦想-----*/
          //作品详情列表
          this.$post('/api/offline/dream/queryDreamProductionInfoList',{
            dreamId:this.dreamId
          }).then(res=>{
            //同类视频
            this.list=res.list
            //梦想推荐视频
            this.$post('/api/offline/common/getProductionInfoById/'+res.list[0].id).then(res=>{
              this.activeInfo=res;
              // this.showVideo(res.videoUrl,res.productionCover,res.videoType);
            })
          })
        }else if (this.id) {
          //查询作品详情
          this.$post('/api/offline/common/getProductionInfoById/' + this.id,).then(res => {
            this.activeInfo = res;
           // this.showVideo(res.videoUrl, res.productionCover, res.videoType);
            //同类视频
            let url = '/api/offline/dream/queryDreamProductionInfoList'
            let data = { dreamId: res.dreamId};
            this.$post(url, data).then(res => {
              this.list = res.list;
            })

          })
        }
    },

  }
</script>

<style>
  #activityDetails .vux-popup-dialog {
    background: #33254C;
  }

</style>
<style scoped>
  .container { /*  padding-top: .6rem;*/width: 100%;padding-bottom: .36rem;}
  .act {color: #fff;padding-left: .28rem;padding-right: .3rem;}
  .actDes {font-size: .3rem;margin-bottom: .16rem;}
  .actTime {font-size: .28rem;}
  .actTime i {font-size: .2rem;margin-right: .18rem;}
  .fontDetail {font-size: .28rem;color: #FECF74;}

  /*--------------------视频--------------------------*/
  .video-con_h{position: relative;padding:1.6rem .3rem 1.7rem;}
  .video-con_s{position: relative;padding:.1rem 1.66rem .7rem;}
  .video-s{width: 4.2rem;height: 7rem;}
  .video-h{width: 6.9rem;height: 4.3rem;}
  .actLabel_s{
    position: absolute;
    top: .22rem;
    left: 1.6rem;
    z-index: 10;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  .actLabel_h{
    position: absolute;
    top: 1.7rem;
    left: .2rem;
    z-index: 10;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  .actNotice_h {/*作品名称*/
    position: absolute;
    bottom: 0;
    left: .3rem;
    font-size: .28rem;
    height: .6rem;
    padding: 0 .3rem;
    overflow: hidden;
  }
  .actNotice_s {/*作品名称*/
    position: absolute;
    bottom:0;
    left: .3rem;
    font-size: .28rem;
    padding: 0 .3rem;
    height: .6rem;
    overflow: hidden;
  }

  .push-slice{position: relative;}
  .pushs{width: 2rem;height: 2rem;margin: auto;}
  .pushSum{transform:rotate(-9deg);position: absolute;bottom:25px;left:30px;font-size: .13rem;}
  .push-play{position: relative;}
  .pushImg{width: 1.7rem;height: 1.7rem;margin: auto;margin-top: .2rem;}
  .pushmax{width: 2rem;height: 2rem;margin: auto;}
  .pushNum{transform:rotate(-9deg);position: absolute;font-size: .10rem;}
  .push1{bottom:23px;left:25px;}
  .push2{bottom:18px;left:30px;}
  .icon-push{
    position: absolute;
    right: 0;
    bottom: .2rem;
    width: 2.2rem;
    height: 2.2rem;
    /*background: url("../img/push.png") right no-repeat;*/
    background-size: 2rem;
    z-index: 99;
  }


  /*-------------------------------------------*/
  .actUser {
    height: 1.1rem;
    margin: 0 .44rem ;
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
    border-radius: .05rem;
/*----------------------*/

  }
  .list-item .pic{
    /*-----------------*/
    width: 1.86rem;
    height: auto;
    overflow: hidden;


  }
  .recom {
    position: absolute;
    bottom: 0;
    z-index: 10;
    border-radius: 5px;
    padding: .05rem  0;
    width: 100%;
    background-color: rgba(255,255,255,.3);
  }
  .recomr{
    position: absolute;
    left: .5rem;
    bottom: 0;
    height: .6rem;
    z-index: 10;
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
  .recomr{
    margin-left: .15rem;
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
  .like_pra{
    color: #FECF74;
  }
  .no_pra{
    color: #929098;
  }
  #popup .txt{
    max-width: 5.7rem;
  }
</style>
