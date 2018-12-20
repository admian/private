<template>
  <div id="app" :class="showHeader? 'hasHead' : ''">
<!--
    <x-header v-if="showHeader"></x-header>
-->
    <router-view :class="showTabbar ? 'page' : ''"/>
    <x-footer v-if="showTabbar"></x-footer>
    <x-modal v-show="showModal"></x-modal>
    <x-shaer></x-shaer>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import XHeader from "./components/x-header";
  import XFooter from "./components/x-footer";
  import XModal from "./components/x-modal";
  import XShaer from "./components/x-share";
  import { cookie } from 'vux'

  export default {
    name: 'App',
    components: {XFooter, XHeader, XModal, XShaer},
    beforeCreate(){
      this.$setAutoSize();
    },
    data(){
      return{
        setTime:'',
      }
    },
    computed: {
      ...mapState([
        'showHeader',
        'showTabbar',
        'showModal',
        'is_login',
        'showShare',
        'tips'
      ]),
    },
    created() {
      //console.log(this.is_login);
      let _this=this;
      if(this.is_login){
        clearInterval(this.setTime);
        this.setTime=setInterval(() => {
         _this.$post('api/message/queryAllMessageByMessageType').then(res=>{
           let temp=res.list;
           //console.log(temp);
           let tempList=[];
           for(let i=0;i<temp.length;i++){
             if(temp[i].messageStatusId==0){
               tempList[tempList.length]=temp[i];
             }
           }
           _this.$store.state.tips=tempList;
         })
        }, 10000);
      }
    }
  }
</script>

<style>
  #app .vux-header .vux-header-left .vux-header-back{
    font-size: .34rem;
  }

</style>
