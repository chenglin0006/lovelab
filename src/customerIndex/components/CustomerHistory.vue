<template>
    <div class="customer-history-div" v-if="historyObj">
        <div class="customer-history-title div-title">
            <div class="title">客户轨迹</div>
            <div class="times">
                <slot v-if="historyObj.appointmentsCount != null">已邀约{{historyObj.appointmentsCount}}次，</slot>
                <slot v-if="historyObj.visitShopCount != null">已看店{{historyObj.visitShopCount}}次</slot>
            </div>
        </div>
        <div class="customer-history-list" v-if="historyObj.logList&&historyObj.logList.length">
            <div class="history-item" v-for="item in historyObj.logList">
                <div class="left-style">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
                <div class="title-div">
                    <div class="title-desc">{{item.logTitleDesc}}</div>
                    <div class="title-date">{{item.optUser}} {{formateTime(item.logTime)}} </div>
                </div>
                <div class="see-hotel flex-parent" v-show="item.logType=='VISIT_SHOP'">
                    <div class="label">带看酒店:</div>
                    <div class="value"><div>{{item.visitShopName}}</div></div>
                </div>
                <div class="communicate-content flex-parent">
                    <div class="label" v-show="item.logType!='USER_REPORT' && item.logContent">沟通内容:</div>
                    <div class="value"><div v-html="item.logContent" @click="showAudio($event)"></div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp'
import CommonFun from '../../commonJs/CommonFun.js'
import Toast from '@dp/wepp-module-toast'
var mDomain = CommonFun.getDomain();
export default {
    data(){
        return {
            historyObj: null
        }
    },
    props: ['customerId'],
    created(){
        this.$store.commit('getCustomerHistory', this.customerId)
    },
    methods: {
        formateTime(time) {
            return time.split(' ')[0].replace(/-/g,'.')
        },
        showAudio(event) {
            let target = event.target
            let cid
            if (target.getAttribute('class').indexOf('video-div') > -1) {
                cid = target.getAttribute('data-value')
            } else {
                cid = target.querySelector('.video-div').getAttribute('data-value')
            }
            if(!cid){
                return
            }
            let ajaxSendCidUrl = mDomain+'/lovelab/user/getRecordUrlAjaxAction?callId='+cid;
            var self = this;
            fetchJsonp(ajaxSendCidUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then(function(jsonResult) {
                if(jsonResult.code!=200){
                    Toast('获取录音链接失败');
                    return;
                }
                if(jsonResult.content){
                    location.href=jsonResult.content;
                }
            }).catch(function(ex) {
                Toast('网络错误，请重试');
            });
        }
    },
    watch: {
        '$store.state.historyObj': {
            handler: function(val){
                this.historyObj = val
            },
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>
.ellipse(@value){
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: @value;
}
.customer-history-div{
    background-color: white;
    margin-top: 1.5rem;
    .div-title{
        position: relative;
        line-height: 4.5rem;
        padding-left: 1.5rem;
        border-bottom: solid 1px #f2f2f2;
        .title{
            color: #111;
            font-size: 1.5rem;
            font-family: PingFangSC-Medium;
        }
        .times{
            position: absolute;
            font-size: 1.2rem;
            color: #999;
            right: 25px;
            top: 0px;
        }
    }
    .customer-history-list{
        padding: 0 0 0 1.5rem;
        overflow: hidden;
        .history-item{
            position: relative;
            padding-bottom: 1rem;
            margin-left: 3.3rem;
            &:after {
                content: '';
                width: 200%;
                height: 1px;
                display: block;
                position: absolute;
                background: #e1e1e1;
                transform: scale(0.5);
                left: -50%;
                bottom: 0;
            }
            &:last-child {
                &:after {
                    display: none;
                }
            }
            .left-style{
                position: absolute;        
                left: -2.8rem;
                top: 1.8rem;
                bottom: 0;
                height: 100%;
                .dot{
                    width: 9px;
                    height: 9px;
                    background-color: #ffd5e5;
                    border-radius: 50%;
                }
                .line{
                    width: 1px;
                    height: 100%;
                    background-color: #ffd5e5;
                    left: 4px;
                    position: relative;
                }
            }
            .title-div{
                font-size: 1.5rem;
                line-height: 3rem;
                padding: 0.8rem 0;
                .title-desc{
                    color: #333;
                }
                .title-date{
                    position: absolute;
                    color: #999;
                    right: 1.5rem;
                    top: 0.8rem;
                    font-size: 1.2rem;
                }
            }
            .flex-parent {
                display: flex;
                color: #999;
                font-size: 1.4rem;
                line-height: 2.1rem;
                .label {
                    width: 7rem;
                }
                .value {
                    flex: 1;
                    margin-right: 1.5rem;
                    width: 0;
                    word-break: break-all;
                }
            }
            .see-hotel, .adviser{
                margin-bottom: 0.3rem;
                .value div{
                    .ellipse(98%);
                }
            }
            .adviser-label{
                width: 3rem;
            }
        }
    }
}
</style>

