<template>
    <div id="play">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
</template>

<script>
    export default {
        name: "x-play"
    }
</script>

<style scoped>
  #play{
    /* margin-left: 0.1rem;
     height: .7rem;*/
     overflow: hidden;
     display: flex;
     align-items: flex-end;
   }
   #play span{
     height: .22rem;
     float: left;
     margin-right: 0.03rem;
     -webkit-animation: play alternate linear infinite;
     border: 0.02rem solid rgba(255,255,255,0.7);
   }
   #play >span:first-child{
     /*!*动画持续的时间*!*/
     -webkit-animation-duration: .4s;
   }
   #play>span:nth-child(2){
     -webkit-animation-duration: .3s;
     /*!*用来指定开始的时间*!*/
     -webkit-animation-delay: .3s;
   }
   #play>span:nth-child(3){
     -webkit-animation-duration: .6s;
   }
   #play>span:last-child{
     -webkit-animation-duration: .4s;
   }

   @-webkit-keyframes play{
     0%{height: .03rem;}
     100%{height: .22rem;}
   }


</style>
