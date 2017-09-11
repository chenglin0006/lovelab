<template>
    <div class="default">
        <div class="detail" v-if="customerInfo && businessLineType==0">
            <div class="base-info">
                <div class="user">{{customerInfo.useName}}<span class="phone">{{customerInfo.userPhone}}</span></div>
                <div class="tip">婚宴 <slot v-if="customerInfo.customerServiceId && customerInfo.assignSalesTime">{{customerInfo.customerServiceId}} 于 {{customerInfo.assignSalesTime}} 分配</slot></div>
                <div class="status" v-if="customerInfo.flowStatus">{{customerInfo.flowStatus}}</div>
                <div class="other-info">
                    <p class="info" v-if="customerInfo.scheduleFrom && customerInfo.scheduleTo && customerInfo.scheduleFrom == customerInfo.scheduleTo">{{customerInfo.scheduleFrom}}</p>
                    <p class="info" v-if="customerInfo.scheduleFrom && customerInfo.scheduleTo && customerInfo.scheduleFrom != customerInfo.scheduleTo">{{customerInfo.scheduleFrom}} 至 {{customerInfo.scheduleTo}}</p>
                    <p class="info" v-if="lineTwoInfo">{{lineTwoInfo}}</p>
                    <p class="info bigtit" v-if="customerInfo.note">
                        <span class="tit">备注</span>
                        <span class="info-content">{{customerInfo.note}}</span>
                    </p>
                    <p class="info bigtit">
                        <span class="tit">重点推荐</span>
                        <span class="info-content">
                            {{customerInfo.mainShop.shopName || '暂无'}}
                            <i v-for="icon in customerInfo.mainShop.signTypes" :class="['icon' + icon.value]"></i>
                        </span>
                    </p>
                    <p class="info bigtit">
                        <span class="tit">次要推荐</span>
                        <span class="info-content">
                            <slot v-if="customerInfo.secondShopList && customerInfo.secondShopList.length > 0">
                            <b class="cyShop" v-for="item in customerInfo.secondShopList">
                                {{item.shopName}}
                                <i v-for="icon in item.signTypes" :class="['icon' + icon.value]"></i>
                            </b>
                            </slot>
                            <slot v-else>
                                <b class="cyShop">暂无</b>
                            </slot>
                        </span>   
                    </p>
                    <p class="info bigtit">
                        <span class="tit">报备酒店</span>
                        <span class="info-content">
                            <slot v-if="customerInfo.reportShops && customerInfo.reportShops.length > 0">
                                <i class="bb">共{{customerInfo.reportShops.length}}个报备酒店</i>
                                <b class="bbshop" v-for="item in customerInfo.reportShops">{{item}}</b>
                            </slot>
                            <slot v-else>
                                <b class="bbshop">暂无</b>
                            </slot>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="detail" v-if="customerInfo && businessLineType==1">
            <div class="base-info">
                <div class="user">{{customerInfo.useName}}<span class="phone">{{customerInfo.userPhone}}</span></div>
                <div class="tip">婚庆 <slot v-if="customerInfo.customerServiceId && customerInfo.assignSalesTime">{{customerInfo.customerServiceId}} 于 {{customerInfo.assignSalesTime}} 分配</slot></div>
                <div class="status" v-if="customerInfo.flowStatus">{{customerInfo.flowStatus}}</div>
                <div class="other-info">
                    <p class="info" v-if="customerInfo.scheduleFrom && customerInfo.scheduleTo && customerInfo.scheduleFrom == customerInfo.scheduleTo">{{customerInfo.scheduleFrom}}</p>
                    <p class="info" v-if="customerInfo.scheduleFrom && customerInfo.scheduleTo && customerInfo.scheduleFrom != customerInfo.scheduleTo">{{customerInfo.scheduleFrom}} 至 {{customerInfo.scheduleTo}}</p>
                    <p class="info" v-if="hyLineTwoInfo">{{hyLineTwoInfo}}</p>
                    <p class="info" v-if="customerInfo.note"><span class="tit">备注</span>{{customerInfo.note || '暂无'}}</p>
                    <p class="info"><span class="tit">预算</span>{{customerInfo.budget || '暂无'}}</p>
                    <p class="info"><span class="tit">风格</span>{{customerInfo.style || '暂无'}}</p>
                </div>
            </div>
        </div>
        <contract-info v-if="$store.state.signOrderList" :config="customerId"></contract-info>
        <customer-history :customerId="customerId"></customer-history>
        <slot v-if="$store.state.user && $store.state.user.keyRole == '服务'">
            <div class="btn-group btn-big">
                <div class="btn-gray" @click="showAddCustomerHistory">添加客户轨迹</div>
                <div class="btn-gray" @click="showEditGuwen">维护对接人员</div>
            </div>
        </slot>
        <slot v-if="$store.state.user && $store.state.user.keyRole == '顾问'">
            <div class="btn-group">
                <div class="btn-gray" v-if="!$store.state.user.isBoss" @click="showEidtCustomer">编辑客户信息</div>
                <div class="btn-gray"  @click="showAddCustomerHistory">添加客户轨迹</div>
                <div class="btn-gray" v-if="$store.state.user.isBoss" @click="showEditGuwen">分配顾问</div>
                <div class="btn-red" @click="showQiqnyue">签约</div>
            </div>
        </slot>
        <slot v-if="$store.state.user && $store.state.user.keyRole == '售前'">
            <div class="btn-group">
                <div class="btn-gray" @click="showEidtCustomer">编辑客户信息</div>
                <div class="btn-gray" @click="showEditGuwen">分配顾问</div>
                <div class="btn-red" @click="showQiqnyue">签约</div>
            </div>
        </slot>
        <div class="qianyue-fix" v-show="isShowQianyue" @click="cancelQianyue">
            <div class="edit-list">
                <div class="edit-item" @click="jumpQianyue($event, 1)">婚宴+婚庆</div>
                <div class="edit-item" @click="jumpQianyue($event, 2)">婚宴</div>
                <div class="edit-item" @click="jumpQianyue($event, 3)">婚庆</div>
            </div>
            <div class="edit-list cancel-list">
                <div class="edit-item">取消</div>
            </div>
        </div>
        <div class="qianyue-fix" v-show="isShowHistroy" @click="cancelEditHistroy">
            <div class="edit-list">
                <div class="edit-item" @click="jumpEditHistroy($event, 1)">沟通用户</div>
                <div class="edit-item" @click="jumpEditHistroy($event, 2)">邀约看店 </div>
                <div class="edit-item" @click="jumpEditHistroy($event, 3)">终止销售</div>
                <div class="edit-item" @click="jumpEditHistroy($event, 4)">酒店报备</div>
            </div>
            <div class="edit-list cancel-list">
                <div class="edit-item">取消</div>
            </div>
        </div>
        <div class="edit-sales-post" v-show="showEdit" @click="submitSelSale">
            <div class="edit-sales" @click="editSalePre($event)">
                <slot v-if="businessLineType == 0">
                    <div class="hunyan-title">
                        <div class="left" @click="cancelSelSale">取消</div>
                        <span class="title-text">选择销售</span>
                        <div class="right" @click="submitSelSale">确定</div>
                    </div>
                    <div class="f-list">
                        <div class="f-li" :class="{seled: assignType == 1}" @click="setSaleGroup(1)">酒店战区顾问</div>
                        <div class="f-li" :class="{seled: assignType == 0}" @click="setSaleGroup(0)">指定顾问</div>
                    </div>
                    <div class="c-list" :class="{can: assignType == 0}">
                        <div class="c-li" :class="{seled: salesId == item.salesId}" @click="setSale(item)" v-for="item in $store.state.salesList">{{item.salesName}}</div>
                    </div>
                </slot>
                <slot v-if="businessLineType == 1">
                    <div class="hunqin-title">请选择销售</div>
                    <div class="hunqin-list">
                        <div class="hunqin-li" :class="{seled: salesId == item.salesId}" @click="setSale(item)" v-for="item in $store.state.salesList">{{item.salesName}}</div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import Toast from '@dp/wepp-module-toast';
import MyHeader from './components/Header.vue'
import ContractInfo from './components/ContractInfo.vue'
import CustomerHistory from './components/CustomerHistory.vue'
import CommonFun from '../commonJs/CommonFun.js'
let mDomain = CommonFun.getDomain()
let isInApp = CommonFun.getUaIsApp()
let host_name = location.hostname.indexOf('dianping') > -1 ? 'g.dianping.com' : 'g.51ping.com'
let search_params = (()=>{
    let str = location.search.substr(1)
    let arr = str.split('&')
    let obj = {}
    for (let i=0;i< arr.length; i++) {
        let item_arr = arr[i].split('=')
        if (item_arr.length == 2) {
            obj[item_arr[0]] = item_arr[1]
        }
    }
    return obj
})()

export default {
    data(){
        return {
            domain: mDomain,
            hasTips: null,
            isIOS: null,
            isAndroid: null,
            customerInfo: null,
            customerId: search_params['yzsUserId'],
            businessLineType: search_params['businessLineType'],
            isShowQianyue: false,
            isShowHistroy: false,
            showEdit: false,
            assignType: null,
            salesId: null
        }
    },
    created(){
        this.$store.commit('getUserInfo')
        this.$store.commit('getCustomerBasicInfo', {
            yzsUserId: this.customerId,
            businessLineType: this.businessLineType
        })
        this.$store.commit('getSignInfo', this.customerId)
        this.$store.commit('getSalesList', {
            businessLineType: this.businessLineType
        })
    },
    methods: {
        formatTime(time) {
            let date = new Date(time)
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
        },
        showEidtCustomer() {
            
            location.href = `./customer-edit.html?yzsUserId=${this.customerId}`
        },
        showAddCustomerHistory() {
            this.isShowHistroy = true
        },
        showQiqnyue() {
            this.isShowQianyue = true
        },
        jumpQianyue(event, type) {
            event.stopPropagation()
            let url = `https://${host_name}/app/gfe-app-page-yzs-love-lab/customer-sign-index.html?yzsUserId=${this.customerId}&type=${type}&businessLineType=${this.businessLineType}`
            location.href = `./customer-sign-index.html?yzsUserId=${this.customerId}&type=${type}&businessLineType=${this.businessLineType}`
        },
        jumpEditHistroy(event, type) {
            event.stopPropagation()
            
            location.href = `./customer-add-history-index.html?addType=${type}&yzsUserId=${this.customerId}&businessLineType=${this.businessLineType}`
        },
        cancelQianyue(){
            this.isShowQianyue = false
        },
        cancelEditHistroy() {
            this.isShowHistroy = false
        },
        showEditGuwen() {
            this.showEdit = true
        },
        setSaleGroup(index) {
            this.assignType = index
            if (index == 1) {
                this.salesId = null
            }
        },
        setSale(item) {
            if (this.businessLineType == 0) {
                if (this.assignType == null || this.assignType == 1) {
                    
                } else {
                    this.salesId = item.salesId
                }
            } else {
                this.salesId = item.salesId
            }
        },
        cancelSelSale() {
            this.assignType = null
            this.salesId = null
            this.showEdit = false
        },
        editSalePre(event) {
            event.stopPropagation()
        },
        submitSelSale() {
            let _self = this
            if (this.businessLineType == 0) {
                if (this.assignType == 1) {
                    this.$store.commit('setAssignSales', {
                        str: `assignType=${this.assignType}&businessLineType=${this.businessLineType}&yzsUserId=${this.customerId}`, 
                        fun: ()=>{
                            _self.cancelSelSale()
                            Toast('添加顾问成功', 2000, function(){
                                location.reload()
                            })
                        }
                    })
                } else if(this.assignType == 0) {
                    if (!this.salesId) {
                        this.cancelSelSale()
                    } else {
                        this.$store.commit('setAssignSales', {
                            str: `assignType=${this.assignType}&businessLineType=${this.businessLineType}&yzsUserId=${this.customerId}&salesId=${this.salesId}`,
                            fun: ()=>{
                                _self.cancelSelSale()
                                Toast('添加顾问成功', 2000, function(){
                                    location.reload()
                                })
                            }
                        })
                    }
                } else {
                    this.cancelSelSale()
                }
            } else if(this.businessLineType == 1) {
                if (!this.salesId) {
                    this.cancelSelSale()
                } else {
                    this.$store.commit('setAssignSales', {
                        str: `businessLineType=${this.businessLineType}&yzsUserId=${this.customerId}&salesId=${this.salesId}`, 
                        fun: ()=>{
                            _self.cancelSelSale()
                            Toast('添加顾问成功', 2000, function(){
                                location.reload()
                            })
                        }
                    })
                }
            }
        }
    },
    computed: {
        lineTwoInfo(){
            let arr = []
            if (this.customerInfo.region) {
                arr.push(this.customerInfo.region)
            }
            if (this.customerInfo.tableInfo) {
                arr.push(this.customerInfo.tableInfo)
            }
            if (this.customerInfo.mealStandard) {
                arr.push(this.customerInfo.mealStandard)
            }
            return arr.join(' | ')
        },
        hyLineTwoInfo() {
            let arr = []
            if (this.customerInfo.region) {
                arr.push(this.customerInfo.region)
            }
            if (this.customerInfo.tableInfo) {
                arr.push(this.customerInfo.tableInfo)
            }
            return arr.join(' | ')
        }
    },
    components: {
        MyHeader,
        ContractInfo,
        CustomerHistory
    },
    watch: {
        '$store.state.customerBasicInfo': {
            handler: function(val) {
                this.customerInfo = val
            },
            deep: true
        },
        '$store.state.errorMsg': {
            handler: function(val) {
                if (val) {
                    Toast(val)
                    let _self = this
                    this.$nextTick(function(){
                        _self.$store.state.errorMsg = ''
                    }, 2000)
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.default {
    padding-bottom: 6.1rem;
    .detail {
        .base-info {
            background: #Fff;
            padding-left: 1.5rem;
            position: relative;
            .status {
                position: absolute;
                right: 1.5rem;
                top: 1.8rem;
                width: 7.2rem;
                height: 2rem;
                background: #ffeff5;
                color: #ff66a1;
                text-align: center;
                font-size: 1.2rem;
                line-height: 2rem;
            }
            .user {
                font-size: 2rem;
                line-height: 3.4rem;
                color: #111;
                padding-top: 0.8rem;
                .phone {
                    font-size: 1.6rem;
                    display: inline-block;
                    margin-left: 1rem;
                }
            }
            .tip {
                font-size: 1.5rem;
                line-height: 2.9rem;
                color: #333;
                padding-bottom: 0.8rem;
            }
            .other-info {
                position: relative;
                &:after {
                    content: '';
                    width: 200%;
                    height: 1px;
                    display: block;
                    position: absolute;
                    background: #e1e1e1;
                    transform: scale(0.5);
                    left: -50%;
                    top: 0;
                }
                padding: 1rem 0;
                .info {
                    font-size: 1.4rem;
                    line-height: 2.4rem;
                    color: #333;
                    padding-right: 1.5rem;
                    &:after {
                        clear: both;
                        display: block;
                        content: '';
                        height: 0;
                    }
                    .tit {
                        color: #999;
                        float: left;
                        width: 12%;
                    }
                    .info-content {
                        float: left;
                        width: 88%;
                        .cyShop {
                            display: block;
                            min-height: 2.4rem;
                            font-weight: normal;
                        }
                        .icon0 {
                            float: right;
                            width: 1.5rem;
                            height: 1.5rem;
                            margin-top: 0.4rem;
                            margin-left: 0.5rem;
                            background: url(./img/icon_dai@3x.png) center/contain no-repeat;
                        }
                        .icon1 {
                            float: right;
                            width: 1.5rem;
                            height: 1.5rem;
                            margin-top: 0.4rem;
                            margin-left: 0.5rem;
                            background: url(./img/icon_zhi@3x.png) center/contain no-repeat;
                        }
                        .bb {
                            display: block;
                            font-style: normal;
                            color: #999;
                        }
                        .bbshop {
                            font-weight: 500;
                            display: block;
                            color: #333;
                        }
                    }
                    &.bigtit {
                        .tit {
                            width: 20%;
                        }
                        .info-content {
                            width: 80%;
                        }
                    }
                }
            }
        }
    }   
    .btn-group {
        position: fixed;
        height: 5rem;
        &:after {
            content: '';
            width: 200%;
            height: 1px;
            display: block;
            position: absolute;
            background: #e1e1e1;
            transform: scale(0.5);
            left: -50%;
            top: 0;
        }
        background: #fff;
        left: 0;
        bottom: 0;
        width: 100%;
        &.btn-big {
            .btn-gray {
                width: 44%;
            }
        }
        .btn-gray {
            width: 28.8%;
            height: 4rem;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
            border-radius: 2px;
            color: #666;
            font-size: 1.5rem;
            text-align: center;
            float: left;
            line-height: 3.8rem;
            margin-top: 0.5rem;
            margin-left: 1.5rem;
            &:nth-child(1) {
               margin-right: 1rem; 
            }
            &:nth-child(2) {
               margin-left: 0; 
            }
        }
        .btn-red {
            width: 28.8%;
            height: 4rem;
            box-sizing: border-box;
            background: #ff66a1;
            border-radius: 2px;
            color: #fff;
            font-size: 1.5rem;
            text-align: center;
            float: left;
            line-height: 4rem;
            margin-top: 0.5rem;
            margin-left: 1rem;
        }
    }
    .qianyue-fix {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    .edit-list {
        background: #fff;
        border-radius: 5px;
        margin: 0 1rem;
        position: fixed;
        width: 95%;
        bottom: 7.7rem;
        &.cancel-list {
            bottom: 1rem;
            .edit-item {
                color: #fe3824;
            }
        }
        .edit-item {
            height: 5.7rem;
            text-align: center;
            line-height: 5.7rem;
            font-size: 1.5rem;
            color: #4a4a4a;
            position: relative;
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
        }
    }
    .edit-sales-post {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;
    }
    .edit-sales {
        position: fixed;
        background: #fff;
        width: 100%;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        .hunyan-title {
            position: relative;
            height: 4.5rem;
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
            color: #333;
            font-size: 1.5rem;
            text-align: center;
            line-height: 4.5rem;
            .left {
                position: absolute;
                top: 0;
                left: 1.3rem;
                color: #111;
                font-family: PingFangSC-Medium;
            }
            .right {
                position: absolute;
                top: 0;
                right: 1.3rem;
                color: #111;
                font-family: PingFangSC-Medium;
            }
        }
        .f-list {
            position: relative;
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
        }
        .f-li {
            height: 4.5rem;
            line-height: 4.5rem;
            color: #333;
            font-size: 1.5rem;
            padding-left: 5.3rem;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                display: block;
                width: 2.3rem;
                height: 2.3rem;
                left: 1.5rem;
                top: 1.1rem;
                background: url(./img/btn_radiobtn_can@3x.png) center/contain no-repeat;
            }
            &.seled {
                &:before {
                    background-image: url(./img/btn_radiobtn_do@3x.png);
                }
            }
        }
        .c-list {
            margin-left: 1.5rem;
            max-height: 20rem;
            overflow: auto;
        }
        .c-li {
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
            height: 4.5rem;
            line-height: 4.5rem;
            box-sizing: border-box;
            color: #ccc;
            font-size: 1.5rem;
            padding-left: 7rem;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                display: block;
                width: 2.3rem;
                height: 2.3rem;
                left: 3.8rem;
                top: 1.1rem;
                background: url(./img/btn_radiobtn_un@3x.png) center/contain no-repeat;
            }
        }
        .c-list.can {
            .c-li {
                color: #333;
                &:before {
                    background-image: url(./img/btn_radiobtn_can@3x.png);
                }
                &.seled {
                    &:before {
                        background-image: url(./img/btn_radiobtn_do@3x.png);
                    }
                }
            }
        }
        .hunqin-title {
            height: 4.5rem;
            line-height: 4.5rem;
            padding-left: 1.5rem;
            font-size: 1.5rem;
            color: #999;
            position: relative;
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
            box-sizing: border-box;
        }
        .hunqin-list {
            max-height: 28rem;
            overflow: auto;
            padding-left: 1.5rem;
            .hunqin-li {
                height: 4.5rem;
                font-size: 1.5rem;
                color: #333;
                line-height: 4.5rem;
                position: relative;
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
                &.seled {
                    &:after {
                        content: '';
                        position: absolute;
                        width: 1.1rem;
                        height: 1.1rem;
                        right: 1.5rem;
                        top: 1.7rem;
                        background: url(./img/icon_check@3x.png) center/contain no-repeat;
                    }
                }
            }   
        }
    }
}
</style>