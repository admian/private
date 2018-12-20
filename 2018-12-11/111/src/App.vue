<template>
  <div id="app" :class="showHeader? 'hasHead' : ''">
    <!--<x-header v-if="showHeader"></x-header>-->
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

  export default {
    name: 'App',
    components: {XFooter, XHeader, XModal, XShaer},
    beforeCreate() {
      this.$setAutoSize();
    },
    computed: {
      ...mapState([
        'showHeader',
        'showTabbar',
        'showModal',
        'is_login',
        'showShare'
      ]),
    },
    created() {
      /*if(!this.is_login){
        this.$router.push({
          path:'/login'
        })
        return
      }
      let _this = this;
      this.$post('/login',{'phone':'13469868097','password':'123456'}).then(res => {
        console.log(res);

      })*/
    }
  }
</script>

<style>

</style>
