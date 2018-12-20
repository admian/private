<template>
  <div id="footer" class="clearfix">
    <router-link to="/" :class="routerPath =='/' ? 'fl group active' : 'fl group'">
      <img
        :src="routerPath =='/' ? require('../assets/img/tab_group_sel.png') : require('../assets/img/tab_group.png')">
      <p>剧组</p>
    </router-link>
    <img class="tab_hot fl" src="../assets/img/tab_hot.png" @click="SETSTATE({type:'showModal',val:true})">
    <router-link to="/" :class="routerPath =='/' ? 'fl choice active' : 'fl choice'">
      <img
        :src="routerPath =='/' ? require('../assets/img/tab_choice_sel.png') : require('../assets/img/tab_choice.png')">
      <p>精选</p>
    </router-link>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "x-footer",
    computed: {
      ...mapState([
        'showModal',
        'routerPath'
      ]),
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      )
    }
  }
</script>

<style scoped>
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #261c38;
    height: .98rem;
    z-index: 10;
  }

  a {
    color: #666;
    font-size: .22rem;
  }

  .group {
    margin: .12rem 1.51rem 0 1.21rem;

  }

  .group img {
    width: .22rem;
    height: .38rem;
    margin: 0 auto .14rem;
  }

  .tab_hot {
    position: relative;
    top: -.15rem;
    margin-right: 1.55rem;
    width: .93rem;
    height: .93rem;
    border: .1rem solid #261c38;
    border-radius: 50%;
    box-sizing: content-box;
  }

  .choice img {
    margin-top: .12rem;
    margin-bottom: .14rem;
    width: .38rem;
    height: .38rem;
  }

  a.active {
    color: #fff;
  }
</style>
