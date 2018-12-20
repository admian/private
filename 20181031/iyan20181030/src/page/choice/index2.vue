<template>
   <div id="comments">
     <Tabs value="t">
       <TabPane label="推荐" name="t">
         <div class="container">
           <ul id="elasticstack" class="elasticstack">
             <li v-for="i in 6">
               <div class="twrap">
                 <div class="tdiv">
                   <div class="commentVideo">
                     <!--视频-->
                     <!--<img src="../../assets/img/choice/q.png">-->
                     <video-player class="vjs-custom-skin"
                                   ref="videoPlayer"
                                   :options="playerOptions"
                                   :playsinline="true">
                     </video-player>
                   </div>
                   <div class="bolck"></div>
                   <div class="user-p">
                     <img src="../../assets/img/choice/11.jpg" class="userimg fl">
                     <img src="../../assets/img/choice/comme.png" class="focus">
                     <i class="usern fl">{{i}}章鱼不是鱼</i>
                   </div>
                   <div class="tlist">
                     <p @click="addLike"><img  :src="is_like? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"/>76W</p>
                     <p @click="showPopup"><img src="../../assets/img/choice/leave.png"/>103W</p>
                     <p><img src="../../assets/img/choice/share.png"/></p>
                   </div>
                   <div class="actlist">
                     <p>今天这支舞可以拿去告白哦~</p>
                     <p class="actp"><span class="acting">正在参加《后来的我们》</span><sapn class="actend">报名截止 2018-10-28</sapn></p>
                   </div>
                 </div>
               </div>
             </li>
           </ul>
           <div class="try"><img src="../../assets/img/choice/try.png"></div>
         </div><!-- /container -->
       </TabPane>
       <TabPane label="关注" name="g">
         <div class="startfocus">
           <!--<img class="startfocus">-->
           <p>你还没关注的人噢！</p>
         </div>

       </TabPane>
     </Tabs>
     <popup v-model="popupState" height="75%">
       1111
     </popup>
   </div>
</template>

<script>
  import  {Tabs,TabPane} from 'iview'
  import { Popup } from 'vux'
    export default {
        name: "index", //精选
        components:{Tabs,TabPane,Popup},
      data() {
        return {
          is_like: false,
          popupState: false,
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
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
            controls: false
          }
        }
      },
      mounted() {
        new ElastiStack( document.getElementById( 'elasticstack' ), {
          distDragBack : 0,
          distDragMax : 250,
          onUpdateStack : function( current ) { return false; }
        });
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
      methods:{
        addLike(){
          this.is_like = !this.is_like
        },
        showPopup(){
          this.popupState = true;
        }
      },
    }
</script>

<style>
  #comments .ivu-tabs-bar{
    border-style: none;
  }
  #comments .ivu-tabs-nav{
    padding-top: .28rem;
    padding-left:2.49rem;
  }
  #comments .ivu-tabs{
    color: #fff;
    font-size: .34rem;
  }
  #comments .ivu-tabs-nav .ivu-tabs-tab-active{
    color: #fff;
    font-size: .4rem;
  }
  #comments .ivu-tabs-ink-bar{
    display: none;
  }
</style>
<style scoped>
  @import "../../assets/css/component.css"; /*堆叠卡片切换*/
  .bg1{
    background:#2C1E4A;
  }
  .bg2{
    background:#37255C;
  }
  .elasticstack li{
    background: #1F1B28;

  }
  /*.elasticstack li::after{
    content: '';
    display: inline-block;
    box-shadow: 2px 3px #fff;
  }*/
  .twrap{
    position: relative;
    height: 9.3rem;
    z-index: 30;
    background: #fff;
  }
  .twrap .tdiv:not(:first-child){
    display: none;
  }
  .commentVideo{
    height: 9.27rem;
  }
  .video-player {
    height: 100%;
  }
  .user-p{
    position: absolute;
    top: -.18rem;
    left: 0;
    width: 100%;
    height: 1.68rem;
  /*  background: -webkit-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Safari 5.1 - 6.0 *!
    background: -o-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Opera 11.1 - 12.0 *!
    background: -moz-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Firefox 3.6 - 15 *!
    background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* 标准的语法 *!*/
    display:block;zoom:1;
    padding-left: .18rem;
  }
  .userimg{
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    border: 0.05rem solid rgba(0,0,0,.3);
  }
  .focus{
    position: absolute;
    top: .7rem;
    left: 1rem;
    width: .34rem;
    height: .34rem;
  }
  .usern{
    margin-top: .5rem;
    margin-left: .15rem;
    font-size: .28rem;
  }
  .tlist{
    position: absolute;
    right:.2rem;
    top: 4.45rem;
    width: .6rem;
    height: 1rem;
    font-size: .22rem;
    text-align: center;
  }
  .tlist img{
    width: .44rem;
    height: .42rem;
    margin: .15rem .1rem;
  }
  .tlist p:last-child{
    margin-top: .45rem;
  }
  .actlist{
    position: absolute;
    bottom: .1rem;
    left: 0;
    width: 100%;
    height: 1.65rem;
    font-size: .28rem;
   /* background: -webkit-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Safari 5.1 - 6.0 *!
    background: -o-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Opera 11.1 - 12.0 *!
    background: -moz-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Firefox 3.6 - 15 *!
    background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* 标准的语法 *!*/
    display:block;zoom:1;
  }
  .actlist p{padding-left: .34rem;}
  .actp{
    margin-top: .25rem;
  }
  .acting{font-size: .3rem;}
  .actend{font-size: .2rem;}
  .try{
    position: absolute;
    left: 2.46rem;
    bottom:.1rem;
    width: 2rem;
    height: .64rem;
  }
</style>
