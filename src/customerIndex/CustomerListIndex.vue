<template>
    <div class="default">
        <div class="header" :class="{hasTips: $store.state.user && $store.state.user.keyRole == '顾问', isIOS: isIOS}">
            <div class="header-fixed" v-if="$store.state.user">
                <my-header :config="{isIOS: isIOS, isSearch:false, hasBack: false, hasAddIcon: $store.state.user.keyRole == '售前' ? true : false, hasSearchIcon: true, text: '客户'}"></my-header>
                <user-tips v-if="$store.state.user && $store.state.user.keyRole == '顾问'"></user-tips>
                <user-tabs :config="{type: $store.state.user.keyRole == '售前' ? 2 : 0}"></user-tabs>
            </div>
        </div>
        <div class="user-list">
            <slot v-for="item in $store.state.customerList">
                <user-info :config="item"></user-info>
            </slot>
        </div>
        <slot v-if="showBottom">
            <div class="load-status" v-if="$store.state.isLoading == 'none'">没有相关结果</div>
            <div class="load-status" v-else-if="$store.state.isLoading == 'end'">没有更多了</div>
            <div class="load-status" v-else-if="$store.state.isLoading">加载中</div>
            <div class="load-status" v-else>下拉加在更多</div>
        </slot>
        <app-bottom-tab :active-text="{text:'customer'}"></app-bottom-tab>
    </div>
</template>

<script>
import Toast from '@dp/wepp-module-toast'
import MyHeader from './components/Header.vue'
import UserTips from './components/UserTips.vue'
import UserTabs from './components/UserTabs.vue'
import UserInfo from './components/UserInfo.vue'
import AppBottomTab from '../commonApp/AppBottomTab.vue'
import KNB from '@dp/knb'
import CommonFun from '../commonJs/CommonFun.js'
var mDomain = CommonFun.getDomain();

export default {
    data(){
        return {
            domain: mDomain,
            hasTips: null,
            isIOS: null,
            isAndroid: null,
            showBottom: false
        }
    },
    created(){
        this.$store.commit('getUserInfo')
        let wHeight = window.screen.height
        let _self = this
        this.showBottom = true
        document.addEventListener('scroll', function(){
            if(!_self.$store.state.isLoading){
                if (window.scrollY + wHeight + 10 > document.body.offsetHeight) {
                    if(_self.$store.state.pageIndex < _self.$store.state.pageCount) {
                        _self.$store.commit('getList', {
                            index: _self.$store.state.pageIndex + 1
                        })
                    }
                }
            }
        })
    },
    mounted(){
        KNB.ready(()=>{
            KNB.getUA({
                success: (info)=>{
                    this.isIOS = info && info.osName == 'ios' ? true : false
                    this.isAndroid = info && info.osName == 'android' ? true : false
                },
                fail: function(err){}
            });
            KNB.setNavigationBarHidden({
              flag: 1, //0表示显示，1表示隐藏
              success: function(){},
              fail: function(){}
            });
        });
    },
    watch:{
        '$store.state.user': {
            handler: function(val){
                this.$store.commit('getList', {
                    index: 1
                })
                if (val.keyRole == '售前') {
                    this.$store.commit('getAllPersonByRole', '售前')
                } else if (val.keyRole == '顾问') {
                    this.$store.commit('getTipsInfo')
                    if (val.isBoss) {
                        this.$store.commit('getAllPersonByRole', '顾问')
                    } else {
                        this.$store.commit('getHotelInfo')
                    }
                } else {
                    if (val.isBoss) {
                        this.$store.commit('getAllPersonByRole', '顾问')
                    } else {
                        this.$store.commit('getHotelInfo')
                    }
                }
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
    },
    components: {
        UserTips,
        UserTabs,
        UserInfo,
        AppBottomTab,
        MyHeader
    }
}
</script>

<style scoped lang="less">
.default {
    .header {
        height: 8.8rem;
        &.hasTips {
            height: 15.9rem;
            &.isIOS {
                height: 17.9rem;
            }
        }
        &.isIOS {
            height: 10.8rem;
        }
        .header-fixed {
            position: fixed;
            background: #fff;
            width: 100%;
            z-index: 1;
        }
    }
    .user-list {
        padding: 0 1.5rem 0;
    }
    .load-status {
        text-align: center;
        font-size: 1.4rem;
        line-height: 3rem;
        color: #999;
        padding-bottom: 6.3rem;
    }
}
</style>