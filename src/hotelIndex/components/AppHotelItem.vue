<template>
    <section class="hotel-item-section" @click="toHotelDetaiFun" v-if="item">
        <img class="pic-div" v-if="item&&item.picPath" :src="item.picPath">
        <img class="pic-div" v-else src="">
        <div class="hotel-info-div">
            <div class="hotel-main-div">
                <div class="hotel-name-div text-ellipse">{{item.shopName}}</div>
                <div class="hotel-level-div">
                    <img v-if="item.level==20" src="../img/list-level-a.png">
                    <img v-if="item.level==30" src="../img/list-level-b.png">
                    <img v-if="item.level==40" src="../img/list-level-c.png">
                    <img v-if="item.level==10" src="../img/list-level-s.png">
                    <img class="ss-level" v-if="item.level==6" src="../img/list-level-ss.png">
                </div>
            </div>
            <div class="hotel-desc-div">
                <span class="price-table-span" v-show="item.minPrice">
                    <span class="number">{{item.minPrice}}</span>
                    <span class="unit">元/桌起</span>
                </span>
                <span class="price-table-span">
                    <span class="number">{{item.tableRange}}</span>
                </span>
            </div>
            <div class="region-type-div">
                <span class="region-span">{{item.regionName}}</span>
                <span class="type-span">{{item.categoryName}}</span>
                <!-- <span class="distance-span">{{item.distance}}</span> -->
            </div>
        </div>
    </section>
</template>

<script>
import UA from '@dp/util-m-ua';
import CommonFun from '../../commonJs/CommonFun.js';
var gDomain = CommonFun.getGDomain();
export default {
    data() {
        return {
            
        }
    },
    props:['item','isApp'],
    components: {
    },
    watch:{
    },
    computed:{
    },
    mounted(){
    },
    methods:{
        toHotelDetaiFun:function(){
            this.$router.push({path:'/hotel/hotelDetail',query:{shopId:this.item.shopId}});
        }
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import url('../../commonLess/star');
    .hotel-item-section{
        background: #fff;
        position: relative;
        padding: 1rem 0;
        padding-bottom: 1.5rem;
        padding-top: 1.3rem;
        padding-left: 9.3rem;
        margin-bottom: .4rem;
        font-family: PingFangSC-Regular;
        font-size: 1.3rem;
        color: #111111;
        .pic-div{
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            width: 7rem;
            height: 7rem;
        }
        .hotel-info-div{
            .hotel-main-div{
                font-size: 1.3rem;
                color: #333;
                margin-bottom: .5rem;
                line-height: 2.2rem;
                position: relative;
                div{
                    display: inline-block;
                    vertical-align: top;
                }
                .hotel-level-div{
                    font-size: 1.2rem;
                    color: #fff;
                    position: absolute;
                    right: 1.5rem;
                    width: 1.8rem;
                    height: 1.8rem;
                    text-align: center;
                    img{
                        width: 1.8rem;
                        object-fit: cover;
                        height: 1.8rem;
                    }
                }
            }
            .hotel-name-div{
                font-family: PingFangSC-Medium;
                font-size: 1.6rem;
                color: #111111;
                margin-bottom: .7rem;
                width: 85%;
            }
            .hotel-desc-div{
                margin-bottom: .8rem;
                line-height: 1.6rem;
                .price-table-span{
                    margin-right: .7rem;
                    .unit{
                        font-size: 1.2rem;
                        color: #111111;
                    }
                }
            }
            .region-type-div{
                position: relative;
                color: #777;
                font-size: 1.2rem;
                margin-bottom: .5rem;
                line-height: 1.65rem;
                span{
                    margin-right: .7rem;
                }
                .distance-span{
                    position: absolute;
                    right: .4rem;
                    top: 0;
                    font-size: 1.3rem;
                    color: #999;
                }
            }
            .one-serv-tag img{
                width: 8rem;
                height: 1.6rem;
            }
        }
    }
</style>
