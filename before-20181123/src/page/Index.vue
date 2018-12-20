<template>
    <div id="index">
      <p contenteditable="true">这是一段可编辑的段落。请试着编辑该文本。</p>
      <!--水平滚动容器-->
      <div class="slider-wrap">
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i in 4"></li>
        </ul>
      </div>
      <div class="box">test</div>
      <div class="slider-wrap">
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i in 4">{{i}}</li>
        </ul>
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i in 4">{{i}}</li>
        </ul>
      </div>
      <div class="push">
        <img src="../assets/img/push/push1.gif" v-show="pushOne">
        <!--<img src="../assets/img/push/push.png" v-show="pushTwo">-->
        <span class="pushSum">{{num}}</span>
      </div>
    </div>


</template>

<script>
    export default {
        name: "Index",
      data(){
          return{
            num:20,//push次数
            pushOne:true,//第一次
            pushTwo:false,//点击出现
          }
      },
      created(){
          let a=[1,2,3,4,5,7,8,6,9,10]
          let b=[]
          b=a.slice(0,5);
          console.log(b);
      }
    }
</script>

<style scoped>
    #index{width: 100%;background-color: #fff;}
    .slider-wrap{overflow-y: auto;border: 1px saddlebrown solid;margin-left: .3rem;}
    /*去掉滚动条*/
    .slider-wrap::-webkit-scrollbar {display: none;}
    .list-nav{width: max-content;height: max-content;}
    .list-item{width: 148px;height: 140px;border: darkmagenta 1px solid;}
    .box {width: 100%;height: 70px;border: 1px solid red;}
    .push{position: relative;}

</style>
