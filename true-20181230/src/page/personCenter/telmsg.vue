<template>
    <div id='telmsg'>
        {{SETSTATE({type:'headerTxt',val:'绑定手机'})}}
        <div class="containter">
          <ul>
            <li>
              <p class="fl">已绑定手机</p>
              <p class="fr">137****7553</p>
            </li>
            <li>
              <p class="fl">修改手机号</p>
             <router-link to="/safecode"><p class="fr"><img src="../../assets/img/self/back.png" class="backicon"></p></router-link>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    export default {
        name: "telmsg",//绑定手机
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
  .containter{
    padding: 0 .3rem;
  }
  ul li{
    color: #fff;
    font-size: .34rem;
    margin-bottom: .87rem;
    overflow: hidden;
  }
  li p{
    display: inline-block;
  }
  .backicon{
    width: .14rem;
    height: .24rem;
    margin-left: .15rem;
  }
  .fr{
    color: #8C8896;
  }
</style>
