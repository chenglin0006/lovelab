<template>
    <section class="hotel-detail-area-set-section">
        <div class="set-list-div">
            <div class="set-item" :class="{'active':item.active}" :key="index" v-for="(item,index) in setItemList" @click="chooseSetItemFun(item)">{{item.text}}</div>
        </div>
        <div class="img-list-div">
            <div class="pic-div" :class="{'right-img':(index+1)%2==0}" :key="index" v-for="(item,index) in [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]">
                <img src="//p0.meituan.net/dpdeal/6bc5fe5209eaba1deb1d09fa2f305d2a103281.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0" >
            </div>
        </div>
    </section>
</template>

<script>
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
import qs from 'qs';
import KNB from '@dp/knb';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js'
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            setItemList:[{text:'大厅',value:1001,active:true},{text:'厨房',value:1002,active:false},{text:'草坪',value:1003,active:false},{text:'停车场',value:1004,active:false},{text:'走廊',value:1005,active:false}]
        }
    },
    props:[],
    components: {
    },
    watch:{
    },
    computed:{
    },
    mounted(){
        this.shopId = Util.getUrlParam('shopId')?Util.getUrlParam('shopId'):0;
    },
    methods:{
        chooseSetItemFun:function(item){
            this.setItemList.forEach((ele,index)=>{
                ele.active = false;
            });
            item.active = true;
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    .set-list-div{
        border-spacing: 2rem;
        overflow-y: hidden;
        background: #fff;
        .set-item{
            display: table-cell;
            overflow: hidden;
            min-width: 8rem;
            line-height: 3rem;
            background: #f2f2f2;
            border-radius: .5rem;
            text-align: center;
            &.active{
                background: @mainColor;
                color: #fff;
            }
        }
    }
    .img-list-div{
        font-size: 0;
        padding: 1rem;
        background: #fff;
        .pic-div{
            display: inline-block;
            width: 48.5%;
            padding-bottom: 27.5%;
            margin-right: 1rem;
            position: relative;
            margin-bottom: 1rem;
            &.right-img{
                margin-right: 0;
            }
            img{
                width: 49%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                object-fit:cover;
            }
        }
    }
</style>
