<template>
    <div class="default">
        <div class="detail" v-if="customerInfo">
            <div class="base-info">
                <div class="user">{{customerInfo.userName}}<span class="phone">{{customerInfo.userPhone}}</span></div>
                <div class="tip" v-if="customerInfo.salesChance">{{customerInfo.salesChance}}</div>
                <div class="other-info">
                    <p class="info"><span class="tit">档期</span>{{dangqi}}</p>
                    <p class="info"><span class="tit">桌数</span>{{customerInfo.tableInfo || '暂无'}}</p>
                    <p class="info"><span class="tit">餐标</span>{{customerInfo.mealStandard || '暂无'}}</p>
                    <p class="info"><span class="tit">备注</span>{{customerInfo.note || '暂无'}}</p>
                </div>
            </div>

            <div class="box" v-for="item in customerInfo.extraInfoList" @click="showCustomerMore(item)">
                <div class="box-top">
                    <div class="left" v-if="item.businessLineType == 0">
                        <div class="business-name">{{item.businessLineTypeDesc}} {{item.grade}}</div>
                        <div class="info">
                            <div class="info-left">重点推荐：</div>
                            <div class="info-right">{{item.shopName || '暂无'}}</div>
                        </div>
                        <div class="info">
                            <div class="info-left">次要推荐：</div>
                            <div class="info-right">{{item.featureMap && item.featureMap.secondShopNames || '暂无'}}</div>
                        </div>
                        <div class="assign" v-if="item.assignSalesOptUser">{{item.assignSalesOptUser}} 于 {{formatTime(item.assignSalesTime)}} 分配</div>
                    </div>
                    <div class="left" v-if="item.businessLineType == 1">
                        <div class="business-name">{{item.businessLineTypeDesc}} {{item.grade}}</div>
                        <div class="info">
                            <div class="info-left">预算：</div>
                            <div class="info-right">{{item.featureMap && item.featureMap.budget || '暂无'}}</div>
                        </div>
                        <div class="info">
                            <div class="info-left">风格：</div>
                            <div class="info-right">{{item.featureMap && item.featureMap.style || '暂无'}}</div>
                        </div>
                        <div class="assign" v-if="item.assignSalesOptUser">{{item.assignSalesOptUser}} 于 {{formatTime(item.assignSalesTime)}} 分配</div>
                    </div>
                    <div class="right">
                        <div class="tip" v-if="item.flowStatusDesc">{{item.flowStatusDesc}}</div>
                        <div class="visit" v-if="item.visitShopCount != null">已看店<b>{{item.visitShopCount}}</b>次</div>
                    </div>
                </div>
                <div class="btn-area-fenpei" v-if="!item.assignSalesOptUser">
                    <div class="btn-fenpei" @click="setAssignSales($event, item)">分配顾问</div>
                </div>
            </div>
        </div>
        <div class="btn-area">
            <div class="btn-bottom">
                <div class="btn-edit" @click="showEditCustomer">编辑客户信息</div>
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
import MyHeader from './components/Header.vue'
import fetchJsonp from 'fetch-jsonp';
import Toast from '@dp/wepp-module-toast';
import CommonFun from '../commonJs/CommonFun.js'
import formatter from 'date-formatter'
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
            assignType: null,
            salesId: null,
            showEdit: false,
            businessLineType: null,
            customerId: search_params['yzsUserId']
        }
    },
    created(){
        this.$store.commit('getUserInfo')
        this.$store.commit('getCustomerDetail', this.customerId)
    },
    methods: {
        formatTime(time) {
            let date = new Date(time)
            return formatter(date, 'YYYY-MM-DD')
        },
        showCustomerMore(item){
            let url = `https://${host_name}/app/gfe-app-page-yzs-love-lab/customer-business-detail.html?businessLineType=${item.businessLineType}&yzsUserId=${this.customerId}`
            location.href = `./customer-business-detail.html?businessLineType=${item.businessLineType}&yzsUserId=${this.customerId}`
        },
        setAssignSales(event, item){
            event.stopPropagation()
            this.businessLineType = item.businessLineType
            this.$store.commit('getSalesList', {
                businessLineType: this.businessLineType
            })
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
            this.businessLineType = null
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
        },
        showEditCustomer() {
            location.href = './customer-edit.html?yzsUserId=' + this.customerId
        }
    },
    computed: {
        dangqi() {
            if (this.customerInfo.scheduleFrom && this.customerInfo.scheduleTo) {
                return this.customerInfo.scheduleFrom + '至' + this.customerInfo.scheduleTo
            } else if(this.customerInfo.scheduleFrom) {
                return this.customerInfo.scheduleFrom
            } else {
                return '暂无'
            }
        }
    },
    components: {
        MyHeader
    },
    watch: {
        '$store.state.customerDetailInfo': {
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
    .detail {
        .base-info {
            background: #Fff;
            padding-left: 1.5rem;
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
                    .tit {
                        color: #999;
                        display: inline-block;
                        margin-right: 1.5rem;
                    }
                }
            }
        }
        .box {
            border: 0.5px solid #e1e1e1;
            background: #fff;
            margin: 1rem 1.5rem 0;
            padding: 0 1rem 1rem;
            border-radius: 0.5rem;
            .box-top {
                display: flex;
            }
            .left {
                flex: 1;
                width: 0;
                .business-name {
                    font-size: 1.5rem;
                    line-height: 3.5rem;
                    color: #333;
                }
                .info {
                    font-size: 1.2rem;
                    line-height: 2rem;
                    color: #999;
                    margin-bottom: 0.3rem;
                    display: flex;
                    .info-right {
                        flex: 1;
                        width: 0;
                    }
                }
                .assign {
                    font-size: 1.2rem;
                    color: #999;
                    line-height: 2rem;
                }
            }
            .btn-area-fenpei {
                &:after {
                    clear: both;
                    content: '';
                    display: block;
                    height: 0;
                }
                .btn-fenpei {
                    width: 8.2rem;
                    font-size: 1.5rem;
                    height: 3.5rem;
                    line-height: 3.5rem;
                    text-align: center;
                    background: #ff66a1;
                    color: #fff;
                    float: right;
                    border-radius: 2px;
                }
            }
            .right {
                width: 7.2rem;
                margin-left: 1.5rem;
                .tip {
                    height: 2rem;
                    line-height: 2rem;
                    font-size: 1.2rem;
                    color: #ff66a1;
                    text-align: center;
                    background: #ffeff5;
                    border-radius: 2px;
                    margin-top: 0.75rem;
                }
                .visit {
                    text-align: center;
                    color: #999;
                    line-height: 2.7rem;
                    b {
                        font-style: normal;
                        color: #ff66a1;
                        display: inline-block;
                        margin: 0 0.2rem;
                    }
                }
            }
        }
    }
    .btn-area {
        height: 5.1rem;
        .btn-bottom {
            position: fixed;
            width: 100%;
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
            .btn-edit {
                margin: 0.5rem 1.5rem;
                height: 4rem;
                box-sizing: border-box;
                border: 1px solid #bbb;
                border-radius: 2px;
                font-size: 1.6rem;
                text-align: center;
                line-height: 3.8rem;
                color: #666;
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
            height: 4.5rem;
            line-height: 4.5rem;
            box-sizing: border-box;
            color: #ccc;
            font-size: 1.5rem;
            padding-left: 7rem;
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
                &:before {
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
                    &:before {
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