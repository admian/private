<template>
  <div id="app">

    <!--<x-header></x-header>-->

    <router-view/>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import XHeader from "./components/x-header";



export default {
  name: 'App',
  components: {XHeader},
  beforeCreate(){
    this.$setAutoSize();
  },
  computed: {
    ...mapState([
      'showTabbar'
    ]),
  },
  created(){

    console.log(this.showTabbar)
  }
}
</script>

<style>

</style>
