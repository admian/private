<template>
  <div id="app" :class="showHeader? 'hasHead' : ''">
    <x-header v-if="showHeader"></x-header>
    <router-view :class="showTabbar ? 'page' : ''"/>
    <x-footer v-if="showTabbar"></x-footer>
    <x-modal v-show="showModal"></x-modal>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import XHeader from "./components/x-header";
  import XFooter from "./components/x-footer";
  import XModal from "./components/x-modal";
export default {
  name: 'App',
  components: {XFooter, XHeader, XModal},
  beforeCreate(){
    this.$setAutoSize();
  },
  computed: {
    ...mapState([
      'showHeader',
      'showTabbar',
      'showModal'
    ]),
  },
  created(){
    this.$post('/login',{'username':'yqh','password':'123'}).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
