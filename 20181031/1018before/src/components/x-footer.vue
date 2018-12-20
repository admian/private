<template>
  <div id="footer" class="clearfix">
    <router-link to="/" class="fl group">
      <img src="../assets/img/tab_group_sel.png">
      <p>剧组</p>
    </router-link>
    <img class="tab_hot fl" src="../assets/img/tab_hot.png" @click="SETSTATE({type:'showModal',val:true})">
    <router-link to="/choiceness" class="fl choice">
      <img src="../assets/img/tab_choice.png">
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
        'showModal'
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
    z-index: 99;
  }

  a {
    color: #fff;
    font-size: .22rem;
  }

  .group {
    margin: .22rem 1.51rem 0 1.21rem;

  }

  .group img {
    width: .55rem;
    height: .31rem;
    margin-bottom: .14rem;
  }

  .tab_hot {
    position: relative;
    top: -.15rem;
    margin-right: 1.55rem;
    width: .93rem;
    height: .93rem;
  }

  .choice img {
    margin-top: .12rem;
    margin-bottom: .05rem;
    width: .44rem;
    height: .5rem;
  }

</style>
