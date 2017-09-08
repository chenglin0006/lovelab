<template>
    <div class="user-tip" v-if="tips">
        <slot v-if="tips.length > 4">
            <div v-if="tips" class="userTips" :style="{width: tips.length * 8.3 + 'rem'}">
                <div class="item" v-for="item in tips" @click="showListWithUserStatus(item)">
                    <p class="title">{{item.desc}}</p>
                    <p class="num">{{item.count}}</p>
                </div>
            </div>
        </slot>
        <slot v-else>
            <div v-if="tips" class="userTips-flex">
                <div class="item" v-for="item in tips" @click="showListWithUserStatus(item)">
                    <p class="title">{{item.desc}}</p>
                    <p class="num">{{item.count}}</p>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import fetchjsonp from 'fetch-jsonp'
export default {
    data(){
        return {
            tips: this.$store.state.tips
        }
    },
    methods:{
        showListWithUserStatus(item){
            sessionStorage.setItem('flowStatus', JSON.stringify(item))
            location.href = './customer-status-list.html'
        }
    },
    watch:{
        '$store.state.tips': {
            handler: function(val){
                this.tips = val
            },
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>
    ::-webkit-scrollbar {
        display: none;
    }
    .user-tip {
        height: 7.5rem;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        overflow-x: scroll;
        /*border-bottom: 0.5px solid #e1e1e1;*/
        /*&:after {
            content: '';
            width: 200%;
            height: 1px;
            display: block;
            position: absolute;
            background: #e1e1e1;
            transform: scale(0.5);
            left: -50%;
            bottom: 0;
        }*/
        .userTips {
            height: 7.5rem;
            position: relative;
            &:after {
                content: '';
                display: block;
                clear: both;
                width: 200%;
                height: 1px;
                position: absolute;
                background: #e1e1e1;
                transform: scale(0.5);
                left: -50%;
                bottom: 0;
            }
            .item {
                float: left;
                width: 8.3rem;
                height: 100%;
                text-align: center;
                box-sizing: border-box;
            }
        }
        .title {
            font-size: 1.4rem;
            color: #333;
            line-height: 2.4rem;
            margin-top: 1.2rem;
            text-align: center;
        }
        .num {
            font-size: 1.6rem;
            line-height: 2.6rem;
            color: #ff66a1;
            text-align: center;
        }
        .userTips-flex {
            height: 2.7rem;
            display: flex;
            height: 100%;
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
            .item {
                flex: 1;
                width: 0;
                height: 100%;
                box-sizing: border-box;
            }
        }
    }
</style>