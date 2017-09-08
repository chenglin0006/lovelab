<template>
    <section class="sure-pop" @touchmove="touchMoveFun($event)">
        <div class="mask-div" @click="hideSureCancelFun"></div>
        <div class="sure-cancel-content-div">
            <div class="text" v-html="text"></div>
            <div class="sure-action-div flex-parent">
                <div class="sure-action flex-child  cancel" @click="hideSureCancelFun">取消</div>
                <div class="sure-action flex-child sure" @click="sureCancelVisitShopFun">确认</div>
            </div>
        </div>
    </section>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        props:['text'],
        components:{
        },
        mounted() {
        },
        methods:{
            hideSureCancelFun:function(){
                this.$emit('hidepop',false);
            },
            sureCancelVisitShopFun:function(){
                this.$emit('hidepop',true);
            },
            touchMoveFun:function(event){
                event.preventDefault();
                event.stopPropagation();
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .sure-pop{
        position: fixed;
        background-color: #fff;
        text-align: center;
        z-index: 100001;
        font-size: 1.7rem;
        color: #030303;
        .mask-div{

        }
        .sure-action-div{
            .borderline(#4D4D4D,top);
        }
        .sure-cancel-content-div{
            position: relative;
            z-index: 103;
            left: 5.3rem;
            right: 5.3rem;
            background-color: #fff;
            top: 25rem;
            border-radius: 1.2rem;
            position: fixed;
        }
        .close-btn{
            position: absolute;
            right: 1rem;
            font-size: 1.9rem;
            top: 0;
            color: #666;
        }
        .text{
            padding: 4.8rem;
        }
        .sure-action{
            height: 4.3rem;
            line-height: 4.3rem;
            font-size: 1.7rem;
            color: #0076FF;
            &.cancel{
                .borderline(#4D4D4D,right);
            }
        }
    }
</style>