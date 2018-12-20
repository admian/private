<template>
  <div id="reviews">
    {{SETSTATE({type:'headerTxt',val:'评论'})}}
    <div class="containter">
      <div class="timeTitle"><p>最新</p></div>
      <ul>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="reviewsPhoto">
          <div class="reviewsDiv">
            <p><span class="reviewsName">朵喵喵</span><span>评论了你的作品</span></p>
            <p class="reviewsCon">讲真当时的四大天王哪个不是颜值和实力并存的,演技唱歌跳舞哪位不是样样精通?</p>
            <div class="relike">
              <span class="reviewsTime">2018.10.12</span>
              <div class="reviewslike"><img src="../../assets/img/self/reviewslike.png">1258823</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="timeTitle"><p>历史</p></div>
      <ul>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="reviewsPhoto">
          <div class="reviewsDiv">
            <p><span class="reviewsName">朵喵喵</span><span>评论了你的作品</span></p>
            <p class="reviewsCon">讲真当时的四大天王哪个不是颜值和实力并存的,演技唱歌跳舞哪位不是样样精通?</p>
            <div class="relike">
              <span class="reviewsTime">2018.10.12</span>
              <div class="reviewslike"><img src="../../assets/img/self/reviewslike.png">1258823</div>
            </div>
          </div>
        </li>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="reviewsPhoto">
          <div class="reviewsDiv">
            <p><span class="reviewsName">朵喵喵</span><span>评论了你的作品</span></p>
            <p class="reviewsCon">讲真当时的四大天王哪个不是颜值和实力并存的,演技唱歌跳舞哪位不是样样精通?</p>
            <div class="relike">
              <span class="reviewsTime">2018.10.12</span>
              <div class="reviewslike"><img src="../../assets/img/self/reviewslike.png">1258823</div>
            </div>
          </div>
        </li>
        <li>
          <img src="../../assets/img/choice/11.jpg" class="reviewsPhoto">
          <div class="reviewsDiv">
            <p><span class="reviewsName">朵喵喵</span><span>评论了你的作品</span></p>
            <p class="reviewsCon">讲真当时的四大天王哪个不是颜值和实力并存的,演技唱歌跳舞哪位不是样样精通?</p>
            <div class="relike">
              <span class="reviewsTime">2018.10.12</span>
              <div class="reviewslike"><img src="../../assets/img/self/reviewslike.png">1258823</div>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
    export default {
      name: "reviews",
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
  ul li{height: 1.6rem;margin:.5rem 0;overflow: hidden;}
 .reviewsPhoto{
   float: left;
   width: .8rem;
   height: .8rem;
   border-radius: 50%;
 }
  .reviewsDiv{
    float: left;
    margin-left: .2rem;
    color: #fff;
    font-size: .3rem;
    width: 5.9rem;
  }
  .reviewsName{
    color: #FECF74;
    margin-right: .2rem;
  }
  .reviewsCon{
    font-size: .26rem;
    margin-top: .23rem;
    line-height: .3rem;
  }
  .relike{
    margin-top: .15rem;
  }
  .reviewsTime{
    color: #5C5170;
    font-size: .26rem;
    margin-top: .29rem;
  }
  .reviewslike{
    float: right;
    color: #5C5170;
    font-size: .2rem;
    line-height: .38rem;
  }
  .reviewslike img{
    float: left;
    width: .38rem;
    height: .34rem;
  }

</style>
