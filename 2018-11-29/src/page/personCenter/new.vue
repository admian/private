<template>
   <div id="new">
     <x-header :left-options="{backText: ''}">消息</x-header>
     <div class="newswrap">
        <div class="clearfix newlist" v-for="i in messList">
          <router-link :to="i.path">
            <div class="fl">
              <img :src="i.icon" class="newicon fl">
              <span class="newname">{{i.name}}<badge v-if="i.list.length"></badge></span>
            </div>
            <div :to="i.path" class="fr">
              <p><img src="../../assets/img/self/back.png" class="backicon"></p>
            </div>
          </router-link>
        </div>
     </div>
   </div>
</template>

<script>
  import { Badge ,XHeader} from 'vux'
  import {mapMutations,mapState} from 'vuex'
    export default {
      data(){
        return{
          newlist:[
            //问题：如何判断未读已读，最近历史
            {id:'1',name:'关注', icon:require('../../assets/img/self/focus.png'), path:'/newfocus',list:[]},
            {id:'2',name:'@我', icon:require('../../assets/img/self/teme.png'), path:'/ateme',list:[]},
            {id:'3',name:'评论', icon:require('../../assets/img/self/comments.png'), path:'/reviews',list:[]},
            {id:'4',name:'点赞', icon:require('../../assets/img/self/like.png'), path:'/givelike',list:[]},
            {id:'5',name:'系统', icon:require('../../assets/img/self/system.png'), path:'/xtmessage',list:[]}
          ],
          messList:[],
        }
      },
      computed:{
        ...mapState([
          'headerTxt',
          'tips'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        )
      },
      components:{ Badge ,XHeader},
      name: "new", //消息
      created(){
        let temp=this.tips;
        console.log(temp);
        let tempList=[];
        this.newlist.map(function(e){
          let obj=[];
          for(let i=0;i<temp.length;i++){
            if(e.id==temp[i].messageType){
                obj.push(temp[i]);
            }
          }
          console.log(obj);
          //创建新字段存信息
          e.list=obj;

          //将集合代入新数组，并输出
          tempList.push(e);
        });
        this.messList=tempList;
        //console.log(tempList);

      }
    }
</script>
<style>
  #new .vux-badge-dot{
    padding: 3px;
    margin-top: -.30rem;
    margin-left: .05rem;
  }
  #new .vux-badge{
    background: #FECF74;
  }
</style>
<style scoped>
  .newswrap{
    padding: 0 .3rem;
  }
  .newlist{
    padding: .25rem 0;
  }
  .newicon{
    width: .7rem;
    height: .7rem;
  }
  .newname{
    height: .7rem;
    line-height: .7rem;
    margin-left: .24rem;
    color: #fff;
  }
  .backicon{
    width: .14rem;
    height: .24rem;
    margin-top: .23rem;
  }

</style>
