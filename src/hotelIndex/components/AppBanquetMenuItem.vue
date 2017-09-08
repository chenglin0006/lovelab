<template>
    <section class="menu-item-section" @click="toHotelMenuDetailIndex">
        <div class="menu-info-div">
            <div class="menu-name-div text-ellipse">{{item.menuName}}</div>
            <div class="menu-desc-div">
                <span class="price-span"><span class="price-unit">¥</span><span class="price-num">{{item.price}}</span>/桌</span>
                <span>套餐包含：</span>
                <span class="package-text">喜宴</span>
            </div>
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
        toHotelMenuDetailIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/menu',query:{menuId:this.item.menuId}});
        }
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import url('../../commonLess/util');
    @import url('../../commonLess/star');
    @import url('../../commonLess/border');
    .menu-item-section{
        font-family: PingFangSC-Regular;
        background: #fff;
        position: relative;
        padding: 1.5rem 0;
        .borderline(#e1e1e1,bottom);
        &:last-child:after{
            border:none;
        }

        .menu-info-div{
            color: #666;
            .menu-name-div{
                margin-bottom: 1rem;
                font-family: PingFangSC-Regular;
                font-size: 1.6rem;
                color: #111111;
            }
            .menu-desc-div{
                margin-bottom: .5rem;
                font-size: 1.2rem;
                color: #999999;
                .price-span{
                    margin-right: 1rem;
                }
                .price-unit{
                    font-size: 1.3rem;
                    color: @mainColor;
                }
                .price-num{
                    color: @mainColor;
                    font-size: 2rem;
                    margin-right: .3rem;
                }
                .package-text{
                    margin-right: .7rem;
                }
            }
            .region-type-div{
                position: relative;
                color: #333;
                margin-bottom: 0rem;
                span{
                    margin-right: 1rem;
                }
                .distance-span{
                    position: absolute;
                    right: 1rem;
                    top: 0;
                }
            }
        }
    }
</style>
