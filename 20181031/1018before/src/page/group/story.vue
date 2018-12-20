<template>
<!--故事-->
  <div class="container">
    <div class="connect">
      <ul  class="stack">
        <li class="stack-item" v-for="i in 7"><img src="../../assets/img/choice/q.png"> {{i}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "story"
    }
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }
  .connect{
    align-self: stretch;
    overflow: hidden;
    align-items: center;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 0 .3rem;
    margin-top: .6rem;
  }
  .stack{
    margin:0 auto;
    position: relative;
    width: 6rem;
    height: 9rem;
    list-style: none;
    pointer-events: none;
    z-index: 1000;
    perspective: 1000px;
    perspective-origin: 50% -50%;
  }
  .stack-item{
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
    position: absolute;
    /*opacity: 0;*/
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
  }
  .stack-item img {
    width: 100%;
    display: block;
    pointer-events: none;
  }
</style>
