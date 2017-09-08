<template>
    <section class="history-reason-section">
      <div class="mask-div" @click="hideReasonPop"></div>
      <div class="history-reason-list">
            <div class="stop-reason-title">请选择终止理由</div>
          <div class="history-reason-item" :class="{'active':item.active}" v-for="(item,index) in reasonList" @click="hideReasonPop(item,index)">
              <div class="text">{{item.text}}</div>
          </div>
      </div>
    </section>
</template>
<script>
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var gDomain = CommonFun.getGDomain();
    var eDomain = CommonFun.getEDomain();
    mDomain = "//m.51ping.com";

    export default{
        data(){
            return{
                
            }
        },
        props:['stopReasonText','reasonList'],
        components:{
        },
        mounted() {
            this.initData();
        },
        methods:{
            initData:function(){
                this.reasonList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.text == this.stopReasonText){
                        ele.active = true;
                    }
                });
            },
            hideReasonPop:function(item,index){
                this.reasonList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.text == item.text){
                        ele.active = true;
                    }
                });
                this.$emit('hidestopreason',item);
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .history-reason-list{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        z-index: 20;
        padding-left: 10px;
        max-height: 300px;
        overflow: auto;
        .stop-reason-title{
            font-family: PingFangSC-Regular;
            font-size: 1.5rem;
            color: #999999;
            line-height: 4.5rem;
            padding-left: 1.5rem;
            .borderline(#d7d7d7,bottom);
        }
        .history-reason-item{
            line-height: 4.5rem;
            text-align: left;
            margin-left: 1.5rem;
            .borderline(#d7d7d7,bottom);
            color: #333333;
            &:last-child:after{
                border-bottom: none;
            }
            &.active{
                background-image: url('../img/active-pink.png');
                background-repeat: no-repeat;
                background-position: 96% center;
                background-size: 1.1rem;
            }
        }
    }
</style>