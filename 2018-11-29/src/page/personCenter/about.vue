<template>
    <div id='about'>
        {{SETSTATE({type:'headerTxt',val:'关于爱演'})}}
      <div>
        <p align="center"><img src="../../assets/img/self/logo.png" style="width: 1.2rem;height: 1.32rem"></p>
        <p align="center">爱演1.0.0</p>
        <p align="center" class="cp">有没有戏你说了算</p>
        <div class="connect">深圳市华宇双子文化传播有限公司以影视制作为核心业务,立足于"栏目运作、影视运作、"多位一体的新商业文化体系,为众多品牌机构提供优化整合的媒体资源。综合性的媒体传播策略方案,最通畅高效的品牌发布渠道,并提供综合性的营销推广策划服务,战略性高度缔结合作,实现共嬴。</div>
        <div class="focus">
           <div class="fl">
             <p align="center"><img src="../../assets/img/self/qq.png" style="width: .94rem;height: .94rem"></p>
             <p align="center" style="font-size: .28rem;">关注微信公众号</p>
           </div>
          <div class="fr">
            <p align="center"><img src="../../assets/img/self/wb.png" style="width: .94rem;height: .94rem"></p>
            <p align="center" style="font-size: .28rem;">关注新浪微博</p>
          </div>
        </div>
        <div class="cc">
          <p align="center" class="cp">用户协议>></p>
        </div>

      </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "about",
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
  .cp{margin-top: .2rem;font-size: .28rem;}
  .cc{color:#FECF74;padding-top:.2rem; }
  .connect{
    padding: 0 .3rem;
    font-size: .28rem;
    line-height: .35rem;
    margin-top: 1.2rem;
  }
  .focus{margin-top: 3.44rem;padding: 0 .5rem;overflow: hidden;}
  .fl{
    border-right: .01rem solid #33254C;
  }
  .fl,.fr{width: 50%;height: 1.21rem}
</style>
