<template>
    <div class="default">
        <div class="header" :class="{isIOS: isIOS}">
            <div class="header-fixed">
                <my-header :config="{isIOS: isIOS, isSearch:true, hasBack: false, hasSearchIcon: false, text: ''}" @dosearched="dosearched"></my-header>
            </div>
        </div>
        <div class="scrollArea" :class="{isIOS: isIOS}">
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
        </div>
    </div>
</template>

<script>
import Toast from '@dp/wepp-module-toast'
import MyHeader from './components/Header.vue'
import UserTabs from './components/UserTabs.vue'
import UserInfo from './components/UserInfo.vue'
import CommonFun from '../commonJs/CommonFun.js'
import KNB from '@dp/knb'
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
    created() {
        let _self = this
        this.$store.commit('getUserInfo')
        this.$nextTick(function () {
            _self.addScrollEvent()
        });
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
    methods: {
        dosearched() {
            this.showBottom = true
        },
        addScrollEvent(){
            let _self = this
            let dom = document.querySelector('.scrollArea')
            let wHeight = dom.offsetHeight
            dom.addEventListener('scroll', function(){
                if(!_self.$store.state.isLoading){
                    if (dom.scrollTop + wHeight + 10 > document.querySelector('.user-list').offsetHeight) {
                        if(_self.$store.state.pageIndex < _self.$store.state.pageCount) {
                            _self.$store.commit('searchNextPage')
                        }
                    }
                }
            })
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
        UserInfo,
        MyHeader
    }
}
</script>

<style scoped lang="less">
.default {
    .header {
        height: 4.4rem;
        &.isIOS {
            height: 6.4rem;
        }
        .header-fixed {
            position: fixed;
            background: #fff;
            width: 100%;
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
    }
    .scrollArea {
        position: absolute;
        top: 4.4rem;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        &.isIOS {
            top: 6.4rem;
        }
    }
}
</style>