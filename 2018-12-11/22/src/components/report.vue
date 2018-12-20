<template>
  <!--举报-->
  <div id='report'>
    <x-header :left-options="{backText: ''}" title="举报"></x-header>
    <div class="cont">
      <div class="input-item">
        <p>举报链接</p>
        <x-input v-model="url" disabled placeholder="https://www.taobao.com/" type="text"></x-input>
      </div>
      <div class="input-item">
        <p>举报理由</p>
        <Select v-model="selectorVal">
          <Option v-for="item,index in selector" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </div>
      <div class="input-item">
        <p>举报描述（选填）</p>
        <x-input v-model="url" placeholder="简单描述多我们评审会有帮助~" type="text"></x-input>
      </div>
      <div class="clearfix pic-list">
        <div class="addPic pic-item fl">
          <img src="../assets/img/addPic.png">
          <span>上传图片</span>
        </div>
        <div class="pic-item fl">
          <img>
        </div>
        <div class="pic-item fl">
          <img>
        </div>
        <div class="pic-item fl">
          <img>
        </div>
      </div>
      <p class="tips">收到举报后,我们会在12小时内处理,处理成功后,我们会第一时间告知你处理结果,感谢你的支持!</p>
    </div>
    <div class="btn">提交</div>
  </div>
</template>

<script>
  import {XHeader, XInput, Selector} from 'vux'

  export default {
    name: "report",
    components: {
      XHeader,
      XInput,
      Selector
    },

    data() {
      return {
        url: '',
        selectorVal: 1,
        selector: [1, 2, 3]
      }
    }
  }
</script>
<style>
  #report .weui-cell {
    padding: 0;
  }

  #report .weui-cell:before {
    border-top: none;
  }

  #report .ivu-select-selection {
    background-color: transparent;
    border: none;
  }

  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    padding: 0;
    height: auto;
    line-height: 1;
  }

  #report .ivu-select-visible .ivu-select-selection {
    box-shadow: none;
  }

  .ivu-select-single .ivu-select-selection {
    height: auto;
  }
</style>
<style scoped>
  .cont {
    padding: 0 .3rem;
  }

  .input-item {
    padding-top: .36rem;
    border-bottom: 1px solid #474056;
  }

  .input-item p {
    margin-bottom: .3rem;
    font-size: .26rem;
  }

  .input-item input, .ivu-select {
    line-height: 1;
    padding-bottom: .13rem;
    font-size: .32rem;
    color: #7B7982;
  }

  .ivu-select {
    padding-bottom: .05rem;
  }

  .pic-list {
    padding-top: .4rem;
    padding-bottom: .5rem;
  }
  .pic-list .pic-item{
    width: 1.52rem;
    height: 1.52rem;
    margin-left: .2rem;
  }
  .pic-list .pic-item img{
    width: 100%;
    height: 100%;
  }
  .pic-list .addPic{
    margin:0;
  }
  .addPic span{
    position: relative;
    top:-.5rem;
    left: .27rem;
    font-size: .26rem;
    color:#3C3759;
  }
  .tips{
    font-size: .24rem;
    line-height: .34rem;
    color:#7B7982;
  }
  .btn{
    position: fixed;
    bottom:0;
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    background-color: #6D46C3;
    font-size: .32rem;
    text-align: center;
    font-weight: bold;
  }
</style>
