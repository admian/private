<template>
  <div id="app" :class="showHeader? 'hasHead' : ''">
    <router-view :class="showTabbar ? 'page' : ''"/>
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
    beforeCreate() {
      this.$setAutoSize();
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

    }
  }
</script>

<style>

</style>
