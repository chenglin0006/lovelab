<template>
    <div class="user-tab">
        <slot v-if="config.type == 0">
            <div class="item" :class="{on: showIndex == 1}" @click="showFixed('flowStatus', 1)">客户状态<span class="arrow"></span></div>
            <div class="item" :class="{on: showIndex == 2}" @click="showFixed('shopList', 2)" v-if="!$store.state.user.isBoss">需求酒店<span class="arrow"></span></div>
            <div class="item" :class="{on: showIndex == 6}" @click="showFixed('csList', 6)" v-if="$store.state.user.isBoss">顾问名称<span class="arrow"></span></div>
            <div class="item" :class="{on: showIndex == 3}" @click="showFixed('customerStatus', 3)">客户等级<span class="arrow"></span></div>
            <div class="item no-after" :class="{on: showIndex == 4}" @click="showFixed('fliterTime', 4)">分配时间<span class="arrow"></span></div>
            <div ref="fixed" v-show="showIndex && showIndex != 4" class="fixed" @click="upgrade">
                <ul class="list">
                    <li v-for="(item, index) in list" :class="{on: selIndex[showIndex].indexOf(index) > -1}" @click="setSelIndex($event, index)">{{item.desc}}</li>
                </ul>
            </div>
            <div ref="cfixed" v-show="showIndex && showIndex == 4" class="fixed" @click="upgrade">
                <div class="my-calendar" @click="stopParseCalendar($event)">
                    <app-calendar 
                        @selectDate="selFirstDate"
                        @doneSelect="doneSelDate"
                        :showcalendar="isShowCalendar"
                        :type="banquetCalendarType"
                        :maxscheduledatenumber="maxScheduleDateNumber"
                        :initcheckintext="banquetCheckInText"
                        :initcheckouttext="banquetCheckOutText"
                        :maxdays="maxDays">
                    </app-calendar>
                </div>
            </div>
        </slot>
        <slot v-if="config.type == 1">
            <div class="item" :class="{on: showIndex == 2}" @click="showFixed('shopList', 2)" v-if="!$store.state.user.isBoss">需求酒店<span class="arrow"></span></div>
            <div class="item" :class="{on: showIndex == 6}" @click="showFixed('csList', 6)" v-if="$store.state.user.isBoss">顾问名称<span class="arrow"></span></div>
            <div class="item" :class="{on: showIndex == 3}" @click="showFixed('customerStatus', 3)">客户等级<span class="arrow"></span></div>
            <div class="item no-after" :class="{on: showIndex == 4}" @click="showFixed('fliterTime', 4)">分配时间<span class="arrow"></span></div>
            <div ref="fixed" v-show="showIndex && showIndex != 4" class="fixed" @click="upgrade">
                <ul class="list">
                    <li v-for="(item, index) in list" :class="{on: selIndex[showIndex].indexOf(index) > -1}" @click="setSelIndex($event, index)">{{item.desc}}</li>
                </ul>
            </div>
            <div ref="cfixed" v-show="showIndex && showIndex == 4" class="fixed" @click="upgrade">
                <div class="my-calendar" @click="stopParseCalendar($event)">
                    <app-calendar 
                        @selectDate="selFirstDate"
                        @doneSelect="doneSelDate"
                        :showcalendar="isShowCalendar"
                        :type="banquetCalendarType"
                        :maxscheduledatenumber="maxScheduleDateNumber"
                        :initcheckintext="banquetCheckInText"
                        :initcheckouttext="banquetCheckOutText"
                        :maxdays="maxDays">
                    </app-calendar>
                </div>
            </div>
        </slot>
        <slot v-if="config.type == 2">
            <div class="item" :class="{on: showIndex == 5}" @click="showFixed('csList', 5)">售前角色<span class="arrow"></span></div>
            <div class="item no-after" :class="{on: showIndex == 4}" @click="showFixed('fliterTime', 4)">创建时间<span class="arrow"></span></div>
            <div ref="fixed" v-show="showIndex" class="fixed" @click="upgrade">
                <ul class="list">
                    <li v-for="(item, index) in list" :class="{on: selIndex[showIndex].indexOf(index) > -1}" @click="setSelIndex($event, index)">{{item.desc}}</li>
                </ul>
            </div>
            <div ref="cfixed" v-show="showIndex && showIndex == 4" class="fixed" @click="upgrade">
                <div class="my-calendar" @click="stopParseCalendar($event)">
                    <app-calendar 
                        @selectDate="selFirstDate"
                        @doneSelect="doneSelDate"
                        :showcalendar="isShowCalendar"
                        :type="banquetCalendarType"
                        :maxscheduledatenumber="maxScheduleDateNumber"
                        :initcheckintext="banquetCheckInText"
                        :initcheckouttext="banquetCheckOutText"
                        :maxdays="maxDays">
                    </app-calendar>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import AppCalendar from '../../orderIndex/components/AppCalendar.vue'
import formatter from 'date-formatter'

export default {
    data(){
        return {
            list: null,
            showIndex: 0,
            selIndex: {1:[],2:[],3:[],4:[],5:[],6:[]},
            banquetCalendarType: "filter",
            maxScheduleDateNumber: 365*2,
            banquetCheckInText: '',
            banquetCheckOutText: '',
            isShowCalendar: 0,
            maxDays: 30
        }
    },
    props: ['config'],
    components: {
        AppCalendar
    },
    methods: {
        showFixed(type, index){
            let height = document.querySelector('.header').offsetHeight
            this.$refs.fixed.style.top = height + 'px'
            this.$refs.cfixed.style.top = height + 'px'
            if(index == 4) {
                this.isShowCalendar = true
            }
            if (this.showIndex == index) {
                this.upgrade()
            } else {
                this.showIndex = index
                if (type == 'flowStatus') {
                    if (this.$store.state.user.isBoss) {
                        this.list = [{
                            name: 'SALES_TO_FOLLOW',
                            desc: '顾问待跟进'
                        },{
                            name: 'SALES_FOLLOWING',
                            desc: '顾问跟进中'
                        },{
                            name: 'SIGNED',
                            desc: '已签约'
                        },{
                            name: 'INVALID',
                            desc: '无效'
                        },{
                            name: 'SALES_NOT_FOLLOW',
                            desc: '顾问不跟进'
                        },{
                            name: 'NOT_FOLLOW',
                            desc: '确认不跟进'
                        },{
                            name: 'WAIT_TO_SECOND_ASSIGN',
                            desc: '待二次分配'
                        }]
                    } else {
                        this.list = [{
                            name: 'SALES_TO_FOLLOW',
                            desc: '顾问待跟进'
                        },{
                            name: 'SALES_FOLLOWING',
                            desc: '顾问跟进中'
                        },{
                            name: 'SIGNED',
                            desc: '已签约'
                        },{
                            name: 'INVALID',
                            desc: '无效'
                        },{
                            name: 'SALES_NOT_FOLLOW',
                            desc: '顾问不跟进'
                        },{
                            name: 'NOT_FOLLOW',
                            desc: '确认不跟进'
                        }]
                    }
                    
                } else if (type == 'shopList') {
                    let shopList = this.$store.state.shopList
                    this.list = []
                    for (let i=0;i<shopList.length; i++) {
                        this.list.push({
                            name: shopList[i].shopId,
                            desc: shopList[i].shopName
                        })
                    }
                } else if(type == 'customerStatus') {
                    this.list = [{
                        name: 1,
                        desc: 'A类'
                    },{
                        name: 2,
                        desc: 'B类'
                    },{
                        name: 3,
                        desc: 'C类'
                    }]
                } else if(type == 'csList') {
                    this.list = []
                    let csList = this.$store.state.allCSList
                    for (let i=0;i<csList.length; i++) {
                        this.list.push({
                            name: csList[i].misId,
                            desc: csList[i].name
                        })
                    }
                }
            }
        },
        setSelIndex(event, index){
            event.stopPropagation()
            if (this.showIndex == 1) {
                if (this.selIndex[this.showIndex].indexOf(index) > -1) {
                    this.selIndex[this.showIndex].splice(this.selIndex[this.showIndex].indexOf(index), 1)
                } else {
                    this.selIndex[this.showIndex].push(index)
                }
            } else {
                if (this.selIndex[this.showIndex].indexOf(index) > -1) {
                    this.selIndex[this.showIndex] = []
                } else {
                    this.selIndex[this.showIndex] = [index]
                }   
            }
        },
        selFirstDate(date) {
            let arr = date.split(' 至 ')
            if (arr.length == 2) {
                this.selIndex[this.showIndex] = {
                    startTime: arr[0],
                    endTime: arr[1]
                }
            } else {
                this.selIndex[this.showIndex] = {
                    startTime: arr[0],
                    endTime: arr[0]
                }
            }
        },
        doneSelDate(dateStart, dateEnd) {
            if (dateEnd) {
                this.selIndex[this.showIndex] = {
                    startTime: formatter(dateStart, 'YYYY-MM-DD'),
                    endTime: formatter(dateEnd, 'YYYY-MM-DD')
                }
            } else {
                this.selIndex[this.showIndex] = {
                    startTime: formatter(dateStart, 'YYYY-MM-DD'),
                    endTime: formatter(dateStart, 'YYYY-MM-DD')
                }
            }
            this.upgrade()
        },
        upgrade(){
            let data = []
            if (this.showIndex !=4 ){
                for (let i=0; i < this.selIndex[this.showIndex].length; i++) {
                    data.push(this.list[this.selIndex[this.showIndex][i]].name)
                }
            } else {
                data = this.selIndex[this.showIndex]
            }
            if (this.showIndex !=4 ){
                this.$store.commit('upgradeFilter', {
                    name: ['','flowStatus', 'filterShopId', 'filterGrade', 'filterTime', 'filterCS', 'filterSales'][this.showIndex],
                    value: data.join(',')
                })
            } else {
                this.$store.commit('upgradeFilter', {
                    name: 'filterTime',
                    value: data
                })
            }
            this.$store.commit('getList', {index: 1})
            this.showIndex = 0;
            this.list = null
        },
        stopParseCalendar(event) {
            event.stopPropagation()
        }
    }
}
</script>

<style lang="less" scoped>
.user-tab {
    display: flex;
    box-sizing: border-box;
    height: 4rem;
    background: #fff;
    position: relative;
    &:after {
        content: '';
        width: 200%;
        height: 1px;
        display: block;
        position: absolute;
        background: #e1e1e1;
        transform: scale(0.5);
        left: -50%;
        bottom: 0;
    }
    .item {
        flex: 1;
        width: 0;
        line-height: 4rem;
        text-align: center;
        font-size: 1.4rem;
        color: #333;
        position: relative;
        .arrow {
            width: 1rem;
            height: 0.6rem;
            margin-left: 0.4rem;
            vertical-align: middle;
            display: inline-block;
            background: url(../img/icon_fold@3x.png) center/contain no-repeat;
        }
        &.on {
            color: #ff66a1;
            .arrow {
                background-image: url(../img/icon_unfold@3x.png);
            }
        }
        &.no-after {
            &:after {
                display: none;
            }
        }
        &:after {
            content: '';
            position: absolute;
            width: 1px;
            height: 3.4rem;
            background: #e1e1e1;
            right: 0;
            top: 25%;
            transform: scale(0.5) translate(0, -50%);
        }
    }
    .fixed {
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 5.3rem;
        background: rgba(0, 0, 0, 0.5);
        .list {
            background: #fff;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-height: 27rem;
            overflow: auto;
            li {
                height: 4.5rem;
                line-height: 4.5rem;
                font-size: 1.5rem;
                color: #333;
                padding: 0 4.5rem 0 1.5rem;
                position: relative;
                &:before {
                    content: '';
                    width: 200%;
                    height: 1px;
                    display: block;
                    position: absolute;
                    background: #e1e1e1;
                    transform: scale(0.5);
                    left: -50%;
                    bottom: 0;
                }
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.on {
                    &:after {
                        content: '';
                        position: absolute;
                        width: 1.1rem;
                        height: 1.1rem;
                        background: url(../img/icon_check@3x.png) no-repeat;
                        background-size: contain;
                        right: 1.5rem;
                        top: 1.7rem;
                    }
                }
            }
        }
    }
}
</style>