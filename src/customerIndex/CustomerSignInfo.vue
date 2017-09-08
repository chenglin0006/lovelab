<template>
    <div class="sign-info-page">
        <div class="sign-list">
            <slot v-for="item in $store.state.signOrderList">
                <div class="sign-li" @click="showOrder(item)">
                    <contract-item :config="item"></contract-item>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import Toast from '@dp/wepp-module-toast'
import MyHeader from './components/Header.vue'
import ContractItem from './components/ContractItem.vue'
import CommonFun from '../commonJs/CommonFun.js'
import KNB from '@dp/knb'
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
            isIOS: null,
            isAndroid: null,
            customerId: search_params['yzsUserId']
        }
    },
    mounted(){
        this.$store.commit('getSignInfo', this.customerId)
    },
    methods: {
        showOrder(item){
            let url = `https://${host_name}/app/gfe-app-page-yzs-love-lab/order-detail.html?orderId=${item.id}`
            if (isInApp) {
                KNB.openWebview({
                    url: url
                })
            } else {
                location.href = `./order-detail.html?orderId=${item.transAmount}`
            }
        }
    },
    watch: {
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
    },
    components: {
        MyHeader,
        ContractItem
    }
}
</script>

<style lang="less" scoped>
.sign-info-page {
    .sign-list {
        padding: 0 1.5rem 1.5rem;
        .sign-li {
            margin-top: 1.5rem;
            background: #fff;
        }
    }
}
</style>
