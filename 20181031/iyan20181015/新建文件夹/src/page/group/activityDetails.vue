<template>
    <div id="activityDetails">
      <x-header>{{SETSTATE({type:'headerTxt',val:'皓镧传选角'})}}</x-header>
      <div class="container">
        <div class="act clearfix">
          <div class="fl">
            <p class="actDes">演绎小宫女悲欢离合的一生</p>
            <p class="actTime"><i>截止日期</i>2018-10-26</p>
          </div>
          <div class="fontDetail fr">详情</div>
        </div>
        <!--------------------------------------------------------->
        <div class="actVideo">
          <!--竖屏、横屏-->
          <div></div>
          <div></div>
        </div>
        <!------------------------------------------------------------------>
        <div class="actUser clearfix">
          <div class="fl">
            <div class="userPhoto fl">
              <img src="" class="userP">
              <div class="focus"><img src="../../assets/img/dream/关注@2x.png"><!--<Icon type="ios-add"/>--></div>
            </div>
            <div class="userMessage fr">
              <p class="userName">xxxx</p>
              <p class="actNo">no.23</p>
            </div>
          </div>
          <div class="llTwo fr">
            <div class="like fl"><i class="num">103W</i></div>
            <div class="leave fl"><i class="num">103W</i></div>
          </div>
        </div>
        <!------------------------------------------------------------------------->
        <div class="recommended">
          <div class="slider-wrap">
            <ul class="list-nav clearfix">
              <li class="list-item fl" v-for="i in 8">
                <img src="">
                <div class="recom clearfix">
                  <div class="fl recoml">
                    <img src="" class="recomImg">
                    <p class="remNo">no.2</p>
                  </div>
                  <div class="fr recomr">
                    <p class="recomName">喜欢猫的咸鱼</p>
                    <p class="recomPush"><i>5168</i>push</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import XHeader from "../../components/x-header";
    import {mapState ,mapMutations} from "vuex";
    export default {
      name: "activityDetails",
      data(){
        return{}
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        )
      },
      computed:{
        ...mapState([
          'headerTxt'
        ])
      },
      components: {XHeader},
      created(){}

    }
</script>

<style scoped>
  #activityDetails{}
  .container{
    padding-top: .6rem;
    width: 100%;
    padding-bottom: .36rem;

  }
  .act{
    color: #fff;
    padding-left: .28rem;
    padding-right: .3rem;
  }
  .actDes{
    font-size: .3rem;
    margin-bottom: .16rem;
  }
  .actTime{
    font-size: .28rem;
  }
  .actTime i{
    font-size: .2rem;
    margin-right: .18rem;
  }
  .fontDetail{
    font-size: .28rem;
    color: #FECF74;
  }
  /*--------------------占位--------------------------*/
  .actVideo{
    height: 7rem;
    margin-top: .4rem;
    background-color: #f1f1f1;
  }
  /*-------------------------------------------*/
  .actUser{
    height: 1.1rem;
    margin: 0 .44rem;
    border-bottom: .03rem solid #25183F;
    padding-left: .1rem;
  }
  .userPhoto{
    position: relative;
    padding-top: .03rem;
  }
  .userP{
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .focus{
    width: .32rem;
    height:.32rem;

    /*background:rgba(103,91,255,1);*/
    border-radius:50%;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .userMessage{
    margin-left: .2rem;
    color: #fff;
  }
  .userName{
    font-size: .28rem;
    margin-top: .18rem;
  }
  .actNo{
    width: .54rem;
    height: .25rem;
    line-height: .25rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-top: .1rem;
    text-align: center;
  }
  .llTwo{
    color: #fff;
    margin-top: .43rem;
  }
  .like{
    height: .35rem;
    background: url("../../assets/img/dream/like.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
    margin-right: .28rem;
  }
  .leave{
    height: .35rem;
    background: url("../../assets/img/dream/leave.png") no-repeat left center;
    background-size: .38rem .35rem;
    padding-left: .45rem;
  }
  .num{
    font-size: .2rem;
  }
/*---------------------------------------------------------------------------*/
  .recommended{
    margin-top: .3rem;
    margin-left: .28rem;
  }
  .slider-wrap{
    overflow-y: auto;
  }
  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {
    display: none;
  }
  .list-nav{
    width: max-content;
    height: max-content;
  }
  .list-item{
    width: 1.86rem;
    height: 1.86rem;
    margin-right: .1rem;
    border: #fff 1px solid;
    position: relative;
  }
  .recom{
    position: absolute;
    bottom: 0;
    z-index: 10;
    height: .6rem;
  }
  .recoml,.recomr{
    margin-left: .12rem;
  }
  .recomImg{
    width: .34rem;
    height: .34rem;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .remNo{
    width: .47rem;
    height: .22rem;
    line-height: .22rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-top: -.05rem;
    z-index: 20;
    text-align: center;
  }
  .recomName{
    font-size: .14rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush{
    font-size: .16rem;
    color: #fff;
    margin-top: .1rem;
  }
  .recomPush i{
    margin-right: .05rem;
  }
</style>
