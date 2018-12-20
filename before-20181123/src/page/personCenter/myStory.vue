<template>
  <div id='myStory'>

    <x-header :left-options="{backText: ''}">故事</x-header>
      <div class="tabs">
        <tab :line-width="2">
          <tab-item :selected="num===1" @on-item-click="onItemClick(1)">已发</tab-item>
          <tab-item :selected="num===2" @on-item-click="onItemClick(2)">回复</tab-item>
          <tab-item :selected="num===3" @on-item-click="onItemClick(3)">喜欢</tab-item>
        </tab>
      </div>

    <div class="connect">

        <div class="container" v-show="key==1">
          <!--添加发布空白页-->
          <div class="no-connect" v-if="!stroyList.length">
            <p align="center">好写手是在观众里面成长起来的~</p>
            <div class="btn-work">写几句</div>
          </div>
          <div v-else>
            <ul>
              <li class="info-item clearfix" v-for="(item,index) in stroyList" :key="index"><!--1.-->
                <div :class="hideTime ? 'item-time hide' : 'item-time'"><!--  '' : ''-->
                  <p class="i-date">{{updDay(item.time)}}</p>
                  <p class="i-month">{{updMonth(item.time)}}</p>
                </div>
                <div class="connect-wrap" >
                  <div class="ico-cri"></div>


                    <div class="con-item" v-for="(i,index) in item.list" :key="index"><!---->
                      <router-link :to="'/storyDetails?id='+i.id" class="row">
                        <!--故事-->
                        <div class="book-info" v-if="!i.pictureList.length && !i.voiceList.length">

                          <p class="book-title">{{i.storyName}}</p>
                          <p class="book-txt">{{hideTxt(i.storyBody)}}</p>
                        </div>
                        <div class="book-info" v-if="i.pictureList.length">

                          <p class="book-title">{{i.storyName}}</p>
                          <p class="book-txt">{{hideTxt(i.storyBody)}}</p>
                          <p class="clearfix"><i v-for="p in i.pictureList"><img :src="p.sourceUrl" class="stroyimg"></i></p>
                        </div>
                        <!--语音-->
                        <div class="video-info" v-if="i.voiceList.length">

                          <img src="../../assets/img/self/video-play.png" class="video-play">
                          <div class="video-book">
                            <p class="video-title">{{i.storyName}}</p>
                            <p class="video-des">{{i.storyBody}}</p>
                          </div>
                        </div>
                        <div class="num-list">
                          <span><img src="../../assets/img/self/leave_ico.png" class="leave-icon">{{i.evaluateCount ? i.evaluateCount : 0 }}</span>
                          <span><img src="../../assets/img/self/like_ico.png" class="like-ico">{{i.favoriteCount ? i.favoriteCount : 0 }}</span>
                        </div>
                      </router-link>
                    </div>


                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="key==2">
          <div class="no-connect" v-if="!newReplylist.length">
            <p align="center">沉默不是个好读者</p>
            <div class="btn-work">说几句</div>
          </div>
          <div v-else>
            <div class="reply" v-for=" (i,index) in newReplylist" :key="index">
              <div class="reply_title clearfix">
                <p>{{i.storyName}}</p>
                <p>{{i.isChange ? i.newTxt : i.evaluateBody}}</p>
              </div>
              <div class="clearfix">
                <div v-show="i.newTxt">
                  <div class="epl-down fr" @click="changeTxt(index)" v-show="i.isChange">
                    <img src="../../assets/img/self/epl-down.png">查看更多
                  </div>
                  <div class="epl-up fr" @click="changeTxt(index)" v-show="!i.isChange">
                    <img src="../../assets/img/self/epl-up.png">
                  </div>
                </div>
              </div>
              <div class="reply_connect" v-if="i.replyBody">
                <p>回复&nbsp;<i>{{i.nickName}}</i>：<span class="reply_text">{{i.replyBody}}</span></p>
              </div>
              <p align="right" style="font-size: .2rem;">{{changTime(i.evaluateDate)}}</p>
            </div>
          </div>
        </div>
        <div class="container" v-show="key==3">
          <div class="no-connect" v-if="!attentionList.length">
            <p align="center">好故事确实不是一两天就发现的</p>
            <div class="btn-work">找找看</div>
          </div>
          <div v-else>
            <ul>
              <li class="like_li" v-for="(item,index) in attentionList" :key="index">
                <div class="fl">
                  <router-link :to="'/person?userId='+item.userId"></router-link>
                  <img :src="item.headUrl" class="focusPhoto">
                  <div class="focusDiv">
                    <p><span class="focusName">{{item.nickName}}</span></p>
                    <p class="worktitle" v-if="item.storyName">《{{item.storyName}}》</p>
                    <p class="focusTime">{{changTime(item.fcd)}}</p>
                  </div>
                </div>
               <!-- <div class="temework">
                  <div :class="isfocus ? 'endfocus': 'nofocus'" @click="clickFocus()">{{focusTxt}}</div>
                </div>-->
              </li>
            </ul>
          </div>
        </div>

    </div>

    </div>

</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {Tab, TabItem, Scroller, XHeader} from 'vux'

  export default {
    name: "myStory",
    components: {
      Tab,
      TabItem,
      Scroller,
      XHeader
    },
    data() {
      return {
        isfocus:false,
        focusTxt:'已关注',
        key: 1,
        num: 1,
        hideTime:false,
        newReplylist: [],
        stroyList: [],
        attentionList: [],
        pageIndex: 1,
        page1:1,
        page2:1,
        isLoading:false,
        addData:true,
        addInfo:true,
        addTemp:true,
        scrollerStatus: {
          pullupStatus: 'default'
        },
      }
    },
    computed: {
      ...mapState(['headerTxt']),
    },
    mounted(){
      this.scroll()
    },
    methods: {
      ...mapMutations(['SETSTATE']),
      //切换
      onItemClick(num) {
        this.key = num;
        switch (num) {
          case 1:this.getData(true);
          break;
          case 2:this.getInfo(true);
          break;
          case 3:this.getTmpt(true);
          break;
        }
        this.scroll();
      },
      updDay(time){
        return time.slice(3,5)
      },
      updMonth(time){
        return time.slice(0,2)+'月'
      },
      hideTxt(txt){
        if(txt.length > 64){
          return txt.slice(0,64) + '...'
        }else{
          return txt
        }
      },
      changTime(time){
        var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        var D = date.getDate() + ' ';
        /* var h = date.getHours() + ':';
         var m = date.getMinutes() + ':';
         var s = date.getSeconds();*/
        return Y+M+D;
      },
      scroll() {
        this.isLoading = false;
        //console.log(this.key);
        window.onscroll = () => {
          // 距离底部200px时加载一次
          let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200
          if (bottomOfWindow && this.isLoading == false) {
            if(this.key==1) {
              this.isLoading = true;
              if (this.addData) {
                this.pageIndex++;
                this.getData(false);
              }
            }
            if(this.key==2){
              this.isLoading = true;
              if (this.addInfo) {
                this.page1++;
                this.getInfo(false);
              }
            }
            if(this.key==3){
              this.isLoading = true;
              if (this.addTemp) {
                this.page2++;
                this.getTmpt(false);
              }
            }
          }
        }
      },
      getData(isEmpty,) {
        let limit = 10;
        let _this = this;

          this.$post('/api/story/queryMyStroyList', {pageSize: limit, pageNum: this.pageIndex}).then(res => {
            this.isLoading = false
            /*------------------------------*/
            let recentList = [];
            let list = [];
            let recent_item = res.list;

            for (let k in recent_item) {
              let time = parseInt(recent_item[k].fcd) / 1000;
              time = _this.formatDateTime(time);
              if (list.hasOwnProperty(time)) {
                list[time].push(recent_item[k]);
              } else {
                list[time] = [];
                list[time].push(recent_item[k]);
              }
              ;
            }
            for (let j in list) {
              let obj = {};
              obj.time = j;
              obj.list = list[j];
              recentList.push(obj);
            }
            if (isEmpty) {
              this.stroyList.push(...recentList);
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.stroyList.push(...recentList);
            }
            //console.log(res.list.length);
            if (res.list && res.pages <= this.pageIndex ) {//
              this.addData = false;
              //console.log(this.needAdd)
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
      getInfo(isEmpty){
        let limit = 10;
          this.$post('/api/story/queryAllUserStoryEvaluateByPage', {pageSize: limit, pageNum: this.page1}).then(res => {
            this.isLoading = false
            let arr = [];
            res.list.map(function (i) {
              i.isChange = false;
              if (i.evaluateBody.length > 45) {
                i.newTxt = i.evaluateBody.slice(0, 45) + '...'
                i.isChange = true
              }
              arr.push(i)
            })
            if (isEmpty) {
              this.newReplylist = arr
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.newReplylist.push(...arr);
            }

            //console.log(res.list.length);

            if (res.list && res.pages <= this.page1) {
              this.addInfo = false;
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {
              })
            }
          });

      },
      getTmpt(isEmpty){
        let limit = 10;
          this.$post('/api/story/queryAllAttentionUserStoryByPage', {pageSize: limit, pageNum: this.page2}).then(res => {
            this.isLoading = false;

            if (isEmpty) {
              this.attentionList = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.attentionList.push(...res.list);
            }
            //console.log(res.list.length);

            if (res.list && res.pages <= this.page2) { //
              this.addTemp = false;
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {
              })
            }
          });
       },
      changeTxt(i) {
        //改变的状态=>
        let obj = this.newReplylist[i];
        obj.isChange = !obj.isChange;
        //动态更改的数据，vue
        this.$set(this.newReplylist, i, obj)
      },
      //时间序
      formatDateTime(timeStamp, type) { //type: 1 时分；2:星期几；默认 :月/日 || 年月日 || '今日'
        let weekday_zh = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let weekday_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        let act_d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let act_date = date.getFullYear() + '/' + month + '/' + act_d;
        date.setTime(timeStamp * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let new_data = y + '/' + m + '/' + d;
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return m + '/' + d;
        /*
                    if (type == 1) {
                      return h + ':' + min;
                    } else if (type == 2) {
                      return language == 'en' ? weekday_en[date.getDay()] : weekday_zh[date.getDay()];
                    }
                    if (act_date == new_data) {
                      return lang["sns_today"]
                    } else {
                      if (year == y) {
                        return m + '/' + d;
                      }
                      return new_data;
                    }
        */
      },
    },
    created(){
      this.getData(true);
    }

  }

</script>
<style>
  #myStory .vux-tab {
    background-color: transparent;
    height: 37px;
  }

  #myStory .vux-tab .vux-tab-item {
    background-size: 100% 0px;

  }

  #myStory .vux-tab .vux-tab-item.vux-tab-selected {
    color: #fff;
    border-bottom: 0px solid #fff;
  }

  #myStory .vux-tab-ink-bar {
    background-color: #fff;
    width: .7rem;
    margin: auto;
  }
</style>
<style scoped>
  .container {
    padding: 0 .3rem;
  }
  .tabs {
    margin-bottom: .3rem;
    position: relative;
    top: 0;
    left: 0;
    height: .74rem;
  }

  /*已发*/
  .item-time {
    float: left;
    margin-right: .2rem;

  }
  .hide{
    display: none;
  }
  .i-date {
    font-size: .4rem;
  }

  .i-month {
    font-size: .28rem;
    margin-top: .18rem;
    width: .6rem;
  }
  .connect-wrap {
    position: relative;
    float: left;
    padding-left: .2rem;
    /* padding-bottom: .35rem;*/
    border-left: 2px solid #6453B9;

  }

  .ico-cri {
    position: absolute;
    left: -.13rem;
    top: .4rem;
    background: #6453B9;
    width: .2rem;
    height: .2rem;
    border-radius: 50%;
  }

  .con-item {
    background: #211934;
    padding: .3rem;
    width: 5.85rem;
    border-radius: .1rem;
    margin-bottom: .35rem;
    color: #fff;
  }

  .book-title {
    font-size: .3rem;
    color: #fff;
  }

  .book-txt {
    font-size: .24rem;
    color: #CFCFCF;
    margin-top: .18rem;
    line-height: .3rem;
    margin-bottom: .25rem;
  }
  .stroyimg{
    width: 1.7rem;
    height: 1.5rem;
    float: left;
    margin-right: .05rem;
    margin-bottom: .1rem;
  }
  .video-play {
    width: .6rem;
    height: .6rem;
    float: left;
    margin-right: .22rem;
  }

  .video-title {
    font-size: .3rem;
  }
  .video-info{color: #ffffff;}
  .video-des {
    font-size: .24rem;
    margin-top: .12rem;
  }

  .num-list {
    margin-top: .3rem;
    height: .32rem;
  }

  .num-list span {
    float: right;
    font-size: .2rem;
    line-height: .26rem;
    margin-left: .3rem;
  }

  .like-ico {
    width: .3rem;
    height: .28rem;
    float: left;
    margin: 0 .07rem;
  }

  .leave-icon {
    width: .32rem;
    height: .3rem;
    float: left;
    margin: 0 .07rem;
  }

  /*回复*/
  .reply {
    background-color: #211934;
    padding: .3rem;
    margin-bottom: .3rem;
  }

  .reply_title {
    overflow: hidden;
    position: relative;
  }

  .reply_title p:first-child {
    color: #fff;
    font-size: .26rem;
    width: 5.6rem;
  }

  .reply_title p:last-child {
    font-size: .3rem;
    margin-top: .25rem;
    margin-bottom: .2rem;
    line-height: .38rem;
  }

  /*省略号*/
  .ellips {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .epl-down {
    font-size: .20rem;
    color: #8C8896;
  }

  .epl-down img {
    width: .24rem;
    height: .14rem;
    float: left;
    margin-right: .05rem;

  }

  .epl-up {
    width: .24rem;
    height: .14rem;
    position: absolute;
    bottom: .4rem;
    right: .3rem;
  }

  .reply_connect {
    font-size: .26rem;
    color: #FECF74;
    border-radius: 5px;
    margin-bottom: .2rem;
    margin-top: .1rem;
  }

  .reply_connect p {
    line-height: .38rem;
  }

  .reply_text {
    color: #fff;
    font-size: .24rem;
    color: #C6C6C6;
  }

  /*喜欢*/
  .timeTitle {
    color: #fff;
    font-size: .28rem;
  }

  .like_li {
    height: 1.2rem;
    margin: .47rem 0;
  }

  /*padding:.3rem; margin-bottom: .4rem;*/
  .focusPhoto {
    float: left;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
  }

  .focusDiv {
    float: left;
    margin-left: .2rem;
    color: #fff;
    font-size: .3rem;
  }

  .focusName {
    margin-right: .2rem;
  }

  .focusTime {
    color: #5C5170;
    font-size: .26rem;
    margin-top: .14rem;
  }

  .worktitle {
    opacity: .5;
    margin-top: .16rem;
    margin-left: -.1rem;
    max-width: 4.5rem;
  }

  .temework {
    float: right;
    margin-top: .2rem;
  }

  .endfocus {
    width: 1.03rem;
    height: .52rem;
    background: #4C3573;
    color: #fff;
    font-size: .22rem;
    border-radius: .26rem;
    text-align: center;
    line-height: .52rem;
  }

  .nofocus {
    width: 1.03rem;
    height: .52rem;
    background: #FECF74;
    color: #30214A;
    font-size: .22rem;
    border-radius: .26rem;
    text-align: center;
    line-height: .52rem;
  }

  /*没有故事*/
  .no-connect p {
    color: #737373;
    font-size: .3rem;
    margin-top: 3.28rem;
  }

  .btn-work {
    margin: auto;
    margin-top: 1.62rem;
    width: 3.38rem;
    height: .8rem;
    background: linear-gradient(-65deg, rgba(79, 51, 255, .8), rgba(162, 72, 255, .8));
    border-radius: .4rem;
    text-align: center;
    line-height: .8rem;
    color: #fff;
  }
</style>
