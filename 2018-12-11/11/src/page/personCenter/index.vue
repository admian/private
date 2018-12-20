<template>
  <div id="personCenter">
    {{SETSTATE({type:'headerTxt',val:''})}}
      <div class="user clearfix">
       <router-link to="/editdata"><img src="" class="fl"></router-link>
      </div>
      <div class="nick clearfix">
        <span class="title fl">云烟成语</span>
        <img class="sex_ico fl"/>
        <span class="tip fl">说服自己是演员的第一堂课</span>
      </div>
      <ul class="tag clearfix">
        <li class="fl tag_item" v-for="i in 3">积极向上</li>
      </ul>
      <div class="numbers clearfix">

        <i class="num fl">109</i>
        <span class="fl">关注</span>

        <i class="fl ico"> / </i>

        <i class="num fl">109</i>
        <span class="fl">粉丝</span>

        <i class="fl ico"> / </i>

        <i class="num fl">109</i>
        <span class="fl">获赞</span>

        <i class="fl ico"> / </i>
        <router-link to="/mystory">
          <i class="num fl">12</i>
          <span class="fl">故事</span>
        </router-link>

      </div>

    <div class="divider"></div>
    <div class="works">

      <tab class="tabs"
           :line-width="2"
           custom-bar-width=".25rem">
        <tab-item :selected="num===1" @on-item-click="onItemClick(1)">6 作品</tab-item>
        <tab-item :selected="num===2" @on-item-click="onItemClick(2)">9 荣誉</tab-item>
        <tab-item :selected="num===3" @on-item-click="onItemClick(3)">10 收藏</tab-item>
      </tab>
      <div>
        <scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="true"
                  :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                  @on-pullup-loading="selPullUp">
          <div class="container" v-show="key==1">
            <div class="no-connect" v-if="itest==1">
              <p align="center">证明我没有镜头恐惧症</p>
              <router-link to="/"><div class="btn-work">创作首个作品</div></router-link>
            </div><!--作品为空时end-->

            <div class="waterfall" v-else>
              <div class="item lg">
                <img src="" class="pic">

                <div class="user-info isLike clearfix">
                  <span class="fr">12345</span>
                  <img class="ico-like fr"/>
                </div>
              </div>
              <div class="item">
                <img src="" class="pic">
                <div class="user-info clearfix">
                  <i class="ico fl"></i>
                  <span class="fl">皓镧传选角</span>
                  <span class="fr">5000 pick</span>
                </div>
              </div>
              <div class="item">
                <img src="" class="pic">
                <div class="user-info clearfix">
                  <i class="ico fl"></i>
                  <span class="fl">皓镧传选角</span>
                  <span class="fr">5000 pick</span>
                </div>
              </div>
            </div><!--有作品end-->
          </div>
          <div class="container" v-show="key==2">
            <div class="no-connect" v-if="itest==1">
              <p align="center">作品达到 一定优秀程度，会自动在这里。</p>
            </div><!--荣誉为空时-->
            <div class="waterfall">
              <div class="item lg">
                <img src="" class="pic">

                <div class="user-info isLike clearfix">
                  <span class="fr">12345</span>
                  <img class="ico-like fr"/>
                </div>
                <img src="../../assets/img/self/honor.png" class="honor">
              </div>
              <div class="item">
                <img src="" class="pic">
                <div class="user-info clearfix">
                  <i class="ico fl"></i>
                  <span class="fl">皓镧传选角</span>
                  <span class="fr">5000 pick</span>
                </div>
                <img src="../../assets/img/self/honor.png" class="honor">
              </div>
              <div class="item">
                <img src="" class="pic">
                <div class="user-info clearfix">
                  <i class="ico fl"></i>
                  <span class="fl">皓镧传选角</span>
                  <span class="fr">5000 pick</span>
                </div>
                <img src="../../assets/img/self/honor.png" class="honor">
              </div>
            </div><!--荣誉end-->
          </div>
          <div class="container" v-show="key==3">
            <div class="no-connect" v-if="itest==1">
              <p align="center">没办法，没有入眼的按钮</p>
              <router-link to="/"><div class="btn-work">再去瞧瞧</div></router-link>
            </div><!--收藏为空时-->

            <div class="sc-wrap">
              <div class="item lg">
                <div class="act-like">
                  <img class="pic" src="">
                  <div class="act-info clearfix">
                    <i class="ico fl"></i>
                    <span class="fl">皓镧传选角</span>
                    <span class="fr">5000 pick</span>
                  </div>
                  <div class="num-like"><img src="../../assets/img/like_ico.png" class="like_icon">999+</div>
                </div>

                <div class="user-info clearfix">
                  <img class="fl" :src="require('../../assets/img/choice/11.jpg')"/>
                  <span class="fl user-name">12345</span>
                </div>
              </div>
              <div class="item">
                <div class="act-like">
                  <img class="pic" src="">
                  <div class="num-like"><img src="../../assets/img/like_ico.png" class="like_icon">999+</div>
                </div>
                <div class="user-info clearfix">
                  <img class="fl" :src="require('../../assets/img/choice/11.jpg')"/>
                  <span class="fl user-name">12345</span>
                </div>
              </div>
              <div class="item">
                <div class="act-like">
                  <router-link to="">
                  <img class="pic" src="">
                  </router-link>
                  <div class="act-info clearfix">
                    <i class="ico fl"></i>
                    <span class="fl">皓镧传选角</span>
                    <span class="fr">5000 pick</span>
                  </div>
                  <div class="num-like"><img src="../../assets/img/like_ico.png" class="like_icon">999+</div>
                </div>
                <div class="user-info clearfix">
                  <img class="fl" :src="require('../../assets/img/choice/11.jpg')"/>
                  <span class="fl user-name">12345</span>
                </div>
              </div>

            </div><!--收藏end-->
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem ,Scroller } from 'vux'
  import {mapState,mapMutations} from 'vuex'
  export default {
    name: "index",
    components: {
      Tab,
      TabItem,
      Scroller
    },
    data(){
      return{
        itest:0,
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
      }
    },
    computed:{
      ...mapState([
        'headerTxt'
      ])
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
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
      onItemClick(num){
       // console.log(num);
        this.key=num
      },
    },
    created() {


    }
  }
</script>
<style>
  #personCenter .vux-tab {
    background-color: transparent;
  }

  #personCenter .vux-tab .vux-tab-item {
    margin-top: .4rem;
    margin-bottom: .1rem;
    background-color: transparent;
    line-height: 1;
  }

  #personCenter .vux-tab .vux-tab-item.vux-tab-selected {
    color: #fff;
  }

  #personCenter .vux-tab-bar-inner {
    background-color: #FECF74;
  }
  #personCenter .ivu-collapse{
    background-color: transparent;
    border:none;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    padding-left: .3rem;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    line-height: 1.02rem;
    height: 1.02rem;
    font-size: .32rem;
    color:#fff;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i{
    float: right;
    margin-top: 0.4rem;
  }
  #personCenter .ivu-collapse-content{
    color:#FECF74;

    background-color: transparent;
  }
  #personCenter .ivu-collapse-content>.ivu-collapse-content-box{
    padding-bottom: 0;
  }
</style>
<style scoped>

  .user {
    padding-left: .6rem;
    padding-right: .3rem;
    padding-bottom: .2rem;
  }
  .user img {
    width: 1.26rem;
    height: 1.26rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user span {
    margin-top: .37rem;
    width: 1.03rem;
    height: .52rem;
    line-height: .52rem;
    font-size: .22rem;
    text-align: center;
    color: #30214A;
    background-color: #fecf74;
    border-radius: 15px;
  }
  .nick {
    padding: 0 .44rem .23rem;
    color: #BCBAC1;
    font-size: .24rem;
  }
  .nick .title {
    color: #fff;
    font-size: .4rem;
  }
  .nick .sex_ico {
    width: .19rem;
    height: .29rem;
    margin-top: .05rem;
    margin-left: .15rem;
    margin-right: .21rem;
  }
  .nick .tip {
    margin-top: .1rem;
  }
  .tag {
    padding: 0 .44rem .51rem;
  }
  .tag_item {
    margin-right: .1rem;
    padding: 0 .25rem;
    color: #FECF74;
    height: .4rem;
    line-height: .4rem;
    font-size: .2rem;
    background-color: rgba(51, 37, 76, .3);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

  }
  .numbers {
    padding: 0 .44rem;
    margin-bottom: .26rem;
  }
  .numbers .ico {
    margin: 0 .2rem;
  }
  .numbers .num {
    color:#fff;
    font-size: .34rem;
    margin-right: .05rem;
    font-style: italic;
    margin-top: -.06rem;
  }
  .numbers span{
    font-size: .22rem;
    color: #A8A6AB;
  }
  .sel_list{
    padding-bottom: .3rem;
  }
  .sel_list li{
    margin-bottom: .15rem;
    padding-left: .12rem;
    padding-right: .22rem;
    height: .6rem;
    line-height: .6rem;
    font-size: .26rem;
    width: max-content;
    background-color: rgba(51, 37, 76, .3);
    border-radius: 5px;
  }
  .works .tabs {
    width: 50%;
    margin: 0 auto;
  }
  .container {width: 92%;margin: .35rem auto 0;}

  .waterfall {-moz-column-count: 2; /* Firefox */-webkit-column-count: 2; /* Safari 和 Chrome */column-count: 2;-moz-column-gap: .15rem;-webkit-column-gap: .15rem;column-gap: .15rem;}

  .waterfall .item.lg {height: 5.18rem;}

  .waterfall .item {position: relative;margin-bottom: .15rem;height: 3.37rem;}

  .waterfall .item .pic {width: 100%;}

  .waterfall .user-info {padding: 0 .15rem;position: absolute;bottom: .3rem;width: 100%;line-height: .2rem;font-size: .2rem;}

  .waterfall .user-info .ico {margin-top: .02rem;margin-right: .1rem;width: .14rem;height: .14rem;border-radius: 50%;border: 1px solid #694BFF;}

  .waterfall .isLike .ico-like {margin-right: .07rem;width: .16rem;height: .16rem;}
  .sc-wrap{
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: .15rem;
    -webkit-column-gap: .15rem;
    column-gap: .15rem;
  }

  .sc-wrap .item {
    padding-bottom: .1rem;
    margin-bottom: .2rem;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    display: block;
    color: #fff;
    background-color: #211934;

  }
  .sc-wrap .item .act-like{position: relative;}
  .sc-wrap .item .act-like .pic {
    width: 100%;
    height: 3.37rem;
  }

  .sc-wrap .item.lg .act-like .pic {
    height: 5.18rem;
  }

  .sc-wrap .user-info {
    display: block;
    padding: .14rem .2rem;
    font-size: .2rem;
    color: #EBE2FF;
    line-height: .5rem;
  }
  .sc-wrap .act-like .act-info {padding: 0 .15rem;position: absolute;bottom: .3rem;width: 100%;line-height: .2rem;font-size: .2rem;}
  .sc-wrap .act-like .num-like{ width: .94rem; height: .34rem; background: rgba(0,0,0,.6);border-radius: .17rem; position: absolute;top: .2rem;right: .2rem;color: #fff; font-size: .2rem;line-height: .34rem;}
  .sc-wrap .act-like .num-like .like_icon{width: .24rem; height: .22rem;float: left;margin-left: .12rem;margin-top: .06rem;margin-right: .05rem}
  .sc-wrap .user-info img {
    margin-right: .2rem;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
  }

  .sc-wrap .item .user-name {
    font-size: .2rem;
    color: #EBE2FF;
  }


  /*没有作品*/
  .no-connect p{
    color: #737373;
    font-size: .3rem;
    margin-top: 3.28rem;
  }
  .btn-work{
    margin: auto;
    margin-top: 1.62rem;
    width:3.38rem;
    height:.8rem;
    background:linear-gradient(-65deg,rgba(79,51,255,.8),rgba(162,72,255,.8));
    border-radius:.4rem;
    text-align: center;
    line-height: .8rem;
    color: #fff;
  }
  .honor{
    position: absolute;
    top: -.07rem;
    right: .16rem;
    width: .46rem;
    height: .55rem;
  }
  .like{
    position: absolute;
    top: .1rem;
    right: .3rem;

  }


</style>
