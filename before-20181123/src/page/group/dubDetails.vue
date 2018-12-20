<template>
    <div id="dubDetails">
      <x-header :left-options="{backText:dubList.productionName}">
       <!-- <a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img
        class="share_ico" src="../../assets/img/share_ico.png"></a>-->
      </x-header>
      <!-------------------------------------------->
      <div class="container">
        <div class="dubVideo is_act">

            <div id="video-container" style="margin: 0px auto;">
            </div>
            <!--活动标签-->
            <!--<div class="act" v-if="dubList.dreamId">{{dubList.dreamName}}</div>-->
             <!--push动效暂用图片-->
            <!--<div class="icon-push" v-if="dubList.dreamId"  @click="push"></div>-->

        </div>
        <!------------------------------------------------>
        <div class="actUser clearfix">
          <router-link :to="'/person?userId='+dubList.userId" class="fl">
            <div class="userPhoto fl"><!--:to="'/person?userId='+dubList.userId"-->
              <img :src="dubList.headUrl" class="userP">
              <div class="focus" @click="isAttention(dubList.userId,dubList.isAttention)">
                <img src="../../assets/img/dream/focus.png" v-if="!dubList.isAttention">
              </div>
            </div>
            <div class="userMessage fr">
              <p class="userName">{{filtName(dubList.nickName)}}</p>
              <p class="actNo" v-if="dubList.orders">no.{{dubList.orders}}</p><!--不参加活动时，隐藏-->
            </div>
          </router-link>
          <div class="llTwo fr"><!--like_sel选中-->
            <div class="fl" @click="isLike" :class="dubList.isFavorite ? 'like_sel' : 'like'"><i class="num">{{dubList.favoriteCount ? dubList.favoriteCount : ' '}}</i></div>
            <div class="leave fl" @click="showPopup"><i class="num">{{dubList.evaluateCount ? dubList.evaluateCount : ' '}}</i></div>
          </div>
        </div>
        <!----------------------------同类视频------------------------------------------------->
        <div class="similarVideo">
          <p class="similarTitle">同类视频</p>
          <!----------------------------------->
          <div class="slider-wrap">
            <ul class="list-nav clearfix">
              <li class="list-item fl" v-for="(i,index) in arrlist" v-if="index % 2 == 0" :key="index">
                  <div class="acta" v-if="i.dreamId">{{i.dreamName}}</div>
                  <img :src="i.productionCover" class="pic" @click="changeVideo(index)">
                  <i class="play-ico"></i>
                <router-link :to="'/person?userId='+i.userId" class="user-info clearfix">
                  <div v-if="!i.dreamId"><!--不参加活动-->
                    <img class="user-ico fl" :src="i.headUrl">
                    <span class="user-name fl">{{filtName(i.nickName)}}</span>
                  </div>
                  <div v-if="i.dreamId"><!--参加活动-->
                    <div class="fl recoml">
                      <img class="recomImg" :src="i.headUrl">
                      <!--<p class="remNo">no.</p>-->
                    </div>
                    <div class="fl recomr">
                      <p class="recomName">{{filtName(i.nickName)}}</p>
                      <p class="recomPush"><i>{{i.pushCount ? i.pushCount : 0}}</i>push</p>
                    </div>
                  </div>
                </router-link>

              </li>
            </ul>
            <ul class="list-nav clearfix">
              <li class="list-item fl" v-for="(i,index) in arrlist" v-if="index % 2 == 1" :key="index">

                  <div class="acta" v-if="i.dreamId">{{i.dreamName}}</div>
                  <img :src="i.productionCover" class="pic" @click="changeVideo(i.id)">
                  <i class="play-ico"></i>

                <div class="user-info clearfix">
                  <div v-if="!i.dreamId"><!--不参加活动-->
                    <img class="user-ico fl" :src="i.headUrl">
                    <span class="user-name fl">{{filtName(i.nickName)}}</span>
                  </div>
                  <div v-if="i.dreamId"><!--参加活动-->
                    <div class="fl recoml">
                      <img class="recomImg" :src="i.headUrl">
                      <p class="remNo">no.</p>
                    </div>
                    <div class="fl recomr">
                      <p class="recomName">{{filtName(i.nickName)}}</p>
                      <p class="recomPush"><i>{{i.pushCount ? i.pushCount : 0}}</i>push</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
        <popup v-model="popupState" id="popup">
          <div class="wrap">
            <div class="top clearfix">
              <span class="fl comment_num">{{commentNum}}条评论</span>
              <Icon class="fr close_ico" type="md-close" @click="popupState = false"/>
            </div>
            <scroller  v-model="scrollerStatus" height="7rem" lock-x scrollbar-y ref="scroller"
                       :bounce="true"
                       :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                       @on-pullup-loading="selPullUp">

              <ul>
                <li v-for="(i,index) in commentList" :key="index" class="clearfix msg_item">
                  <router-link :to="'/person?userId='+i.userId">
                    <img :src="i.headUrl" class="fl user_pic"/>
                  </router-link>
                  <div class="fl cont">
                    <div><p class="nick">{{filtName(i.nickName)}}</p></div>
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
      </div>
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

    import { Popup, XHeader ,Confirm ,Scroller} from 'vux';
    import {mapState,mapMutations} from 'vuex'
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
        components: {XHeader, Popup ,Confirm ,Scroller},
      data(){
          return{
            is_like:true,
            popupState:false,
            arrlist:[],
            dubList:[],
            commentList: [],
            commentNum: '',
           // isShow:false,
            listIndex: 0,
            page:1,
            inputTxt: '',
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
            show:false
          }
      },

      computed: {
        ...mapState([

          'is_login',
          'my_userId'
        ]),
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods:{
        ...mapMutations([
          'SETSTATE'
         ]),
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
        changeVideo(id){
          this.$post('/api/offline/dub/getProductionInfoById/'+id).then(res=>{
            this.dubList=res;
          })
        },
        //关注
        isAttention(id, isAttention) {
          if(!this.is_login){
            this.show=true;
            return
          }
          if(isAttention) {
            this.dubList.isAttention=false
          }else{
            this.dubList.isAttention=true
          }
          this.$post('/api/user/saveUserAttention/' + id).then(res => {
             console.log('操作成功');
          })
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
        //评论列表
        getComment(isEmpty) {
          let limit = 10;
          let data ={
            productionId: this.dubList.id,
            pageSize:limit,
            pageNum:this.page
          }
          this.$post('/api/offline/common/queryAllEvaluatePageByProductionId',data).then(
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
        //作品评论
        goComment(){
          if (!this.inputTxt){
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
            productionId: this.dubList.id,
            evaluateBody: this.inputTxt
          }
          this.$post('/api/common/saveProductionEvaluate', data).then(res => {
             this.getComment(true);
          })
        },
        //评论点赞
        upCommentNum(i) {
          if(!this.is_login){
            this.show=true;
            return
          }
          this.$post('/api/common/updateProductionEvaluatePraise', {evaluateId: this.commentList[i].id}).then(res => {
              this.commentList[i].isPraise = !this.commentList[i].isPraise
              //console.log(this.commentList, i)
              if(this.commentList[i].isPraise==true){
                this.commentList[i].praiseCount=parseFloat(this.commentList[i].praiseCount)+1;
              }else{
                this.commentList[i].praiseCount=parseFloat(this.commentList[i].praiseCount)-1;
              }
            }
          )
        },
        //作品点赞
        isLike(){
          if(!this.is_login){
            this.show=true;
            return
          }
          this.$post('/api/common/updateProductionFavorite',{
            channelItemId: this.dubList.id,
            channelId: this.dubList.channelId
          }).then(res=>{
            this.dubList.isFavorite = !this.dubList.isFavorite
            if(this.dubList.isFavorite==true){
              this.dubList.favoriteCount=parseFloat(this.dubList.favoriteCount)+1;
            }else{
              this.dubList.favoriteCount=parseFloat(this.dubList.favoriteCount)-1;
            }
          })
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
            src: require('../../assets/img/dub/dub1.png')
          },
          autoplay: autoplay ? true : false,
          live: live,
          width: '100%'|| document.documentElement.clientWidth * .92,
          height: 'auto' || '320'
        };
        let player = new TcPlayer('video-container', options);
        window.qcplayer = player;
      },
      created(){
        //配音视频id
        this.dubId = this.$route.query.dubId;
        //推荐id
        this.id = this.$route.query.id;
        console.log(this.dubId);
        if(this.dubId){
          //配音详情dubId=1
          this.$post('/api/offline/dub/queryProductionTypeProductionInfoList',{productionType:this.dubId}).then(res=>{
            this.arrlist=res.list;
          });
          this.$post('/api/offline/common/getProductionInfoById/'+res.list[0].id).then(res=>{
            this.dubList=res;
          })
        }else if(this.id){
          //推荐详情
          this.$post('/api/offline/common/getProductionInfoById/'+this.id).then(res=>{
            this.dubList=res;
            //同类视频
            this.$post('/api/offline/dub/queryProductionTypeProductionInfoList',{productionType:res.productionType}).then(res=>{
              this.arrlist=res.list;
            });
          })
        }


      }
    }
</script>
<style>
  #dubDetails .vux-popup-dialog{background: #33254C;}
</style>
<style scoped>
  .dubVideo{
    /*margin-top: .3rem;*/
    height: 4.3rem;
    width: 100%;
    background: #f1f1f1;
  }
  .act{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  .actUser{
    height: 1.1rem;
    margin: .22rem .32rem;
    padding-left: .1rem;
  }
  .userPhoto{
    position: relative;
    padding-top: .01rem;
  }
  .userP{
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    /*border: 1px solid #fff;*/
  }
  .focus{
    width: .32rem;
    height:.32rem;
    /*background:rgba(103,91,255,1);*/
    border-radius:50%;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .userMessage{
    margin-left: .2rem;
    color: #fff;
  }
  .userName{
    font-size: .28rem;
    margin-top: .18rem;
  }
  .actNo{
    width: .54rem;
    height: .25rem;
    line-height: .25rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-top: .1rem;
    text-align: center;
  }
  .llTwo{
    color: #fff;
    margin-top: .43rem;
  }
  .like{
    height: .35rem;
    background: url("../../assets/img/dream/like.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }
  .like_sel{
    height: .35rem;
    background: url("../../assets/img/dream/like_sel.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }
  .leave{
    height: .35rem;
    background: url("../../assets/img/dream/leave.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
  }
  .num{
    font-size: .2rem;
  }
  /*--------------------------------------------------------------------------------*/
  .similarVideo{
    margin-top: .22rem;
    padding-left: .32rem;
    padding-bottom: .3rem;
  }
  .similarTitle{
    color: #fff;
    font-size: .3rem;
    border-bottom: .02rem solid #25183F;
    padding-bottom: .1rem;
  }
  .slider-wrap{
    overflow-y: auto;
    height: 100%;
  }
  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-nav{
    margin-top: .3rem;
    width: max-content;
    height: max-content;
  }
  .list-item{
    width: 2.66rem;
    height: 2.36rem;
    /*border: #fff 1px solid;*/
    border-radius: .05rem;
    margin-right: .14rem;
    position: relative;
  }
  .pic{
    width: 2.66rem;
    height: 1.82rem;

  }
  .acta{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .18rem;
    padding-left: .3rem;
    margin-left: .1rem;
    margin-top: .09rem;
    color: #fff;
  }
  .user-ico{
    position: relative;
    z-index: 10;
    margin-left: .24rem;
    margin-right: .16rem;
    margin-top: -.08rem;
    width: .39rem;
    height: .39rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: .05rem solid #211934;
  }
  .user-name{
    font-size: .24rem;
    margin-top: .1rem;
    color:rgba(255,255,255,1);
  }
  .recoml{
    position: relative;
    z-index: 20;
    margin-left: .14rem;
  }
  .recomr{
    margin-left: .14rem;
  }
  .recomImg{
    z-index: 10;
    margin-top: -.08rem;
    width: .39rem;
    height: .39rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: .05rem solid #211934;
  }
  .remNo{
    width: .47rem;
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
  .recomName{
    font-size: .14rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush{
    font-size: .16rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush i{
    margin-right: .05rem;
  }
</style>
