<template>
    <section class="invite-summary-pop-section">
        <div class="mask-div" @click="hidePop"></div>
        <div class="content-div">
            <div class="close-btn" @click="hidePop"></div>
            <div class="title">邀约报表</div>
            <div class="summary-content-div">
                <div class="summary-content">
                    <div class="summary-title">婚宴邀约</div>
                    <div class="summary-tag-div flex-parent">
                        <div class="summary-tag-item flex-child">顾问</div>
                        <div class="summary-tag-item flex-child">邀约</div>
                        <div class="summary-tag-item flex-child">已到店</div>
                        <div class="summary-tag-item flex-child">取消</div>
                    </div>
                    <section class="list-content">
                        <div class="summary-number-div flex-parent" v-for="(item,index) in  hySummaryList">
                            <div class="summary-num-item flex-child">{{item.salesName}}</div>
                            <div class="summary-num-item flex-child">{{item.appointmentManCount}}/{{item.appointment}}</div>
                            <div class="summary-num-item flex-child">{{item.appointmentDoneManCount}}/{{item.appointmentDone}}</div>
                            <div class="summary-num-item flex-child">{{item.appointmentCancelManCount}}/{{item.appointmentCancel}}</div>
                        </div>
                    </section>
                </div>
                <div class="summary-content">
                    <div class="summary-title">婚庆邀约</div>
                    <div class="summary-tag-div flex-parent">
                        <div class="summary-tag-item flex-child">顾问</div>
                        <div class="summary-tag-item flex-child">邀约</div>
                        <div class="summary-tag-item flex-child">已到店</div>
                        <div class="summary-tag-item flex-child">取消</div>
                    </div>
                    <section class="list-content">
                        <div class="summary-number-div flex-parent" v-for="(item,index) in  hqSummaryList">
                            <div class="summary-num-item flex-child">{{item.salesName}}</div>
                            <div class="summary-num-item flex-child">{{item.appointmentManCount}}/{{item.appointment}}</div>
                            <div class="summary-num-item flex-child">{{item.appointmentDoneManCount}}/{{item.appointmentDone}}</div>
                            <div class="summary-num-item flex-child">{{item.appointmentCancelManCount}}/{{item.appointmentCancel}}</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();

    export default{
        data(){
            return{
               
            }
        },
        props:['hqSummaryList','hySummaryList'],
        components:{
        },
        mounted() {
        },
        methods:{
            hidePop:function(){
                this.$emit('hidepop');
            },
            touchMoveFun:function(event,text){
                if (text=='scroll') {
                    if(this.hqSummaryList.length+this.hySummaryList.length<=4){
                        event.preventDefault();
                    }
                } else {
                    event.preventDefault();
                }
                event.stopPropagation();
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .invite-summary-pop-section{
        position: fixed;
        top: 10rem;
        left: 1.5rem;
        right: 1.5rem;
        font-size: 1.5rem;
        z-index: 20;
        .content-div{
            color: #666;
            font-size: 1.3rem;
            background: #fff;
            position: relative;
            z-index: 100;
            text-align: center;
            position: fixed;
            top: 4rem;
            left: 1rem;
            right: 1rem;
            border-radius: .3rem;
            padding-bottom: 3rem;
            .close-btn{
                position: absolute;
                right: 1rem;
                top: 1rem;
                width: 1rem;
                height: 1rem;
                background-repeat: no-repeat;
                background-image: url('../../commonImg/close-btn-3.png');
                background-size: cover;
            }
            .title{
                font-family: PingFangSC-Medium;
                font-size: 1.5rem;
                color: #333333;
                margin-bottom: 1.5rem;
                padding-top: 1.5rem;
            }
        }
        .bottom-action-div{
            display:flex;
            display: box;
            display: -webkit-box;
            display: -ms-flexbox;
            padding: 1rem 10rem;
            border-top: solid .1rem #f2f2f2;
            .action-btn{
                flex:1;
                -webkit-box-flex: 1;
                -ms-box-flex: 1; 
                -ms-flex: 1;
                line-height: 4rem;
                border:solid .1rem @mainColor;
                border-radius: .3rem;
                color: @mainColor;
                margin-right: 1rem;
                &:last-child{
                    margin-right: 0;
                }
                &.active{
                    background-color: @mainColor;
                    color: #fff;
                }
            }
        }
    }
    .summary-content-div{
        max-height: 40.7rem;
        overflow: auto;
    }
    .summary-content{
        padding: 0 1.5rem;
        font-size: 1.2rem;
        color: #777;
        margin-bottom: 1.5rem;
        .summary-title{
            font-size: 1.4rem;
            text-align: left;
            color: #333333;
            margin-bottom: 1rem;
        }
        .summary-tag-div{
            background-color: #f0f0f0;
            line-height: 3.5rem;
        }
        .list-content{
            // max-height: 20rem;
            // overflow: auto;
        }
        .summary-number-div{
            line-height: 3.5rem;
            .borderline(#f0f0f0,bottom);
            &:last-child{
                font-family: PingFangSC-Medium;
                font-size: 1.2rem;
                color: #333;
            }
        }
    }
    .flex-child{
        width: 0;
    }
</style>