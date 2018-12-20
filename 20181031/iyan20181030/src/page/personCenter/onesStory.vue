<template>
    <div id='onesStory'>
        {{SETSTATE({type:'headerTxt',val:'TA的故事'})}}
      <div class="container">
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
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "onesStory",
        data() {
            return {}
        },
        computed: {
            ...mapState([
                'headerTxt'
            ])
        },
        methods: {
            ...mapMutations(
                ['SETSTATE']
            )
        }
    }
</script>

<style scoped>
  .container{
    padding: 0 .3rem;
  }
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
</style>
