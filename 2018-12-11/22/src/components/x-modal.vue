<template>
  <div id="modal" @click="SETSTATE({type:'showModal',val:false})">
    <div class="wrap">
      <div class="clearfix cont">
        <div  @click="changeRouter(index)" :class="index % 2 == 0 ? 'item fl' : 'item fr'" v-for="i,index in 4" :key="index" :style="{ 'backgroundImage': 'url(' + require('../assets/img/modal_'+(index+1+'.png')) + ') '}">
          <h3>即兴创作</h3>
          <p>高仿效作品将升级为系统素材</p>
          <span>15487人参与</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapState ,mapMutations} from "vuex";

  import 'animate.css'
  export default {
    name: "x-modal",
    data(){
      return{
        data:[{url:'/',title:'即兴创作',cont:'高仿效作品将升级为系统素材',num:15487,pic:'../assets/img/modal_1.png'}]
      }
    },
    computed: {
      ...mapState([
        'showModal',
        'headerTxt'
      ]),
    },
    methods:{
      ...mapMutations(
        ['SETSTATE']
      ),
      changeRouter(index){
        this.SETSTATE({type:'headerTxt',val:'素材'})
        this.$router.push({path:this.data[index].url})
      }
    }
  }
</script>

<style scoped>

  #modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(200, 200, 200, .3);
    -background-color: cyan;
    z-index: 99;
  }

  .wrap {
    margin: 0 auto;
    width: 90%;
    height: 100%;
    position: relative;
  }

  .cont {
    position: absolute;
    bottom: 2rem;
  }
  .wrap .item {
    color: #fff;
    position: relative;
    margin-bottom: .2rem;
    padding: .1rem 0 .15rem .1rem;
    width: 48.5%;
    height: 2.15rem;
    background-color: cadetblue;
    border-radius: 6px;
    background: url("../assets/img/modal_1.png") 0 0 /cover no-repeat;
  }
  h3 {
    font-size: .3rem;
  }

  p {
    margin-top: .08rem;
    font-size: .2rem;
  }

  span {
    position: absolute;
    bottom: .15rem;
    font-size: .2rem;
  }
</style>
