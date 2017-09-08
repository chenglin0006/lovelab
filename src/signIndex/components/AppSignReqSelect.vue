<template>
    <section class="history-type-section">
      <div class="mask-div" @click="hideTypePop" @touchmove="touchMoveFun($event)"></div>
      <div class="history-type-list">
          <div class="history-type-item" :class="{'active':item.active}" v-for="item in signTypeList" @click="chooseAction(item)">
              <div class="text">{{item.text}}</div>
          </div>
      </div>
      <div class="cancel-btn" @click="hideTypePop">取消</div>
    </section>
</template>
<script>
    var mDomain = document.domain.indexOf("dianping")==-1? '//m.51ping.com':'//m.dianping.com';

    export default{
        data(){
            return{
                activeSignTypeObj:{}
            }
        },
        props:['signTypeList'],
        components:{
        },
        mounted() {

        },
        methods:{
            chooseAction:function(item){
                this.signTypeList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.text==item.text){
                        ele.active = true;
                        this.activeSignTypeObj = item;
                    }
                });
                this.$emit('hidetypepop',this.activeSignTypeObj);
            },
            hideTypePop:function(){
                this.$emit('hidetypepop');
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
    .history-type-section{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        font-size: 1.5rem;
        color: #333;
        z-index: 100;
        .history-type-list{
            position: relative;
            z-index: 100;
            background-color: white;
            border-radius: 1.2rem;
            .history-type-item{
                line-height: 5.7rem;
                text-align: center;
                .borderline(#cbcbcb,bottom);
                color: #333333;
                &:last-child:after{
                    border-bottom: none;
                }
                &.active{
                    color: @mainColor;
                }
            }
        }
        .cancel-btn{
            position: relative;
            z-index: 100;
            background-color: white;
            line-height: 5.5rem;
            text-align: center;
            border-radius: 1.2rem;
            margin-top: 1rem;
            font-family: PingFangSC-Regular;
            font-size: 1.5rem;
            color: #FE3824;
        }
    }
</style>