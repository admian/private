<template>
  <!--素材-->
  <div id="matter">
    <div class="matter-item" v-for=" i in 2 ">
      <div class="item-top">
        <div class="title clearfix">
          <h3 class="fl">古代·宫廷</h3>
          <p class="fl">全部5个模板 >></p>
        </div>
        <p class="cont">皇上嫔妃众多，你会是其中一个吗</p>
        <div class="list-warp">
          <ul class="list-pic clearfix">
            <li class="pic-item fl" v-for="i in 4">
              <div class="icons clearfix">
                <i class="fl ico-hot-txt"></i>
                <div class="fr clearfix">
                  <i class="ico-hot fl"></i>
                  <span class="fl">125</span>
                </div>
              </div>
              <img src="">
              <div class="temp">
                使用模板
              </div>
              <p>公主的美资</p>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "matter",
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
#matter{
  padding-top: 1.5rem;
  min-height: 100vh;
  background-color: #30214a;
}
  .matter-item{
    padding: .28rem 0 1rem .3rem;
    color:#FECF74;
  }
  .matter-item .title {
    margin-bottom: .15rem;
    font-size: .22rem;
  }
.matter-item .title p{
  margin-top: .1rem;
  margin-left: .38rem;
}
  .matter-item h3{
    font-size: .34rem;
  }
  .matter-item .cont{
    font-size: .2rem;
  }
  .list-warp {
    margin-top: .27rem;
    width: 100%;
    overflow-y: auto;
  }
.list-warp::-webkit-scrollbar {
  display: none;
}
  .list-pic{
    width: max-content;
  }
  .pic-item{
    position: relative;
  }
  .pic-item .icons{
    padding-left: .08rem;
    padding-right: .14rem;
    width: 100%;
    position: absolute;
    top: .1rem;
  }
  .pic-item{
    margin-right: .14rem;
    width: 2.66rem;
    text-align: center;

  }
  .pic-item img{
    height: 2.26rem;
    width: 100%;
  }
  .pic-item .ico-hot-txt{
    width: .57rem;
    height: .28rem;
    background-color: red;
  }
  .pic-item .ico-hot{
    display: inline-block;
    width: .15rem;
    height: .20rem;
    background-color: red;
  }
  .pic-item .temp{
    position: relative;
    margin: -.3rem auto 0;
    width: 1.7rem;
    height: .6rem;
    line-height: .6rem;
    background-color: #2f2f2f;
    border-radius: 20px;
  }
</style>
