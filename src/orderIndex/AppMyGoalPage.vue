<template>
    <section class="app-goal-page">
        <div class="app-my-goal">
            <div class="title-div">
                8月个人指标
            </div>
            <div class="num-boxes">
                <div class="num-box">
                    <div class="num-title">
                        邀约数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        订单数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        到店数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        订单金额
                    </div>
                    <div class="num">
                        ￥0
                    </div>
                </div>
            </div>
        </div>
        <div class="app-my-goal">
            <div class="title-div">
                7月个人指标
            </div>
            <div class="num-boxes">
                <div class="num-box">
                    <div class="num-title">
                        邀约数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        订单数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        到店数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        订单金额
                    </div>
                    <div class="num">
                        ￥0
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import url('../commonLess/border.less');
    .app-goal-page{
        .app-my-goal{
            background: #fff;
            margin-bottom:1.5rem;
        }
        .title-div{
            margin-left:1.5rem;
            padding:1.5rem 0;
            color:#111;
            font-size:1.5rem;
            font-weight:600;
            background: #fff;
            .borderline(#e1e1e1,bottom);
        }
        .num-boxes{
            font-size:0;
            .num-box{
                padding:1.5rem 0;
                width:25%;
                text-align: center;
                display: inline-block;
                vertical-align: top;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                line-height:1;
            }
            .num-title{
                color:#999;
                font-size:1.2rem;
                margin-bottom:1.5rem;
            }
            .num{
                color:#333;
                font-size:1.4rem;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
            }
        },
        components:{
        }
    }
</script>
