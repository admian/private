<template>
    <div id="activityDetails">
      <x-header :left-options="{backText:actDetails.dreamTitle}"><a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img
        class="share_ico" src="../../assets/img/share_ico.png"></a></x-header>
      <div class="container">
        <div class="act clearfix">
          <div class="fl">
            <p class="actDes">{{actDetails.dreamName}}</p>
            <p class="actTime"><i>截止日期</i>{{getDate(actDetails.endDate)}}</p>
          </div>
          <router-link to="" class="fontDetail fr">详情</router-link>
        </div>
        <!--------------------------------------------------------->
        <div class="actVideo is_act">
          <!--竖屏、横屏-->

          <!--活动标签-->
          <div class="actLabel">{{actDetails.dreamName}}</div>

          <video-player class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true">
          </video-player>
          <div class="actNotice">{{actDetails.description}}</div>
          <!--push动效暂用图片-->
          <div class="icon-push" v-if="activeInfo.dreamId"></div>

        </div>
        <!------------------------------------------------------------------>
        <div class="actUser clearfix">
          <div class="fl">
            <div class="userPhoto fl">
              <img src="" class="userP">
              <div class="focus"><img src="../../assets/img/dream/focus.png"><!--<Icon type="ios-add"/>--></div>
            </div>
            <div class="userMessage fr">
              <p class="userName">{{filtName(actDetails.nickName)}}</p>
              <p class="actNo">no.</p>
            </div>
          </div>
          <div class="llTwo fr">
            <div class="fl" @click="isLike" :class="actDetails.isFavorite ? 'like' : 'like_sel'"><i class="num">{{actDetails.favoriteCount}}</i></div>
            <div class="leave fl" @click="showPopup"><i class="num">{{actDetails.evaluateCount}}</i></div>

          </div>
        </div>
        <!------------------------------------------------------------------------->
        <div class="recommended">
          <div class="slider-wrap">
            <ul class="list-nav clearfix">
              <li class="list-item fl" v-for="i in smallList">
                <img :src="i.videoUrl">
                <div class="recom clearfix">
                  <div class="fl recoml">
                    <img :src="i.headUrl" class="recomImg">
                    <p class="remNo">no.</p>
                  </div>
                  <div class="fr recomr">
                    <p class="recomName">{{filtName(i.nickName)}}</p>
                    <p class="recomPush" v-if="i.pushCount"><i>{{i.pushCount}}</i>push</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <popup v-model="popupState" height="75%">

      </popup>
    </div>
</template>

<script>
    import {mapState ,mapMutations} from "vuex";
    import {Popup, XHeader, dateFormat,Scroller} from 'vux';
    export default {
      name: "dubDetails",
      components: {Popup,XHeader, dateFormat,Scroller},
      data(){
        return{
          is_like:true,
          popupState:false,
          actDetails:[],
          smallList:[],
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
            poster: "",
            controls: false
          }
        }
      },
      mounted() {
        setTimeout(() => {
          this.player.muted(false)
        }, 5000)
      },
      computed: {
        ...mapState([
          'headerTxt'
        ]),
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        ),
        getDate(date) {
          return dateFormat(new Date(date), 'YYYY-MM-DD')
        },
        isLike(){
          this.is_like =! this.is_like
        },
        showPopup(){
          this.popupState = true;
        }
      },
      created(){
        this.routerType = this.$router.history.current.query.routerType;
        this.dreamId = this.$router.history.current.query.dreamId;

        this.id = this.$router.history.current.query.id;
        this.dreamTitle = this.$router.history.current.query.dreamTitle;
        this.videoType = this.$router.history.current.query.videoType;

        //相同作品列表
        this.$post('/api/offline/dream/queryDreamProductionInfoList').then(res=>{
          //console.log(res);
          this.smallList=res.list

        })

        if(this.dreamId){
          //作品详情列表
          this.$post('/api/offline/dream/queryDreamProductionInfoList',{
            dreamId:this.id
          }).then(res=>{
            this.actDetails=res.list[0]
          })

        }else{
          //作品详情
          this.$post('/api/offline/dream/getProductionInfoById/'+this.id).then(res=>{
            console.log(res);
            this.actDetails=res;
          })
        }


      }

    }
</script>

<style>
  #activityDetails .vux-popup-dialog{background: #33254C;}
</style>
<style scoped>
  .container{
    width: 100%;
    padding-bottom: .36rem;
    padding-top: .3rem;
  }
  .act{
    color: #fff;
    padding-left: .28rem;
    padding-right: .3rem;
  }
  .actDes{
    font-size: .3rem;
    margin-bottom: .16rem;
  }
  .actTime{
    font-size: .28rem;
  }
  .actTime i{
    font-size: .2rem;
    margin-right: .18rem;
  }
  .fontDetail{
    font-size: .28rem;
    color: #FECF74;
  }
  /*--------------------视频--------------------------*/
  .actVideo{
    height: 7rem;
    margin-top: .4rem;
/*    background-color: #f1f1f1;*/
    padding: 0 .3rem;
  }
  .video-player {
    height: 100%;
  }

  /*-------------------------------------------*/
  .actNotice {
    position: absolute;
    bottom: .2rem;
    left: .5rem;
    font-size: .28rem;

  }
  .actUser{
    height: 1.1rem;
    margin: 0 .44rem;
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
/*---------------------------------------------------------------------------*/
  .recommended{
    margin-top: .3rem;
    margin-left: .28rem;
  }
  .slider-wrap{
    overflow-y: auto;
  }
  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-nav{
    width: max-content;
    height: max-content;
  }
  .list-item{
    width: 1.9rem;
    height: 1.86rem;
    margin-right: .1rem;
    position: relative;
  }
  .recom{
    position: absolute;
    bottom: 0;
    z-index: 10;
    height: .6rem;
  }
  .recoml,.recomr{
    margin-left: .12rem;
  }
  .recomImg{
    width: .34rem;
    height: .34rem;
    border-radius: 50%;
    border: 1px solid #fff;
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
  }
  .recomPush{
    font-size: .15rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush i{

  }
</style>
