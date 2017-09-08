<template>
    <section class="hall-item-section" @click="toHotelHallIndex">
        <img class="pic-div" :src="item.hallImg">
        <div class="hall-info-div" :class="{'need-schedule':item.needSchedule}">
            <div class="hall-name-div text-ellipse">{{item.hallName}}</div>
            <div class="hall-desc-div">
                <span class="price-span">{{item.tableRange}}</span>
            </div>
            <div class="region-type-div">
                <span class="type-span" :class="{'has-border':item.pillarNum&&item.pillarNum!=-1}" v-if="item.height!=-1">层高{{item.height}}米</span>
                <span class="region-span" v-if="item.pillarNum&&item.pillarNum!=-1">{{item.pillarNum}}根柱</span>
                <span class="region-span" v-else-if="item.pillarNum==0">无柱</span>
            </div>
            <div class="schedule-div" v-show="item.needSchedule">
                <div class="schedule-list-div" v-if="item.stockList.length">
                    <div class="schedule-numner-div">{{item.stockList.length}}个可订档期</div>
                    <div v-for="(ele,eleindex) in item.stockList" v-show="eleindex<=1">
                        {{ele.date}} {{ele.week}}
                    </div>
                    <div class="show-more" v-show="item.stockList.length>2" @click="showValidScheduleFun($event,item)">查看全部</div>
                </div>
                <div class="no-schedule-div" v-else>暂无可订档期，<span @click="toHotelScheduleIndex($event)">点击查询其他时间段</span></div>
            </div>
            <div class="check-schedule-btn-hall" @click="toHotelScheduleIndex($event)">查询档期</div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['item','shopId','showHallScheduleStatus'],
    components: {
    },
    watch:{
    },
    computed:{
    },
    mounted(){
    },
    methods:{
        toHotelScheduleIndex:function(event){
            event.preventDefault();
            event.stopPropagation();
            this.$emit('checkScheduleFun');
        },
        toHotelHallIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/hall',query:{hallId:this.item.hallId,shopId:this.shopId}});
        },
        showValidScheduleFun:function(event,hallItem){
            event.preventDefault();
            event.stopPropagation();
            this.$emit('showValidScheduleFun',hallItem);
        }
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import url('../../commonLess/util');
    @import url('../../commonLess/star');
    @import url('../../commonLess/border');
    .hall-item-section{
        background: #fff;
        position: relative;
        padding: 1.5rem 0;
        padding-left: 10rem;
        padding-bottom: 0;
        margin-bottom: .5rem;
        .borderline(#e1e1e1,bottom);
        &:last-child:after{
            border:none;
        }
        font-family: PingFangSC-Regular;
        .pic-div{
            position: absolute;
            top: 1.4rem;
            left: 0rem;
            width: 9rem;
            height: 6.8rem;
        }
        .hall-info-div{
            color: #666;
            padding-bottom: 1rem;
            &.need-schedule{
                padding-bottom: 0;
            }
            .hall-name-div{
                font-family: PingFangSC-Medium;
                font-size: 1.6rem;
                color: #111111;
                margin-bottom: 1.2rem;
                width: 65%;
            }
            .hall-desc-div{
                font-size: 1.3rem;
                color: #111;
                margin-bottom: 1.1rem;
                span{
                    margin-right: 1rem;
                }
            }
            .region-type-div{
                position: relative;
                font-size: 1.3rem;
                color: #777;
                span{
                    margin-right: 1rem;
                }
                .type-span{
                    padding-right: 1rem;
                    &.has-border{
                        border-right: solid 1px #e1e1e1;
                    }
                }
                .distance-span{
                    position: absolute;
                    right: 1rem;
                    top: 0;
                }
            }
            .schedule-div{
                .borderline(#e1e1e1,top);
                margin-top: 1.7rem;
                .no-schedule-div{
                    line-height: 4.2rem;
                    font-size: 1.2rem;
                    color: #777777;
                    span{
                        color: @mainColor;
                    }
                }
                .schedule-list-div{
                    font-size: 1.2rem;
                    color: #777777;
                    padding-top: 1.7rem;
                    padding-bottom: 1.5rem;
                    div{
                        margin-bottom: 1rem;
                    }
                    .show-more{
                        color: @mainColor;
                        margin-bottom: 0;
                    }
                }
            }
            .check-schedule-btn-hall{
                position: absolute;
                top: 2.5rem;
                right: 1.5rem;
                width: 7.7rem;
                line-height: 3.5rem;
                background: @mainColor;
                color: #fff;
                border-radius: .3rem;
                font-size: 1.4rem;
                text-align: center;
            }
        }
    }
</style>
