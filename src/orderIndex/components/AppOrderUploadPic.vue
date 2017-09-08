<template>
    <section class="order-upload-pic-section">
        <div class="sign-div">
            <span v-if="orderType==1">签约凭证</span>
            <span v-else>订单合同上传</span>
            <div class="upload-status-span wait-verify" v-if="verifyStatus==0 && saveStatusImgList.length == 0">待上传</div>
            <div class="upload-status-span wait-verify" v-if="verifyStatus==0 && saveStatusImgList.length > 0">待审核</div>
            <div class="upload-status-span verify-success" v-if="verifyStatus==1">审核通过</div>
            <div class="upload-status-span verify-fail" v-if="verifyStatus==2">审核失败</div>
        </div>
        <div class="sign-evidence" :class="{'add-padding-bottom':statusImgList.length==0 || (statusImgList.length==3 && showSubmitStatus)}">
            <div class="fail-info" v-if="verifyStatus==2">
                <p class="warning" v-if="orderType==1">重要提示：审核失败，请重新上传签约凭证</p>
                <p class="warning" v-else>重要提示：审核失败，请重新上传订单合同</p>
                <p class="reason">失败原因：{{signConfirm.comment}}</p>
            </div>
            <div class="img-area">
                <div class="img-div" v-for="(item, index) in statusImgList">
                    <img :src="(isAPP ? '': 'https:')+ item.imgUrl + encodeURIComponent('@210w_210h_1e_1l_1c_70q|watermark=0')" alt="" @click="changeImgFun(index)">
                    <div class="btn-delete-icon" @click="deleteImgFun(index)" v-show="showSubmitStatus && !(item.status==1 && verifyStatus==1)"></div>
                </div>

                <div class="upload-new-btn" @click="toChooseImage" v-show="statusImgList.length<5 && showSubmitStatus">
                    <div class="text-div">
                        <div style="font-size:3rem;">+</div>
                        <div>点击上传凭证</div>
                    </div>
                </div>
                <div class="upload-info" v-show="statusImgList.length==0">
                    <div class="p-div">
                        <p class="info-title" v-if="orderType==1">请上传酒店签约凭证</p>
                        <p class="info-title" v-else>请上传合同</p>

                        <p v-if="orderType==1">该图片将作为审核订单的依据</p>
                        <p v-else>该图片将作为合同审核的依据</p>
                        <p>审核通过后图片不可更换</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-area" v-if="statusImgList.length > 0 && !(statusImgList.length == 5 && allImgStatusIs1 && verifyStatus==1)">
            <div class="btn" v-if="showEditStatus" @click="editPicFun">编辑图片</div>
            <div class="btn" @click="submitPicFun" v-if="showSubmitStatus">
                <span v-if="orderType==1">提交凭证</span>
                <span v-else>提交合同</span>
            </div>
        </div>
        <div class="preview-img-div" v-show="showPreImgStatus">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide :key="index" v-for="(item,index) in statusImgList">
                    <img :src="(isAPP ? '': 'https:')+item.imgUrl" alt="">
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @import url('../../commonLess/border.less');
    .order-upload-pic-section{
        margin-top:1.5rem;
        background-color:#fff;
        /*padding:1.5rem 0 1.5rem 1.5rem;*/
        .sign-div{
            height:4.5rem;
            line-height:4.5rem;
            color:#111;
            font-size:1.5rem;
            font-weight:600;
            margin-left:1.5rem;
            position:relative;
            .borderline(#e1e1e1, bottom);
            .upload-status-span{
                position:absolute;
                top:1.25rem;
                right:1.5rem;
                background-color:#ccc;
                color:#fff;
                font-size:1.2rem;
                width:7.2rem;
                height:2rem;
                line-height:2rem;
                text-align: center;
                -webkit-border-radius:.2rem .2rem;
                -moz-border-radius:.2rem .2rem;
                border-radius:.2rem .2rem;
                font-weight:normal;

                &.wait-verify{
                    background-color: #ccc;
                }
                &.verify-success{
                    background-color: #65C07A;
                }
                &.verify-fail{
                    background-color: #FE3824;
                }
            }
        }
        .sign-evidence{
            padding:1.5rem 1.5rem 0 1.5rem;
            &.add-padding-bottom{
                padding-bottom:1.5rem;
            }
        }
        .upload-new-btn{
            position: relative;
            width:31%;
            padding-bottom:calc(31% - 1px);
            border:1px solid #e1e1e1;
            color:#ccc;
            font-size:1.2rem;
            line-height:1;
            display: inline-block;
            vertical-align: top;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            /*float:right;*/
            .text-div{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                height: 50px;
                text-align: center;
            }
        }
        .fail-info{
            font-size:1.4rem;
            line-height: 1;
            .warning{
                color:#FE3824;
                margin-bottom:1rem;
            }
            .reason{
                color:#777;
                margin-bottom:2rem;
            }
        }

        .img-area{
            font-size:0;
        }

        .img-div{
            /*float:left;*/
            display: inline-block;
            vertical-align: top;
            width:31%;
            padding-bottom:31%;
            margin-right:3.5%;
            margin-bottom:1.5rem;
            background-color: #f2f2f2;
            position: relative;
            &:nth-child(3n){
                margin-right:0;
            }
            img{
                object-fit: contain;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                height: 100%;
            }
            .btn-delete-icon{
                position: absolute;
                right:-.75rem;
                top:-.75rem;
                width:1.5rem;
                height:1.5rem;
                background: url("../img/btn_delete@3x.png") no-repeat;
                background-size: 100% 100%;
            }
        }
        .upload-info{
            display: inline-block;
            vertical-align: top;
            color:#999;
            font-size:1.2rem;
            margin-left:1.5rem;
            margin-top:1.5rem;
            line-height: 1.5;
            .info-title{
                color:#333;
                font-size:1.5rem;
                margin-bottom:1rem;
                line-height:1;
            }

        }
        .btn-area{
            padding:3rem 0 1rem;
            background:#F0F0F0;
        }
        .btn{
            margin:0 auto;
            width:92%;
            text-align: center;
            color:#fff;
            font-size:1.6rem;
            height:4rem;
            line-height:4rem;
            background-color:#FF66A1;
            border-radius:.2rem;
        }
    }
</style>
<script>
    import KNB from '@dp/knb';
    import Toast from '@dp/wepp-module-toast';
    import {swiper,swiperSlide} from 'vue-awesome-swiper';
    import $ from '@dp/zepto';
    import CONSTANT from '../js/constant.js';
//    import 'whatwg-fetch';
//    require('@gfe/m-isomorphic-fetch');
    import CommonFun from '../../commonJs/CommonFun.js';
    import superagent from 'superagent';
    var isAPP = CommonFun.getUaIsApp();
    var UAStr = (navigator.userAgent).toLowerCase(),
      isAndroid = /android/.test(UAStr);

    export default{
    data(){
      return {
        verifyStatus:0, //0=待审核，1=审核通过，2=审核失败
        statusImgList:[], //用来存储img的状态和url
        saveStatusImgList:[],
        swiperOption:{
          notNextTick: false,
          setWrapperSize :true,
          autoHeight: false
        },
        showPreImgStatus:false, //预览
        showSubmitStatus:true,
        showEditStatus:false,
        isAPP:isAPP,
      }
    },
    mounted(){

    },
    props: ['orderType','signConfirm','orderId','subOrderId'],//代收=0，酒店直签=1
    watch:{
      signConfirm:function (val) {
        if(val && val.confirmPics){
          let arr = [];
          val.confirmPics.forEach((ele,index)=>{
            let obj = {
              status:1, //1:后端返回的图片，0:本次新增的图片，在审核通过的情况下不能删除原有图片，只能新增
              imgUrl:ele.picUrl
            };
            arr.push(obj);
          });
          this.statusImgList = arr;
          this.saveStatusImgList = arr;
          this.verifyStatus = val.signConfirmType; //0=待审核，1=审核通过，2=审核失败
          if(this.verifyStatus == 1){
            this.showEditStatus = true;
            this.showSubmitStatus = false;
          }
        }
      },
      statusImgList:function(val){
        if(val.length == 0){
          this.saveStatusImgList = []
        }
      }
    },
    computed:{
        allImgStatusIs1:function () {
          return this.statusImgList.every(function(ele){
            return ele.status == 1;
          })
        }
    },
    components: {
      swiper,
      swiperSlide
    },

    methods:{
      //选择图片
      toChooseImage:function () {
        console.log(this.statusImgList);
        if(this.statusImgList.length > 5){
          Toast('最多只能上传5张图片');
          return;
        }
        let self = this;
        KNB.chooseImage({
          type: 'gallery', //图片类型：'gallery'相册, 'camera'相机, ''呼出相机和相册组合
          count: 5-this.statusImgList.length, //可选,表示可以选择图片的最大数量,当type:camera时此参数无效。default: 9
          success: function(result){
//            alert(JSON.stringify(result));
            let photos = result.photoInfos; // photoInfos是一个对象数组，每个对象包括以下内容
            let localArr = [];
            photos.forEach(function(photo){
              localArr.push(photo.localId); //返回本地资源id
            });
            Toast('上传图片中');
            let uploadConfig = {
              bucket: 'wedding', //dp,mt下均需要有bucket.（mt 8.3以下不需要指定bucktet默认使用shaitu）
              signatureURL: 'https:'+CONSTANT.ajaxAddress.mDomain+'/wed/file/upload/getToken?bucket=wedding',
              localIds: localArr, //待上传图片的本地资源位置id
              success: function(data){
                let photos = data.photoInfos;
//                alert(JSON.stringify(photos));
                photos.forEach(function(photo){
                  let pic = photo.picUrl.split(':');
                  pic.shift();
                  let picUrl = pic[0]; //上传后的的图片URI或者云图片资源Id,去掉了协议头
                  let obj ={
                    status:0, //表示新增的
                    imgUrl:picUrl
                  };
                  self.statusImgList.push(obj);
                });
              },
            };
            KNB.uploadImage(uploadConfig);
          }
        });
      },
      deleteImgFun:function (index) {
        this.statusImgList.forEach((ele,eleIndex)=>{
          if(index == eleIndex){
            this.statusImgList.splice(eleIndex,1);
          }
        });
      },
      changeImgFun:function (index) {
        this.showPreImgStatus = true;
        this.$refs.mySwiper.swiper.slideTo(index);
        setTimeout(()=>{
          $('.swiper-wrapper').on('click',()=>{
            this.hidePreImgFun();
          })
        },500)
      },
      hidePreImgFun:function () {
        this.showPreImgStatus = false;
      },
      editPicFun:function () {
        this.showEditStatus = false;
        this.showSubmitStatus = true;
      },
      submitPicFun:function () {
        let imgList = [];
        this.statusImgList.forEach((ele,index)=>{
          if(this.verifyStatus == 1){
            //审核成功状态下只传本次新增的图片
            if(ele.status == 0){
              imgList.push(ele.imgUrl);
            }
          }else{
            imgList.push(ele.imgUrl);
          }
        });
        let saveUrl = 'https:'+CONSTANT.ajaxAddress.eDomain+CONSTANT.ajaxAddress.signConfirmPicUploadAjaxAction;
        let params = {
          picUrls:imgList.join(','),
          orderId:this.orderId,
          subOrderId:this.subOrderId || 0
        };
        let self = this;
        superagent
          .post(saveUrl)
          .set('Content-Type','application/x-www-form-urlencoded')
          .withCredentials()
          .send(params)
          .end(function (err,res) {
            let json = res.body;
            console.log(json);
            if(json.code == 600){
              if(isAndroid && isAPP){
                CommonFun.androidLogin();
              }else{
                location.href = CommonFun.getEDomain();
              }
            }else if(json.code != 200 ||err){
              Toast('提交失败:'+json.msg);
              console.log('提交凭证失败：',json.msg);
              return;
            }
            Toast('提交成功');
            self.saveStatusImgList = [];
            self.saveStatusImgList = self.saveStatusImgList.concat(imgList);
            self.showSubmitStatus = false;
            self.showEditStatus = true;
            if(self.verifyStatus != 1){
              self.verifyStatus = 0;
            }
            self.statusImgList.forEach((ele)=>{
              ele.status = 1;
          })
          });

      },

    }

  }
</script>
