<template>
    <section class="history-type-section">
      <div class="mask-div" @click="hideTypePop"></div>
      <div class="history-type-list">
          <div class="history-type-item" :class="{'active':item.active}" v-for="item in historyTypeList" @click="chooseAction(item)">
              <div class="text">{{item.text}}</div>
          </div>
      </div>
      <div class="cancel-btn" @click="hideTypePop">取消</div>
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
                activeHistoryTypeObj:{}
            }
        },
        props:['historyTypeList','historyType'],
        components:{
        },
        mounted() {
            this.initActive();
            this.$watch('historyType',()=>{
                this.initActive();
            });
        },
        methods:{
            initActive:function(){
                this.historyTypeList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.text==this.historyType){
                        ele.active = true;
                        this.activeHistoryTypeObj = ele;
                    }
                });
            },
            chooseAction:function(item){
                this.historyTypeList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.text==item.text){
                        ele.active = true;
                        this.activeHistoryTypeObj = item;
                    }
                });
                this.$emit('hidetypepop',this.activeHistoryTypeObj);
            },
            hideTypePop:function(){
                this.$emit('hidetypepop');
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .history-type-section{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        font-size: 15px;
        .history-type-list{
            position: relative;
            z-index: 20;
            background-color: white;
            border-radius: 5px;
            .history-type-item{
                line-height: 55px;
                text-align: center;
                border-bottom: solid 1px #f2f2f2;
                margin-left: 5px;
                color: #666;
                &:last-child{
                    border-bottom: none;
                }
                &.active{
                    color: #0099ff;
                }
            }
        }
        .cancel-btn{
            position: relative;
            z-index: 20;
            background-color: white;
            line-height: 55px;
            text-align: center;
            border-radius: 5px;
            margin-top: 10px;
            color: #666;
        }
    }
</style>