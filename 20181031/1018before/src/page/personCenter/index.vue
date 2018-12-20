<template>
  <div id="personCenter">
    {{SETSTATE({type:'headerTxt',val:''})}}
      <div class="user clearfix">
        <img src="" class="fl">
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
      </div>

    <div class="divider"></div>
    <div class="works">

      <tab class="tabs"
           :line-width="2"
           custom-bar-width=".25rem">
        <tab-item selected>6 作品</tab-item>
        <tab-item>荣誉</tab-item>
        <tab-item>10 收藏</tab-item>
      </tab>
      <div class="container">
        <div class="waterfall">
          <div class="item lg">
            <img
              src="">
              <!--<div class="user-info clearfix">
                <i class="ico fl"></i>
                <span class="fl">皓镧传选角</span>
                <span class="fr">5000 pick</span>
              </div>-->
              <div class="user-info isLike clearfix">
                <span class="fr">12345</span>
                <img class="ico-like fr"/>
              </div>
          </div>
          <div class="item lg">
            <img src="">
            <!--<div class="user-info clearfix">
              <i class="ico fl"></i>
              <span class="fl">皓镧传选角</span>
              <span class="fr">5000 pick</span>
            </div>-->
            <div class="user-info isLike clearfix">
              <span class="fr">12345</span>
              <img class="ico-like fr"/>
            </div>
          </div>
          <div class="item">
            <img
              src="">
            <div class="user-info clearfix">
              <i class="ico fl"></i>
              <span class="fl">皓镧传选角</span>
              <span class="fr">5000 pick</span>
            </div>
            <!--<div class="user-info isLike clearfix">
              <span class="fr">12345</span>
              <img class="ico-like fr"/>
            </div>-->
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import {mapState,mapMutations} from 'vuex'
  export default {
    name: "index",
    components: {
      Tab,
      TabItem
    },
    computed:{
      ...mapState([
        'indexTabIndex'
      ])
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      )
    },
    data(){
      return{

      }
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
    font-size: .22rem;
    margin-bottom: .26rem;
    color: #A8A6AB;
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
  .waterfall .item.lg {
    height: 5.18rem;
  }
  .waterfall .item {
    position: relative;
    margin-bottom: .15rem;
    height: 3.37rem;
  }
  .waterfall .item img {
    width: 100%;
  }
  .waterfall .user-info {
    padding: 0 .15rem;
    position: absolute;
    bottom: .3rem;
    width: 100%;
    line-height: .2rem;
    font-size: .2rem;
  }
  .waterfall .user-info .ico {
    margin-top: .02rem;
    margin-right: .1rem;
    width: .14rem;
    height: .14rem;
    border-radius: 50%;
    border: 1px solid #694BFF;
  }
  .waterfall .isLike .ico-like {
    margin-right: .07rem;
    width: .16rem;
    height: .16rem;
  }
</style>
