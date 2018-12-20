<template>
   <div id="comments">
     <Tabs value="t">
       <TabPane label="推荐" name="t">

           <div class="stack-wrapper">
             <ul class="stack">
               <li class="stack-item" v-for="(item, index) in pages"
                   :style="[transformIndex(index),transform(index)]"
                   @touchmove.stop.capture.prevent="touchmove"
                   @touchstart.stop.capture.prevent="touchstart"
                   @touchend.stop.capture.prevent="touchend"
                   @touchcancel.stop.capture.prevent="touchend"
                   @mousedown.stop.capture.prevent="touchstart"
                   @mouseup.stop.capture.prevent="touchend"
                   @mousemove.stop.capture.prevent="touchmove"
                   @mouseout.stop.capture.prevent="touchend"
                   @webkit-transition-end="onTransitionEnd(index)"
                   @transitionend="onTransitionEnd(index)"
                   >
                 <div class="center-video">
                   <img :src="item.videoimg">
                 </div>
                 <div class="twrap" >
                   <div class="top_user">
                     <img :src="item.userp" class="userimg fl">
                     <img src="../../assets/img/choice/comme.png" class="focus">
                     <i class="usern fl">{{item.name}}</i>
                   </div>
                   <div class="rightlist">
                     <p @click.prevent="addLike(index)"><img :src="is_like? require('../../assets/img/like_sel_ico.png') : require('../../assets/img/like_ico.png')"/>{{item.like}}</p>
                     <p @click="showPopup"><img src="../../assets/img/choice/leave.png"/>{{item.leave}}</p>
                     <p><img src="../../assets/img/choice/share.png"/></p>
                   </div>
                   <div class="actlist">
                     <p>{{item.des}}</p>
                     <p class="actp"><span class="acting">正在参加《{{item.act}}》</span><span class="actend">报名截止 {{item.time}}</span></p>
                   </div>
                 </div>
               </li>
             </ul>
           </div>


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
  import detectPrefixes from '../../utils/detect-prefixes.js'
  import  {Tabs,TabPane} from 'iview'
  import { Popup } from 'vux'
    export default {
        name: "index", //精选
        components:{ Tabs,TabPane,Popup},
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
          },
          pages:[],
          basicdata: {
            start: {},
            end: {}
          },
          temporaryData: {
            prefixes: detectPrefixes(),
            offsetY: '',
            poswidth: 0,
            posheight: 0,
            lastPosWidth: '',
            lastPosHeight: '',
            lastZindex: '',
            rotate: 0,
            lastRotate: 0,
            visible:  3,
            tracking: false,
            animation: false,
            currentPage:  0, //this.stackinit.currentPage ||
            opacity: 1,
            lastOpacity: 0,
            swipe: false,
            zIndex: 10
          }
        }
      },
      mounted(){
        // 绑定事件
        this.$on('next', () => {
          this.next()
        })
        this.$on('prev', () => {
          this.prev()
        })
        document.addEventListener('touchmove', (e) => {
          e.preventDefault()
        })
         let that= this
         setTimeout(function () {
          that.pages=[
              {userp:require('../../assets/img/choice/11.jpg'),name:'章鱼的心',like:'20W',leave:'100W',des:'今天这支舞可以拿去告白',act:'后来的我们',time:'2018-10-20',videoimg:require('../../assets/img/choice/q.png')},
              {userp:require('../../assets/img/choice/11.jpg'),name:'章鱼的心',like:'20W',leave:'100W',des:'今天这支舞可以拿去告白',act:'后来的我们',time:'2018-10-20',videoimg:require('../../assets/img/choice/qq.png')},
              {videoimg:require('../../assets/img/choice/q.png')},
              {videoimg:require('../../assets/img/choice/qq.png')},
              {videoimg:require('../../assets/img/choice/q.png')},
              {videoimg:require('../../assets/img/choice/qq.png')},
              {videoimg:require('../../assets/img/choice/q.png')}
            ]

        },2000)
        // console.log('this is current player instance object', this.player)
       /* setTimeout(() => {


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
        }, 5000)*/
      },
      computed: {
        // 划出面积比例
        offsetRatio () {
          let width = this.$el.offsetWidth
          let height = this.$el.offsetHeight
          let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
          let offsetHeight = height - Math.abs(this.temporaryData.posheight)
          let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
          return ratio > 1 ? 1 : ratio
        },
        // 划出宽度比例
        offsetWidthRatio () {
          let width = this.$el.offsetWidth
          let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
          let ratio = 1 - offsetWidth / width || 0
          return ratio
        },
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods:{
        touchstart (e) {
          if (this.temporaryData.tracking) {
            return
          }
          // 是否为touch
          if (e.type === 'touchstart') {
            if (e.touches.length > 1) {
              this.temporaryData.tracking = false
              return
            } else {
              // 记录起始位置
              this.basicdata.start.t = new Date().getTime()
              this.basicdata.start.x = e.targetTouches[0].clientX
              this.basicdata.start.y = e.targetTouches[0].clientY
              this.basicdata.end.x = e.targetTouches[0].clientX
              this.basicdata.end.y = e.targetTouches[0].clientY
              // offsetY在touch事件中没有，只能自己计算
              this.temporaryData.offsetY = e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop
            }
            // pc操作
          } else {
            this.basicdata.start.t = new Date().getTime()
            this.basicdata.start.x = e.clientX
            this.basicdata.start.y = e.clientY
            this.basicdata.end.x = e.clientX
            this.basicdata.end.y = e.clientY
            this.temporaryData.offsetY = e.offsetY
          }
          this.temporaryData.tracking = true
          this.temporaryData.animation = false
        },
        touchmove (e) {
          // 记录滑动位置
          if (this.temporaryData.tracking && !this.temporaryData.animation) {
            if (e.type === 'touchmove') {
              e.preventDefault()
              this.basicdata.end.x = e.targetTouches[0].clientX
              this.basicdata.end.y = e.targetTouches[0].clientY
            } else {
              e.preventDefault()
              this.basicdata.end.x = e.clientX
              this.basicdata.end.y = e.clientY
            }
            // 计算滑动值
            this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
            this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
            let rotateDirection = this.rotateDirection()
            let angleRatio = this.angleRatio()
            this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
          }
        },
        touchend (e) {
          this.temporaryData.tracking = false
          this.temporaryData.animation = true
          // 滑动结束，触发判断
          // 判断划出面积是否大于0.4
          if (this.offsetRatio >= 0.4) {
            // 计算划出后最终位置
            let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
            this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
            this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
            this.temporaryData.opacity = 0
            this.temporaryData.swipe = true
            this.nextTick()
            // 不满足条件则滑入
          } else {
            this.temporaryData.poswidth = 0
            this.temporaryData.posheight = 0
            this.temporaryData.swipe = false
            this.temporaryData.rotate = 0
          }
        },
        nextTick () {
          // 记录最终滑动距离
          this.temporaryData.lastPosWidth = this.temporaryData.poswidth
          this.temporaryData.lastPosHeight = this.temporaryData.posheight
          this.temporaryData.lastRotate = this.temporaryData.rotate
          this.temporaryData.lastZindex = 20
          // 循环currentPage
          this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
          // currentPage切换，整体dom进行变化，把第一层滑动置最低
          // console.log( 'a')

          this.$nextTick(() => {
            this.temporaryData.poswidth = 0
            this.temporaryData.posheight = 0
            this.temporaryData.opacity = 1
            this.temporaryData.rotate = 0
          })
        },
        onTransitionEnd (index) {
          let lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
          //console.log('last'+lastPage)
          // dom发生变化正在执行的动画滑动序列已经变为上一层
          if (this.temporaryData.swipe && index4 === lastPage) {
            this.temporaryData.animation = true
            this.temporaryData.lastPosWidth = 0
            this.temporaryData.lastPosHeight = 0
            this.temporaryData.lastOpacity = 0
            this.temporaryData.lastRotate = 0
            this.temporaryData.swipe = false
            this.temporaryData.lastZindex = -1
          }
        },
        prev () {
          this.temporaryData.tracking = false
          this.temporaryData.animation = true
          // 计算划出后最终位置
          let width = this.$el.offsetWidth
          this.temporaryData.poswidth = -width
          this.temporaryData.posheight = 0
          this.temporaryData.opacity = 0
          this.temporaryData.rotate = '-3'
          this.temporaryData.swipe = true
          this.nextTick()
        },
        next () {
          this.temporaryData.tracking = false
          this.temporaryData.animation = true
          // 计算划出后最终位置
          let width = this.$el.offsetWidth
          this.temporaryData.poswidth = width
          this.temporaryData.posheight = 0
          this.temporaryData.opacity = 0
          this.temporaryData.rotate = '3'
          this.temporaryData.swipe = true
          this.nextTick()
        },
        rotateDirection () {
          if (this.temporaryData.poswidth <= 0) {
            return -1
          } else {
            return 1
          }
        },
        angleRatio () {
          let height = this.$el.offsetHeight
          let offsetY = this.temporaryData.offsetY
          let ratio = -1 * (2 * offsetY / height - 1)
          return ratio || 0
        },
        inStack (index, currentPage) {
          let stack = []
          let visible = this.temporaryData.visible
          let length = this.pages.length
          for (let i = 0; i < visible; i++) {
            if (currentPage + i < length) {
              stack.push(currentPage + i)
            } else {
              stack.push(currentPage + i - length)
            }
          }
          return stack.indexOf(index4) >= 0
        },
        // 非首页样式切换
        transform (index) {
          let currentPage = this.temporaryData.currentPage
          let length = this.pages.length
          let lastPage = currentPage === 0 ? this.pages.length - 1 : currentPage - 1
          let style = {}
          let visible = this.temporaryData.visible
          if (index4 === this.temporaryData.currentPage) {
            return
          }
          if (this.inStack(index4, currentPage)) {
            let perIndex = index4 - currentPage > 0 ? index4 - currentPage : index4 - currentPage + length
            style['opacity'] = '1'
            style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
            style['zIndex'] = visible - perIndex
            if (!this.temporaryData.tracking) {
              style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
              style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
            }
          } else if (index4 === lastPage) {
            style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
            style['opacity'] = this.temporaryData.lastOpacity
            style['zIndex'] = this.temporaryData.lastZindex
            style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
            style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
          } else {
            style['zIndex'] = '-1'
            style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
          }
          return style
        },
        // 首页样式切换
        transformIndex (index) {
          if (index4 === this.temporaryData.currentPage) {
            let style = {}
            style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
            style['opacity'] = this.temporaryData.opacity
            style['zIndex'] = 10
            if (this.temporaryData.animation) {
              style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
              style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
            }
            return style
          }
        },
       addLike(i){
          console.log(i);
          console.log('dainji');
          this.is_like = !this.is_like
       },
       showPopup(){
          this.popupState = true;
       }
      }
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

  .bg1{
    background:#2C1E4A;
  }
  .bg2{
    background:#37255C;
  }
  .stack {
    /*width: 100%;
    height: 100%;*/
    width: 6.9rem;
    height: 9.5rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 1000px;
    -webkit-perspective-origin: 50% 150%;
    margin: 0;
    padding: 0;
  }
  .stack-item{
    background: #2C1E4A;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
  }
  .stack-wrapper{
    margin-left: .3rem;
    position: relative;
    z-index: 999;
    width: 7rem;
    height:10.1rem;
    padding: 0;
    list-style: none;
    pointer-events: none;
  }
  .twrap{
    width: 100%;
    height: 9.3rem;
    z-index: 2000;
    /*display: flex;*/
    /* background: #fff;*/
  }

  .center-video{
    position: absolute;
    top: 0;
    left: 0;
    width: 6.9rem;
    height: 9.27rem;

  }
  .video-player {
    height: 100%;
  }
  .top_user{

    float: left;
    width: 100%;
    /*height: 1.68rem;*/
    /*  background: -webkit-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Safari 5.1 - 6.0 *!
      background: -o-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Opera 11.1 - 12.0 *!
      background: -moz-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Firefox 3.6 - 15 *!
      background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* 标准的语法 *!*/
    padding-left: .18rem;
  }
  .userimg{
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    border: 0.05rem solid rgba(0,0,0,.3);
    position: relative;
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
    color: #fff;
  }
  .rightlist{
    /*float: right;*/
    /*margin-right:.2rem;*/
    /*margin-top: 3rem;*/
    position: absolute;
    top: 3rem;
    right: .2rem;
    width: .6rem;
    height: 2em;
    font-size: .22rem;
    text-align: center;

  }
  .rightlist p{margin-top:.2rem;}
  .rightlist img{
    width: .44rem;
    height: .42rem;
    margin: .15rem .1rem;
  }
  .rightlist p:last-child{
    margin-top: .45rem;
  }
  .actlist{
    /*float: left;
    margin-bottom:.1rem;
    margin-left: 0;*/
    height: 1.67rem;
    width: 100%;
    float: left;
    margin-top: 3.6rem;
    font-size: .28rem;
    /* background: -webkit-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Safari 5.1 - 6.0 *!
     background: -o-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Opera 11.1 - 12.0 *!
     background: -moz-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Firefox 3.6 - 15 *!
     background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* 标准的语法 *!*/
    display:block;zoom:1;
  }
  .actlist p{padding-left: .34rem;text-align: left}
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
