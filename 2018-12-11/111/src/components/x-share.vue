<template>
  <div v-transfer-dom id="modal">
    <popup :value="showShare" height="50%" @on-hide="SETSTATE({type:'showShare',val:false})">
      <h3>分享至</h3>
      <ul class="list-share">
        <li v-for="i,index in listShare" class="item fl">
          <img :src="i.ico">
          <span>{{i.name}}</span>
        </li>
      </ul>
      <div class="btn" @click="SETSTATE({type:'showShare',val:false})">取消</div>
    </popup>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {TransferDom, Popup} from 'vux'

  export default {
    name: "x-share",
    directives: {
      TransferDom
    },
    components: {
      Popup
    },
    data() {
      return {
        listShare: [
          {name: 'QQ好友', ico: require('../assets/img/share_qq.png'), id: 1},
          {name: 'QQ空间', ico: require('../assets/img/share_qz.png'), id: 2},
          {name: '微信好友', ico: require('../assets/img/share_wechar.png'), id: 3},
          {name: '朋友圈', ico: require('../assets/img/share_wePy.png'), id: 4},
          {name: '微博', ico: require('../assets/img/share_wb.png'), id: 5},
/*
          {name: '复制链接', ico: require('../assets/img/share_copy.png'), id: 6},
*/
          {name: '举报', ico: require('../assets/img/share_tips.png'), id: 7},
        ]
      }
    },
    computed: {
      ...mapState([
        'showShare'
      ]),
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
    },
    created() {

    }
  }
</script>

<style scoped>
  .vux-popup-dialog {
    background-color: #33254C;
  }

  #modal {
    padding-bottom: .08rem;
  }

  h3 {
    margin-top: .37rem;
    margin-bottom: .66rem;
    text-align: center;
    font-size: .34rem;
  }

  .item {
    margin-bottom: .95rem;
    width: 25%;
    color: #BFBDC4;
    font-size: .28rem;
    text-align: center;
  }

  .item img {
    margin: 0 auto .3rem;
    width: auto;
    height: .62rem;
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    background: rgba(22, 16, 46, 1);
    text-align: center;
    font-size: .34rem;
  }
</style>
