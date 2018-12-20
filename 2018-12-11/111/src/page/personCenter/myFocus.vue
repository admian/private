<template>
    <div id="myFocus">
      <x-header :left-options="{backText: ''}">{{title}}</x-header>
      <div class="startfocus" v-if="!focusUser.length">
         <img class="startfocus">
         <p>暂时还没有人噢！</p>
       </div>
       <div class="focuswrap" v-else>
         <ul>
           <li class="clearfix" v-for="(item,index) in focusUser" :key="index">
             <router-link :to="'/person?userId='+item.descUserId" class="focusimg fl">
               <img :src="baseUrl+item.headUrl" class="userimg">
             </router-link>

             <div class="focusname fl" :class="!item.labels ? 'nolabelname':''">
               {{item.nickName}}
               <p v-if="item.labels"><i class="i-label" v-for="i in item.labels">{{i.labelsName}} /</i> </p>
             </div>
             <div class="fr" :class="item.isAttention ?'endfocus': 'nofocus'" @click="clickFocus(item.descUserId,item.isAttention)" >{{item.isAttention? '已关注':'关注'}}</div>
           </li>
         </ul>
       </div>
    </div>
</template>

<script>
    import  {mapMutations,mapState} from 'vuex'
    import { XHeader } from 'vux'
    import _ from 'lodash'

    export default {
      name: "myFocus",//我的关注
      data(){
        return{
          title:'',
          focusUser:[],
          isFocus:false,
          focusTxt:'已关注'
        }
      },
      components: {
        XHeader
      },
      computed:{
        ...mapState([
          'baseUrl',
          'my_userId'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        ),
        clickFocus(id, isAttention){
          if(isAttention){
            this.focusUser.isAttention=false;
          }else{
            this.focusUser.isAttention=true;
          }
          this.$post('/api/user/saveUserAttention/' + id).then(res => {
            console.log('操作成功');
          })
        },
        postAction(){
          this.doPostAction()
        },

      },
      created(){
        this.id=this.$route.query.id;
        this.type=this.$route.query.type;
        this.doPostAction = _.debounce(this.clickFocus,1000);
        //用户关注的人/user/getUserAttentionInfoByPage
        //用户的粉丝/user/getUserFansInfoByPage
        if(this.id==this.my_userId){//我的
          if(this.type==1){
             this.title='我的关注';
             this.$post('api/user/getUserAttentionInfoByPage').then(res=>{
               this.focusUser=res.list
             })
          }else if(this.type==2){
            this.title='我的粉丝';
            this.$post('api/user/getUserFansInfoByPage').then(res=>{
              this.focusUser=res.list
            })
          }
        }else if(this.id!=this.my_userId){
          if(this.type==1){
            this.title='TA的关注';
            this.$post('api/offline/user/getUserAttentionInfoByPageByUserId',{srcUserId:this.id}).then(res=>{
              this.focusUser=res.list
            })
          }else if(this.type==2){
            this.title='TA的粉丝';
            this.$post('api/offline/user/getUserFansInfoByPageByUserId',{srcUserId:this.id}).then(res=>{
              this.focusUser=res.list
            })
          }
        }


      }
    }
</script>

<style scoped>
  /*------------------------------------------------*/
  .focuswrap{
    padding: 0 .3rem;
  }
  .focuswrap ul li{
    padding: .2rem 0;
  }
  .focusimg{
    display: inline-block;
  }
  .userimg{
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
  }
  .i-label{
    margin-right: .1rem;
  }
  .focusname{
    font-size: .3rem;
    color: #fff;
    height: .8rem;
    margin-left: .1rem;
  }
  .focusname p{
    font-size: .22rem;
    margin-top: .15rem;
  }
  .nolabelname{
    line-height: .8rem;
  }
  .endfocus{
    width: 1.03rem;
    height: .52rem;
    background: #4C3573;
    color: #fff;
    font-size: .22rem;
    border-radius: .26rem;
    text-align: center;
    line-height: .52rem;
  }
  .nofocus{
    width: 1.03rem;
    height: .52rem;
    background: #FECF74;
    color: #30214A ;
    font-size: .22rem;
    border-radius: .26rem;
    text-align: center;
    line-height: .52rem;
  }

</style>
