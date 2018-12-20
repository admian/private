<template>
    <div id='prodution'>
      <x-header :left-options="{backText:'个人作品'}">
        <!--<a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a>-->
      </x-header>

        <div :class="activeInfo.videoType==1?'video-con_s':'video-con_h'">
          <!--竖屏、横屏-->
          <!--活动标签-->
        <!--  <div id="video-container" style="margin:0px auto;">
          </div>-->
          <video :class="activeInfo.videoType==1?'video-s':'video-h'" :src="activeInfo.videoUrl"
                 autoplay loop="loop" ref="video_el" @click="palyAudio"
                 x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline>
<!--:poster="activeInfo.productionCover"-->
          </video>
          <img src="../../assets/img/play_music.png" class="play-icon" v-show="pause" @click="palyAudio">
          <div :class="activeInfo.videoType==1?'act_s':'act_h'" v-if="activeInfo.dreamId">{{activeInfo.dreamName}}</div>
          <div :class="activeInfo.videoType==1?'actNotice_s':'actNotice_h'">{{activeInfo.productionName}}</div>
        </div>

      <!------------------------------------------------------------------>
      <div class="bottom">
        <div class="actUser clearfix">
          <router-link :to="'/person?userId='+activeInfo.userId" class="fl">
            <div class="userPhoto fl">
              <img :src="baseUrl+activeInfo.headUrl" class="userP">
              <div class="focus" @click="isAttention(activeInfo.userId,activeInfo.isAttention)">
                <img src="../../assets/img/dream/focus.png" v-if="!activeInfo.isAttention && activeInfo.userId!=my_userId" :disabled="isDisabled">
              </div>
            </div>
            <div class="userMessage fr">
              <p class="userName">{{filtName(activeInfo.nickName)}}</p>
            </div>
          </router-link>
          <div class="llTwo fr">
            <div class="fl" @click="upActNum" :class="activeInfo.isFavorite ? 'like_sel' : 'like'"><i class="num">{{activeInfo.favoriteCount}}</i></div>
            <div class="leave fl" @click="showPopup"><i class="num">{{activeInfo.evaluateCount}}</i></div>
          </div>
        </div>
        <div class="input-wrap">
          <input type="text" max="200" placeholder="说说你的想法吧~" class="textarea" v-model="inputTxt"/>
          <span @click="goComment">发送</span>
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

              <li v-for="i,index in commentList" :key="index" class="clearfix msg_item">
                <router-link :to="'/person?userId='+i.userId"><img :src="baseUrl+i.headUrl" class="fl user_pic"/></router-link>
                <div class="fl cont">
                  <!--<router-link :to="'/person?userId='+i.userId">--><p class="nick">{{i.nickName}}</p><!--</router-link>-->
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

    import {mapMutations, mapState} from 'vuex'
    import {Popup, XHeader, dateFormat, Scroller,Confirm} from 'vux';
    export default {
        name: "prodution",
        data() {
            return {
              id: '',
              commentList: [],
              commentNum: 0,
              listIndex: 0,
              page: 1,
              inputTxt: '',
              activeInfo: [],
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
              timert:'',
              show:false,
              isDisabled:false,
              pause:false
            }
        },
      components: {XHeader, Popup, Scroller,Confirm},
        computed: {
            ...mapState([
               'showShare',
               'is_login',
               'my_userId',
               'baseUrl'
            ])
        },
        methods: {
          ...mapMutations(
              ['SETSTATE']
          ),
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
          //未登录
          onConfirm(){
            window.location.href='/login';
          },
          showPopup() {
            this.popupState = true;
            if (!this.commentList.length) {
              this.getComment(true);
              //this.popupState = false;
            }
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
            if(this.isDisable){return}
            this.isDisable=true;
            if(isAttention) {
              this.dubList.isAttention=false
            }else{
              this.dubList.isAttention=true
            }
            this.$post('/api/user/saveUserAttention/' + id).then(res => {
              console.log('操作成功');

            })
          },
          //作品评论
          goComment(){
            console.log(this.is_login);
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
          //查询评论
          getComment(isEmpty) {
            let limit = 10;
            //精选评论
            ///offline/common/queryGoodsEvaluatesByProductionId
            this.$post('/api/offline/common/queryGoodsEvaluatesByProductionId',{productionId: this.activeInfo.id}).then(res=>{
              this.replyList=res;
            });
            let url = '/api/offline/common/queryAllEvaluatePageByProductionId';
            this.$post(url, {productionId: this.activeInfo.id, pageSize: limit, pageNum: this.page}).then(
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
                this.activeInfo.favoriteCount=parseInt(this.activeInfo.favoriteCount)+1;
              }else{
                this.activeInfo.favoriteCount=parseInt(this.activeInfo.favoriteCount)-1;
              }
            })
          },
          /*评论点赞*/
          upCommentNum(i) {
            console.log(i);
            if(!this.is_login){
              this.show=true;
              return
            }
            this.$post('/api/common/updateProductionEvaluatePraise', {evaluateId: this.commentList[i].id}).then(res => {
                this.commentList[i].isPraise = !this.commentList[i].isPraise
              console.log(this.commentList[i].isPraise);
                // console.log(this.commentList, i)
                if(this.commentList[i].isPraise==true){
                  this.commentList[i].praiseCount=parseFloat(this.commentList[i].praiseCount)+1;
                }else{
                  this.commentList[i].praiseCount=parseFloat(this.commentList[i].praiseCount)-1;
                }
            })
          },
          palyAudio(){
            if (this.$refs.video_el.paused) {
              this.$refs.video_el.play();
              this.pause=false;
            } else {
              this.$refs.video_el.pause();
              this.pause=true;
            }
          }
        },
        created(){
          this.id = this.$router.history.current.query.id;

          this.$post('/api/offline/common/getProductionInfoById/'+this.id).then(res=>{
            this.activeInfo = res;
          })
        }
    }
</script>
<style>
  #prodution  #video-container{
    position: relative;
  }
  #prodution .vcp-controls-panel{ /*整体*/
    position: absolute;
    height: 100%;
  }
  #prodution .vcp-panel-bg{/*背景*/
    position: absolute;
    z-index:1;
    display: none;
  }
  #prodution .vcp-timelabel, .vcp-volume{  /*时间*/
    z-index:10;
    display: none;
    /*border: 1px solid red;*/
  }
  #prodution .vcp-timeline{/*控制条*/
    position: absolute;
    top:97%;
    z-index: 10;
    display: none;
  }
  #prodution .vcp-playtoggle{ /*播放*/
    background-repeat: no-repeat;
    border: 1px solid red;
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #prodution .vcp-player{
    background-color: transparent;
  }
  #prodution .vcp-fullscreen-toggle{
    display: none;
  }
</style>
<style scoped>
  .video-con_s{
    padding: .8rem 0 1.2rem 0;
    position: relative;

  }
  .video-con_h{
    padding: 2.3rem 0;
    position: relative;
  }
  .video-s{
    width: 5.24rem;
    height: 7.0rem;
    margin-left: 1.14rem;
  }
  .video-h{
    width: 7.5rem;
    height: 4.3rem;
  }
  .actNotice_s {
    position: absolute;
    bottom: 0;
    left: .5rem;
    font-size: .28rem;
    padding:0 .3rem 0 .26rem;
    height: .7rem;
    line-height: .32rem;
    overflow: hidden;
  }
  .actNotice_h {
    position: absolute;
    bottom: 0;
    left: .5rem;
    font-size: .28rem;
    padding:0 .3rem 0 .26rem;
    line-height: .32rem;
    height: .7rem;
    overflow: hidden;
  }
  .act_s{
    position: absolute;
    bottom: .8rem;
    left:.5rem;
    z-index: 30;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
    margin-left: .3rem;
    margin-top: .2rem;

  }
  .act_h{
    position: absolute;
    bottom: .8rem;
    left: .38rem;
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
    margin: .01rem .44rem;
    border-bottom: .03rem solid #25183F;
    padding-left: .1rem;

  }

  .userPhoto{
    position: relative;
    padding-top: .03rem;
  }
  .userP{
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    border: 1px solid #fff;
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
    margin-top: .26rem;
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
   .input-wrap {
     /*margin-top: .5rem;*/
     width: 85%;
     position: relative;
     margin-left: .5rem;
  }

  .input-wrap input {
    width: 100%;
    padding-left: .3rem;
    padding-right: 1.5rem;
    background-color: #1B112E;
    color: #AFA3C7;
    font-size: .28rem;
    outline: none;
    border: none;
    line-height: .68rem;
  }

  .input-wrap span {
    position: absolute;
    top: .22rem;
    right: .5rem;
    color: #fff;
    font-size: .24rem;
  }
  /*.bottom{position: fixed;bottom: .5rem;left: 0;width: 100%;}*/
</style>
