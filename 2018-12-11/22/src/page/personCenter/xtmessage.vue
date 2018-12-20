<template>
 <div id="xtmessage">
   <x-header :left-options="{backText: ''}">系统通知</x-header>
   <div class="containter">
     <div class="timeTitle" v-if="list.length"><p>未读</p></div>
     <ul>
       <li v-for="(item,index) in list" :key="index">
         <p class="message">{{item.messageBody}}</p>
         <p class="focusTime">{{changTime(item.fcd)}}</p>
       </li>
     </ul>
     <div class="timeTitle" v-if="relist.length"><p>已读</p></div>
     <ul>
       <li v-for="(item,index) in relist" :key="index">
         <p class="message">{{item.messageBody}}</p>
         <p class="focusTime">{{changTime(item.fcd)}}</p>
       </li>
     </ul>
   </div>
 </div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  import { XHeader } from 'vux'
    export default {
      name: "xtmessage",
      data(){
        return{
          messageList:[],
          list:[],
          relist:[]
        }
      },
      components:{XHeader},
      computed:{
        ...mapState([
          'headerTxt'
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
        this.$post('api/message/queryAllMessageByMessageType',{messgaeType:5}).then(res=>{
          //this.messageList=res.list;
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
                _this.messageList.push({
                  name: ai.messageStatusName,
                  list: [ai]
                });
                map[ai.name] = ai;
              }else{
                for(let j = 0; j < _this.messageList.length; j++){
                  let dj = _this.messageList[j];
                  if(dj.name == ai.name){
                    dj.list.push(ai);
                    break;
                  }
                }
              }
            }
            this.messageList.forEach(function (i) {
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
    padding:0 .3rem;
  }
  .timeTitle{
    color: #fff;
    font-size: .28rem;
  }

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
