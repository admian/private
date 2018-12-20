<template>
  <div id="newFocus">
    {{SETSTATE({type:'headerTxt',val:'关注'})}}
    <div class="containter">
      <div class="timeTitle"><p>最新</p></div>
      <ul>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
          <div class="focusDiv">
            <p><span class="focusName">朵喵喵</span><span>关注了你</span></p>
            <p class="focusTime">2018.10.20</p>
          </div>
        </li>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
          <div class="focusDiv">
            <p><span class="focusName">朵喵喵</span><span>关注了你</span></p>
            <p class="focusTime">2018.10.20</p>
          </div>
        </li>

      </ul>
      <div class="timeTitle"><p>历史</p></div>
      <ul>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="focusPhoto">
          <div class="focusDiv">
            <p><span class="focusName">朵喵喵</span><span>关注了你</span></p>
            <p class="focusTime">2018.10.20</p>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
    export default {
      name: "newFocus",
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
  padding-left: .3rem;
}
.timeTitle{
  color: #fff;
  font-size: .28rem;
}
  ul{list-style:none;}
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
