<template>
    <section class="valid-schedule-pop-section pop-section">
        <div class="mask-div" @click="hidePopFun" @touchmove="touchMoveMaskFun($event)"></div>
        <div class="valid-schedule-content-div pop-content">
            <img class="close-btn" @click="hidePopFun" src="../../commonImg/close-btn-3.png">
            <div class="valid-title">
                <p>可邀约档期</p>
                <p><span>{{item.stockList.length}}个</span>档期可邀约</p>
            </div>
            <div class="valid-list-div" @touchmove="touchMoveFun($event)">
                <div class="valid-item" v-for="(ele,index) in item.stockList">
                    <div class="valid-item-date">{{ele.date}}</div>
                    <div class="valid-item-week">{{ele.week}}</div>
                </div>
            </div>
            <div class="valid-btn" @click="hidePopFun">确定</div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['item'],
    components: {
    },
    watch:{
    },
    computed:{
    },
    mounted(){
    },
    methods:{
        hidePopFun:function(){
            this.$emit('hidepop');
        },
        touchMoveMaskFun:function(event){
            event.preventDefault();
            event.stopPropagation();
        },
        touchMoveFun:function(event){
            // event.stopPropagation();
        }
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import url('../../commonLess/util');
    @import url('../../commonLess/star');
    @import url('../../commonLess/border');
    .valid-schedule-pop-section{
        font-size: 1.5rem;
        color: #666;
        .valid-schedule-content-div{
            text-align: center;
            padding: 2.8rem 1.5rem 1.5rem 1.5rem;
            border-radius: .3rem;
            .valid-title{
                margin-bottom: 2.5rem;
                font-size: 1.8rem;
                font-family: PingFangSC-Regular;
                color: #333333;
                p{
                    margin-bottom: .5rem;
                }
                span{
                    color: @mainColor;
                }
            }
            .valid-list-div{
                padding: 0 1rem;
                border:solid 1px #e1e1e1;
                min-height: 15rem;
                color: #666;
                max-height: 25rem;
                overflow: scroll;
                .valid-item{
                    .borderline(#e1e1e1,bottom);
                    &:last-child{
                        &:after{
                            border:none;
                        }
                    }
                }
                .valid-item-date,.valid-item-week{
                    display: inline-block;
                    width: 49%;
                    line-height: 5rem;
                }
            }
            .valid-btn{
                line-height: 4.4rem;
                background: @mainColor;
                color: #fff;
                font-size: 1.8rem;
                margin-top: 1.4rem;
                border-radius: .4rem;
            }
        }
    }
</style>
