<template>
  <div id="deduceDetails">
    <x-header :left-options="{backText:termName}">
      <!--<a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a>-->
    </x-header>
    <div class="container">
      <!--------------------------------------------------------->
      <div :class="activeInfo.videoType==1?'is_act':'is_aat'">

        <!--活动标签-->
        <div :class="activeInfo.videoType==0 ? 'actLabel_h':'actLabel_s'">{{activeInfo.dreamName}}</div>
        <div id="video-container" style="margin: 0px auto;">

        </div>
        <div class="actNotice">{{activeInfo.productionName}}</div>
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
            <p class="userName">{{activeInfo.nickName}}</p>
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
                <router-link :to="'/person?userId='+i.userId">
                  <div class="recom clearfix">

                    <div class="fl recoml">
                      <img :src="baseUrl+i.headUrl" class="recomImg">
                    </div>

                    <div class="fl recomr">
                      <p class="recomName">{{handName(i.nickName)}}</p>
                    </div>
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
<!--v-show="isShow"-->
        <scroller  v-model="scrollerStatus" height="7rem" lock-x scrollbar-y ref="scroller"
                  :bounce="true"
                  :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                  @on-pullup-loading="selPullUp">

          <ul>
            <li v-for="i,index in commentList" :key="index" class="clearfix msg_item">
              <router-link :to="'/person?userId='+i.userId"><img :src="baseUrl+i.headUrl" class="fl user_pic"/></router-link>
              <div class="fl cont">
                <p class="nick">{{i.nickName}}</p>
                <p class="txt">{{i.evaluateBody}}</p>
                <p class="time">{{getTimestamp(i.fcd)}}</p>
              </div>
              <div class="fr">
               <p align="center"><img
                  :src="i.isPraise ? require('../../assets/img/dream/like_sel_ico.png') : require('../../assets/img/dream/like_ico.png')"
                  class="like_ico" @click="upCommentNum(index)"/></p>
                <p :class="i.isPraise ? 'like_pra' : 'no_pra'" align="center">{{i.praiseCount}}</p>
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
    components: {XHeader, Popup, Scroller,Message,Confirm},
    data() {
      return {
        id: '',
        type: '',
        termName:'',
        list: [],
        routerType: '',
        commentList: [],
        commentNum: 0,
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
        ismax:false,
        isDisabled:false

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
        this.popupState = true;
        if (!this.commentList.length) {
          this.getComment(true)
        }
      },
      //未登录
      onConfirm(){
        window.location.href='/login';
      },
      handName(txt) {
        if(txt == null){
          return ' '
        }
        if(txt.length < 3 ){
          return txt
        }
        return txt.slice(0,3) + '..'
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
          this.activeInfo.isAttention=true;
          this.isDisabled=true;
        }
        this.$post('/api/user/saveUserAttention/' + id).then(res => {
          console.log('操作成功');
        })
      },
      //查询评论
      getComment(isEmpty) {
        //精选评论
        ///offline/common/queryGoodsEvaluatesByProductionId
        this.$post('/api/offline/common/queryGoodsEvaluatesByProductionId').then(res=>{
              this.commentList.unshift(res.list);
        });
        //普通评论
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
              //this.isShow = true;
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
          if(!this.is_login){
            this.show=true;
            return
          }
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
      changeVideo(id){
        this.$router.push({path:'/deduceDetails?id='+id+'&&termName='+this.termName});
        location.reload();

      },
      showVideo(mp4Url,Cover,videoType){
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
          autoplay: true, //autoplay ? true : false,
          live: live,
          width: '100%' || document.documentElement.clientWidth * .92,
          height:videoType=='0'?'215' : '434'
        };
        let player = new TcPlayer('video-container', options);
        window.qcplayer = player;
      },

    },
      created(){
      this.termName = this.$route.query.termName;
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
      this.routerType = this.$route.query.routerType;
      /*---------------------------------------*/
        if (this.id) {
          /*-------所有id---包括即兴---------*/
          //查询作品详情
          this.$post('/api/offline/common/getProductionInfoById/' + this.id,).then(res => {
            this.activeInfo = res;
            this.showVideo(res.videoUrl,res.productionCover,res.videoType);
            //同类视频
            let url = '/api/offline/entertainment/queryProductionTypeProductionInfoList'
            let data={productionType: res.productionType};
            if(this.routerType || res.channelId==3){
              url = '/api/offline/impromptu/queryProductionTypeProductionInfoList'
              data={channelId:3}
            }
            this.$post(url, data).then(res => {
              this.list = res.list;
            })

          })
        }else if(this.type){
          /*---------演艺----------*/
          this.$post('/api/offline/entertainment/queryProductionTypeProductionInfoList', {productionType: this.type}).then(res => {
            this.list = res.list;
            //演艺推荐
            this.$post('/api/offline/common/getProductionInfoById/'+res.list[0].id).then(res=>{
              this.activeInfo=res;
              this.showVideo(res.videoUrl,res.productionCover,res.videoType);
            })
          });
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
  .container { padding-top: .2rem;width: 100%;padding-bottom: .36rem;}
  .act {color: #fff;padding-left: .28rem;padding-right: .3rem;}
  .actDes {font-size: .3rem;margin-bottom: .16rem;}
  .actTime {font-size: .28rem;}
  .actTime i {font-size: .2rem;margin-right: .18rem;}
  .fontDetail {font-size: .28rem;color: #FECF74;}
  .is_act {padding: 0rem 1.28rem .8rem; position: relative;}/*竖屏*/
  .is_aat{padding: 1.8rem 0 1.6rem; position: relative;}/*横屏*/
  .actLabel_h{
    position: absolute;
    top: 1.8rem;
    left: .15rem;
    z-index: 10;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  .actLabel_s{
    position: absolute;
    top: .05rem;
    left: 1.2rem;
    z-index: 10;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  /*--------------------视频--------------------------*/
 /* .actVideo {
    height: 7rem;
    margin-top: .4rem;
    padding: 0 .3rem;
  }
  .push-slice{position: relative;}
  .pushs{width: 2rem;height: 2rem;margin: auto;}
  .pushSum{transform:rotate(-9deg);position: absolute;bottom:25px;left:30px;font-size: .10rem;}
  .push-play{position: relative;}
  .pushImg{width: 1.7rem;height: 1.7rem;margin: auto;margin-top: .2rem;}
  .pushmax{width: 2rem;height: 2rem;margin: auto;}
  .pushNum{transform:rotate(-9deg);position: absolute;font-size: .10rem;}
  .push1{bottom:23px;left:25px;}
  .push2{bottom:18px;left:30px;}*/
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
    bottom: .4rem;
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
    width: 1.48rem;
    height: 2.06rem;
    margin-right: .15rem;
    position: relative;
    overflow:hidden
  }
  .list-item .pic{
    width: auto;
    height: 2.06rem;
    /*overflow-x: hidden;*/
  }
  .recom {
    position: absolute;
    bottom: 0;
    z-index: 10;
    padding: .05rem  0;
    width: 100%;
    background-color: rgba(255,255,255,.3);
  }
  .recoml {
    margin-left: .12rem;
  }
  .recomr{
    margin-left: .05rem;
    margin-top: .05rem;
  }
  .recomImg {
    width: .34rem;
    height: .34rem;
    border-radius: 50%;
  }
  .recomName {
    font-size: .14px;
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
