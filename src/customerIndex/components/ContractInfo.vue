<template>
    <div class="contract" @click="showSignInfo">
        <div class="title">
            <div class="left">签约信息</div>
            <div class="right">共{{$store.state.contractNumber}}次签约</div>
        </div>
        <div class="info" v-if="$store.state.signOrderList.length > 0">
            <div class="info-item">
                <contract-item :config="$store.state.signOrderList[0]"></contract-item>
            </div>
        </div>
    </div>
</template>

<script>
import ContractItem from './ContractItem.vue'
import KNB from '@dp/knb'
import CommonFun from '../../commonJs/CommonFun.js'
let isInApp = CommonFun.getUaIsApp()
let host_name = location.hostname.indexOf('dianping') > -1 ? 'g.dianping.com' : 'g.51ping.com'
export default {
    props: ['config'],
    components: {
        ContractItem
    },
    methods: {
        showSignInfo() {
            let url = `https://${host_name}/app/gfe-app-page-yzs-love-lab/customer-sign-info.html?yzsUserId=${this.config}`
            if (isInApp) {
                KNB.openWebview({
                    url: url
                })
            } else {
                location.href = `./customer-sign-info.html?yzsUserId=${this.config}`
            }       
        }
    }
}
</script>

<style lang="less" scoped>
.contract {
    margin-top: 1rem;
    background: #fff;
    padding: 0 0 0 1.5rem;
    .title {
        padding: 0 1.5rem 0 0;
        height: 4.5rem;
        line-height: 4.5rem;
        .left {
            font-size: 1.5rem;
            font-family: PingFangSC-Medium;
            color: #111;
            float: left;
        }
        .right {
            float: right;
            font-size: 1.2rem;
            color: #999;
            &:after {
                width: 0.8rem;
                height: 1.3rem;
                content: '';
                float: right;
                margin-top: 1.6rem;
                margin-left: 1rem;
                background: url(../img/icon_next@3x.png) center/contain no-repeat;
            }
        }
    }
    .info {
        padding-right: 1.5rem;
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
        .info-item {
            margin-top: 1.5rem;
        }
        padding-bottom: 1.5rem;
    }
}
</style>

