<template>
    <div id='updateTel'>
        {{SETSTATE({type:'headerTxt',val:'绑定手机号'})}}
        <!--<div class="containter">
          <div class="log_phone">
            <input type="text" placeholder="请输入更改的手机号码" v-model="phone"/>
          </div>
          <div class="codes">
            &lt;!&ndash;<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码"/>&ndash;&gt;
            &lt;!&ndash;<div class="code" @click="getCode">{{codeTxt}}</div>&ndash;&gt;
          </div>
          <div>确定</div>
        </div>-->
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "updateTel",
        data() {
            return {
              phone:'',
              code:'',
              codeTxt:'获取验证码'
            }
        },
        components:{Input},
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
<style>
</style>
<style scoped>
  .containter{
    padding: 0 .3rem;
    font-size: .34rem;
  }
  .log_phone{
    border-bottom: 0.01rem solid rgba(255,255,255,0.2);
    height: 1.2rem;
  }


</style>
