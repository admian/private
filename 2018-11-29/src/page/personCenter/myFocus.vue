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
             <router-link :to="'/person?userId='+item.userId" class="focusimg fl">
               <img :src="baseUrl+item.headUrl" class="userimg">
             </router-link>

             <div class="focusname fl" :class="!item.labels ? 'nolabelname':''">
               {{item.nickName}}
               <p v-if="item.labels"><i class="i-label" v-for="i in item.labels">{{i.labelsName}} /</i> </p>
             </div>
             <div class="fr" :class="item.isAttention ?'endfocus': 'nofocus'" @click="clickFocus(item.userId,item.isAttention,index)" v-if="item.userId!=my_userId">{{item.isAttention? '已关注':'关注'}}</div>
           </li>
         </ul>
       </div>
    </div>
</template>

<script>
    import  {mapMutations,mapState} from 'vuex'
    import { XHeader} from 'vux'
    import {Message} from 'iview';
    import _ from 'lodash'

    export default {
      name: "myFocus",//我的关注
      data(){
        return{
          title:'',
          focusUser:[],
          isFocus:false,
          focusTxt:'已关注',
          isLoading:false,
          pageIndex: 1,
          needAdd:true,
          addInfo:true,
          scrollerStatus: {
            pullupStatus: 'default'
          },
        }
      },
      components: {
        XHeader,Message
      },
      computed:{
        ...mapState([
          'baseUrl',
          'my_userId'
        ])
      },
      mounted() {
        this.scroll()
      },
      methods: {
        ...mapMutations(
          ['SETSTATE']
        ),
        clickFocus(id, isAttention,index){
          if(isAttention==true){
            this.focusUser[index].isAttention=false;
          }else{
            this.focusUser[index].isAttention=true;
          }

          this.$post('/api/user/saveUserAttention/' + id).then(res => {
            console.log('操作成功');
            this.$Message.success('操作成功');
          })
        },
        postAction(){
          this.doPostAction()
        },
        getData(isEmpty){
          let limit = 10;
          let url='';
          if(this.type==1){
            this.title='我的关注';
            url='api/user/getUserAttentionInfoByPage';
          }
          if(this.type==2){
            this.title='我的粉丝';
            url='api/user/getUserFansInfoByPage';
          }
          console.log(url);
          this.$post(url,{pageSize: limit, pageNum: this.pageIndex}).then(res=>{
            this.isLoading = false

            if (isEmpty) {
              this.focusUser = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.focusUser.push(...res.list);
            }
            if (res.list && res.pages <  this.pageIndex) {
              this.needAdd=false;
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {

              })
            }
          });
        },
        getInfo(isEmpty){
          let limit = 10;
          let url='';
          let msg=''
          if(this.type==1){
            this.title='TA的关注';
            url='api/offline/user/getUserAttentionInfoByPageByUserId';
            msg={srcUserId:this.id,pageSize: limit, pageNum: this.pageIndex}
          }else if(this.type==2){
            this.title='TA的粉丝';
            url='api/offline/user/getUserFansInfoByPageByUserId';
            msg={descUserId:this.id,pageSize: limit, pageNum: this.pageIndex}
          }
         // console.log(url);
          this.$post(url,msg).then(res=>{
            this.isLoading = false

            if (isEmpty) {
              this.focusUser = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.focusUser.push(...res.list);
            }
            if (res.list && res.pages <= this.pageIndex) {
              this.needAdd=false;
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
            if (!isEmpty) {
              this.scrollerStatus.pullupStatus = 'default'
              this.$nextTick(() => {

              })
            }
          });
        },
        scroll() {
          this.isLoading = false;
          window.onscroll = () => {
            // 距离底部200px时加载一次
            let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200
            if (bottomOfWindow && this.isLoading == false) {
              this.isLoading = true
              if(this.needAdd){
                this.pageIndex++;
                this.getData(false);
              }
              if(this.addInfo){
                this.pageIndex++;
                this.getInfo(false);
              }
            }
          }
        },
      },
      created(){
        this.id=this.$route.query.id;
        this.type=this.$route.query.type;
        this.doPostAction = _.debounce(this.clickFocus,500);

        //用户关注的人/user/getUserAttentionInfoByPage
        //用户的粉丝/user/getUserFansInfoByPage
        if(this.id==this.my_userId){//我的
          this.getData(true);
        }else if(this.id!=this.my_userId){
          this.getInfo(true);
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
