<template>
    <section class="edit-customer-section">
        <div class="header" :class="{isIOS: isIOS}">
            <div class="header-fixed">
                <my-header @saveCustomer="saveAction" :config="{isIOS: isIOS, hasBack: true, rightText: '保存', text: titleText}"></my-header>
            </div>
        </div>
        <div class="title-tip-line">基础信息</div>
        <div class="flex-parent edit-item-div">
            <div class="label name">客户姓名</div>
            <div class="value name no-arrow">
                <input type="text" placeholder="请输入客户姓名" v-model.lazy="customerInfoObj.userName">
            </div>
        </div>
        <div class="flex-parent edit-item-div">
            <div class="label name">手机号码</div>
            <div class="value name no-arrow">
                <input type="number" placeholder="请输入客户手机号码" v-model.number="customerInfoObj.userPhone">
            </div>
        </div>
        <div class="flex-parent edit-item-div">
            <div class="label sex">客户性别</div>
            <div class="value sex no-arrow">
                <span class="sex-item" :class="{sel: customerInfoObj.sex == 1}" @click="chooseSex(1)">先生</span>
                <span class="sex-item" :class="{sel: customerInfoObj.sex == 2}" @click="chooseSex(2)">小姐</span>
            </div>
        </div>
        <div class="flex-parent edit-item-div" @click="changShowList(4)">
            <div class="label intention">获客渠道</div>
            <div class="value intention normal" v-if="customerInfoObj.clientType">
                <slot v-for="item in clentTypeList" v-if="item.value == customerInfoObj.clientType">{{item.title}}</slot>
            </div>
            <div class="value intention" v-else>
                请选择用户来源
            </div>
        </div>
        <div class="flex-parent edit-item-div" @click="changShowList(2)">
            <div class="label intention">分配售前</div>
            <div class="value intention normal" v-if="customerInfoObj.serviceId">
                <slot v-for="item in allCSList" v-if="item.misId == customerInfoObj.serviceId">{{item.name}}</slot>
            </div>
            <div class="value intention" v-else>
                默认本人
            </div>
        </div>
        <div class="title-tip-line">需求概要</div>
        <div class="flex-parent edit-item-div">
            <div class="label name">所在地区</div>
            <div class="value name no-arrow">
                <input placeholder="请输入所在地区" v-model="customerInfoObj.region">
            </div>
        </div>
        <div class="flex-parent edit-item-div" @click="setShowEditCalender">
            <div class="label intention">期望档期</div>
            <div class="value intention normal" v-if="customerInfoObj.scheduleFrom && customerInfoObj.scheduleTo && customerInfoObj.scheduleFrom != customerInfoObj.scheduleTo">
                {{customerInfoObj.scheduleFrom + ' 至 ' + customerInfoObj.scheduleTo}}
            </div>
            <div class="value intention normal" v-else-if="customerInfoObj.scheduleFrom && customerInfoObj.scheduleTo && customerInfoObj.scheduleFrom == customerInfoObj.scheduleTo">
                {{customerInfoObj.scheduleFrom}}
            </div>
            <div class="value intention" v-else>
                请选择期望档期
            </div>
        </div>
        <div class="flex-parent edit-item-div" @click="changShowList(5)">
            <div class="label intention">销售机会</div>
            <div class="value intention normal" v-if="customerInfoObj.salesChance">
                {{customerInfoObj.salesChance}}
            </div>
            <div class="value intention" v-else>
                请选择销售机会
            </div>
        </div>
        <div class="title-tip-line">宴会要求</div>
        <div class="flex-parent edit-item-div" @click="changShowList(1)">
            <div class="label intention">意向酒店</div>
            <div class="value intention normal" v-if="customerInfoObj.shopId">
                <slot v-for="item in shopList" v-if="item.shopId == customerInfoObj.shopId">{{item.shopName}}</slot>
            </div>
            <div class="value intention" v-else>
                请选择意向酒店
            </div>
        </div>
        <div class="flex-parent edit-item-div" @click="changShowList(3)">
            <div class="label intention">宴会类型</div>
            <div class="value intention normal" v-if="customerInfoObj.reqType">
                <slot v-for="item in banquetList" v-if="item.value == customerInfoObj.reqType">{{item.title}}</slot>
            </div>
            <div class="value intention" v-else>
                请选择宴会类型
            </div>
        </div>
        <div class="flex-parent edit-item-div">
            <div class="label name">桌数</div>
            <div class="value name no-arrow">
                <input placeholder="请输入婚宴桌数" v-model="customerInfoObj.tableInfo">
            </div>
        </div>
        <div class="flex-parent edit-item-div">
            <div class="label name">餐标</div>
            <div class="value name no-arrow">
                <input placeholder="请输入用餐标注" v-model="customerInfoObj.mealStandard">
            </div>
        </div>
        <div class="title-tip-line">婚庆需求</div>
        <div class="flex-parent edit-item-div">
            <div class="label name">婚庆预算</div>
            <div class="value name no-arrow">
                <input placeholder="请输入婚宴预算" v-model="customerInfoObj.budget">
            </div>
        </div>
        <div class="flex-parent edit-item-div">
            <div class="label name">风格</div>
            <div class="value name no-arrow">
                <input placeholder="请输入用户风格喜好" v-model="customerInfoObj.style">
            </div>
        </div>
        <div class="line-div"></div>
        <div class="record-div">
            <textarea class="record-textarea" v-model="customerInfoObj.note" placeholder="请输入备注信息"></textarea>
        </div>
        <div class="line-div"></div>
        <div class="line-div"></div>
        <div class="my-calendar" v-show="isShowCalendar" @click="cancelCalendar">
            <div class="my-calendar-area" @click="stopCalendar($event)">
                <app-calendar
                    :type="calendarType"
                    :title="{text:'请选择期望档期'}"
                    :showcalendar="showScheduleCalendar"
                    :initcheckintext="customerInfoObj.scheduleFrom"
                    :maxscheduledatenumber="maxscheduledatenumber"
                    :maxdays="maxdays"
                    :initcheckouttext="customerInfoObj.scheduleTo"
                    @doneSelect="doneSelDate"
                    @hideCalendar="cancelCalendar">
                </app-calendar>
            </div>
        </div>
        <div class="fixed" v-show="isShowEditList" @click="hideFixed">
            <ul class="list" v-if="isShowEditList == 1">
                <li class="list-title">请选择意向酒店</li>
                <li v-for="item in shopList" :class="{on: item.shopId == customerInfoObj.shopId}" @click="selShop($event, item)">{{item.shopName}}</li>
            </ul>
            <ul class="list" v-if="isShowEditList == 2">
                <li class="list-title">请选择售前</li>
                <li v-for="item in allCSList" :class="{on: item.misId == customerInfoObj.serviceId}" @click="selServiceId($event, item)">{{item.name}}</li>
            </ul>
            <ul class="list" v-if="isShowEditList == 3">
                <li class="list-title">请选择宴会类型</li>
                <li v-for="item in banquetList" :class="{on: item.value == customerInfoObj.reqType}" @click="selBanquetId($event, item)">{{item.title}}</li>
            </ul>
            <ul class="list" v-if="isShowEditList == 4">
                <li class="list-title">请选择获客渠道</li>
                <li v-for="item in clentTypeList" :class="{on: item.value == customerInfoObj.clientType}" @click="selClentType($event, item)">{{item.title}}</li>
            </ul>
            <ul class="list" v-if="isShowEditList == 5">
                <li class="list-title">请选择销售机会/li>
                <li v-for="item in salesChanceList" :class="{on: customerInfoObj.salesChance && customerInfoObj.salesChance.indexOf(item.title) > -1}" @click="selSalesChance($event, item)">{{item.title}}</li>
            </ul>
        </div>
    </section>
</template>
<script>
    import MyHeader from './components/Header.vue'
    import formatter from 'date-formatter';
    import Toast from '@dp/wepp-module-toast';
    import AppCalendar from '../orderIndex/components/AppCalendar.vue'
    import CommonFun from '../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    let search_params = (()=>{
        let str = location.search.substr(1)
        let arr = str.split('&')
        let obj = {}
        for (let i=0;i< arr.length; i++) {
            let item_arr = arr[i].split('=')
            if (item_arr.length == 2) {
                obj[item_arr[0]] = item_arr[1]
            }
        }
        return obj
    })()
    export default{
        data(){
            return{
                calendarType: "intention",
                showIntentionEditStatus:false,
                showDistrictEditStatus:false,
                showScheduleCalendar:false,
                activeIntentionType:{},
                activeIntentionTable:{},
                activeIntentionTablePrice:{},
                activeIntentionDistrict:{},
                maxdays:100,
                maxscheduledatenumber:365*2,
                customerId: search_params['yzsUserId'],
                titleText: search_params['yzsUserId'] ? '编辑客户' : '新增客户',
                defaultMisId: null,
                customerInfoObj: {
                    userName: null,
                    userPhone: null,
                    sex: null,
                    clientType: null,
                    serviceId: null,
                    region: null,
                    shopId: null,
                    shopName: null,
                    salesChance: null,
                    scheduleFrom: null,
                    scheduleTo: null,
                    reqType: null,
                    tableInfo: null,
                    mealStandard: null,
                    budget: null,
                    style: null,
                    note: null
                },
                isShowCalendar: false,
                shopList: null,
                banquetList: null,
                isShowEditList: null,
                allCSList: null,
                clentTypeList: null,
                salesChanceList: null,
                isAndroid: null,
                isIOS: null
            }
        },
        created() {
            if (this.customerId) {
                this.$store.commit('getCustomerEditInfo', this.customerId)
            }
            this.$store.commit('getUserInfo')
            this.$store.commit('getHotelInfo')
            this.$store.commit('getAllPersonByRole', '售前')
            this.$store.commit('getGeneralEnum')
            KNB.ready(()=>{
                KNB.getUA({
                    success: (info)=>{
                        this.isIOS = info && info.osName == 'ios' ? true : false
                        this.isAndroid = info && info.osName == 'android' ? true : false
                    },
                    fail: function(err){}
                });
                KNB.setNavigationBarHidden({
                    flag: 1, //0表示显示，1表示隐藏
                    success: function(){},
                    fail: function(){}
                });
            });
        },
        components:{
            AppCalendar,
            MyHeader
        },
        methods:{
            chooseSex(type){
                this.customerInfoObj.sex = type
            },
            setShowEditCalender() {
                this.isShowCalendar = true
                this.showScheduleCalendar = true
            },
            doneSelDate(start, end){
                this.customerInfoObj.scheduleFrom = formatter(start, 'YYYY-MM-DD')
                if (end) {
                    this.customerInfoObj.scheduleTo = formatter(end, 'YYYY-MM-DD')
                } else {
                    this.customerInfoObj.scheduleTo = formatter(start, 'YYYY-MM-DD')
                }
                this.isShowCalendar = false
            },
            changShowList(index) {
                if (index == 2 && this.customerInfoObj.serviceId) {
                    Toast('不能修改已有售前')
                    return
                }
                this.isShowEditList = index
            },
            hideFixed() {
                this.isShowEditList = null
            },
            selShop(event, item) {
                event.stopPropagation()
                this.customerInfoObj.shopId = item.shopId
            },
            selServiceId(event, item) {
                event.stopPropagation()
                this.customerInfoObj.serviceId = item.misId
            },
            selBanquetId(event, item) {
                event.stopPropagation()
                this.customerInfoObj.reqType = item.value
            },
            selClentType(event, item) {
                event.stopPropagation()
                this.customerInfoObj.clientType = item.value
            },
            selSalesChance(event, item){
                event.stopPropagation()
                let arr
                if(!this.customerInfoObj.salesChance) {
                    arr = []
                } else {
                    arr = this.customerInfoObj.salesChance.split(',')
                }
                if (arr.indexOf(item.title) > -1) {
                    arr.splice(arr.indexOf(item.title), 1)
                } else {
                    arr.push(item.title)
                }
                this.customerInfoObj.salesChance = arr.join(',')
            },
            saveAction() {
                var saveUrl = `//${mDomain}/lovelab/user/addUserInfo?`
                let body = []
                if (this.customerId) {
                    body.push('yzsUserId=' + this.customerId)
                    saveUrl = `//${mDomain}/lovelab/user/saveUserInfo?`
                }
                for (let item in this.customerInfoObj) {
                    if (this.customerInfoObj.hasOwnProperty(item)) {
                        if(this.customerInfoObj[item]){
                            if (item == 'scheduleFrom' || item == 'scheduleTo') {
                                body.push(item + '=' + this.customerInfoObj[item] + ' 00:00:00')
                            } else {
                                body.push(item + '=' + this.customerInfoObj[item])
                            }
                        } else {
                            if (item == 'userName') {
                                Toast('客户姓名不能为空')
                                return false
                            }
                            if (item == 'userPhone') {
                                Toast('手机号码不能为空')
                                return false
                            }
                            if (item == 'sex') {
                                Toast('客户性别不能为空')
                                return false
                            }
                            if (item == 'clientType') {
                                Toast('获客渠道不能为空')
                                return false
                            }
                            if (item == 'serviceId') {
                                if (this.customerId && this.defaultMisId) {
                                    body.push(item + '=' + this.defaultMisId)
                                } else {
                                    Toast('分配售前不能为空')
                                    return false
                                }
                            }
                            if (item == 'shopId') {
                                Toast('意向酒店不能为空')
                                return false
                            }
                            if (item == 'reqType') {
                                Toast('宴会类型不能为空')
                                return false
                            }
                        }
                    }
                }

                let _self = this
                this.$store.commit('saveCustomer', {
                    url: saveUrl + body.join('&'),
                    fun: (data)=>{
                        if (data.code == 200) {
                            Toast('保存成功', 2000, ()=>{
                                window.history.go(-1)
                            })
                        } else {
                            Toast(data.string || data.msg || '网络故障，请稍后重试')
                        }
                    }
                })
            },
            stopCalendar(event) {
                event.stopPropagation()
            },
            cancelCalendar() {
                this.isShowCalendar = false
            }
        },
        watch: {
            '$store.state.user': {
                handler: function(val){
                    if (val.keyRole == '售前') {
                        this.defaultMisId = val.misId
                    }
                },
                deep: true
            },
            '$store.state.editUserInfo': {
                handler: function(val) {
                    this.customerInfoObj = Object.assign({}, this.customerInfoObj, val)
                },
                deep: true
            },
            '$store.state.shopList': {
                handler: function(val){
                    this.shopList = val
                },
                deep: true
            },
            '$store.state.allCSList': {
                handler: function(val) {
                    this.allCSList = val
                },
                deep: true
            },
            '$store.state.clentTypeList': {
                handler: function(val) {
                    this.clentTypeList = val
                },
                deep: true
            },
            '$store.state.salesChanceList': {
                handler: function(val){
                    this.salesChanceList = val
                },
                deep: true
            },
            '$store.state.banquetList': {
                handler: function(val){
                    this.banquetList = val
                },
                deep: true
            },
            '$store.state.errorMsg': {
                handler: function(val) {
                    if (val) {
                        Toast(val)
                        let _self = this
                        _self.$nextTick(function(){
                            _self.$store.state.errorMsg = ''
                        }, 2000)
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .edit-customer-section{
        .header {
            height: 4.4rem;
            &.isIOS {
                height: 6.4rem;
            }
            .header-fixed {
                position: fixed;
                background: #fff;
                width: 100%;
                z-index: 10;
            }
        }
        font-size: 1.2rem;
        color: #666;
        background-color: white;
        ::-webkit-input-placeholder {
            color: #ccc;
        }
        .title-tip-line {
            font-size: 1.3rem;
            line-height: 3.3rem;
            padding-top: 0.5rem;
            background: #f2f2f2;
            padding-left: 1.2rem;
        }
        input{
            color: #666;
            font-size: 1.5rem;
        }
        .flex-parent{
            display: flex;
            margin-left: 1.5rem;
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
            height: 4.5rem;
            line-height: 4.5rem;
            box-sizing: border-box;
            .label {
                width: 6rem;
                font-size: 1.5rem;
                color: #333;
                font-family: PingFangSC-Medium;
            }
            .value{
                flex: 1;
                width: 0;
                font-size: 1.5rem;
                color: #ccc;
                text-align: right;
                padding-right: 3rem;
            }
        }
        .edit-item-div{
            line-height: 4.5rem;
            border-bottom: solid 1px #f2f2f2;
            &.no-boder{
                border-bottom: none;
            }
            .value.name input{
                text-align: right;
                width: 100%;
                box-sizing: border-box;
                display: block;
                padding: 0 1.5rem 0 0;
                line-height: 4.5rem;
                height: 100%;
                border: none;
                outline: none;
            }
            .value.intention.normal {
                color: #666;
            }
        }
        .edit-item-div{
            .value{
                position: relative;
                padding-left: 1.5rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:after{
                    content: "";
                    background-image: url('./img/icon_next@3x.png');
                    background-size: contain;
                    width: 1.2rem;
                    height: 1.2rem;
                    background-repeat: no-repeat;
                    top: 50%;
                    right: 1rem;
                    transform: translate(0, -50%);
                    position: absolute;
                }
                &.no-arrow{
                    padding-right: 0;
                    &:after{
                        content: "";
                        background-image: none;
                    }
                }
            }
        }
        .line-div{
            height: 10px;
            background-color: #f2f2f2;
            margin-left: -10px;
            border-top: solid 1px #f2f2f2;
        }
        .save-btn-div{
            padding:10px 20px;
            background-color: #f2f2f2;
            margin-left: -10px;
            .save-btn{
                background-color: #ff66a1;
                color: white;
                text-align: center;
                line-height: 40px;
                border-radius: 5px;
            }
        }
        .record-textarea{
            height: 20rem;
            border:none;
            font-size: 1.5rem;
            padding: 1rem;
            border-top: solid 1px #f2f2f2;
            width: 100%;
            box-sizing: border-box;
            color: #666;
        }
    }
    .input-sex-radio{
      position: relative;
      top: 2px;
      margin-left: 5px;
    }
    .my-calendar {
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        section {
            position: fixed;
            bottom: 0;
        }
    }
    .sex-item {
        display: inline-block;
        color: #666;
        font-size: 1.5rem;
        margin-right: 1.5rem;
        &:before {
            content: '';
            float: left;
            width: 2.3rem;
            height: 2.3rem;
            margin-right: 0.5rem;
            margin-top: 1rem;
            background: url(./img/btn_radiobtn_can@3x.png) center/contain no-repeat;
        }
        &.sel {
            &:before {
                background-image: url(./img/btn_radiobtn_do@3x.png);
            }
        }
    }

    .fixed {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        .list {
            background: #fff;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            max-height: 27rem;
            overflow: auto;
            .list-title {
                color: #999;
                margin-left: 0;
                padding-left: 1.5rem;
            }
            li {
                height: 4.5rem;
                line-height: 4.5rem;
                font-size: 1.5rem;
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
                color: #333;
                padding: 0 4.5rem 0 0;
                margin-left: 1.5rem;
                position: relative;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.on {
                    &:after {
                        content: '';
                        position: absolute;
                        width: 1.1rem;
                        height: 1.1rem;
                        background: url(./img/icon_check@3x.png) no-repeat;
                        background-size: contain;
                        right: 1.5rem;
                        top: 1.7rem;
                    }
                }
            }
        }
    }
</style>