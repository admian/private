<template>
  <div id="personCenter">
    <x-header :left-options="{backText:''}" v-if="useList.id==my_userId">
      <router-link to="/new" slot="right" class="newimg"><img src="../../assets/img/icon_new.png"><badge v-if="tips.length"></badge></router-link>
      <!--<a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a>-->
      <a slot="right" class="simg" @click="clickSet"><img src="../../assets/img/....png"></a>
    </x-header>
    <x-header :left-options="{backText:''}" v-if="useList.id!=my_userId">
      <!--<a slot="right" @click="SETSTATE({type:'showShare',val:true})"><img class="share_ico" src="../../assets/img/share_ico.png"></a>-->
    </x-header>
      <div class="user clearfix" v-if="useList.id==my_userId">
       <router-link to="/editdata" ><img :src="useList.headUrl" class="fl"></router-link>
      </div>
      <div class="user clearfix" v-else>
        <div><img :src="useList.headUrl" class="fl"></div><!--v-if-->
        <div class="focus-r">
          <div class="focus" :class="useList.isAttention ?'focus-yes': 'focus-no'" @click="clickFocus(useList.id,useList.isAttention)" >
            {{useList.isAttention? '已关注':'关注'}}
          </div><!--v-if=""-->
        </div>
      </div>
      <div class="nick clearfix">
        <span class="title fl">{{filtName(useList.nickName)}}</span>
        <img class="sex_ico fl" :src="useList.sex==0 ? require('../../assets/img/self/boy_sex.png') :require('../../assets/img/self/girl_sex.png')" v-if="useList.sex"/>
        <span class="tip fl">{{ useList.remark}}</span>
      </div>
      <ul class="tag clearfix">
        <li class="fl tag_item" v-for="i in useList.userLabelsList">{{i.labelsName}}</li>
      </ul>
    <div class="numbers clearfix" v-if="useList.id==my_userId">
      <router-link :to="'/myFocus?type=1&&id='+useList.id">
        <span class="num fl">{{mberList.attentionCount}}</span>
        <span class="fl">关注</span>
      </router-link>

      <i class="fl ico"> / </i>

      <router-link :to="'/myFocus?type=2&&id='+useList.id">
        <span class="num fl">{{mberList.fansCount}}</span>
        <span class="fl">粉丝</span>
      </router-link>

      <i class="fl ico"> / </i>
      <div @click="show=true">
      <span class="num fl">{{mberList.favoriteCount}}</span>
      <span class="fl">获赞</span>
      </div>
      <i class="fl ico"> / </i>

      <router-link to="/mystory">
        <span class="num fl">{{mberList.storyCount}}</span>
        <span class="fl">故事</span>
      </router-link>
    </div>
    <div class="numbers clearfix" v-if="useList.id!=my_userId">
      <router-link :to="'/myFocus?type=1&&id='+useList.id">
        <span class="num fl">{{mberList.attentionCount}}</span>
        <span class="fl">关注</span>
      </router-link>

      <i class="fl ico"> / </i>

      <router-link :to="'/myFocus?type=2&&id='+useList.id">
        <span class="num fl">{{mberList.fansCount}}</span>
        <span class="fl">粉丝</span>
      </router-link>

      <i class="fl ico"> / </i>

      <span class="num fl">{{mberList.favoriteCount}}</span>
      <span class="fl">获赞</span>

      <i class="fl ico"> / </i>

      <router-link :to="'/onesStory?userId='+useList.id" >
        <span class="num fl">{{mberList.storyCount}}</span>
        <span class="fl">故事</span>
      </router-link>
    </div>

    <Collapse class="sel_tab" v-model="valname"  v-if="useList.id!=my_userId">
      <Panel name="1">
        艺术取向
        <ul slot="content" class="sel_list">
          <li v-for="k in useList.userArtsList">{{k.name}}：{{k.context}}</li>
        </ul>
      </Panel>
    </Collapse>

     <!--个人资料-->
    <div class="divider"></div>
    <div class="works">

      <tab class="tabs"
           :line-width="2"
           custom-bar-width=".25rem">
        <tab-item :selected="num===1" @on-item-click="onItemClick(1)">{{produtionNum}} 作品</tab-item><!---->
        <tab-item :selected="num===2" @on-item-click="onItemClick(2)">{{honnerNum}} 荣誉</tab-item><!---->
        <tab-item :selected="num===3" @on-item-click="onItemClick(3)" v-if="useList.id==my_userId">{{favoriteNum}} 收藏</tab-item><!---->
      </tab>
      <div>

       <!-- <scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="true"
                  :use-pullup="true" :pullup-config="upobj" @on-scroll-bottom="showLoadTxt"
                  @on-pullup-loading="selPullUp">-->

          <div class="container" v-show="key==1">
            <div class="no-connect" v-if="!allProdution.length">
              <div v-if="useList.id==my_userId">
                <p align="center">证明我没有镜头恐惧症</p>
                <router-link to="/"><div class="btn-work">创作首个作品</div></router-link>
              </div>
              <div v-if="useList.id!=my_userId">
                <p align="center">主人还很害羞，晚点再来看看</p>
              </div>
            </div><!--作品为空时end-->

            <div class="waterfall" v-else>
              <div v-for="(item,index) in allProdution" :key="index">
                <router-link :to="'/prodution?id='+item.id" ><!--class="item" :class="item.productionType==1 ? 'lg':''"-->
                  <div class="item"  :class="item.productionType==1 ? 'lg':''">
                    <img :src="item.productionCover" class="pic">
                    <div class="user-info isLike clearfix" v-if="!item.dreamId">
                      <span class="fr">{{item.favoriteCount}}</span>
                      <img class="ico-like fr" :src="item.isFavorite ? require('../../assets/img/self/dz_sel.png'): require('../../assets/img/self/dz.png')"/>
                    </div>
                    <div class="user-info clearfix" v-if="item.dreamId">
                      <i class="ico fl"></i>
                      <span class="fl">{{item.dreamName}}</span>
                      <span class="fr">{{item.pushCount ? item.pushCount : 0}} pick</span>
                    </div>

                  </div>
                </router-link>
              </div>

            </div><!--有作品end-->
          </div>
          <div class="container" v-show="key==2">
            <div class="no-connect" v-if="!allHonner.length">
              <div v-if="useList.id==my_userId">
                <p align="center">作品达到 一定优秀程度，会自动在这里</p>
              </div>
              <div v-if="useList.id!=my_userId">
                <p align="center">主人还很害羞，晚点再来看看</p>
              </div>
            </div><!--荣誉为空时-->
            <div class="waterfall">
              <div v-for="(item,index) in allHonner" :key="index">
                <router-link :to="'/prodution?id='+item.id" >
                  <div class="item" :class="item.productionType==1 ? 'lg':''">
                    <img :src="item.productionCover" class="pic">
                    <div class="user-info clearfix">
                      <i class="ico fl"></i>
                      <span class="fl">{{item.dreamName}}</span>
                      <span class="fr">{{item.pushCount ? item.pushCount : 0}} pick</span>
                    </div>
                    <img src="../../assets/img/self/honor.png" class="honor">
                    </div>
                </router-link>
              </div>
            </div><!--荣誉end-->
          </div>
          <div class="container" v-show="key==3">
            <div class="no-connect" v-if="!allFavorite.length">
              <p align="center">没办法，没有入眼的按钮</p>
              <router-link to="/"><div class="btn-work">再去瞧瞧</div></router-link>
            </div><!--收藏为空时-->

            <div class="sc-wrap">
              <div v-for="(item,index) in allFavorite" :key="index">
                <router-link :to="'/prodution?id='+item.id" class="item" :class="item.productionType==1 ? 'lg':''">
                  <div class="act-like">
                    <img class="pic" :src="item.productionCover">
                    <div class="act-info clearfix" v-if="item.dreamId">
                      <i class="ico fl"></i>
                      <span class="fl">{{item.dreamName}}</span>
                      <span class="fr">{{item.pushCount ? item.pushCount : 0}} pick</span>
                    </div>
                    <div class="num-like"><img src="../../assets/img/like_ico.png" class="like_icon">{{item.favoriteCount ? item.favoriteCount : 0}}</div>
                  </div>

                  <router-link :to="'/person?userId='+item.userId" class="user-info clearfix">
                    <img class="fl" :src="item.headUrl"/>
                    <span class="fl user-name">{{filtName(item.nickName)}}</span>
                  </router-link>
                </router-link>

              </div>

            </div><!--收藏end-->
          </div>
        <!--</scroller>-->
      </div>
    </div>
    <confirm v-model="show1"
      :show-cancel-button="false"
      confirm-text="朕知道了">
      <p style="text-align:center;">获得了{{mberList.favoriteCount ? mberList.favoriteCount : 0}}个赞~再接再厉</p>
    </confirm>
    <confirm v-model="show"
             title="您还没有登录"
             confirm-text="去登录"
             cancel-text="知道了"
             @on-confirm="onConfirm">
      <p style="text-align:center;">执行下一步需要先登录哟~~</p>
    </confirm>
  </div>
</template>

<script>
  import { Tab, TabItem ,Scroller,XHeader,Badge,Confirm} from 'vux'
  import {mapState,mapMutations} from 'vuex'
  import _ from 'lodash'
  export default {
    name: "index",
    components: {
      Tab,
      TabItem,
      Scroller,
      XHeader,
      Badge,
      Confirm
    },
    data(){
      return{
        show1:false,//弹窗
        title:'222',
        key:1,
        num:1,
        valname:'1',
        focusTxt:'关注',//查看别人
        useList:[],//个人信息列表
        mberList:[],//总数
        allProdution:[],
        produtionNum:'',
        allHonner:[],
        honnerNum:'',
        allFavorite:[],
        favoriteNum:'',
        promptList:[],//消息提醒
        /*upobj: {
          content: '',//常驻提示文字
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '上拉加载',//上拉提示文字
          upContent: '',//下拉提示文字
          loadingContent: 'loading...',//加载中
          clsPrefix: 'xs-plugin-pullup-'
        },*/
        scrollerStatus: {
          pullupStatus: 'default'
        },
        isLoading: false,
        needAdd: true,
        addInfo:true,
        addTemp:true,
        page1:1,
        page2:1,
        page3:1,
        show:false

      }
    },
    computed:{
      ...mapState([
        'is_login',
        'my_userId',

        'tips'
      ])
    },
    mounted() {
      this.scroll()
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      //未登录
      onConfirm(){
        window.location.href='/login';
      },
      clickSet(){
        window.location.href='/setTing';
      },
      //关注
      clickFocus(id, isAttention){
        if(!this.is_login){
          this.show=true;
          return
        }
         if(isAttention){
           this.useList.isAttention=false;
         }else{
           this.useList.isAttention=true;
         }
         //console.log(this.useList.isAttention);
        this.$post('/api/user/saveUserAttention/' + id).then(res => {
             console.log('操作成功');
        })
      },
      postAction(){this.doPostAction()},
      //tabs
      onItemClick(num){
        this.key=num;
        switch (num) {
          case  1:this.getData();
          break;
          case  2:this.grtInfo();
          break;
          case  3:this.gwtTnfo();
          break;
        }
        this.scroll();
      },
      //作品
      getData(isEmpty) {
        let limit = 10;
        if(this.userId!=this.my_userId){
          this.$post('api/offline/user/queryAllProductionByUserIdByPage', {pageSize:limit,pageNum:this.page1,userId:this.userId}).then(res =>{
            this.isLoading = false;
              if (isEmpty) {
                this.allProdution = res.list;
              } else {
                //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                this.allProdution.push(...res.list);
              }
              if (res.list && res.list.length <limit) {
                this.needAdd = false;
              }
            });


        }else{
          this.$post('api/user/queryAllProductionByPage', {pageSize:limit,pageNum:this.page1}).then(
            res => {
              this.isLoading = false;
              if (isEmpty) {
                this.allProdution=[];
                this.allProdution = res.list;
              } else {
                //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                this.allProdution.push(...res.list);
              }
              //console.log(res.list.length);
              if (res.list && res.list.length < limit) {
                this.needAdd = false;
              }
            });
        }
      },
      //荣誉
      grtInfo(isEmpty){
        let limit = 10;
        if(this.userId!=this.my_userId) {
          this.$post('api/offline/user/queryAllHonnerProductionByUserIdByPageBean', {pageSize:limit,pageNum:this.page2,userId:this.userId}).then(
            res => {

              this.isLoading = false;
              if (isEmpty) {
                this.allHonner = res.list;
              } else {
                //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                this.allHonner.push(...res.list);
              }
              if (res.list && res.list.length < limit) {
                this.addInfo = false;
              }

            });

        }else{
          this.$post('api/user/queryAllHonnerProductionByPageBean', {pageSize: limit, pageNum: this.page2}).then(
            res => {
              this.isLoading = false;
              if (isEmpty) {
                this.allHonner = res.list;
              } else {
                //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                this.allHonner.push(...res.list);
              }
              if (res.list && res.list.length < limit) {
                this.addInfo = false;
              }
            });
        }
      },
      //收藏
      gwtTnfo(isEmpty){
        let limit = 10;
        if(this.userId!=this.my_userId) {
          this.$post('api/offline/user/queryAllFavoriteByUserIdByPage', {pageSize:limit,pageNum:this.page3,userId:this.userId}).then(
            res => {
              this.favoriteNum=res.total;
              this.isLoading = false;
              if (isEmpty) {
                this.allFavorite = res.list;
              } else {
                //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                this.allFavorite.push(...res.list);
              }
              if (res.list && res.list.length < limit) {
                this.addTemp = false;
              }
            });
        }else{
          this.$post('api/user/queryAllFavoriteByPage', {pageSize:limit,pageNum:this.page3}).then(
            res => {

              this.isLoading = false;
              if (isEmpty) {
                this.allFavorite = res.list;
                console.log(this.allFavorite);
              } else {
                //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
                this.allFavorite.push(...res.list);
              }
              if (res.list && res.list.length < limit) {
                this.addTemp = false;
              }
            });
        }
      },
      scroll() {
        this.isLoading = false;
        window.onscroll = () => {
          // 距离底部200px时加载一次
          let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200;
          this.sc_txt = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

          if (bottomOfWindow && this.isLoading == false) {
            if(this.key==1){
              this.isLoading = true;
              if (this.needAdd) {
                this.page1++;
                this.getData(false);
              }
            }
            if(this.key==2){
              this.isLoading = true;
              if(this.addInfo){
                this.page2++;
                this.grtInfo(false);
              }
            }
            if(this.key==3){
              this.isLoading = true;
              if(this.addTemp){
                this.page3++;
                this.gwtTnfo(false);
              }
            }


          }
        }
      }
    },
    created(){
      this.userId=this.$route.query.userId;
      //alert('userid:'+this.userId);
      this.getData(true);
      this.doPostAction = _.debounce(this.clickFocus,500);
      if(this.userId==this.my_userId){
            //获取个人所有信息
            this.$post('api/user/getUserInfo').then(res => {
              this.useList = res;
            })
            //获取关注、粉丝等数量
            this.$post('api/user/getUserProduction').then(res => {
              this.mberList = res;
            })
            //初始请求作品总数
            this.$post('api/user/queryAllProductionByPage').then(res => {
              this.produtionNum=res.total
            })
            this.$post('api/user/queryAllHonnerProductionByPageBean').then(res => {
              this.honnerNum=res.total;
            })
            this.$post('api/user/queryAllFavoriteByPage').then(res => {
              this.favoriteNum=res.total;
            })

      }else{
          //获取个人所有信息
          this.$post('api/offline/user/getUserInfoByUserId/'+this.userId).then(res => {
            this.useList = res;
          })
          //获取关注、粉丝等数量
          this.$post('api/offline/user/getUserProductionByUserId/'+this.userId).then(res => {
            this.mberList = res;
          })
          //初始请求作品总数
          this.$post('api/offline/user/queryAllProductionByUserIdByPage',{userId:this.userId}).then(res => {
            this.produtionNum=res.total
          })
          this.$post('api/offline/user/queryAllHonnerProductionByUserIdByPageBean',{userId:this.userId}).then(res => {
            this.honnerNum=res.total;
          })
          this.$post('api/offline/user/queryAllFavoriteByUserIdByPage',{userId:this.userId}).then(res => {
            this.favoriteNum=res.total;
          })

      };

    }

  }
</script>
<style>
  #personCenter .vux-header{
    margin-top: .2rem;
  }
  #personCenter .vux-header .vux-header-right a{
    margin-left: .4rem;
  }
  #personCenter .vux-tab {
    background-color: transparent;
  }
  #personCenter .vux-tab .vux-tab-item {
    margin-top: .4rem;
    margin-bottom: .1rem;
    background-color: transparent;
    line-height: 1;
  }

  #personCenter .vux-tab .vux-tab-item.vux-tab-selected {
    color: #fff;
  }

  #personCenter .vux-tab-bar-inner {
    background-color: #FECF74;
  }
  #personCenter .ivu-collapse{
    background-color: transparent;
    border:none;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    padding-left: .3rem;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    line-height: 1.02rem;
    height: 1.02rem;
    font-size: .32rem;
    color:#fff;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i{
    float: right;
    margin-top: 0.4rem;
  }
  #personCenter .ivu-collapse-content{
    color:#FECF74;

    background-color: transparent;
  }
  #personCenter .ivu-collapse-content>.ivu-collapse-content-box{
    padding-bottom: 0;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
    border-bottom-style: none;
  }
  #personCenter .vux-badge-dot{
    padding: 3px;
    margin-top: -.30rem;
    margin-left: .05rem;
  }
  #personCenter .vux-badge{
    background: #FECF74;
    position: absolute;
    right: -.07rem;
    top:.2rem;
  }
  #personCenter .weui-dialog{
    background-color: #1F173E;
  }
  #personCenter .weui-dialog__bd:first-child{
    color: #fff;
  }
  #personCenter .weui-dialog__btn_primary{
    color: #fff;
  }
</style>
<style scoped>
  .simg{
    width: .46rem;
    height: .08rem;
    margin-left: .5rem;
    margin-top: .1rem;
  }
  .newimg{
    width: .33rem;
    height: .39rem;
    margin-top: -.1rem;
    margin-right: .5rem;
    position: relative;
  }
  .user {
    margin-top: .3rem;
    padding-left: .6rem;
    padding-right: .3rem;
    padding-bottom: .2rem;
  }
  .user img {
    width: 1.26rem;
    height: 1.26rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user span {
    margin-top: .37rem;
    width: 1.03rem;
    height: .52rem;
    line-height: .52rem;
    font-size: .22rem;
    text-align: center;
    color: #30214A;
    background-color: #fecf74;
    border-radius: 15px;
  }
  .focus-r{
    float: right;
    margin-top: .2rem;
  }
  .focus{

    width:1.02rem;
    height:.52rem;
    font-size: .22rem;
    border-radius:.26rem;
    text-align: center;

  }
  .focus-no{color: #130C21;background:#FECF74;line-height: .52rem;margin-top: .1rem;}
  .focus-yes{color: #fff;border:2px solid rgba(76, 53, 115, 1);line-height: .48rem;margin-top: .1rem;}
  .nick {
    padding: 0 .44rem .23rem;
    color: #BCBAC1;
    font-size: .24rem;
  }
  .nick .title {
    color: #fff;
    font-size: .4rem;
  }
  .nick .sex_ico {
    width: .19rem;
    height: .29rem;
    margin-top: .05rem;
    margin-left: .15rem;
    margin-right: .21rem;
  }
  .nick .tip {
    margin-top: .1rem;

  }
  .tag {
    padding: 0 .44rem .51rem;
  }
  .tag_item {
    margin-right: .1rem;
    padding: 0 .25rem;
    color: #FECF74;
    height: .4rem;
    line-height: .4rem;
    font-size: .2rem;
    background-color: rgba(51, 37, 76, .3);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

  }
  .numbers {
    padding: 0 .44rem;
    margin-bottom: .3rem;
  }
  .numbers .ico {
    margin: 0 .2rem;
  }
  .numbers .num {
    color:#fff;
    font-size: .34rem;
    margin-right: .05rem;
    font-style: italic;
    margin-top: -.06rem;
  }
  .numbers span{
    font-size: .22rem;
    color: #A8A6AB;
  }
  .sel_list{
    padding-bottom: .3rem;
  }
  .sel_list li{
    margin-bottom: .15rem;
    padding-left: .12rem;
    padding-right: .22rem;
    height: .6rem;
    line-height: .6rem;
    font-size: .26rem;
    width: max-content;
    background-color: rgba(51, 37, 76, .3);
    border-radius: 5px;
  }
  .works .tabs {
    width: 50%;
    margin: 0 auto;
  }
  .container {width: 92%;margin: .35rem auto 0;}

  .waterfall {-moz-column-count: 2; /* Firefox */-webkit-column-count: 2; /* Safari 和 Chrome */column-count: 2;-moz-column-gap: .15rem;-webkit-column-gap: .15rem;column-gap: .15rem;}

  .waterfall .item.lg {height: 5.18rem;}

  .waterfall .item {position: relative;margin-bottom: .15rem;height: 3.37rem;}

  .waterfall .item .pic {width: 100%;}

  .waterfall .user-info {padding: 0 .15rem;position: absolute;bottom: .3rem;width: 100%;line-height: .2rem;font-size: .2rem;color: #fff;}

  .waterfall .user-info .ico {margin-top: .02rem;margin-right: .1rem;width: .14rem;height: .14rem;border-radius: 50%;border: 1px solid #694BFF;}

  .waterfall .isLike .ico-like {margin-right: .07rem;width: .16rem;height: .16rem;}
  .sc-wrap{
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: .15rem;
    -webkit-column-gap: .15rem;
    column-gap: .15rem;
  }

  .sc-wrap .item {
    padding-bottom: .1rem;
    margin-bottom: .2rem;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    display: block;
    color: #fff;
    background-color: #211934;

  }
  .sc-wrap .item .act-like{position: relative;}
  .sc-wrap .item .act-like .pic {
    width: 100%;
    height: 3.37rem;
  }

  .sc-wrap .item.lg .act-like .pic {
    height: 5.18rem;
  }

  .sc-wrap .user-info {
    display: block;
    padding: .14rem .2rem;
    font-size: .2rem;
    color: #EBE2FF;
    line-height: .5rem;
  }
  .sc-wrap .act-like .act-info {padding: 0 .15rem;position: absolute;bottom: .3rem;width: 100%;line-height: .2rem;font-size: .2rem;}
  .sc-wrap .act-like .num-like{ width: 1rem; height: .34rem; background: rgba(0,0,0,.6);border-radius: .17rem; position: absolute;top: .2rem;right: .2rem;color: #fff; font-size: .2rem;line-height: .34rem;}
  .sc-wrap .act-like .num-like .like_icon{width: .24rem; height: .22rem;float: left;margin-left: .12rem;margin-top: .06rem;margin-right: .05rem}
  .sc-wrap .user-info img {
    margin-right: .2rem;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
  }

  .sc-wrap .item .user-name {
    font-size: .2rem;
    color: #EBE2FF;
  }
  /*没有作品*/
  .no-connect p{
    color: #737373;
    font-size: .3rem;
    margin-top: 3.28rem;
    margin-bottom: .5rem;
  }
  .btn-work{
    margin: auto;
    margin-top: 1.62rem;
    width:3.38rem;
    height:.8rem;
    background:linear-gradient(-65deg,rgba(79,51,255,.8),rgba(162,72,255,.8));
    border-radius:.4rem;
    text-align: center;
    line-height: .8rem;
    color: #fff;
  }
  .honor{
    position: absolute;
    top: -.07rem;
    right: .16rem;
    width: .46rem;
    height: .55rem;
  }
  .like{
    position: absolute;
    top: .1rem;
    right: .3rem;

  }


</style>
