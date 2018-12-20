<template>
   <div id="comments">
     <Tabs value="t">
       <TabPane label="推荐" name="t">
         <!-- 制作一个框架包裹slider -->
         <div class="contain">
           <!-- 配置slider组件 -->
           <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
             <!-- 直接使用slideritem slot -->
             <slideritem v-for="(item,index) in someList" :key="index">
               <img :src="item.img" style="z-index:1000">
               <!--<div class="stack-wrapper">
                 <div class="twrap">
                   <div class="top_user">
                     <img src="" class="userimg fl">
                     <img src="../../assets/img/choice/comme.png" class="focus">
                     <i class="usern fl">{{getName()}}</i>
                   </div>
                   <div class="rightlist">
                     <p @click="test"><img src="../../assets/img/like_sel_ico.png"/>103W</p>
                     <p><img src="../../assets/img/choice/leave.png"/>30W</p>
                     <p><img src="../../assets/img/choice/share.png"/></p>
                   </div>
                   <div class="actlist">
                     <p>描述</p>
                     <p class="actp"><span class="acting">正在参加《后来的我们》</span><span class="actend">报名截止 2018-10-20</span></p>
                   </div>
                 </div>

               </div>-->
             </slideritem>
           </slider>

         </div>
       </TabPane>
       <TabPane label="关注" name="g">
         <div class="startfocus" v-if="length==0">
           <img class="startfocus">
           <p>你还没关注的人噢！</p>
         </div>
         <div class="container" else>
           <ul>
             <li>11111</li>

           </ul>
         </div>
       </TabPane>
     </Tabs>
    <!-- <popup v-model="popupState" height="75%">
       1111
     </popup>-->
   </div>
</template>

<script>
  import  {Tabs,TabPane} from 'iview'
  import { Popup } from 'vux'
  import { slider, slideritem } from 'vue-concise-slider'
    export default {
      name: "index", //精选
      components:{
        slider,
        slideritem,
        Tabs,
        TabPane,
        Popup
      },
      data() {
        return {
          dataIndex:0,
          //Sliding configuration [obj]
          options: {
            currentPage: 0,
            thresholdDistance: 100, // 滑动距离阈值判定
            thresholdTime: 300, // 滑动时间阈值判定
            direction: 'vertical', // 垂直滚动
            loop: false // 无限循环

          },
          //测试数据
          length:1,
          someList:[
          ]

        }
      },
      mounted() {
        let that = this
        setTimeout(function () {
          that.someList = [
            {
             img:require('../../assets/img/choice/q.png')
            },
            {
              img:require('../../assets/img/choice/qq.png')
            },
            {
              img:require('../../assets/img/choice/q.png')
            }
          ]
        }, 2000)
      },
      computed: {

      },
      methods:{
      },
    }
</script>

<style>
  #comments .ivu-tabs-bar{
    border-style: none;
  }
  #comments .ivu-tabs-nav{
    padding-top: .28rem;
    padding-left:2.49rem;
  }
  #comments .ivu-tabs{
    color: #fff;
    font-size: .34rem;
  }
  #comments .ivu-tabs-nav .ivu-tabs-tab-active{
    color: #fff;
    font-size: .4rem;
  }
  #comments .ivu-tabs-ink-bar{
    display: none;
  }
</style>
<style scoped>
 .contain{
   padding: 0 .3rem;
   margin-top: .15rem;
   height: 9.27rem;
   position: relative;
 }
  .bg1{
    background:#2C1E4A;
  }
  .bg2{
    background:#37255C;
  }
  .stack-wrapper{
    margin-left: .3rem;
    position: relative;
    z-index: 30;
    width: 7rem;
    height:10.1rem;
    padding: 0;
    list-style: none;
    pointer-events: none;
    border: 1px solid red;
  }
  .twrap{
    position: absolute;
    height: 9.3rem;
    z-index: 30;
    /*display: flex;*/
    /* background: #fff;*/
  }

  .center-video{
    position: absolute;
    top: .18rem;
    left: 0;
    width: 6.9rem;
    height: 9.27rem;

  }
  .video-player {
    height: 100%;
  }
  .top_user{

    float: left;
    width: 100%;
    /*height: 1.68rem;*/
    /*  background: -webkit-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Safari 5.1 - 6.0 *!
      background: -o-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Opera 11.1 - 12.0 *!
      background: -moz-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* Firefox 3.6 - 15 *!
      background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); !* 标准的语法 *!*/
    padding-left: .18rem;
  }
  .userimg{
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    border: 0.05rem solid rgba(0,0,0,.3);
    position: relative;
  }
  .focus{
    position: absolute;
    top: .7rem;
    left: 1rem;
    width: .34rem;
    height: .34rem;
  }
  .usern{
    margin-top: .5rem;
    margin-left: .15rem;
    font-size: .28rem;
    color: #fff;
  }
  .rightlist{
    float: right;
    margin-right:.2rem;
    margin-top: 3rem;
    width: .6rem;
    height: 2em;
    font-size: .22rem;
    text-align: center;

  }
  .rightlist p{margin-top:.2rem;}
  .rightlist img{
    width: .44rem;
    height: .42rem;
    margin: .15rem .1rem;
  }
  .rightlist p:last-child{
    margin-top: .45rem;
  }
  .actlist{
    /*float: left;
    margin-bottom:.1rem;
    margin-left: 0;*/
    height: 1.67rem;
    width: 100%;
    float: left;
    margin-top: 3.6rem;
    font-size: .28rem;
    /* background: -webkit-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Safari 5.1 - 6.0 *!
     background: -o-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Opera 11.1 - 12.0 *!
     background: -moz-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* Firefox 3.6 - 15 *!
     background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); !* 标准的语法 *!*/
    display:block;zoom:1;
  }
  .actlist p{padding-left: .34rem;text-align: left}
  .actp{
    margin-top: .25rem;
  }
  .acting{font-size: .3rem;}
  .actend{font-size: .2rem;}
  .try{
    position: absolute;
    left: 2.46rem;
    bottom:.1rem;
    width: 2rem;
    height: .64rem;
  }
</style>
