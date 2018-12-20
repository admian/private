<template>
    <div id="givelike">
      <x-header :left-options="{backText: ''}">喜欢</x-header>
      <div class="containter">
        <div class="timeTitle" v-if="list.length"><p>最新</p></div>
        <ul>
          <li v-for="(item,index) in list" :key="index" class="clearfix">
            <img :src="baseUrl+ item.headUrl" class="focusPhoto">
            <div class="focusDiv">
              <p><span class="focusName">{{item.nickName}}</span><span>点赞了你的作品</span></p>
              <p class="worktitle">#{{hideTxt(item.storyName)}}#</p>
              <p class="focusTime">{{changTime(item.fcd)}}</p>
            </div>
            <div class="temework"><img src=""></div>
          </li>
        </ul>
        <div class="timeTitle" v-if="relist.length"><p>历史</p></div>
        <ul>
          <li v-for="(item,index) in relist" :key="index" class="clearfix">
            <img :src="baseUrl+ item.headUrl" class="focusPhoto">
            <div class="focusDiv">
              <p><span class="focusName">{{item.nickName}}</span><span>点赞了你的作品</span></p>
              <p class="worktitle">#{{hideTxt(item.storyName)}}#</p>
              <p class="focusTime">{{changTime(item.fcd)}}</p>
            </div>
            <div class="temework"><img src="../../assets/img/dream/d.png"></div>
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
        hideTxt(txt){
          if(txt.length >10 ){
            return txt.slice(0,10) + '...'
          }else{
            return txt
          }
        }
      },
      created(){
        this.$post('api/message/queryAllMessageByMessageType',{messgaeType:4}).then(res=>{
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

         // this.likeList=res.list;
         /* let arr = res.list,
            map = {},
            _this = this;
          for(let i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai.messageStatusName]){
              _this.likeList.push({
                name: ai.messageStatusName,
                list: [ai]
              });
              map[ai.name] = ai;
            }else{
              for(let j = 0; j < _this.likeList.length; j++){
                let dj = _this.likeList[j];
                if(dj.name == ai.name){
                  dj.list.push(ai);
                  break;
                }
              }
            }
          }
          this.likeList.forEach(function (i) {
            if(i.name=='未读'){
              _this.list=_this.list.push(...i.list);
            }else{
              _this.relist=_this.relist.push(...i.list);
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
  .focusName{
    color: #FECF74;
    margin-right: .2rem;
  }
  .focusTime{
    color: #5C5170;
    font-size: .26rem;
    margin-top: .14rem;
  }
  .worktitle{
    opacity: .5;
    margin-top: .16rem;
    max-width: 4rem;
  }
  .temework{
    float: right;
  }
  .temework img{width: .94rem;height: .94rem;}
</style>
