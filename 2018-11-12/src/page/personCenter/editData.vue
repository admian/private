<template>
    <div id='editData'>
       <x-header :left-options="{backText: ''}">编辑资料<span slot="right" @click="saveInfo" class="spname">保存</span></x-header>
       <div class="userPhoto">
         <p align="center"><img :src="userInfo.avatar" width="1.26rem" height="1.26rem"></p>
         <p align="center">更换头像</p>
         <input type="file" class="userFile" accept="image/*" @change="handleFile"/>
       </div>
      <div class="container">
          <div class="message">
            <ul>
              <li><span>昵称</span><input type="text" placeholder="" v-model="userList.nickName"/></li>
              <li><span>性别</span>
                <div class="sex fl">
                   <span @click="addSex(1)">
                     <img :src="is_boy ? require('../../assets/img/self/boy_sel.png') : require('../../assets/img/self/boy.png')"
                              class="sex_ico"/>
                   </span>
                    <span @click="addSex(2)">
                      <img :src="is_girl ? require('../../assets/img/self/girl_sel.png') : require('../../assets/img/self/girl.png')"
                               class="sex_ico"/>
                    </span>
                </div>
              </li>
              <li><span>生日</span><p class="bird">{{userList.birthday}}</p><p class="fr" @click="birdState"><img src="../../assets/img/self/back.png" class="backicon"></p></li>
              <li><span>身高</span><input type="text" placeholder="" v-model="userList.height"/></li>
            </ul>
          </div>
          <div class="artOrientation">
            <span class="title">艺术取向</span>
            <ul>
              <li v-for="i in userList.userArtsList"><span>{{i.name}}：</span><input type="text" placeholder="例如 夜华 白浅 白凤九" v-model="i.context"/></li>
            </ul>
          </div>
          <div class="labelArts">
            <div>
            <span class="title">演艺标签</span><span class="add fr" @click="addLabelarts">添加</span>
            </div>
            <ul class="clearfix tag">
              <li class="fl tag_item" v-for="k in checkValues">{{k}}</li>
            </ul>
          </div>
          <div class="signature">
            <span class="title">个性签名</span>
            <textarea maxlength="40" class="textSign" placeholder="你还可以输入40个字" v-model="userList.remark"></textarea>
          </div>
      </div>
      <popup v-model="birdShow">
        <datetime-view v-model="userList.birthday" ref="datetime" :min-year=1790 :max-year=2018></datetime-view>
      </popup>

      <popup v-model="popupState" height="70%" :hide-on-blur="false">
        <div class="labelPopup">
          <p align="center">请选择你的演艺标签</p>
          <p align="center">你还可以选择{{checkValue}}个</p>
          <img src="../../assets/img/self/close.png" @click="popupClose">
          <div class="labelItem">
            <span class="title">职业</span>
            <ul>
              <li class="fl" v-for="item in professionalList">
                <input type="checkbox" :value="item.labelsName" class="checkBox"  v-model="checkValues" :disabled="disabled"/>
                <div class="label" >{{item.labelsName}}</div>
              </li>
            </ul>
          </div>
          <div class="labelItem">
            <span class="title">性格</span>
            <ul>
              <li class="fl" v-for="item in characterList">
                <input type="checkbox" :value="item.labelsName" class="checkBox"  v-model="checkValues" :disabled="disabled"/>
                <div class="label" >{{item.labelsName}}</div>
              </li>
            </ul>
          </div>
          <div class="labelItem">
            <span class="title">题材</span>
            <ul>
              <li class="fl" v-for="item in matterList">
                <input type="checkbox" :value="item.labelsName" class="checkBox"  v-model="checkValues" :disabled="disabled"/>
                <div class="label" >{{item.labelsName}}</div>
              </li>
            </ul>
          </div>
        </div>
      </popup>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import { Popup,DatetimeView,XHeader } from 'vux'
    import {Message} from 'iview';
    export default {
        name: "editData",
        components: {
          Popup,DatetimeView,XHeader,Message
        },
        data() {
            return {
              is_boy:false,
              is_girl:false,
              popupState:false,
              birdShow:false,
              disabled:false,
              userList:[],
              sex:'',
              labelNumber:8,
              professionalList:[],//职业标签
              characterList:[],//性格标签
              matterList:[],//题材标签
              checkValues:[],//选择的演艺标签
              collectionList:[],//集合存放
              labelList:[],//提交标签存放
              //测试数据
              checkIds:[],
              reValue:'',

              userInfo: {
                avatar: require('../../assets/img/choice/11.jpg')
              }

            }
        },
        computed: {
            ...mapState([
                'headerTxt',
                'editPut'
            ]),
          checkValue(){
            if(this.checkValues.length>=8){
              //showTip('最多8个标签');、
              this.$Message.warning({
                content: '最多8个标签!'
              });
              this.disabled=true;
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
              if(i==1){
                this.is_boy = !this.is_boy
                this.is_girl=false
                this.sex=0
              }
              if(i==2){
                this.is_girl = !this.is_girl
                this.is_boy=false
                this.sex=1
              }
              console.log(this.userList.sex);
            },
            //展开标签列表
            addLabelarts(){this.popupState = true;},
            //关闭标签列表
            popupClose(){
              let _this=this;
              this.popupState = false;
              //拿到选中的标签id
              console.log(this.actlist);
              //将重新拿到的数组合并
              let professionalList = this.professionalList;
              let characterList = this.characterList;
              let matterList = this.matterList;
              for(let j=0;j<professionalList.length;j++){
                _this.collectionList.push(professionalList[j]);
              }
              for(let o=0;o<characterList.length;o++){
                _this.collectionList.push(characterList[o]);
              }
              for(let h=0;h<matterList.length;h++){
                _this.collectionList.push(matterList[h]);
              }
              //通过比较checkValues[]和collectionList[]集合相同数据找出所需id
              for(let i=0;i<this.checkValues.length;i++){
                //获取id
                this.collectionList.forEach(function(e){
                  if(_this.checkValues[i]==e.labelsName){
                    console.log(e.id);
                    let obj={
                      labelsId:e.id
                    }
                    _this.labelList.push(obj);
                  }
                })
              }
              console.log(this.labelList);
            },
            //展开生日时间列表
            birdState(){this.birdShow =true},
            //保存修改
            saveInfo(){
              let _this=this;
              //更新后的艺术列表
              let ArtList=[];
              this.userList.userArtsList.forEach(function(i){
                let obj = {
                  artType:i.artType,
                  userId:i.userId,
                  context:i.context,
                  id:i.id
                }
                ArtList.push(obj)
              })
              //console.log(ArtList);
              //修改api/user/updateUserInfo
               this.$post('api/user/updateUserInfo',{
                nickName:this.userList.nickName,
                headUrl:this.userList.headUrl,
                sex:this.sex,
                birthday:this.userList.birthday,
                height:this.userList.height,
                remark:this.userList.remark,
                userArtsList:ArtList,
                userLabelsList:this.labelList
                }).then(res=>{
                  if(res.code==200){
                    _this.$Message.success('保存成功');
                  }else{
                    _this.$Message.info('保存失败');
                  }

                })
            }
        },
        created(){
          //查询个人信息api/user/getUserInfo
          let _this=this;
          this.$post('api/user/getUserInfo').then(res=>{
            //console.log(res);
            this.userList=res;
            let userLabel=res.userLabelsList;
            userLabel.forEach(function(i){
              _this.checkValues.push(i.labelsName)
            })
            //console.log(_this.checkValues);
            //性别
            this.sex=this.userList.sex;
            if(this.sex==0){
              this.is_boy=true
            }
            if(this.sex==1){
              this.is_girl=true
            }
          });
          //查询所有标签api/offline/labels/queryAllLabelsByPageByBeanByUser
          this.$post('api/offline/labels/queryAllLabelsByPageByBeanByUser').then(res=>{
            //console.log(res);
            this.professionalList=res.profession;
            this.characterList=res.character;
            this.matterList=res.theme;

          });
          //saveInfo()
        }
    }
</script>
<style>
  #editData .vux-popup-dialog{
    background:#33254C;
  }

</style>
<style scoped>
  #editData{
    padding-top: .2rem;
  }
  .spname{
    font-size: .34rem;
    color: #fecf74;
  }
  .container{
    padding: 0 .3rem;
  }
  .userPhoto{
    margin-top: .4rem;
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
    top: 0;
    left: 0;
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
