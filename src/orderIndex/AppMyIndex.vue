<template>
    <section class="app-my-index">
        <!--<div class="order-head-area" :class="{'ios-order-head-area':isIOS}">-->
            <!--<h3 class="title">我的</h3>-->
        <!--</div>-->
       <div class="app-my-head">
           <p>Hi xxx，您本月的销售业绩是</p>
           <div class="price">0</div>
           <div class="to-detail">
               业绩明细
               <span class="icon-forward"></span>
           </div>
       </div>
        <div class="app-my-goal">
            <div class="title-div" @click="toPersonalGoal">
                个人指标
                <div class="to-detail">
                    详情
                    <span class="icon-forward"></span>
                </div>
            </div>
            <div class="num-boxes">
                <div class="num-box">
                    <div class="num-title">
                        邀约数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        订单数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        到店数量
                    </div>
                    <div class="num">
                        0
                    </div>
                </div>
                <div class="num-box">
                    <div class="num-title">
                        订单金额
                    </div>
                    <div class="num">
                        ￥0
                    </div>
                </div>
            </div>
        </div>
        <div class="app-my-done-order">
            <div class="title-div" @click="toDoneOrders">
                签约订单
            </div>
            <span class="icon-forward"></span>

        </div>
        <div class="app-my-todo-order">
            <div class="title-div">
                待完成订单
            </div>
            <span class="icon-forward"></span>
        </div>
        <div class="app-logout" @click="toLogout">
            退出登录
        </div>
        <app-bottom-tab :active-text="{text:'own'}"></app-bottom-tab>

    </section>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import url('../commonLess/border.less');
    @import './orderCommonLess.less';
    .app-my-index{
        color:#111;
        .app-my-head{
            padding:1.5rem;
            line-height:1;
            position: relative;
            margin-bottom:1.5rem;
            background: #fff;
            p{
                color:#333;
                font-size:1.2rem;
                margin-bottom:1.5rem;
            }
            .price{
                color:#FF66A1;
                font-size:2.3rem;
                font-weight:600;
                &:after{
                    content:'元';
                    color:#999;
                    font-size:1.2rem;
                    font-weight:normal;
                    margin-left:.5rem;
                }
            }
            .to-detail {
                top: 3.4rem;
                right:1.5rem;

            }
        }
        .to-detail {
            position: absolute;
            color: #999;
            font-size: 1.2rem;

        }
        .icon-forward{
            background: url("./img/icon_forward@3x.png") no-repeat;
            display: inline-block;
            width:.8rem;
            height:1.3rem;
            -webkit-background-size:cover;
            background-size:cover;
            vertical-align: middle;
            margin-left:.3rem;
        }
        .app-my-goal{
            background: #fff;
            margin-bottom:1.5rem;
            .to-detail{
                top:1.6rem;
                right:1.5rem;
                font-weight: normal;
            }
        }
        .num-boxes{
            font-size:0;
            .num-box{
                padding:1.5rem 0;
                width:25%;
                text-align: center;
                display: inline-block;
                vertical-align: top;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                line-height:1;
            }
            .num-title{
                color:#999;
                font-size:1.2rem;
                margin-bottom:1.5rem;
            }
            .num{
                color:#333;
                font-size:1.4rem;
            }
        }
        .title-div{
            margin-left:1.5rem;
            padding:1.5rem 0;
            color:#111;
            font-size:1.5rem;
            font-weight:600;
            background: #fff;
            line-height:1;
            .borderline(#e1e1e1,bottom);
        }

        .app-my-done-order,.app-my-todo-order{
            background: #fff;
            position: relative;
            .icon-forward{
                position: absolute;
                right:1.5rem;
                top:1.55rem;
            }
        }
        .app-my-todo-order{
            margin-bottom:1.5rem;
            .title-div{
                &:after{
                    border-bottom:none;
                }
            }
            &:after{
                border-bottom:none;
            }
        }
        .app-logout{
            color:#FF66A1;
            font-size:1.5rem;
            text-align: center;
            line-height:1;
            padding:1.5rem;
            background: #fff;
        }
    }
</style>
<script>
    import Toast from '@dp/wepp-module-toast';
    import CONSTANT from './js/constant.js';
    import AppBottomTab from '../commonApp/AppBottomTab.vue';
    import CommonFun from '../commonJs/CommonFun.js';
    import superagent from 'superagent';
    var isAPP = CommonFun.getUaIsApp();
    var UAStr = (navigator.userAgent).toLowerCase(),
      isIOS = /(iphone|ipad)/.test(UAStr),
      isAndroid = /android/.test(UAStr);
    export default{
        data(){
            return{
              isIOS:isIOS
            }
        },
        components:{
          AppBottomTab,
        },
      mounted(){
      },
      methods:{
          toDoneOrders:function () {
            location.href = './order-list.html';


          },
        toPersonalGoal:function () {
            location.href = './my-goal-page.html';
        },
        toLogout:function () {
          let eDomain = CONSTANT.ajaxAddress.eDomain;
          let logoutUrl = 'https:'+eDomain + CONSTANT.ajaxAddress.logout;
          superagent
            .get(logoutUrl)
            .withCredentials()
            .end(function (err,res) {
              let data = res.body;
              if(data.code==200){
                location.href = 'https:'+eDomain+'/slogin?redir=https:'+CONSTANT.gAddress+'/app/gfe-app-page-yzs-love-lab/customer-list.html'
              }else{
                Toast(data.msg.message);
              }
            })
        }
      }
    }
</script>
