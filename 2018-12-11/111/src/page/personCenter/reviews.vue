<template>
  <div id="reviews">
    <x-header :left-options="{backText: ''}">评论</x-header>
    <div class="containter" v-if="reviewList.length">
      <div class="timeTitle" v-if="list.length"><p>最新</p></div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <img :src="baseUrl+ item.headUrl" class="reviewsPhoto">
          <div class="reviewsDiv">
            <p><span class="reviewsName">{{item.nickName}}</span><span>评论了你的作品</span></p>
            <p class="reviewsCon">{{item.messageBody}}</p>
            <div class="relike">
              <span class="reviewsTime">{{changTime(item.fcd)}}</span>
              <div class="reviewslike"><img src="../../assets/img/self/reviewslike.png">1258823</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="timeTitle" v-if="relist.length"><p>历史</p></div>
      <ul>
        <li v-for="(item,index) in relist" :key="index">
          <img :src="baseUrl+ item.headUrl" class="reviewsPhoto">
          <div class="reviewsDiv">
            <p><span class="reviewsName">{{item.nickName}}</span><span>评论了你的作品</span></p>
            <p class="reviewsCon">{{item.messageBody}}</p>
            <div class="relike">
              <span class="reviewsTime">{{changTime(item.fcd)}}</span>
              <div class="reviewslike"><img src="../../assets/img/self/reviewslike.png">1258823</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  import { XHeader } from 'vux'
    export default {
      name: "reviews",
      data(){
        return{
          reviewList:[],//评论通知列表
          relist:[],
          list:[]
        }
      },
      components:{XHeader},
      computed:{
        ...mapState([
          'headerTxt',
          'baseUrl'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        ),
        changTime(time){
          var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '.';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
          var D = date.getDate() + ' ';
          /* var h = date.getHours() + ':';
           var m = date.getMinutes() + ':';
           var s = date.getSeconds();*/
          return Y+M+D;
        },
      },
      created(){
        this.$post('api/message/queryAllMessageByMessageType',{messgaeType:3}).then(res=>{
          let _this=this;
          let arr=res.list;
          for(let i=0;i<arr.length;i++){
            if(arr[i].messageStatusName=='未读'){
              _this.list[_this.list.length]=arr[i];
            }else{
              _this.relist[_this.relist.length]=arr[i];
            }

          }
          console.log(this.list);
          console.log(this.relist);

          /*  let arr = res.list,
                map = {},
              _this = this;
             for(let i = 0; i < arr.length; i++){
               var ai = arr[i];
               if(!map[ai.messageStatusName]){
                 _this.reviewList.push({
                   name: ai.messageStatusName,
                   list: [ai]
                 });
                 map[ai.name] = ai;
               }else{
                 for(let j = 0; j < _this.reviewList.length; j++){
                   let dj = _this.reviewList[j];
                   if(dj.name == ai.name){
                     dj.list.push(ai);
                     break;
                   }
                 }
               }
             }
             this.reviewList.forEach(function (i) {
               if(i.name=='未读'){
                 _this.list=_this.list.push(i.list);
               }else{
                 _this.relist=_this.relist.push(i.list);
               }
             })*/
        })
      }
    }
</script>

<style scoped>
  .containter{
    padding-left: .3rem;
  }
  .timeTitle{
    color: #fff;
    font-size: .28rem;
  }
  ul li{height: 1.6rem;margin:.5rem 0;overflow: hidden;}
 .reviewsPhoto{
   float: left;
   width: .8rem;
   height: .8rem;
   border-radius: 50%;
 }
  .reviewsDiv{
    float: left;
    margin-left: .2rem;
    color: #fff;
    font-size: .3rem;
    width: 5.9rem;
  }
  .reviewsName{
    color: #FECF74;
    margin-right: .2rem;
  }
  .reviewsCon{
    font-size: .26rem;
    margin-top: .23rem;
    line-height: .3rem;
  }
  .relike{
    margin-top: .15rem;
  }
  .reviewsTime{
    color: #5C5170;
    font-size: .26rem;
    margin-top: .29rem;
  }
  .reviewslike{
    float: right;
    color: #5C5170;
    font-size: .2rem;
    line-height: .38rem;
  }
  .reviewslike img{
    float: left;
    width: .38rem;
    height: .34rem;
  }

</style>
