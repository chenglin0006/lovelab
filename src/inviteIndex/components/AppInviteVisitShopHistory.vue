<template>
    <section class="add-visit">
        <div class="mask-div" @click="hidepop" @touchmove="touchMoveFun($event)"></div>
        <section class="add-history-section" :class="{'invite-history':historyType=='邀约看店'}">
            <div class="history-type history-item">
                <div class="title">轨迹类型</div>
                <div class="value no-arrow">用户看店</div>
            </div>
            <div class="history-hotel history-item">
                <div class="title">带看酒店</div>
                <div class="value no-arrow" v-if="selectHotel&&selectHotel.shopName">{{selectHotel.shopName}}</div>
                <div class="value no-select" v-else>请选择带看酒店</div>
            </div>
            <div class="communicate-content" @touchmove="touchMoveFun($event,'scroll')">
                <textarea placeholder="请输入沟通内容" v-model="item.remark" class="communicate-text"></textarea>
            </div>
            <div class="save-btn-div">
               <div class="save-btn" @click="saveAction">保存</div>
            </div>
        </section>
    </section>
</template>
<script>
    import AppSelectSearch from './AppSelectSearch.vue';
    import Toast from '@dp/wepp-module-toast';
    import { mapGetters } from 'vuex';
    import formatter from 'date-formatter';
    import qs from 'qs';
    import $ from '@dp/zepto';
    import fetchJsonp from 'fetch-jsonp';
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();

    export default{
        data(){
            return{
                historyType:'用户看店',
                isAndroid:false,
                isLLApp:false,
                isIOS:false,
            }
        },
        props:['nxKey','nxToken','selectHotel','selectCustomer','item'],
        watch:{
        },
        components:{
            AppSelectSearch
        },
        mounted() {
            this.isLLApp = CommonFun.getUaIsApp();
        },
        computed:{
            ...mapGetters({
                customerInfoObj:'getCustomerInfoObj'
            })
        },
        methods:{
            hidepop:function(){
                this.$emit('hidepop');
            },
            addLogFun:function(){
                var submitObj={
                    yzsUserId:this.selectCustomer,
                    businessLineType:0, //0:婚宴 1:婚庆
                    logType:'VISIT_SHOP',
                    logContent:this.item.remark,
                    shopIds:this.selectHotel.shopId+'',
                    reason:''
                };
                if(this.item.eventType==1){
                    submitObj.businessLineType = 0;
                } else if(this.item.eventType==3){
                    submitObj.businessLineType = 1;
                }
                if(!this.item.remark){
                    Toast('请填写沟通内容');
                    return;
                }
                var saveUrl = mDomain+"/lovelab/user/addUserLog";
                $.ajax({
                    type: "post",
                    url: saveUrl,
                    data: submitObj,
                    xhrFields: {
                      withCredentials: true
                    },
                    success: (json)=>{
                        if(json.code != 200){
                            if(json.code==600){
                                if(this.isLLApp&&this.isAndroid){
                                    CommonFun.androidLogin();
                                } else {
                                    location.href= eDomain;
                                }
                            } else {
                                Toast(json.string);
                                console.log("save error",json.string);
                                return;
                            }
                        }
                    },
                    error:(ex)=>{
                        Toast('网络异常，请稍后重试');
                        console.log(ex.toString());
                    }
                });
            },
            saveAction:function(){
                if(this.item.eventType==1&&this.item.eventStatus!=101||this.item.eventType==3&&this.item.eventStatus!=301){
                    this.addLogFun();
                }
                this.updateEventFun();
            },
            //更新日历事件
            updateEventFun:function(){
                let params = {
                    eventId:this.item.eventId,
                    eventTime:this.item.eventTime,
                    remark:this.item.remark,
                    status:101,
                    operationType:2
                }
                if(this.item.eventType==3){
                    params.status = 301;
                }
                let ajaxUrl = mDomain+'/lovelab/salescalendar/updateevent?'+qs.stringify(params);
                console.log('更改用户到店的备注:',params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code != 200){
                        if(json.code==600){
                            if(this.isLLApp&&this.isAndroid){
                                CommonFun.androidLogin();
                            } else {
                                location.href= eDomain;
                            }
                        } else {
                            Toast(json.msg);
                            console.log('更改用户到店的备注失败')
                            return;
                        }
                    }
                    this.item.eventStatus = 101;
                    this.$emit('refreshInviteAndSummaryNum');
                    this.hidepop();
                }).catch(function(ex) {
                    Toast('网络错误，请重试');
                    console.log('更改用户到店的备注失败 failed', ex);
                });
            },
            touchMoveFun:function(event,text){
                if (text=='scroll') {
                } else {
                    event.preventDefault();
                }
                event.stopPropagation();
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .add-history-section{
        background-color: white;
        font-size: 1.4rem;
        color: #777;
        margin-top: .5rem;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 200;
        // top: 7rem;
        &.invite-history{
            padding-bottom: 6rem;
        }
        .history-item{
            margin-left: 1rem;
            line-height: 4rem;
            position: relative;
            border-top: solid .1rem #f2f2f2;
            &.history-type{
                border-top: none;
            }
            .value{
                position: absolute;
                top: 0;
                right: 1rem;
                .ellipse(70%);
                &.no-select{
                    color: #999;
                }
            }
        }
        .history-report{
            position: relative;
            height: 4rem;
            border-top: solid .1rem #f2f2f2;
            margin-left:1rem;
            .title{
                display: table-cell;
                vertical-align: middle;
                height: 100%;
                position: relative;
                width: 10rem;
                height: 4rem;
            }
            .report-value{
                // display: table-cell;
                // vertical-align: middle;
                // text-align: right;
                &.no-select{
                    line-height: 4rem;
                    text-align: right;
                    padding-right: 2.5rem;
                    flex: 1;
                    -webkit-box-flex: 1;
                    -ms-box-flex: 1;
                    -ms-flex: 1;
                    display: block !important;
                    color: #999;
                }
                &.value{
                    text-align: right;
                    padding-right: 2.5rem;
                    position: absolute;
                    right: 0;
                    height: 4rem;
                    padding-left: 10rem;
                    div{
                        display: table-cell;
                        vertical-align: middle;
                        height: 4rem;
                    }
                    p{
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        width: 100%;
                        padding-right: 1rem;
                        span{
                            margin-right: .5rem;
                        }
                    }
                    &:after{
                        content: "";
                        background-image: url('../img/right-arrow-line.png');
                        background-size: contain;
                        width: 1.2rem;
                        height: 1.2rem;
                        background-repeat: no-repeat;
                        top: 1.4rem;
                        right: 1rem;
                        position: absolute;
                    }
                }
            }
        }
        .communicate-content{
            padding-left: 1rem;
            padding-bottom: 10rem;
            textarea{
                width: 100%;
                border: none;
                min-height: 20rem;
                border-top: solid .1rem #f2f2f2;
                padding-top: 1rem;
                color: #333;
                font-size: 1.4rem;
            }
        }
    }

    .save-btn-div{
        padding:1rem 2rem;
        background-color: #f2f2f2;
        margin-left: -1rem;
        font-size: 1.5rem;
        .save-btn{
            background-color: @mainColor;
            color: white;
            text-align: center;
            line-height: 4rem;
            border-radius: .5rem;
        }
    }

    .history-item .value{
        padding-right: 1.5rem;
        &:after{
            content: "";
            background-image: url('../img/right-arrow-line.png');
            background-size: contain;
            width: 1.2rem;
            height: 1.2rem;
            background-repeat: no-repeat;
            top: 1.4rem;
            right: 0;
            position: absolute;
        }
    }
    .add-invite-btn{
        line-height: 4rem;
        text-align: center;
        color:@mainColor;
    }
    .invite-shop-div{
        .invite-list-item{
            .history-item{
                border-top: none !important;
            }
        }
    }
    .delete-invite-btn{
        line-height: 4rem;
        text-align: center;
        border-top: solid .1rem #f2f2f2;
        color: red;
        .line-between{
            height: 1rem;
            background:#f2f2f2;
        }
    }
    .no-arrow:after{
        background-image: none !important;
    }
</style>