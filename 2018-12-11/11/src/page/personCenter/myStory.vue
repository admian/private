<template>
    <div id='myStory'>
        {{SETSTATE({type:'headerTxt',val:'故事'})}}
      <div>
        <div class="tabs">
          <tab :line-width="2">
            <tab-item :selected="num===1" @on-item-click="onItemClick(1)">已发</tab-item>
            <tab-item :selected="num===2" @on-item-click="onItemClick(2)">回复</tab-item>
            <tab-item :selected="num===3" @on-item-click="onItemClick(3)">喜欢</tab-item>
          </tab>
        </div>
        <div class="connect">
          <scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="true"
                    :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                    @on-pullup-loading="selPullUp">
            <div class="container" v-show="key==1">
              <ul>
                 <li class="info-item"><!--1.-->
                   <div class="item-time">
                     <p class="i-date">26</p>
                     <p class="i-month">8月</p>

                   </div>
                   <div class="connect-wrap">
                     <div class="ico-cri"></div>
                     <!--故事-->
                     <router-link to="/storyDetails">
                       <div class="con-item">
                           <div class="book-info">
                            <p class="book-title">沧海为水</p>
                            <p class="book-txt">本土嫡女vs重生女、穿越女 端木徳淑最近发现身边总围绕着些奇奇怪怪的人。 比如:莫名其妙要跟皇上一生一世一双人的；莫名其妙自立自... </p>
                           </div>
                           <div class="num-list">
                             <span><img src="../../assets/img/self/leave_ico.png" class="leave-icon">103W</span>
                             <span><img src="../../assets/img/self/like_ico.png" class="like-ico">103W</span>
                           </div>
                       </div>
                     </router-link>
                   </div>
                 </li>
                <li class="info-item"><!--1.-->
                  <div class="item-time">
                    <p class="i-date">24</p>
                    <p class="i-month">8月</p>

                  </div>
                  <div class="connect-wrap">
                    <div class="ico-cri"></div>
                    <!--语音-->
                    <router-link to="/storyDetails">
                      <div class="con-item">
                        <div class="video-info">
                          <img src="../../assets/img/self/video-play.png" class="video-play">
                          <div class="video-book">
                            <p class="video-title">我的故事有人听吗？</p>
                            <p class="video-des">我的心我的夜，到底放在那里？</p>
                          </div>
                        </div>
                        <div class="num-list">
                          <span><img src="../../assets/img/self/leave_ico.png" class="leave-icon">103W</span>
                          <span><img src="../../assets/img/self/like_ico.png" class="like-ico">103W</span>
                        </div>
                      </div>
                    </router-link>

                    <div class="con-item">
                      <div class="book-info">
                        <p class="book-title">沧海为水</p>
                        <p class="book-txt">本土嫡女vs重生女、穿越女 端木徳淑最近发现身边总围绕着些奇奇怪怪的人。 比如:莫名其妙要跟皇上一生一世一双人的；莫名其妙自立自... </p>
                      </div>
                      <div class="num-list">
                        <span><img src="../../assets/img/self/leave_ico.png" class="leave-icon">103W</span>
                        <span><img src="../../assets/img/self/like_ico.png" class="like-ico">103W</span>

                      </div>
                    </div>

                  </div>
                </li>
              </ul>
            </div>
            <div v-show="key==2">
              <div class="reply" v-for=" (i,index) in newReplylist" :key="index">
                <div class="reply_title clearfix">
                    <div class="fl">
                      <p>10月19日</p>
                      <p>{{i.isChange ? i.newTxt : i.reply}}</p>
                    </div>
                    <div class="fr">
                       <div class="bv">
                          <img src="../../assets/img/self/book.png" class="fr">
                       </div>
                      <div v-show="i.newTxt">
                        <div class="epl-down" @click="changeTxt(index)" v-show="i.isChange">
                           <img src="../../assets/img/self/epl-down.png">查看更多
                        </div>
                        <div class="epl-up"  @click="changeTxt(index)" v-show="!i.isChange">
                           <img src="../../assets/img/self/epl-up.png">
                         </div>
                      </div>
                    </div>
                </div>
                <div class="reply_connect">
                  <p>回复@<i>学渣一枚</i>：<span class="reply_text">哈哈哈爱情的模样~爱情的模样~爱情的模样~爱情的模样~爱情的模样~爱情的模样~</span></p>
                </div>

              </div>
            </div>
            <div class="container" v-show="key==3">
              <div class="timeTitle"><p>最新</p></div>
              <ul>
                <li>
                  <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
                  <div class="focusDiv">
                    <p><span class="focusName">朵喵喵</span><span>点赞了你的作品</span></p>
                    <p class="worktitle">#我有故事你有梦#</p>
                    <p class="focusTime">2018.10.20</p>
                  </div>
                  <div class="temework">
                    <img src="../../assets/img/self/book.png">
                  </div>
                </li>
                <li>
                  <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
                  <div class="focusDiv">
                    <p><span class="focusName">朵喵喵</span><span>点赞了你的作品</span></p>
                    <p class="worktitle">#我有故事你有梦#</p>
                    <p class="focusTime">2018.10.20</p>
                  </div>
                  <div class="temework">
                    <img src="../../assets/img/self/book.png">
                  </div>
                </li>

              </ul>
              <div class="timeTitle"><p>历史</p></div>
              <ul>
                <li>
                  <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
                  <div class="focusDiv">
                    <p><span class="focusName">朵喵喵</span><span>点赞了你的作品</span></p>
                    <p class="worktitle">#我有故事你有梦#</p>
                    <p class="focusTime">2018.10.20</p>
                  </div>
                  <div class="temework">
                    <img src="../../assets/img/self/videostop.png">
                  </div>
                </li>

              </ul>

            </div>
          </scroller>
        </div>

      </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import { Tab, TabItem ,Scroller } from 'vux'

    export default {
        name: "myStory",
        components: {
          Tab,
          TabItem,
          Scroller
        },
        data() {
          return {
            eChange:false,
            isShow:true,
            key:1,
            num:1,
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
            newReplylist:[],
            //测试数据
            list:[
              {reply:'爱情的模样~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~'},
              {reply:'爱情的模样~爱情的模样~爱情的模样~爱情的模样~~'},
              {reply:'爱情的模样~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~~爱情的模样~爱情的模样~爱情的模样~'},
              ]
          }
        },
        computed: {
          ...mapState([ 'headerTxt' ]),
        },
        methods: {
          ...mapMutations(['SETSTATE']),
          //下拉加载
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
          selPullUp() {
            this.pageIndex++;
           // this.getData(false);
          },
          //切换时间
          onItemClick(num){
            this.key=num
          },
          changeTxt(i){
            //改变的状态=>
            let obj = this.newReplylist[i];
            obj.isChange = !obj.isChange;
            //动态更改的数据，vue
            this.$set(this.newReplylist,i,obj)
          }
        },
      created(){
          let _this = this;
          this.list.map(function (i) {
             i.isChange=false
             if(i.reply.length > 40){
               i.newTxt= i.reply.slice(0,40) + '...'
               i.isChange=true
             }
            _this.newReplylist.push(i)
          })
          //console.log(this.newReplylist)

      }

    }

</script>
<style>
  #myStory .vux-tab{
    background-color: transparent;
    height: 37px;
  }
  #myStory .vux-tab .vux-tab-item{
    background-size: 100% 0px;

  }
  #myStory .vux-tab .vux-tab-item.vux-tab-selected{
    color: #fff;
    border-bottom: 0px solid #fff;
  }
  #myStory .vux-tab-ink-bar{
    background-color: #fff;
    width: .7rem;
    margin: auto;
  }
</style>
<style scoped>
 .container{
   padding: 0 .3rem;
 }
  .tabs{
    margin-bottom: .3rem;
  }
  /*已发*/
  .item-time{
    float: left;
    margin-right: .22rem;

  }

  .i-date{font-size: .4rem;}
  .i-month{font-size: .28rem;margin-top: .18rem;}
  .connect-wrap{
    position: relative;
    float: left;
    padding-left: .2rem;
   /* padding-bottom: .35rem;*/
    border-left: 2px solid #6453B9;

  }
 .ico-cri{
   position: absolute;
   left: -.13rem;
   top: .4rem;
   background: #6453B9;
   width: .2rem;
   height: .2rem;
   border-radius: 50%;
 }
  .con-item{
    background:  #211934 ;
    padding: .3rem;
    width: 5.94rem;
    border-radius: .1rem;
    margin-bottom: .35rem;
    color: #fff;
  }

  .book-title{font-size: .3rem;}
  .book-txt{font-size: .24rem;color: #CFCFCF;margin-top: .18rem;line-height: .3rem}

  .video-play{width: .6rem;height: .6rem; float: left;margin-right: .22rem;}
  .video-title{ font-size: .3rem;}
  .video-des{font-size: .24rem; margin-top: .12rem;}

  .num-list{margin-top: .3rem;height: .32rem;}
  .num-list span{float: right; font-size: .2rem;line-height: .26rem;margin-left: .3rem;}
  .like-ico{width: .3rem;height: .28rem;float: left;margin: 0 .07rem;}
  .leave-icon{width: .32rem;height: .3rem; float: left;margin: 0 .07rem;}
  /*回复*/
 .reply{
   background-color: #211934;
   padding:.3rem;
 }
 .reply_title{
   overflow: hidden;
   position: relative;
 }
 .reply_title .fl{
   color: #fff;
   font-size: .3rem;
   width: 5.6rem;
 }
 .reply_title .fl p:last-child{
   font-size: .3rem;
   margin-top: .25rem;
   margin-bottom: .4rem;
   line-height: .38rem;
 }
 /*省略号*/
 .ellips{
   overflow : hidden;
   text-overflow: ellipsis;
   display:-webkit-box;
   -webkit-line-clamp:3;
   -webkit-box-orient: vertical;
 }
 .epl-down{
   font-size: .22rem;
   color: #8C8896;
   margin-top: .55rem;
 }
 .epl-down img{
   width: .24rem;
   height: .14rem;
   float: left;
   margin-right: .05rem;
   margin-top: .05rem;
 }
 .epl-up{
   width: .24rem;
   height: .14rem;
   position: absolute;
   bottom: .4rem;
   right: .3rem;
 }
 .bv{overflow: hidden;}
 .bv img{width: .88rem;height: .88rem;}
 .reply_connect{
   background-color: #30244C;
   padding: .21rem .28rem;
   font-size: .3rem;
   color: #FECF74;
   border-radius:5px;
 }
 .reply_connect p{line-height: .38rem;}
 .reply_text{color: #fff; }
  /*喜欢*/
 .timeTitle{color: #fff;font-size: .28rem;}
 ul li{height: 1.2rem;margin:.47rem 0;}
 .focusPhoto{float: left;width: .8rem;height: .8rem;border-radius: 50%;}
 .focusDiv{float: left;margin-left: .2rem;color: #fff;font-size: .3rem;}
 .focusName{color: #FECF74;margin-right: .2rem;}
 .focusTime{color: #5C5170;font-size: .26rem;margin-top: .14rem;}
 .worktitle{opacity: .5;margin-top: .16rem;}
 .temework{float: right;}
 .temework img{width: .88rem;height: .88rem;}
</style>
