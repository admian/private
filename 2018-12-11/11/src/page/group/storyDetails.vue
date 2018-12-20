<template>
    <div id='storyDetails'>
        {{SETSTATE({type:'headerTxt',val:''})}}
      <div class="start-info">
        <p class="story-title">这是一个真实的经历，那年我才12岁，发生的事情让我记到现在</p>
        <div class="user-info clearfix">
          <div class="fl clearfix">
            <img src="../../assets/img/choice/11.jpg" class="user-p"/>
            <div class="user-n">
              <p>章鱼不是鱼</p>
              <p class="label-n">深夜情感</p>
            </div>
          </div>
          <div class="focus" :class="isFocus ?'focus-yes': 'focus-no'" @click="clickFocus">{{focusTxt}}</div>
        </div>
        <div class="video-info"><img src="../../assets/img/self/vvv.png" class="vvv"><span class="v-time">{{time}}</span></div>
        <p class="story-connect">她有一个条件很不错的男朋友：家世清白，背景良好，本人又是经理，时 下的高尚职业，开银色的马自达，在市中心的高层建筑里有一套自己的房子。</p>
        <p class="pulish">发布于2018.09.27 16:02 著作权归作者所有</p>
      </div>
      <div class="reply-wrap">
        <p class="title-com">{{comments}}条评论</p>
        <div class="comment_item">
          <div class="comment_item_bd">
              <div class="clearfix">
                <div class="fl">
                  <img src="../../assets/img/choice/11.jpg" class="fl nick-p">
                  <div class="nickname">
                    <p>猪在天上飞</p>
                    <p>2018.09.29 12:27</p>
                  </div>
                </div>
                <div class="fr comment_l">
                  <span><img src="../../assets/img/self/s_like.png" class="s_like"><span class="like-num">52</span></span>
                  <span><img src="../../assets/img/self/s_leave.png" class="s_leave"></span>
                </div>
              </div>
              <p class="comment_txt">爱情的模样，我还年轻</p>
          </div>
          <ul>
            <li><span>1111</span>@<span>2222</span>:<span class="com_txt">哈哈哈哈</span></li>
            <li><span>2222</span>@<span>1111</span>:<span class="com_txt">哈哈哈哈</span></li>
          </ul>
        </div>

        <div class="comment_item">
          <div class="comment_item_bd">
            <div class="clearfix">
              <div class="fl">
                <img src="../../assets/img/choice/11.jpg" class="fl nick-p">
                <div class="nickname">
                  <p>啦啦啦</p>
                  <p>2018.09.29 12:27</p>
                </div>
              </div>
              <div class="fr comment_l">
                <span><img src="../../assets/img/self/s_like.png" class="s_like"><span class="like-num">52</span></span>
                <span><img src="../../assets/img/self/s_leave.png" class="s_leave"></span>
              </div>
            </div>
            <p class="comment_txt">爱情的模样，我还年轻</p>
          </div>
        </div>

        <div class="comment_item">
          <div class="comment_item_bd">
            <div class="clearfix">
              <div class="fl">
                <img src="../../assets/img/choice/11.jpg" class="fl nick-p">
                <div class="nickname">
                  <p>猪在天上飞</p>
                  <p>2018.09.29 12:27</p>
                </div>
              </div>
              <div class="fr comment_l">
                <span><img src="../../assets/img/self/s_like.png" class="s_like"><span class="like-num">52</span></span>
                <span><img src="../../assets/img/self/s_leave.png" class="s_leave"></span>
              </div>
            </div>
            <p class="comment_txt">爱情的模样，我还年轻</p>
          </div>
          <ul>
            <li><span>1111</span>@<span>2222</span>:<span class="com_txt">哈哈哈哈，爱情的模样，我还年轻！！！！嗯嗯呢</span></li>
          </ul>
        </div>

         <p class="comment_end">END</p>
      </div>
      <!--输入文本-->
      <div class="comment_info">
        <p class="comment_user" v-show="">回复@ <span>1111</span></p>
        <textarea  class="input-txt" placeholder="写下你的评论">{{commentTxt}}</textarea>
        <button class="input-btn">发送</button>
        <img :src="isStory ? require('../../assets/img/like_sel_ico.png'):require('../../assets/img/self/like_story.png')" class="like_story" @click="likeStory">
      </div>
      <!--评论区结束-->
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "storyDetails",
        data() {
            return {
              isFocus:false,
              isStory:false,
              focusTxt:'关注',
              time:'3:02',
              comments:'268',
              commentTxt:'',
            }
        },
        computed: {
            ...mapState([
                'headerTxt'
            ])
        },
        methods: {
            ...mapMutations(
                ['SETSTATE']
            ),
          clickFocus(){
              this.isFocus=!this.isFocus
              if(this.isFocus===true){
                this.focusTxt='已关注'
              }else{
                this.focusTxt='关注'
              }
          },
          likeStory(){
            this.isStory=!this.isStory
          }

        }
    }
</script>

<style scoped>
  .start-info{border-bottom: .2rem solid #251740;}
  .story-title{font-size: .34rem;color: #fff;line-height: .56rem;padding: 0 .3rem;}
  .user-info{padding: 0 .3rem;}
  .user-p{
    width: .7rem;
    height: .7rem;
    border: 2px solid rgba(255,255,255,.8);
    border-radius: 50%;
    float: left;
    margin-right: .14rem;
  }
  .user-n{font-size: .3rem;display: inline-block;}
  .label-n{
    width:.9rem;
    height:.34rem;
    line-height: .3rem;
    text-align: center;
    border:2px solid rgba(100, 83, 185, 1);
    border-radius:.17rem;
    color:rgba(226,213,255,1);
    font-size: .18rem;
    display: inline-block;
    margin-top: .14rem;
  }
  .focus{
    float: right;
    width:1.02rem;
    height:.52rem;
    font-size: .22rem;
    border-radius:.26rem;
    text-align: center;
  }
  .focus-no{color: #130C21;background:#FECF74;line-height: .52rem;margin-top: .1rem;}
  .focus-yes{color: #fff;border:2px solid rgba(76, 53, 115, 1);line-height: .48rem;margin-top: .1rem;}
  /*语音*/
  .video-info{margin-top: .5rem;height: 3.38rem;background:url("../../assets/img/self/video-bg.png");background-size: 100% 100%;position: relative;}
  .vvv{position: absolute;width: 3.52rem;height: .7rem;top: 1.46rem;left: 1.88rem;}
  .v-time{position: absolute;top:1.7rem;left: 3.26rem;font-size: .3rem;}
  /*故事*/
  .story-connect{
    color:  #D9D7D7 ;
    font-size: .34rem;
    line-height: .56rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding: 0 .3rem;
  }
  .pulish{margin-bottom: .5rem;font-size: .22rem;color: #d3d2d4;padding: 0 .3rem;}
  /*评论*/
  .reply-wrap{padding: 0 .3rem;margin-top: .3rem;}
  .title-com{padding-bottom: .3rem;border-bottom: .02rem solid  #251740 ;}
  .comment_item{border-bottom: .02rem solid  #251740 ;padding: .3rem 0;}

  .nick-p{ width: .5rem;height: .5rem;border: 2px solid rgba(255,255,255,.8);border-radius: 50%;}
  .nickname{margin-top: .12rem;margin-left: .18rem;float: left;}
  .nickname p:first-child{font-size: .26rem;}
  .nickname p:last-child{font-size: .24rem;margin-top: .1rem;}
  .comment_l{font-size: .22rem; height: .3rem;}
  .comment_l span{margin-right: .1rem; float: left;}
  .like-num{margin-top: .05rem; color:  #6453B9;}
  .s_like{width: .32rem;height: .3rem;float: left;margin-right: .04rem;}
  .s_leave{width: .32rem;height: .3rem;}
  .comment_txt{margin-top: .38rem;font-size: .32rem;color: #fff;}
  .comment_item ul{background:  #251740;margin-top: .39rem;}
  .comment_item ul li{padding: .21rem .26rem;color: #FECF74;font-size: .3rem;line-height: .4rem;}
  .comment_item ul li span{padding: 0 .06rem 0 0;}
  .com_txt{color: #fff;}
  .comment_end{color: #251740;font-size: .28rem;margin-bottom: 1.02rem;text-align: center;margin-top: .2rem;}
  /*评论输入*/
  .comment_info{background: #251740;height: 1.02rem;position: fixed;bottom: 0;width: 100%;}
  .input-txt{
    width: 5.25rem;
    height: .66rem;
    font-size: .26rem;
    border: .02rem solid #8A60FF;
    background-color: transparent;
    color: #59389A ;
    padding: .2rem .34rem;
    border-radius:33px;
    margin-top: .18rem;
    margin-left: .29rem;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #59389A;
    font-size: .26rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #59389A;
    font-size: .26rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #59389A;
    font-size: .26rem;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #59389A;
    font-size: .26rem;
  }
  .input-btn{
    float: right;
    width: .8rem;
    height: .48rem;
    color: #fff;
    font-size: .26rem;
    text-align: center;
    line-height: .48rem;
    border: .02rem solid #8A60FF;
    background-color: transparent;
    border-radius:.1rem;
    margin-top: .25rem;
    margin-right: .5rem;
  }
  .like_story{width: .40rem;height: .36rem;position: absolute;right: .7rem;top: -.25rem;}
  .comment_user{position: absolute;left: .6rem;top: -.25rem;font-size: .26rem;color: #59389A ;}
  .comment_user span{ margin-left: .05rem; }
</style>
