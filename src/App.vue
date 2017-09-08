<template>
    <div id="app">
        <div class="content-panel">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <app-bottom-tab v-show="showBottom"></app-bottom-tab>
        </div>
    </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp';
import Toast from '@dp/wepp-module-toast';
import AppBottomTab from './commonApp/AppBottomTab.vue';
import { mapGetters } from 'vuex';
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
        ...mapGetters({
            showBottom:'getShowBottomStatus'
        })
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






