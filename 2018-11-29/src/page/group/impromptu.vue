<template>
  <!--即兴-->
  <div id="impromptu">
    <div class="bgOpacity">
      <img src="../../assets/img/dream/banner/imp_bg.png" class="bg"><!--png-->
      <!--<div class="zIndex">-->
      <div class="tabs">
        <x-nav>{{SETSTATE({type:'indexTabIndex',val:4})}}</x-nav>
      </div>
      <div class="banner">
        <Carousel v-model="value" loop autoplay :autoplay-speed="4000">
          <CarouselItem v-for="item,index in banner" :key="index">
            <div class="demo-carousel"><img :src="baseUrl+item.imageUrl" :alt="item.description"></div>
            <!--<div class="demo-carousel"><img src="../../assets/img/dream/banner/imp.png" :alt="item.description"></div>-->
          </CarouselItem>
        </Carousel>
      </div>
      <!--</div>-->
    </div>
    <!--<x-nav></x-nav>
    <div class="banner">
      <Carousel v-if="banner.length"
                class="carousel"
                :autoplay="true"
                :autoplay-speed="3000"
                dots="none"
                arrow="always">
        <CarouselItem v-for="i,index in banner" :key="index">
          <div class="carousel-item"><img :src="baseUrl+i.imageUrl"></div>
        </CarouselItem>

      </Carousel>
    </div>-->
    <div class="container">
        <div class="waterfall">
          <div :class=" i.videoType == 1 ? 'item lg' : 'item'" v-for="i,index in list" :key="index">
            <router-link :to="'/deduceDetails?id='+i.id+'&&routerType=impromptu&&termName=即兴视频'">
              <img class="pic" :src="i.productionCover">
            </router-link>
            <router-link :to="'/person?userId='+i.userId" class="user-info clearfix">
              <img class="fl headurl" :src="baseUrl+i.headUrl"/>
              <span class="fl">{{filtName(i.nickName)}}</span>
            </router-link>
            <p class="txt">{{i.productionName}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

  import xNav from "@/components/x-nav";
  import {Scroller} from 'vux';
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "impromptu",
    components: {Scroller,xNav},
    data() {
      return {
        value:0,
        banner: [],
        list: [],
        page:1,
        isShow:false,
        isLoading:false,
        needAdd: true,
      }
    },
    computed: {
      ...mapState([
        'baseUrl',
        'indexTabIndex',
      ]),
    },
    mounted() {
      this.scroll()
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      scroll() {
        this.isLoading = false;
        window.onscroll = () => {
          // 距离底部200px时加载一次
          let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 30
          if (bottomOfWindow && this.isLoading == false) {
            console.log(111)
            this.isLoading = true
            if (this.needAdd) {
              this.page++;
              console.log(11)
              this.getData(false)
            }
          }
        }
      },

      getData(isEmpty){
        let limit = 10;
        this.$post('/api/offline/impromptu/queryProductionTypeProductionInfoList', {channelId: 3,pageSize:limit,pageNum:this.page}).then(
          res => {
            this.isLoading = false;
            if (isEmpty) {
              this.list = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.list.push(...res.list);
            }
            if (res.list && res.list.length < limit) {
              //this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              this.isShow = true;
              this.needAdd = false;
            }
          }
        )
      }

    },
    created() {
      /*获取轮播图*/
      this.$post('/api/offline/banner/queryAllBannerByChannelId/' + 3, {}).then(res => {
        this.banner = res;
      })
      this.getData(true)

    }
  }
</script>

<style scoped>
  .bgOpacity{
    background:  #6A4D92 ;
    background-size: 100% ;
    position: relative;
    height: 6rem;
  }
  .bg{
    width: 100%;
    height: 4.28rem;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }
  .tabs{
    width: 100%;
    /*height: 1.60rem;*/
    /*border-bottom: 1px solid #fff;*/
    padding-bottom: 0.3rem;
  }
  .banner{
    margin-left: 4%;
    margin-right: 4%;
    margin-top: .05rem;
    width: 6.9rem;
    height: 3.48rem;
  }
  .wrap {
    height: 4.3rem;
  }

  .carousel {
    margin: .35rem auto 0;
    width: 92%;
  }

  .carousel-item {
    height: 2.6rem;
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 92%;
    margin: .2rem auto 0;
  }

  .waterfall {
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: .15rem;
    -webkit-column-gap: .15rem;
    column-gap: .15rem;
  }

  .waterfall .item {
    padding-bottom: .28rem;
    margin-bottom: .15rem;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    display: block;
    color: #fff;
    background-color: #211934;
  }

  .waterfall .item .pic {
    width: 100%;
    height: 3.35rem;
  }

  .waterfall .item.lg .pic {
    height: 5.18rem;
  }

  .waterfall .user-info {
    display: block;
    padding: .14rem .2rem;
    font-size: .2rem;
    color: #EBE2FF;
    line-height: .5rem;
  }

  .waterfall .user-info img {
    margin-right: .2rem;
    width: .5rem;
    height: .5rem;
  }

  .waterfall .item .txt {
    padding: 0 .2rem;
    font-size: .24rem;
    color: #EBE2FF;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .headurl{
    border-radius: 50%;
  }

</style>
