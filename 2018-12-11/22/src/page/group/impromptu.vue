<template>
  <!--即兴-->
  <div id="impromptu">
    <x-nav></x-nav>
    <div class="banner">
      <img>
    </div>
    <div class="container">
      <div class="waterfall">
        <div class="item lg">
          <router-link :to="'/deduce_det'">
            <img class="pic" src="">
          </router-link>
          <router-link :to="'/'" class="user-info clearfix">
            <img class="fl" :src="require('../../assets/img/holder_sel.png')"/>
            <span class="fl">12345</span>
          </router-link>
          <p class="txt">你说嘴巴嘟嘟，嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟</p>
        </div>
        <div class="item">
          <router-link :to="'/deduce_det'">
            <img class="pic" src="">
          </router-link>
          <router-link :to="'/'" class="user-info clearfix">
            <img class="fl" :src="require('../../assets/img/holder_sel.png')"/>
            <span class="fl">12345</span>
          </router-link>
          <p class="txt">你说嘴巴嘟嘟，嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟</p>
        </div>
        <div class="item">
          <router-link :to="'/deduce_det'">
            <img class="pic" src="">
          </router-link>
          <router-link :to="'/'" class="user-info clearfix">
            <img class="fl" :src="require('../../assets/img/holder_sel.png')"/>
            <span class="fl">12345</span>
          </router-link>
          <p class="txt">你说嘴巴嘟嘟，嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import xNav from "@/components/x-nav";

  export default {
    name: "impromptu",
    components: {
      xNav
    },
  }
</script>

<style scoped>

  .banner {
    margin: .35rem auto .2rem;
    width: 92%;
    height: 3.5rem;
    background-color: cadetblue;
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
