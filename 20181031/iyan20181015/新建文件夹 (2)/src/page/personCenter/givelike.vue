<template>
    <div id="givelike">
      {{SETSTATE({type:'headerTxt',val:'喜欢'})}}
      <div class="containter">
        <div class="timeTitle"><p>最新</p></div>
        <ul>
          <li>
            <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
            <div class="focusDiv">
              <p><span class="focusName">朵喵喵</span><span>点赞了你的作品</span></p>
              <p class="worktitle">#我有故事你有梦#</p>
              <p class="focusTime">2018.10.20</p>
            </div>
            <div class="temework"><img src="../../assets/img/dream/d.png"></div>
          </li>
          <li>
            <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
            <div class="focusDiv">
              <p><span class="focusName">朵喵喵</span><span>点赞了你的作品</span></p>
              <p class="worktitle">#我有故事你有梦#</p>
              <p class="focusTime">2018.10.20</p>
            </div>
          </li>

        </ul>
        <div class="timeTitle"><p>历史</p></div>
        <ul>
          <li>
            <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
            <div class="focusDiv">
              <p><span class="focusName">朵喵喵</span><span>点赞了你的作品</span></p>
              <p class="worktitle">#我有故事你有梦#</p>
              <p class="focusTime">2018.10.20</p>
            </div>
            <div class="temework"><img src="../../assets/img/dream/d.png"></div>
          </li>

        </ul>
      </div>
    </div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
    export default {
      name: "givelike",
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
  ul{list-style:none;}
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
  }
  .temework{
    float: right;
  }
  .temework img{width: .94rem;height: .94rem;}
</style>
