<template>
    <div id="myFocus">
      {{SETSTATE({type:'headerTxt',val:'关注的人'})}}
      <!--<div class="startfocus">
         <img class="startfocus">
         <p>你还没关注的人噢！</p>
       </div>-->
       <div class="focuswrap">
         <ul>
           <li class="clearfix" v-for="i in focusUser">
             <div class="focusimg fl">
               <img :src="i.photo" class="userimg">
             </div>

             <div class="focusname fl" :class="!i.label ? 'nolabelname':''">
               {{i.name}}
               <p v-if="i.label!==''">{{i.label}}</p>
             </div>
             <div class="endfocus fr" v-if="i.type==1">已关注</div>
             <div class="nofocus fr">关注</div>
      </li>
      </ul>
    </div>
    </div>
</template>

<script>
import  {mapMutations,mapState} from 'vuex'
    export default {
      name: "myFocus",//我的关注
      data(){
        return{
          focusUser:[
            {
              photo:require('../../assets/img/self/photo.png'),name:'喜欢猫的咸鱼',label:'猫星人/萌宠大叔/暖男',type:1
            },{
              photo:require('../../assets/img/self/photo.png'),name:'牛',label:'',type:1
            }
            ]
        }
      },
      computed:{
        ...mapState([
          'indexTabIndex'
        ])
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        )
      },
      created(){}
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
