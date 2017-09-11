<template>
    <div id="app">
        <div class="content-panel">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <app-bottom-tab></app-bottom-tab>
        </div>
    </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp';
import Toast from '@dp/wepp-module-toast';
import AppBottomTab from './commonApp/AppBottomTab.vue';
export default {
    name: 'app',
    data () {
        return {
        }
    },
    components:{
        AppBottomTab
    },
    computed:{
    },
    created:function(){

    },
    mounted: function(){
        
    },
    methods:{
    }
}
</script>

<style>
</style>






