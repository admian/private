<template>
    <div id='onesStory'>
      <x-header :left-options="{backText: ''}">TA的故事</x-header>
      <div class="container">
        <ul>
          <li class="info-item clearfix" v-for="(item,index) in stroyList" :key="index"><!--1.-->
            <div class="item-time"><!--  '' : ''-->
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
                      <span><img src="../../assets/img/self/leave_ico.png" class="leave-icon">{{i.evaluateCount ? i.evaluateCount : 0}}</span>
                      <span><img src="../../assets/img/self/like_ico.png" class="like-ico">{{i.favoriteCount ? i.favoriteCount :0}}</span>
                    </div>
                  </router-link>
                </div>

            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import { XHeader } from 'vux'
    export default {
        name: "onesStory",
        data() {
            return {
              stroyList:[],
              pageIndex: 1,
              isLoading:false,
              needAdd:true,
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
            }
        },
        components:{XHeader},
        computed: {
            ...mapState([
                'headerTxt'
            ])
        },
        mounted() {
          this.scroll()
        },
        methods: {
          ...mapMutations(
              ['SETSTATE']
          ),
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
          scroll() {
            this.isLoading = false;
            window.onscroll = () => {
              // 距离底部200px时加载一次
              let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
              let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200
              if (bottomOfWindow && this.isLoading == false) {
                this.isLoading = true
                if(this.needAdd){
                  this.pageIndex++;
                  this.getStore(false)
                }
              }
            }
          },
          changTime(time){
            var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            /* var h = date.getHours() + ':';
             var m = date.getMinutes() + ':';
             var s = date.getSeconds();*/
            return Y+M+D;
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
          getStore(isEmpty) {
            let limit = 10;
            let _this=this;
            this.$post('/api/offline/story/queryByUserIdStroyList', {userId:this.userId,pageSize: limit, pageNum: this.pageIndex }).then(res => {
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
                  };
                }
                for (let j in list) {
                  let obj = {};
                  obj.time = j;
                  obj.list = list[j];
                  recentList.push(obj);
                }

               // this.stroyList.push(...recentList);
                if (isEmpty) {
                  this.stroyList.push(...recentList);
                } else{
                  //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                  this.stroyList.push(...recentList);
                }
              //console.log(this.stroyList);
                if (res.list && res.pages <= this.pageIndex) {
                  this.needAdd=false;
                  //console.log(this.needAdd)
                  this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
                  return
                }
                if (!isEmpty) {
                  this.scrollerStatus.pullupStatus = 'default'
                  this.$nextTick(() => {

                  })
                }
              }
            )},
        },
        created(){
          this.userId=this.$route.query.userId;
          this.getStore(true);
        }
    }
</script>

<style scoped>
  .container{
    padding: 0 .3rem;
  }
  .item-time{
    float: left;
    margin-right: .2rem;

  }

  .i-date {
    font-size: .4rem;
  }

  .i-month {
    font-size: .28rem;
    margin-top: .18rem;
    width: .6rem;
  }
  .connect-wrap{
    position: relative;
    float: left;
    padding-left: .15rem;
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
    width: 5.85rem;
    border-radius: .1rem;
    margin-bottom: .35rem;
    color: #fff;
  }
  .stroyimg{
    width: 1.7rem;
    height: 1.5rem;
    float: left;
    margin-right: .05rem;
    margin-bottom: .1rem;
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
</style>
