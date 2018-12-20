<template>
  <div id="nav" class="clearfix">
    <img src="" class="fl user-ico">
    <div class="tab fl">
      <router-link @click="SETSTATE({type:'indexTabIndex',val:index})" :to="i.url" v-for="i,index in tabs" :key="index" :class="indexTabIndex == index ? 'item active' : 'item'">{{i.name}}</router-link>

    </div>
  </div>
</template>

<script>
  import {mapState ,mapMutations} from "vuex";

  export default {
    name: "x-nav",
    data() {
      return {
        tabs:[
          {name:'演艺',url:"/"},
          {name:'梦想',url:"/dream"},
          {name:'配音',url:"/dub"},
          {name:'演艺',url:"/"},
          {name:'演艺',url:"/"}
        ]
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

    }
  }
</script>

<style scoped>
  #nav{
    padding-top: .7rem;
    line-height: .62rem;
  }
  .user-ico{
    margin-left: .3rem;
    margin-right: .85rem;
    width: .62rem;
    height: .62rem;
  }
  .item{
    margin-right: .4rem;
    font-size: .36rem;
    font-weight: bold;
    color: rgba(255,225,255,0.5);
  }
  .active{
    position: relative;
    font-size: .4rem;
    color:#fff;
  }
  .active:before{
    position: absolute;
    bottom: -.1rem;
    transform: skew(-40deg);
    left: 0;
    content: '';
    height: .08rem;
    width: 100%;
    background-color: #fff;

  }
</style>
