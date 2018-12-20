<template>
    <div id='details'>
      <x-header :left-options="{backText: '活动详情'}"></x-header>
      <div class="container">
        <img :src="list.dreamDetail" class="deImg">
        <div class="btn-work" @click="clickCry">我也试试</div>
      </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import { XHeader} from 'vux'
    export default {
        name: "details",
        data() {
            return {
              list:{}
            }
        },
        components:{XHeader},
        computed: {
          ...mapState([

          ])
        },
        methods: {
          ...mapMutations(
              ['SETSTATE']
          ),
          clickCry(){
            window.location.href = '/publishWork?id='+this.list.id;
          }
        },
       created(){
          this.id=this.$route.query.id;
          this.$post('/api/offline/dream/getDreamInfo/'+this.id).then(res=>{
            console.log(res);
            this.list=res;
          })
       }
    }
</script>
<style>
  #details .vux-header .vux-header-left .vux-header-back{
    font-size: .34rem;
  }
</style>
<style scoped>
  .container{
    height: max-content;
    position: relative;
    padding: 0 .3rem;
  }
  /*.deImg{
    height: 8rem;
  }*/
  .btn-work{
    position: fixed;
    bottom: .5rem;
    left:2.06rem;
    right:2.06rem;
    width:3.38rem;
    height:.8rem;
    background:linear-gradient(-65deg,rgba(79,51,255,.8),rgba(162,72,255,.8));
    border-radius:.4rem;
    text-align: center;
    line-height: .8rem;
    color: #fff;
  }
</style>
