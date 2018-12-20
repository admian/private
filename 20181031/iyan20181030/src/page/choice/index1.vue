<template>
   <div id="comments">
     <Tabs value="t">
       <TabPane label="推荐" name="t">
         <div class="container">
           <ul id="elasticstack" class="elasticstack">
             <li v-for="i in 6">
               <div class="twrap">
                 <div class="tdiv">
                   <div class="commentVideo">
                     <!--视频-->
                     <img src="../../assets/img/choice/q.png">
                   </div>
                   <div class="bolck"></div>
                   <div class="user-p">
                     <img src="../../assets/img/choice/11.jpg" class="userimg fl">
                     <img src="../../assets/img/choice/comme.png" class="focus">
                     <i class="usern fl">章鱼不是鱼</i>
                   </div>
                   <div class="tlist">
                     <p><img src="../../assets/img/choice/like.png"/>76W</p>
                     <p><img src="../../assets/img/choice/leave.png"/>103W</p>
                     <p><img src="../../assets/img/choice/share.png"/></p>
                   </div>
                   <div class="actlist">
                     <p>今天这支舞可以拿去告白哦~</p>
                     <p class="actp"><span class="acting">正在参加《后来的我们》</span><sapn class="actend">报名截止 2018-10-28</sapn></p>
                   </div>
                 </div>
               </div>
             </li>
           </ul>
           <div class="try"><img src="../../assets/img/choice/try.png"></div>
         </div><!-- /container -->
       </TabPane>
       <TabPane label="关注" name="g">
         <div class="startfocus">
           <!--<img class="startfocus">-->
           <p>你还没关注的人噢！</p>
         </div>

       </TabPane>
     </Tabs>

   </div>
</template>

<script>
  import  {Tabs,TabPane} from 'iview'
    export default {
        name: "index", //精选
        components:{Tabs,TabPane},
      mounted: function(){
        new ElastiStack( document.getElementById( 'elasticstack' )/*, {
          distDragBack : 100,
          distDragMax : 350,
          onUpdateStack : function( current ) { return false; }
        }*/);
      }
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
  @import "../../assets/css/component.css"; /*堆叠卡片切换*/
  .bg1{
    background:#2C1E4A;
  }
  .bg2{
    background:#37255C;}
.elasticstack li{
  background: #fff;
}
  .twrap{
    padding-bottom: .3rem;
    position: relative;
    height: 9.64rem;
    z-index: 30;
  }
  .twrap .tdiv:not(:first-child){
    display: none;
  }
  .commentVideo{
    height: 9rem;
  }
  .user-p{
    position: absolute;
    top: -.18rem;
    left: 0;
    width: 100%;
    height: 1.68rem;
    background: -webkit-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.0)); /* 标准的语法 */
    display:block;zoom:1;
    padding-left: .18rem;
  }
  .userimg{
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    border: 0.05rem solid rgba(0,0,0,.3);
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
  }
  .tlist{
    position: absolute;
    right:.2rem;
    top: 4.45rem;
    width: .6rem;
    height: 1rem;
    font-size: .22rem;
    text-align: center;
  }
  .tlist img{
    width: .44rem;
    height: .42rem;
    margin: .15rem .1rem;
  }
  .tlist p:last-child{
    margin-top: .45rem;
  }
  .actlist{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.85rem;
    font-size: .28rem;
    background: -webkit-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.0)); /* 标准的语法 */
    display:block;zoom:1;
  }
  .actlist p{padding-left: .34rem;}
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
