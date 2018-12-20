<template>
    <div id='editData'>
       {{SETSTATE({type:'headerTxt',val:'编辑资料'})}}
      <!--<span class="fr">保存</span>-->
       <div class="userPhoto">
         <p align="center"><img :src="userInfo.avatar" width="1.26rem" height="1.26rem"></p>
         <p align="center">更换头像</p>
         <input type="file" class="userFile" accept="image/*" @change="handleFile"/>
       </div>
      <div class="container">
          <div class="message">
            <ul>
              <li><span>昵称</span><input type="text" placeholder="" v-model="name" /></li>
              <li><span>性别</span>
                <div class="sex fl">
                   <span @click="addSex(1)">
                     <img :src="is_boy? require('../../assets/img/self/boy_sel.png') : require('../../assets/img/self/boy.png')"
                              class="sex_ico"/>
                   </span>
                    <span @click="addSex(2)">
                      <img :src="is_girl? require('../../assets/img/self/girl_sel.png') : require('../../assets/img/self/girl.png')"
                               class="sex_ico"/>
                    </span>
                </div>
              </li>
              <li><span>生日</span><p class="bird">{{value}}</p><p class="fr" @click="birdState"><img src="../../assets/img/self/back.png" class="backicon"></p></li>
              <li><span>身高</span><input type="text" placeholder="" v-model="height"/></li>
            </ul>
          </div>
          <div class="artOrientation">
            <span class="title">艺术取向</span>
            <ul>
              <li><span>最喜欢的角色：</span><input type="text" placeholder="例如 夜华 白浅 白凤九" v-model="art1" /></li>
              <li><span>最喜欢的明星：</span><input type="text" placeholder="例如 夜华 白浅 白凤九" v-model="art2" /></li>
              <li><span>最喜欢的电影：</span><input type="text" placeholder="例如 夜华 白浅 白凤九" v-model="art3" /></li>
              <li><span>最理想的合作伙伴：</span><input type="text" placeholder="例如 夜华 白浅 白凤九" v-model="art4" /></li>
            </ul>
          </div>
          <div class="labelArts">
            <div>
            <span class="title">演艺标签</span><span class="add fr" @click="addLabelarts">添加</span>
            </div>
            <ul class="clearfix tag">
              <li class="fl tag_item" v-for="i in checkValues">{{i}}</li>
            </ul>
          </div>
          <div class="signature">
            <span class="title">个性签名</span>
            <textarea maxlength="40" class="textSign" placeholder="你还可以输入40个字" v-model="signatureText"></textarea>
          </div>
      </div>
      <popup v-model="birdShow">
        <datetime-view v-model="value" ref="datetime" :min-year=1790 :max-year=2018></datetime-view>
      </popup>

      <popup v-model="popupState" height="70%" :hide-on-blur="false"><!--@click.native="popupState = false"-->
        <div class="labelPopup">
          <p align="center">请选择你的演艺标签</p>
          <p align="center">你还可以选择{{checkValue}}个</p>
          <img src="../../assets/img/self/close.png" @click="popupClose">
          <div class="labelItem">
            <span class="title">职业</span>
            <ul>
              <li class="fl" v-for="(item,index) in professionalList" :key="index"  ><!--@click="toggle($event,index)":class="{'label-active': item.clickIndex}"-->
                <input type="checkbox" :value="item.name" class="checkBox"  v-model="checkValues" @click="toggle" :disabled="disabled"/>
                <div class="label" >{{item.name}}</div>
              </li>
            </ul>
          </div>
          <div class="labelItem">
            <span class="title">性格</span>
            <ul>
              <li class="fl" v-for="(item,index) in characterList">
                <input type="checkbox" :value="item.name" class="checkBox"  v-model="checkValues" @click="toggle" :disabled="disabled"/>
                <div class="label" >{{item.name}}</div>
              </li>
            </ul>
          </div>
          <div class="labelItem">
            <span class="title">题材</span>
            <ul>
              <li class="fl" v-for="(item,index) in matterList">
                <input type="checkbox" :value="item.name" class="checkBox"  v-model="checkValues" @click="toggle" :disabled="disabled"/>
                <div class="label" >{{item.name}}</div>
              </li>
            </ul>
          </div>
        </div>
      </popup>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import { Popup,DatetimeView } from 'vux'
    export default {
        name: "editData",
        components: {
          Popup,DatetimeView
        },
        data() {
            return {
              is_boy:false,
              is_girl:false,
              popupState:false,
              birdShow:false,
              disabled:false,

              name:'卤蛋先生',
              height:'1.75',
              art1:'',//最喜欢的角色
              art2:'',//最喜欢的明星
              art3:'',//最喜欢的电影
              art4:'',//最理想的合作伙伴
              signatureText:'',//个性签名
              labelNumber:8,
              clickIndex:-1,
              value:'1989-11-20',
              checkValues:[],
              //测试数据
              checkIds:[],
              reValue:'',
              professionalList:[
                {name:'积极向上1'},{name:'积极向上2'},{name:'积极向上3'},{name:'积极向上4'},{name:'积极向上5'},
                {name:'积极向上6'},{name:'积极向上7'},{name:'积极向上8'},{name:'积极向上9'},{name:'积极向上10'}
              ],
              characterList:[
                {name:'小鲜肉1'},{name:'小鲜肉2'},{name:'小鲜肉3'},{name:'小鲜肉4'},
                {name:'积极向上'},{name:'积极向上'},{name:'积极向上'},{name:'积极向上'}
              ],
              matterList:[
                {name:'古代1'},{name:'古代2'},{name:'古代3'},{name:'古代4'},
                {name:'积极向上'},{name:'积极向上'},{name:'积极向上'},{name:'积极向上'}
              ],
              userInfo: {
                avatar: require('../../assets/img/choice/11.jpg')
              }

            }
        },
        computed: {
            ...mapState([
                'headerTxt'
            ]),
          checkValue(){
            if(this.checkValues.length>=8){
               this.$vux.toast.show({
                text: '最多8个标签',
                type: 'text'
              })
              this.disabled=true
              return 0
            }else if(this.checkValues.length >0 && this.checkValues.length <=8){
              return 8 - this.checkValues.length

            }else{
              return this.labelNumber

            }
          },
        },
        methods: {
            ...mapMutations(
                ['SETSTATE']
            ),
            //将头像显示
            handleFile(e){
              let $target = e.target || e.srcElement;
              let file = $target.files[0];
              var reader = new FileReader();
              reader.onload = (data) => {
                  const res = data.target || data.srcElement;
                  this.userInfo.avatar = res.result;
              }
              reader.readAsDataURL(file)
              console.log(file);
              console.log(file.name);
            },
            //选择性别
            addSex(i){
                console.log(i)
              if(i==1){
                this.is_boy = !this.is_boy
                this.is_girl=false
              }
              if(i==2){
                this.is_girl = !this.is_girl
                this.is_boy=false
              }
            },
           //
            addLabelarts(){
              this.popupState = true;
            },
            //
            birdState(){
              this.birdShow =true
            },
          //1.第一种方式
           /* toggle(e,index){
             // console.log(index);
              //this.clickIndex=i
              //获取选中的个数
              let labelNum=document.querySelectorAll('.label-active').length;

              if(labelNum<8){
                if (e.target.className.indexOf("label-active") == -1) {
                  e.target.className = "label-active fl"; //切换按钮样式
                } else {
                  e.target.className = "label fl";//切换按钮样式
                }

              }else{
                this.labelNumber==0;

              }
              this.labelNumber=8 - labelNum;
              console.log(labelNum)


            }*/
           //2.加上复选框
            toggle(){

            },
            popupClose(){
              this.popupState = false
            }
        }
    }
</script>
<style>
  #editData .vux-popup-dialog{
    background:#33254C;
  }

</style>
<style scoped>
  .container{
    padding: 0 .3rem;
  }
  .userPhoto{
    padding-bottom: .5rem;
    position: relative;
  }
  .userPhoto p img{
    width: 1.26rem;
    height: 1.26rem;
    border-radius: 50%;
    margin-bottom: .15rem;
  }
  .userFile{
    position: absolute;
    width: .3rem;
    left: 3rem;
    bottom: .5rem;
    opacity: 0;
  }
  .message ul li{
    list-style: none;
    overflow: hidden;
    border-bottom: .01rem solid rgba(255,255,255,.2);
    height: .55rem;
    margin-top: .5rem;
  }
  .message span{
    float: left;
  }
  .message input{
    width: 60%;
    margin-left: 1.28rem;
    font-size: .28rem;
    border: none;
    background-color: transparent;
    color: #fff;
    float: left;
  }
  .message .sex .sex_ico{
    width: .88rem;
    height: .44rem;
  }
  .sex{
    margin-left: 1.28rem;
  }
  .sex span{
    margin-right: .24rem;
  }
  .message .bird{
    margin-left: 1.28rem;
    display: inline-block;
  }
  .backicon{
    width: .14rem;
    height: .24rem;
    /*margin-top: .13rem;*/
  }
  .artOrientation{
    margin-top: .5rem;
  }
  .title{
    font-size: .32rem;
    color: #fff;

  }
  .artOrientation ul{
    margin-top: .36rem;
  }
  .artOrientation ul li{
    height: .61rem;
    background-color: #30214A;
    margin-bottom: .15rem;
  }
  .artOrientation ul li span{
    color: #FECF74;
    font-size: .26rem;
    line-height: .61rem;
    margin-left: .12rem;
    margin-right: .25rem;
  }
  .artOrientation ul li input{
    width: 60%;
    font-size: .26rem;
    border: none;
    background-color: transparent;
    color: #fecf74;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #544B66;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #544B66;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #544B66;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #544B66;
  }
  .labelArts{
    margin-top: .5rem;
  }
  .add{color: #fecf74;font-size: .28rem;}
  .tag {
    padding: .36rem 0 ;
  }
  .tag_item {
    margin-right: .12rem;
    margin-bottom: .12rem;
    width: 1.54rem;
    text-align: center;
    color: #FECF74;
    height:.54rem;
    line-height: .54rem;
    font-size: .25rem;
    background-color: rgba(30,19,63,.5);
    -webkit-border-radius: .05rem;
    -moz-border-radius: .05rem;
    border-radius: .05rem;
  }
  .signature{
    margin-top: .5rem;
    margin-bottom: .3rem;
  }
  .textSign{
    margin-top: .36rem;
    width: 6.9rem;
    height: 2rem;
    background-color: rgba(48, 33, 74, 1);
    border: none;
    padding:.18rem .14rem;
    color: #fff;
    line-height: .3rem;
  }
  .labelPopup{
    position: relative;
    padding: .26rem 0 .26rem .3rem ;
  }
  .labelPopup img{width: .2rem;height: .2rem;position: absolute;top:.26rem;right: .3rem;}
  .labelPopup p:first-child{font-size: .34rem;color: #fff;}
  .labelPopup p:nth-child(2){font-size: .24rem;color: #5c5170;margin-top: .16rem;}
  .labelItem{margin-top: .2rem}
  .labelItem ul{margin-top: .25rem;overflow: hidden;margin-bottom: .15rem}
  .labelItem ul li{
    width: 1.6rem;
    height: .6rem;
    border-radius: .05rem;
    font-size: .28rem;
    line-height: .6rem;
    margin-right: .16rem;
    margin-bottom: .15rem;
    text-align: center;
    position: relative;
  }
  .label{
    border: .02rem solid #BFBDC4;
    color: #BFBDC4;
    border-radius: .05rem;
  }
  .checkBox{
    position: absolute;
    opacity: 0;
    width: 1.6rem;
    height: .6rem;

  }
  /*input被选中时，label的样式*/
  .checkBox:checked + .label{
    border: .02rem solid #FECF74;
    color: #FECF74;
  }
  .isdisabled{

  }
</style>
