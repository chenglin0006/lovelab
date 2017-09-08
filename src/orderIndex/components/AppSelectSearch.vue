<template>
	<section class="adviser-section">
        <div class="adviser-search-div">
            <v-select :value.sync="selectModel" :on-change="consoleCallback" :placeholder="placeholderObj.text" :options="optionList" :null-text="nullText">
            </v-select>

        </div>
	</section>
</template>
<script>
    import Vue from 'vue';
    import vSelect from './Select.vue';
    import $ from '@dp/zepto';
    export default{
        data(){
            return{
            }
        },
        components:{
            vSelect
        },
        props:['optionList','selectModel','placeholderObj','nullText'],
        mounted() {
        },
        watch:{
        },
        methods:{
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
            }
        }
}
</script>
<style lang="less" rel="stylesheet/less">
    @import url('../../commonLess/border.less');
    .clearfix:before {
        content: '';
        display: block;
    }
    .clearfix:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
    }
    .adviser-section{
        .adviser-search-div{
            position: absolute;
            left: 0;
            right: 0;
            z-index: 21;
            background-color: #fff;
            font-size: 1.5rem;
        }
        .v-select{
            input[type=search],input[type=search]:focus{
                /*line-height: 3.2rem;*/
                height: 3.2rem;
                background-color: #f2f2f2;
                border-radius: 5rem;
                text-align: left;
                width: 100%!important;
                background-image:url('../img/icon_search_small@3x.png');
                background-repeat:no-repeat;
                background-position:1rem;
                background-size:1.1rem 1.2rem;
                text-indent:2rem;
                font-size:1.2rem;
            }
            i.open-indicator{
                display: none;
            }
            .dropdown-toggle{
                padding: .65rem 1rem;
                border-radius: 0;
                position: relative;
                border:none;
            }
            .dropdown-menu{
                overflow: auto;
                max-height: 28.1rem !important;
                display: inline-block !important;
                .borderline(#d7d7d7, top);
                /*border-top: solid 1px #d7d7d7;*/
                li{
                    text-align: left;
                    line-height: 4.5rem;
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
                        background-image: url('../img/icon_check@3x.png') !important;
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
                        margin-right: 50px;
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
            border:solid 1px #f2f2f2 !important;
            line-height: 4.5rem !important;
            margin: 0 !important;
            padding: 0 !important;
            position: absolute;
            z-index: 10;
            top: 10px;
            left: 30px;
            display:none;
        }
    }
</style>