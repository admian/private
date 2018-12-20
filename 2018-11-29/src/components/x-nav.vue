<template>
  <div id="nav" class="clearfix">
      <img :src="headUrl ? baseUrl+headUrl : './static/image/iy_pic.png'" class="fl user-ico" @click="clickLogin">

    <div class="tab fl">
      <router-link  :to="i.url" v-for="i,index in tabs" :key="index"
            :class="routerPath == i.url ? 'item active' : 'item'">{{i.name}}</router-link>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {cookie} from 'vux'
  import {Message} from 'iview';
  export default {
    name: "x-nav",
    data() {
      return {
        tabs: [
          {name: '演艺', url: "/"},
          {name: '梦想', url: "/dream"},
          {name: '配音', url: "/dub"},
          {name: '故事', url: "/story"},
          {name: '即兴', url: "/impromptu"}
        ],
        headUrl:''
      }
    },
    components: { Message },
    computed: {
      ...mapState([
        'routerPath',
        'my_userId',
        'baseUrl',
        'is_login',
        'token'
      ]),
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      clickLogin(){
        //alert(cookie.get('cookie'));
        /*this.$Message.warning({
          content: '敬请期待!'
        });
        return*/
       if(!this.is_login){
          //window.location.href = '/login';
         this.$router.push({
            path:'/login'
          })
        }else{

          //alert('进入个人中心');
          this.$router.push({
            path:'/person?userId='+this.my_userId
          })
        }
      }
    },
    created(){
      //console.log(this.is_login);
      if(this.is_login){
        this.$post('api/offline/user/getUserById/'+this.my_userId).then(res=>{
          this.headUrl=res.headUrl;
          //console.log(this.headUrl);
        })
      }
    }

  }
</script>

<style scoped>
  #nav {
    padding-top: .7rem;
    line-height: .62rem;
  }

  .user-ico {
    margin-left: .3rem;
    margin-right: .85rem;
    width: .62rem;
    height: .62rem;
    border-radius: 50%;
  }

  .item {
    margin-right: .4rem;
    font-size: .36rem;
    font-weight: bold;
    color:rgba(255,255,255,.2)
  }

  .active {
    position: relative;
    font-size: .4rem;
    color: #fff;
  }
  .active:before {
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
