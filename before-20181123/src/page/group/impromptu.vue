<template>
  <!--即兴-->
  <div id="impromptu">
    <x-nav></x-nav>
    <div class="banner">
      <Carousel v-if="banner.length"
                class="carousel"
                :autoplay="true"
                :autoplay-speed="3000"
                dots="none"
                arrow="always">
        <CarouselItem v-for="i,index in banner" :key="index">
          <div class="carousel-item"><img :src="i.imageUrl"></div>
        </CarouselItem>

      </Carousel>
    </div>
    <div class="container">
<!--      <scroller v-show="isShow" v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="true"
                :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                @on-pullup-loading="selPullUp">-->

        <div class="waterfall">
          <div :class=" i.videoType == 1 ? 'item lg' : 'item'" v-for="i,index in list" :key="index">
            <router-link :to="'/activityDetails?id='+i.id+'&&routerType=impromptu'">
              <img class="pic" :src="i.productionCover">
            </router-link>
            <router-link :to="'/person?userId='+i.userId" class="user-info clearfix">
              <img class="fl" :src="i.headUrl"/>
              <span class="fl">{{filtName(i.nickName)}}</span>
            </router-link>
            <p class="txt">{{i.description}}</p>
          </div>
        </div>
<!--
      </scroller>
-->
    </div>

  </div>
</template>

<script>

  import xNav from "@/components/x-nav";
  import {Scroller} from 'vux';
  import {mapState} from "vuex";

  export default {
    name: "impromptu",
    components: {Scroller,xNav},
    data() {
      return {
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

      ]),
    },
    mounted() {
      this.scroll()
    },
    methods: {
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
    margin: .35rem auto 0;
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


</style>
