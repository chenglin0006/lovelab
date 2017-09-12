<template>
<div class="routerpage2">
123
    <div v-for="(item,index) in articleRecommand">{{item.recommandTitle}}</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'routerpage2',
    components: {
    },
    data() {
        return {
            articleRecommand:[]
        }
    },
    computed:{
        ...mapGetters({
            userList:'getUserList'
        })
    },
    mounted() {
        this.createRecommand();
        this.getRecommandListFun();
    },
    methods: {
        getRecommandListFun:function(){
            // 请求推荐好文数据列表
            this.$http.get('/api/getArticleRecommand').then(
                respone => {
                    console.log(respone.body);
                    this.articleRecommand =  respone.body
                },
                respone => {
                }
            )
        },
        createRecommand:function(){
            var obj = {
                recommandTitle: new Date().getTime(),
                recommandLink: '456',
                upNumber:0
            }
            // if(this.recommandTitle){
            this.$http.post('/api/saveArticleRecommand',{
                recommand: obj
            }).then(
                respone => {
                   this.getUserListFun();
                },
                respone => {

                }
            )
            // }
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.routerpage2{
    
}
</style>
