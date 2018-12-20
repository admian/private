<template>
  <!--素材-->
  <div id="matter">
    <div class="header" @click="backCilck">
      <img src="../../assets/img/goBack.png" class="head_img fl" >
      <span class="header_title">素材</span>
    </div>
    <div class="matter-item" v-for="(item,index) in fodList" :key="index">
      <img src="../../assets/img/choice/o.png" class="bgImg">
      <div class="item-top">
        <div class="title clearfix">
          <h3 class="fl">{{item.name}}</h3>
          <p class="fl">全部{{item.fodderCount}}个模板</p>
        </div>
        <p class="cont">{{item.description}}</p>
        <div class="list-warp">
          <ul class="list-pic clearfix">
            <li class="pic-item fl" v-for="(i,index) in item.fodderList" :key="index">
              <div class="icons clearfix">
                <i class="fl ico-hot-txt"></i>
                <div class="fr clearfix">
                  <i class="ico-hot fl"></i>
                  <span class="fl num">{{i.productionCount}}</span>
                </div>
              </div>
              <img :src="baseUrl+i.fodderCover">
              <div class="temp" @click="tmptClick(i.id)">
                使用模板
              </div>
              <p class="tTxt">{{i.fodderName}}</p>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <div class="btn-work" @click="flowClick">自由创作</div>
  </div>

</template>

<script>
  import { XHeader } from 'vux'
  import {mapState,mapMutations} from 'vuex'
  export default {
    name: "matter",
    components:{XHeader},
    data(){
      return{
        fodList:[]
      }
    },
    computed: {
      ...mapState([
        'baseUrl',
        'is_login'
      ]),
    },
    methods:{
      ...mapMutations([
        'SETSTATE'
      ]),
      //返回
      backCilck(){
        window.location.href='/back';
      },
      //下载素材
      tmptClick(id){
        window.location.href='/download?id='+id;
      },
      //跳转自由创作
      flowClick(){
        window.location.href='/freelance';
      }
    },
    created(){
       this.channelId=this.$route.query.id;
       this.$post('/api/offline/publish/queryAllProductionTypeByPage',{
         channelId: 1 ,
         pageSize: 10,
         pageNum: 1
       }).then(res=>{
         this.fodList=res.list;
       });
    }
  }
</script>
<style>
  #matter .vux-header{margin-bottom: .30rem;}
</style>
  <style scoped>
  .header{
    padding: .2rem .2rem;
    margin-top: .4rem;
    margin-bottom: .24rem;
    width: 1.5rem;
  }
  .head_img{width: .2rem; height: .35rem;}
  .header_title{font-size: .32rem;margin-left: .1rem;line-height: .34rem}
  .matter-item{
    padding: .28rem 0 1rem .3rem;
    color:#FECF74;
    position: relative;
    height: 5.5rem;
  }
  .bgImg{
    position: absolute;
    top: -.45rem;
    left:0;
    height: 4rem;
    z-index: 0;
  }
  .item-top{
    margin-top: .3rem;
  }
  .title {
    position: relative;
    margin-bottom: .15rem;
    font-size: .22rem;
  }
  .matter-item .title p{
    margin-top: .1rem;
    margin-left: .38rem;
    opacity:0.8;
  }
  .matter-item h3{
    font-size: .34rem;
  }
  .matter-item .cont{
    font-size: .2rem;
    opacity:0.9;
  }
  .list-warp {
    margin-top: .27rem;
    width: 100%;
    overflow-y: auto;
  }
.list-warp::-webkit-scrollbar {
  display: none;
}
  .list-pic{
    width: max-content;
    height: max-content;
  }
  .pic-item{
    position: relative;
  }
  .pic-item .icons{
    padding-left: .08rem;
    padding-right: .14rem;
    width: 100%;
    position: absolute;
    top: .1rem;
  }
  .pic-item{
    margin-right: .14rem;
    width: 2.66rem;
    text-align: center;

  }
  .pic-item img{
    height: 2.26rem;
    width: 100%;
  }
  .pic-item .ico-hot-txt{
    width: .57rem;
    height: .28rem;
    background-image: url("../../assets/img/choice/hot.png");
    background-size: 100% 100%;
    /*background-color: red;*/
  }
  .pic-item .ico-hot{
    display: inline-block;
    width: .15rem;
    height: .20rem;
    background-image: url("../../assets/img/choice/hott.png");
    background-size: 100% 100%;
    /*background-color: red;*/
  }
  .pic-item .temp{
    position: relative;
    margin: -.3rem auto 0;
    width: 1.7rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    background-color: #2f2f2f;
    border-radius: 20px;
    color: #AE5FFF;
  }
  .tTxt{color: #fff;margin-top: .3rem;}
  .num{font-size: .2rem;color: #fff;}
  .btn-work{
    margin: auto;
    margin-top: .2rem;
    margin-bottom: .3rem;
    width:2rem;
    height:.64rem;
    background:linear-gradient(-65deg,#4f33ff,#a248ff);
    border-radius:.4rem;
    text-align: center;
    line-height: .64rem;
    color: #fff;

  }
</style>
