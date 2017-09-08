<template>
	<section class="select-search-section">
		<div class="mask-div" @click="hidePopFun" @touchmove="touchMoveFun($event)"></div>
        <div class="select-search-div" @touchmove="touchMoveFun($event,'scroll')">
            <v-select :multiple="multiple" :value.sync="selectModel" :on-change="consoleCallback" :placeholder="placeholderObj.text" :options="optionList" :auto-focus="autoFocus" :null-text="nullText">
            </v-select>

        </div>
	</section>
</template>
<script>
    import Vue from 'vue';
    import vSelect from './Select.vue';
    import $ from '@dp/zepto'
    export default{
        data(){
            return{
            }
        },
        components:{
            vSelect
        },
        props:['optionList','selectModel','placeholderObj','multiple','nullText','autoFocus'],
        mounted() {
        },
        watch:{
        },
        methods:{
            hidePopFun:function(){
                this.$emit('hidepop');
            },
            consoleCallback:function(val){
                if(!this.multiple){
                    if(typeof val === 'object'){
                        this.$emit('setselectdata',val);
                        $('body').scrollTop(0);
                    } else {
                        this.$emit('setselectdata',val);
                        $('body').scrollTop(0);
                    }
                } else{
                    this.$emit('setselectdata',val);
                }
            },
            touchMoveFun:function(event,text){
                if (text=='scroll') {
                } else {
                    event.preventDefault();
                }
                event.stopPropagation();
            }
        }
}
</script>
<style lang="less">
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .select-search-section{
        .mask-div{
            position: absolute;
            top: 0;
            left: 0;
            bottom:0;
            right: 0;
            background-color: #000;
            opacity: 0.6;
            z-index: 10;
        }
        .select-search-div{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30rem;
            z-index: 11;
            background-color: #fff;
            font-size: 1.3rem;
            .adviser-list{
                margin-left: 1.5rem;
                .adviser-name{
                    line-height: 4rem;
                    border-bottom:solid .1rem #e2e2e2;
                    font-size: 1.5rem;
                    color: #666;
                }
            }
        }
        .v-select{
            input[type=search],input[type=search]:focus{
                height: 100%;
                background-color: #f2f2f2;
                text-align: left;
                width: 100%!important;
                background-image:url('../img/search-select.png');
                background-repeat:no-repeat;
                background-position:1rem 1.1rem;
                background-size:1.1rem 1.2rem;
                padding-left:2.5rem;
                border-radius: 5rem;
                height: 3.2rem;
                line-height: 3.2rem;
            }
            i.open-indicator{
                display: none;
            }
            .dropdown-toggle{
                padding: .6rem 1rem;
                border-radius: 0;
                position: relative;
                border:none;
                position: relative;
                height: 3.2rem;
                line-height: 3.2rem;
                .borderline(#d7d7d7,bottom);
            }
            .dropdown-menu{
                overflow: auto;
                max-height: 25rem !important;
                display: inline-block !important;
                li{
                    text-align: left;
                    line-height: 4rem;
                    margin-left: 1.5rem;
                    .borderline(#e2e2e2,bottom);
                    a{
                        color: #333;
                    }
                    &.highlight{
                        a{
                            background-color: white !important;
                            color: #333;
                        }
                    }
                    &.active{
                        background-image: url('../img/active-pink.png') !important;
                        background-position: 97% 50%;
                        background-repeat: no-repeat;
                        background-size: 1.1rem 1.1rem;
                        a{
                            background-color: white !important;
                            color: #333;
                        }
                    }
                    a{
                        display: block;
                        margin-right: 5rem;
                    }
                }
            }
            &.open{
                .dropdown-toggle{
                    border-left: none;
                    border-right: none;
                }
            }
        }
        .searchable .selected-tag{
            background-color: #f2f2f2 !important;
            border:solid .1rem #f2f2f2 !important;
            line-height: 3rem !important;
            margin: 0 !important;
            padding: 0 !important;
            position: absolute;
            z-index: 10;
            top: 1rem;
            left: 3rem;
            display:none;
        }
    }
</style>