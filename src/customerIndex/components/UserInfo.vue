<template>
    <div class="user-info" @click="showDetail">
        <slot v-if="$store.state.user.keyRole == '顾问' || $store.state.user.keyRole == '服务'">
            <div class="title">
                <span class="user-name">{{config.useName}}</span>
                <span class="user-phone">{{config.userPhone}}</span>
            </div>
            <div class="box" v-for="item in config.extraInfoList">
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
                    <div class="assign" v-if="item.assignSalesUser">{{item.assignSalesUser}} 于 {{formatTime(item.assignSalesTime)}} 分配</div>
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
                    <div class="assign" v-if="item.assignSalesUser">{{item.assignSalesUser}} 于 {{formatTime(item.assignSalesTime)}} 分配</div>
                </div>
                <div class="right">
                    <div class="tip" v-if="item.flowStatusDesc">{{item.flowStatusDesc}}</div>
                    <div class="visit">已看店<b>{{item.visitShopCount}}</b>次</div>
                </div>
            </div>
        </slot>
        <slot v-if="$store.state.user.keyRole == '售前'">
            <div class="title">
                <span class="user-name">{{config.useName}}</span>
                <span class="user-phone">{{config.userPhone}}</span>
            </div>
            <div class="sc-info">
                <p class="sc-line" v-for="item in config.extraInfoList">
                    <span class="sc-line-left">{{item.businessLineTypeDesc}}</span>
                    <span class="sc-line-center">顾问：{{item.salesName || '暂无'}}</span>
                    <span class="sc-line-right" v-if="item.flowStatusDesc">{{item.flowStatusDesc}}</span>
                </p>
            </div>
            <div class="sc-bottom" v-if="config.customerServiceName">{{config.customerServiceName}} 于 {{formatTime(config.addTime)}} 创建</div>
        </slot>
    </div>
</template>

<script>
import formatter from 'date-formatter';
import CommonFun from '../../commonJs/CommonFun.js'
let isLLApp = CommonFun.getUaIsApp()
let base_url = document.domain.indexOf("dianping.com") > -1 ? 'https://g.dianping.com/app/gfe-app-page-yzs-love-lab' : 'https://g.51ping.com/app/gfe-app-page-yzs-love-lab'
export default {
    props: ['config'],
    methods: {
        formatTime(time){
            return formatter(new Date(time), 'YYYY-MM-DD hh:mm:ss')
        },
        showDetail(){
            location.href = `./customer-detail.html?yzsUserId=${this.config.yzsUserId}`
        }
    }
}
</script>

<style lang="less" scoped>
.user-info {
    background: #fff;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-top: 1rem;
    border: 0.5px solid #e1e1e1;
    .title {
        height: 3.6rem;
        line-height: 3.6rem;
        font-size: 1.6rem;
        color: #111;
        padding-top: 0.6rem;
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
        .user-name {
            display: inline-block;
            margin-right: 1rem;
            font-family: 'PingFangSC-Medium';
        }
    }
    .box {
        display: flex;
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
        .left {
            flex: 1;
            width: 0;
            padding-bottom: 1rem;
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
                font-size: 1.2rem;
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
    .sc-info {
        padding: 1rem 0 0.5rem;
        .sc-line {
            height: 2rem;
            line-height: 2rem;
            font-size: 1.4rem;
            padding-bottom: 0.5rem;
            &:after {
                content: '';
                display: block;
                clear: both;
            }
            .sc-line-left {
                width: 7.6rem;
                float: left;
                color: #333;
            }
            .sc-line-center {
                width: 14.8rem;
                float: left;
                color: #999;
            }
            .sc-line-right {
                width: 7.2rem;
                float: left;
                height: 2rem;
                font-size: 1.2rem;
                background: #ffeff5;
                color: #ff66a1;
                text-align: center;
                border-radius: 2px;
            }
        }
    }
    .sc-bottom {
        font-size: 1.2rem;
        line-height: 2rem;
        padding-bottom: 1rem;
        color: #999;
    }
}
</style>
