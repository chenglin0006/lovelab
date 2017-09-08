<template>
    <div class="contract-item">
        <div class="title">
            <span class="name">{{config.businessline}}</span>
            <span class="signTime">{{config.signTime}} 签约</span>
            <span class="salesName">签约顾问：{{config.salesName}}</span>
        </div>
        <div class="content">
            <div class="line" v-if="config.shopName">
                <div class="left">签约酒店</div>
                <div class="right">{{config.shopName}}</div>
            </div>
            <div class="line" v-if="config.schedule">
                <div class="left">宴会档期</div>
                <div class="right">{{config.schedule}}</div>
            </div>
            <div class="line" v-if="config.transAmount">
                <div class="left">签约总价</div>
                <div class="right">¥{{config.transAmount}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['config']
}
</script>

<style lang="less" scoped>
.contract-item {
    border: 0.5px solid #e1e1e1;
    .title {
        height: 3.8rem;
        &:after {
            content: '';
            clear: both;
            display: block;
            height: 0;
        }
        position: relative;
        &:before {
            content: '';
            width: 0.3rem;
            height: 1.5rem;
            position: absolute;
            left: 0;
            top: 50%;
            background: #ff66a1;
            transform: translate(0, -50%);
        }
        background: #ffeff5;
        font-size: 1.2rem;
        color: #777;
        line-height: 3.8rem;
        .name {
            font-size: 1.5rem;
            color: #333;
            float: left;
            margin-left: 1rem;
            margin-right: 1.5rem;
        }
        .signTime {
            float: left;
            margin-right: 1.5rem;
        }
    }
    .content {
        padding: 1rem 0;
        .line {
            padding: 0 1rem;
            line-height: 2.4rem;
            display: flex;
            .left {
                font-size: 1.4rem;
                color: #999;
                width: 7.1rem;
            }
            .right {
                flex: 1;
                width: 0;
                font-size: 1.3rem;
                color: #333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>
