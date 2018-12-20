<template>
    <div id="givelike">
      <x-header :left-options="{backText: ''}">喜欢</x-header>
      <div class="containter">
        <div class="timeTitle" v-if="list.length"><p>最新</p></div>
        <ul v-if="list.length">
          <li v-for="(item,index) in list" :key="index" class="clearfix">
            <img :src="baseUrl+item.headUrl" class="focusPhoto">
            <div class="focusDiv">
              <p>
                <span class="focusName">{{item.nickName}}</span>
                <span v-if="item.tableName=='PRODUCTION'">点赞了你的作品</span>
                <span v-if="item.tableName=='STORY'">点赞了你的故事</span>
                <span v-if="item.tableName=='PRODUCTION_EVALUATE'">点赞了你的评论</span>
              </p>
              <p class="worktitle" v-if="item.tableName=='STORY'">#{{hideTxt(item.storyName)}}#</p>
              <p class="focusTime">{{changTime(item.fcd)}}</p>
            </div>
            <router-link class="temework" v-if="item.tableName=='PRODUCTION'"><!--:to="'/prodution?id='+item.productionId"-->
              <img :src="item.productionCover" >
            </router-link>
          </li>
        </ul>
        <div class="timeTitle" v-if="relist.length"><p>历史</p></div>
        <ul v-if="relist.length">
          <li v-for="(item,index) in relist" :key="index" class="clearfix">
            <img :src="baseUrl+item.headUrl" class="focusPhoto">
            <div class="focusDiv">
              <p>
                <span class="focusName">{{item.nickName}}</span>
                <span v-if="item.tableName=='PRODUCTION'">点赞了你的作品</span>
                <span v-if="item.tableName=='STORY'">点赞了你的故事</span>
                <span v-if="item.tableName=='PRODUCTION_EVALUATE'">点赞了你的评论</span>
              </p>
              <p class="worktitle" v-if="item.tableName=='STORY'">#{{hideTxt(item.storyName)}}#</p>
              <p class="focusTime">{{changTime(item.fcd)}}</p>
            </div>
            <div class="temework" v-if="item.tableName=='PRODUCTION'"><!--:to="'/prodution?id='+item.productionId"-->
              <img :src="item.productionCover" >
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
      name: "givelike",
      data(){
        return{
          likeList:[],//喜欢
          list:[],
          relist:[]
        }
      },
      components:{XHeader},
      computed:{
        ...mapState([
          'headerTxt','baseUrl'
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
        hideTxt(txt){
          if(txt == null){
            return ' '
          }
          if(txt.length >10 ){
            return txt.slice(0,10) + '...'
          }
          return txt

        }
      },
      created(){
        this.$post('api/message/queryAllMessageByMessageType',{messageType:4}).then(res=>{
          let arr=res.list;
          let list = [];
          let relist = [];
          for(let i=0;i<arr.length;i++){
            if(arr[i].messageStatusId==0){
              list.push(arr[i]);
            }else{
              relist.push(arr[i]);
            }
          };
          this.list=list;
          this.relist=relist;
          console.log(this.list);
        });
        let _this=this;
        setTimeout(() => {
          _this.$post('/api/message/readMessageByMessageType/'+4).then(res=>{
            console.log('改为已读');
          })
        },20000)
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

  ul li{height: 1.2rem;margin:.47rem 0;}
  .focusPhoto{
    float: left;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
  }
  .focusDiv{
    float: left;
    margin-left: .2rem;
    color: #fff;
    font-size: .3rem;
  }
  .focusDiv p:first-child{
    margin-bottom: .16rem;
  }
  .focusName{
    color: #FECF74;
    margin-right: .2rem;

  }
  .worktitle{
    opacity: .5;
    /*margin-top: .16rem;*/
    max-width: 4rem;
  }

  .focusTime{
    color: #5C5170;
    font-size: .26rem;
    margin-top: .14rem;
  }

  .temework{
    float: right;
  }
  .temework img{width: .94rem;height: .94rem;}
</style>
