 <!--
    多选＋保存按钮的组件 此组件中有保存按钮，所以hideHotelSearchFun方法中不做任何处理
 -->
<template>
    <section class="normal-recommand-section">
        <header class="normal m-header title-header">
            <img class="btn-back js_back" @click="saveAction('hide')" src="../../commonImg/back-head.png" >
            <h1>{{titleText}}</h1>
            <a href="javascript:void(0);" @click="saveAction('save')" class="btn-save js_save">确认</a>
        </header>
       <app-select-search :option-list="optionList" :select-model="selectListHere" :placeholder-obj="placeholderObj" @hidepop="hideHotelSearchFun" @setselectdata="hideHotelSearchFun" :auto-focus="autoFocus" :multiple="multiple" :null-text="nullText"></app-select-search>
       <div class="bottom-div" v-show="selectListHere.length">
            <div class="select-hotel-list">
                <div class="hotel-item-div">
                <div class="hotel-item" v-for="item in selectListHere">
                   <div class="text-ellipse">{{item.label}}</div>
                   <span class="delete-span" @click="deleteHotel(item)">X</span>
                </div>
                </div>
            </div>
       </div>
    </section>
</template>
<script>
    import AppSelectSearch from '../../inviteIndex/components/AppSelectSearch.vue';
    import formatter from 'date-formatter';
    import { mapGetters } from 'vuex';
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = document.domain.indexOf("dianping")==-1? '//m.51ping.com':'//m.dianping.com';
    export default{
        data(){
            return{
                multiple:true,
                selectListHere:[]
            }
        },
        watch:{
        },
        computed:{
        },
        props:['selectList','optionList','placeholderObj','autoFocus','nullText','titleText'],
        components:{
            AppSelectSearch
        },
        watch:{
            selectList:function(){
                this.selectListHere = CommonFun.deepClone(this.selectList);
            }
        },
        mounted() {
            this.selectListHere = CommonFun.deepClone(this.selectList);
        },
        methods:{
            hideHotelSearchFun:function(obj){
                // this.selectList = obj;
            },
            deleteHotel:function(item){
                this.selectListHere.forEach((ele,index)=>{
                    if(item.value == ele.value){
                        this.selectListHere.splice(index,1);
                    }
                });
            },
            saveAction:function(text){
                if(text=='save'){
                    this.$emit('hidechoosepop',this.selectListHere);
                } else {
                    this.$emit('hidechoosepop');
                }
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .normal-recommand-section{
        font-size: 12px;
        color: #666;
        z-index: 15;
        bottom: 0;
        .mask-div{
            z-index: 11;
            display: inherit;
        }
        .bottom-div{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 12;
            padding: 1.5rem;
            padding-bottom: .5rem;
            background-color: #fff;
            .select-hotel-list{
                background-color: #fff;
                .hotel-item-div{
                    max-height: 200px;
                    overflow: auto;
                }
                .hotel-item{
                    background: #FFEFF5;
                    border: 1px solid #FF66A1;
                    border-radius: 5rem;
                    font-family: PingFangSC-Medium;
                    font-size: 1.2rem;
                    color: #FF66A1;
                    line-height: 3rem;
                    padding: 0 1rem;
                    margin-right: 1rem;
                    margin-bottom: 1rem;
                    div{
                        max-width: 10rem;
                        vertical-align: top;
                    }
                }
                .delete-span{
                    padding-left: 10px;
                }
                div{
                    display: inline-block;
                }
            }
            .save-btn-div{
                background-color: #fff;
                padding: 10px 15px;
                border-top:solid 1px #f2f2f2;

                background-color: white;
                .save-btn{
                    background-color: @mainColor;
                    color: white;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 5px;
                }
            }
        }
    }
</style>