<template>
  <!--演艺-->
  <div id="group">
    <div class="banner">
      <x-nav></x-nav>
      <div class="wrap" :style="{backgroundImage:'url('+bgImg+')'}">
        <Carousel
          class="carousel"
          :autoplay="true"
          :autoplay-speed="3000"
          dots="none"
          arrow="always">
          <CarouselItem>
            <div class="carousel-item">1</div>
          </CarouselItem>
          <CarouselItem>
            <div class="carousel-item">2</div>
          </CarouselItem>
          <CarouselItem>
            <div class="carousel-item">3</div>
          </CarouselItem>
          <CarouselItem>
            <div class="carousel-item">4</div>
          </CarouselItem>
        </Carousel>

      </div>
    </div>
    <ul id="list">
      <li class="item-wrap" v-for="i in 2">
        <div class="title clearfix">
          <div class="fl">
            <h3>古代宫廷</h3>
            <p>这里有宫女#林黛玉#康熙皇帝等各种人设</p>
          </div>
          <div class="fr num">
            <i class="hot-ico"></i>
            <span>999 >></span>
          </div>
        </div>
        <div class="list-info-wrap">
          <ul class="list-info clearfix">
            <li class="list-info-item fl" v-for="i in 4">
              <router-link :to="'/deduce_det'" class="pic-wrap">
                <img src="" class="pic">
                <img class="play_ico" src="../../assets/img/play_ico.png">
              </router-link>
              <i class="play-ico"></i>
              <div class="user-info clearfix">
                <img class="user-ico fl">
                <span class="user-name fl">拜托啦学妹</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="divider"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import xNav from "@/components/x-nav";
  export default {
    name: "index",
    components:{
      xNav
    },
    data(){
      return{
        bgImg:''
      }
    },
    created(){
      this.$post('/api/offline/channel/getChannelById/'+1,{}).then(res => {
        //console.log(res)
      })

    }
  }
</script>

<style scoped>
  #group{
    color:rgba(255,255,255,.8);
    -background-color: #211934;
    min-height: 100vh;
  }
  .wrap{
    height: 4.3rem;
  }
  .carousel{
    margin: .35rem auto 0;
    width: 92%;
  }
  .carousel-item{
    background-color: coral;
    height: 2.6rem;
  }
  .carousel-item img{
    width: 100%;
    height: 100%;
  }

  /*----------------------------------*/
  #list{
    padding-left: .3rem;
  }
  #list h3{
    color:#fff;
    margin:.2rem 0;
    font-size: .3rem;
  }
  #list {
    font-size: .24rem;
  }
  #list .title p{
    margin-bottom: .4rem;
  }
  #list .num{
    padding-right: .28rem;
    margin-top:.26rem;
    color:#FECF74;
    line-height: .28rem;
  }
  .list-info-wrap{
    margin-bottom: .3rem;
    width: 96%;
    overflow-y: auto;
  }
  .list-info-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-info-item{
    margin-right: .24rem;
  }
  .pic-wrap{
    position: relative;
    display: inline-block;
  }
  .list-info-item .play_ico{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: .3rem;
    height: .35rem;
  }
  .list-info{
    width: max-content;
    height: max-content;
  }
  .list-info-item .pic{
    width: 1.78rem;
    height: 2.4rem;
  }
  .user-info{
    margin-top: .12rem;
  }
  .user-ico{
    margin-right: .12rem;
    width: .46rem;
    height: .46rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user-name{
    margin-top: .1rem;
    color:rgba(255,255,255,.4)
  }
  /*--------------------------------*/
  .divider{
    margin-left: -.3rem;
    width: 100vw;
    height: .25rem;
    background-color: #30214a;
  }
</style>
