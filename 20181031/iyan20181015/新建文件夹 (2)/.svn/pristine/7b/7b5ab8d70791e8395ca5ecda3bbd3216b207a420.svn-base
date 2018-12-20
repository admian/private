<template>
 <div id="xtmessage">
   {{SETSTATE({type:'headerTxt',val:'系统通知'})}}
   <div class="containter">
     <div class="timeTitle"><p>未读</p></div>
     <ul>
       <li>
         <p class="message">恭喜你,你的视频 XXXXXXXXXXX"被平台评为优秀,系统已标记为你的荣誉作。</p>
         <p class="focusTime">2018.10.20</p>
       </li>
       <li>
         <p class="message">恭喜你,你的视频 XXXXXXXXXXX"被平台评为优秀,系统已标记为你的荣誉作。</p>
         <p class="focusTime">2018.10.20</p>
       </li>
     </ul>
     <div class="timeTitle"><p>已读</p></div>
     <ul>
       <li>
         <p class="message">恭喜你,你的视频 XXXXXXXXXXX"被平台评为优秀,系统已标记为你的荣誉作。</p>
         <p class="focusTime">2018.10.20</p>
       </li>
     </ul>
   </div>
 </div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
    export default {
      name: "xtmessage",
      computed:{
        ...mapState([
          'headerTxt'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        )
      },
    }
</script>

<style scoped>
  .containter{
    padding:0 .3rem;
  }
  .timeTitle{
    color: #fff;
    font-size: .28rem;
  }
  ul{list-style:none;}
  ul li{margin:.36rem 0;}
  .focusTime{
    color: #5C5170;
    font-size: .26rem;
    margin-top: .28rem;
  }
  .message{
    color:  #FECF74 ;
    font-size: .3rem;
    line-height: .5rem;

  }
</style>
