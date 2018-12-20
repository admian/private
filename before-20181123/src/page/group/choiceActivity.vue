<template>
    <div id='choiceActivity'>
        {{SETSTATE({type:'headerTxt',val:'选择活动'})}}
    <div class="container">
      <router-link to="">
        <p class="no-act">暂不参与活动</p>
      </router-link>

      <ul>
        <li>
          <img src="" class="act-img fl">
          <div class="act-info fl">
            <p class="act-name">桃花源里</p>
            <p class="act-des">演艺一个坚毅勇敢的宫女小馨</p>
            <p class="act-time">活动截止：2018-10-32</p>
          </div>
        </li>
        <li>
          <img src="" class="act-img fl">
          <div class="act-info fl">
            <p class="act-name">桃花源里</p>
            <p class="act-des">演艺一个坚毅勇敢的宫女小馨</p>
            <p class="act-time">活动截止：2018-10-32</p>
          </div>
        </li>
        <li>
          <img src="" class="act-img fl">
          <div class="act-info fl">
            <p class="act-name">桃花源里</p>
            <p class="act-des">演艺一个坚毅勇敢的宫女小馨</p>
            <p class="act-time">活动截止：2018-10-32</p>
          </div>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "choiceActivity",
        data() {
            return {}
        },
        computed: {
            ...mapState([
                'headerTxt'
            ])
        },
        methods: {
            ...mapMutations(
                ['SETSTATE']
            )
        }
    }
</script>

<style scoped>
  .container{
    padding-left: .3rem;

  }
  .no-act{
    font-size: .3rem;
    margin-bottom: .4rem;
    color: #fff;
  }
  .container ul li{
    padding: .2rem 0;
    overflow: hidden;
    color: #fff;
  }
  .act-img{width: .99rem; height: 1.33rem;}
  .act-info{
    margin-left: .18rem;
    margin-top: .3rem;
  }
  .act-name{ font-size: .3rem;}
  .act-des,.act-time{font-size: .22rem;margin-top: .16rem;}
</style>
