<template>
  <div id="newFocus">
    <x-header :left-options="{backText: ''}">关注</x-header>
    <div class="containter">
      <div class="timeTitle" v-if="list.length"><p>最新</p></div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <img :src="baseUrl+ item.headUrl" class="focusPhoto">
          <div class="focusDiv">
            <p><span class="focusName">{{item.nickName}}</span><span>关注了你</span></p>
            <p class="focusTime">{{changTime(item.fcd)}}</p>
          </div>
        </li>

      </ul>
      <div class="timeTitle" v-if="relist.length"><p>历史</p></div>
      <ul>
        <li v-for="(item,index) in relist" :key="index">
          <img :src="baseUrl+ item.headUrl" class="focusPhoto">
          <div class="focusDiv">
            <p><span class="focusName">{{item.nickName}}</span><span>关注了你</span></p>
            <p class="focusTime">{{changTime(item.fcd)}}</p>
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
      name: "newFocus",
      data(){
        return{
          focusList:[],
          relist:[],
          list:[]
        }
      },
      computed:{
        ...mapState([
          'headerTxt',
          'baseUrl'
        ])
      },
      components: {
        XHeader
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
        this.$post('api/message/queryAllMessageByMessageType',{messgaeType:1}).then(res=>{
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

          //this.focusList=res.list;
          /*let arr = res.list,
            map = {},
            _this = this;
          for(let i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai.messageStatusName]){
              _this.focusList.push({
                name: ai.messageStatusName,
                list: [ai]
              });
              map[ai.name] = ai;
            }else{
              for(let j = 0; j < _this.focusList.length; j++){
                let dj = _this.focusList[j];
                if(dj.name == ai.name){
                  dj.list.push(ai);
                  break;
                }
              }
            }
          }
          this.focusList.forEach(function (i) {
            if(i.name=='未读'){
              _this.list=_this.list.push(i.list);
            }else{
              _this.relist=_this.relist.push(i.list);
            }
          })
          console.log(this.focusList);*/
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

  ul li{height: .8rem;margin:.5rem 0;}
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
</style>
