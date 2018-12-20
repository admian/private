<template>
   <div id="new">
     {{SETSTATE({type:'headerTxt',val:'消息'})}}
     <div class="newswrap">
        <div class="clearfix newlist" v-for="i in newlist">
          <div class="fl">
            <img :src="i.icon" class="newicon fl">
            <span class="newname">{{i.name}}<badge></badge></span>
          </div>
          <router-link :to="i.path" class="fr">
            <p><img src="../../assets/img/self/back.png" class="backicon"></p>
          </router-link>
        </div>

     </div>
   </div>
</template>

<script>
  import { Badge } from 'vux'
  import {mapMutations,mapState} from 'vuex'
    export default {
      data(){
        return{
          newlist:[
            //问题：如何判断未读已读，最近历史
            {name:'关注', icon:require('../../assets/img/self/focus.png'), path:'/newfocus'},
            {name:'@我', icon:require('../../assets/img/self/teme.png'), path:'/ateme'},
            {name:'评论', icon:require('../../assets/img/self/comments.png'), path:'/reviews'},
            {name:'点赞', icon:require('../../assets/img/self/like.png'), path:'/givelike'},
            {name:'系统', icon:require('../../assets/img/self/system.png'), path:'/xtmessage'}
          ]
        }
      },
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
      components:{ Badge},
      name: "new" //消息
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
  }
  .backicon{
    width: .14rem;
    height: .24rem;
    margin-top: .23rem;
  }

</style>
