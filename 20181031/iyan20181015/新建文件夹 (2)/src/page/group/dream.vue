<template>
  <div id="dream">
    <div class="bgOpacity">
      <div class="tabs">
        <x-nav>{{SETSTATE({type:'indexTabIndex',val:1})}}</x-nav>
      </div>
      <div class="banner">
        <Carousel v-model="value" loop autoplay :autoplay-speed="4000">
          <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/dream/banner.png"></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/dream/banner.png"></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/dream/banner.png"></div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <!--<Scroll :on-reach-bottom="handleReachBottom">-->
      <div class="selectAct">
        <img src="../../assets/img/dream/actone.png" class="bgImg">
        <img src="../../assets/img/dream/actones.png" class="actImage">
        <div class="contentAct fcolor1">
          <div class="dreamtop">
            <div class="fl">
              <p class="title">创造101节目选手</p>
              <p class="des">去体验一次偶像出道经历</p>
              <p class="part">参与人数：199人</p>
            </div>
            <div class="sum fr">
              <i class="sumi">999 >></i>
              <img src="../../assets/img/dub/h1.png" class="sumImg">
            </div>
          </div>
          <div class="bannerAct">
            <!-------------------------->
            <div class="list-info-wrap">
              <ul class="list-info clearfix">
                <li class="list-info-item fl" v-for="i in 4">

                  <router-link to="/activityDetails">

                      <img src="../../assets/img/dream/d.png" class="pic">
                      <div class="isHot">
                        <div class="fl">
                          <img class="btn-hot" src="../../assets/img/dub/hot.png">
                        </div>
                        <div class="fr sumH">
                          <i class="hotSum">99</i>
                          <img src="../../assets/img/dub/isHot.png" class="hotImg">
                        </div>
                      </div>
                      <span class="play-ico"><img src="../../assets/img/dub/play.png"></span>
                      <div class="user-info clearfix">
                        <p class="user-name">公主的美姿</p>
                      </div>

                  </router-link>

                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
     <div class="selectAct">
        <img src="../../assets/img/dream/acttwo.png" class="bgImg">
        <img src="../../assets/img/dream/acttwos.png" class="actImage">
        <div class="contentAct fcolor2">
          <div class="dreamtop">
            <div class="fl">
              <p class="title">甄嬛传选角</p>
              <p class="des">演艺一个坚毅的宫女小馨</p>
              <p class="part">参与人数：199人</p>
            </div>
            <div class="sum fr">
              <i class="sumi">999 >></i>
              <img src="../../assets/img/dub/h2.png" class="sumImg">
            </div>
          </div>
          <div class="bannerAct">
           <!----------------------------------------------------------------->
            <div class="list-info-wrap">
              <ul class="list-info clearfix">
                <li class="list-info-item fl" v-for="i in 4">
                  <img src="" class="pic">
                  <span class="play-ico"><img src="../../assets/img/dub/play.png"></span>
                  <div class="user-info clearfix">
                    <p class="user-name">公主的美姿</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    <!--</Scroll>-->
  </div>


</template>

<script>
  import XNav from "../../components/x-nav";
  import {mapState ,mapMutations} from "vuex";
  import XPlay from "../../components/x-play";
    export default {
      data(){
        return{
          value:0
        }
      },
      computed: {
        ...mapState([
          'indexTabIndex'
        ]),
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        )
      },
      components:{XPlay, XNav },
      name: "Dream"
    }
</script>

<style>
  #dream .ivu-carousel-dots li {
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 0 2px;
    padding: 0.06rem .01rem;
    cursor: pointer;
  }
  #dream .ivu-carousel-dots li button {
    border: 0;
    cursor: pointer;
    background: #fff;
    opacity: .3;
    display: block;
    width: .06rem;
    height: .06rem;
    border-radius: 50%;
    outline: 0;
    font-size: 0;
    color: transparent;
    transition: all .5s;
  }
  #dream .ivu-carousel-dots li.ivu-carousel-active>button {
    opacity: 1;
    width: .06rem;
  }
  #dream .ivu-carousel-dots-inside {
    display: block;
    position: absolute;
    bottom: .03rem;
  }
</style>
<style scoped>

  /*background-color: #30214a;*/

  .bgOpacity{
    background: -webkit-linear-gradient(#1e0259, #30214a); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#1e0259, #30214a); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#1e0259, #30214a); /* Firefox 3.6 - 15 */
    background: linear-gradient(#1e0259, #30214a); /* 标准的语法 */
    height: 4.97rem;
    border-bottom: 1px solid #fff;
  }
  .tabs{
    width: 100%;
    /*height: 1.60rem;*/
    /*border-bottom: 1px solid #fff;*/
    padding-bottom: 0.5rem;
  }
  .banner{
    margin: 0 4%;
    width: 92%;
    height: 2.59rem;
  }
  .selectAct{
    width: 100%;
    height: 4.98rem;
    position: relative;
  }
  .bgImg{
    position: absolute;
    z-index:9;
    width: 100%;
    height: 4.88rem;
  }
/*  .bgone{
    background: url("../../assets/img/dream/actone.png") no-repeat;
    background-size: 100% 4.98rem;
  }
  .bgtwo{
    background: url("../../assets/img/dream/acttwo.png") no-repeat;
    background-size: 100% 4.77rem;
  }*/
  .actImage{
    position: absolute;
    width: 3.07rem;
    height: 2.3rem;
    right:0;
    top: 0.67rem;
    z-index:10;
  }
 /* .actImaget{
    position: absolute;
    width: 4.12rem;
    height: 2.35rem;
    right:0;
    top: 0.67rem;
  }*/
  .contentAct{
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 4.98rem;
  }
  /*控制模块字体的颜色*/
  .fcolor1{color: #FECF74;}
  .fcolor2{color: #A0D9EC;}

  .dreamtop{
    width:100%;
    margin-bottom:.36rem;
    padding-left: 0.29rem;
    overflow: hidden;
  }
  .title{
    font-size: .34rem;
    padding-top: .28rem;
  }
  .des{
    font-size: .24rem;
    /*display: inline-block;*/
    opacity: 0.8;
    margin-top: 0.21rem;
  }
  .part{
    font-size: .2rem;
    /*display: inline-block;*/
    opacity: 0.6;
    margin-top: .17rem;
  }
  .sum{
    font-size: 0.24rem;
    padding-top: .3rem;
    margin-right: .28rem;
  }
  .sumImg{
    width: .2rem;
    height: .27rem;
  }
  .sumi,.sumImg{
    float: right;
    margin-right: .08rem;
    opacity: 0.9;
  }
  .bannerAct{
    margin: .30rem 0 0 .30rem;
    height: 3.25rem;
    /*2.26+1.01*/
  }
  .popAct{
    width: 100%;
    height: 3.75rem;
    background: #0F203F;
    color: #A2C3FF;
  }

  .list-info-wrap{
    margin-bottom: .3rem;
    width: 100%;
    overflow-y: auto;
  }
  .list-info-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-info{
    width: max-content;
    height: max-content;
  }
  .bannerAct .list-info-wrap .list-info .list-info-item{
    position: relative;
  }
  .bannerAct .list-info-wrap .list-info .list-info-item .pic{
    width: 2.66rem;
    height: 2.26rem;
    margin-right: .14rem;
    border-radius: .05rem;
  }
  /*.bannerAct .list-info-wrap .list-info .list-info-item .play-wrap{
    position: absolute;
    bottom: .50rem;
    left: .1rem;
    z-index: 10;

  }*/
  .bannerAct .list-info-wrap .list-info .list-info-item .play-ico{
    position: absolute;
    z-index: 10;
    top:.95rem;
    left:1.18rem;
    width: .3rem;
    height: .35rem;
  }
  .user-name{
    margin-top: .1rem;
    color:rgba(255,255,255,1);
    text-align: center;
    font-size: .28rem;
  }
  /*-------------------------ishot-------------------------------------------*/
  .isHot{
    width: 100%;
    position: absolute;
    z-index: 10;
    top: .1rem;
  }
  .btn-hot{
    width: .57rem;
    height: .28rem;
    margin-left: .08rem;
  }
  .sumH{
     overflow: hidden;
    margin-right: .35rem;
  }
  .hotSum{
    float: right;
    font-size: .2rem;
    color: #fff;
  }
  .hotImg{
    width: .15rem;
    height: .2rem;
    float: right;
    margin-right: .05rem;
  }
  /*--------------------------------------------------------------*/
  .dubbanner{
    /*border:1px solid #fff;*/
    height: 1.95rem;
    margin: .42rem 0 0 .30rem;
  }
  .dubbanner .list-info-wrap .list-info .list-info-item{
    position: relative;
  }
  .dubbanner .list-info-wrap .list-info .list-info-item .pic{
    width: 1.94rem;
    height: 1.95rem;
    margin-right: .14rem;
    border-radius: .05rem;
  }
 /* .dubbanner .list-info-wrap .list-info .list-info-item .play-wrap{
    position: absolute;
    z-index: 10;
    bottom: .1rem;
    left: .1rem;

  }*/
  .dubbanner .list-info-wrap .list-info .list-info-item .play-ico{
    position: absolute;
    z-index: 10;
    top:.79rem;
    left:.83rem;
    width: .3rem;
    height: .35rem;
  }
</style>
