<template>
    <div class="my-header" :class="{isIOS: config.isIOS}">
        <slot v-if="config.isSearch">
            <form action="" @submit.prevent="doSearch">
                <input type="search" placeholder="输入客户名／手机号" v-model="inputValue" class="search-input"/>
            </form>
            <div class="cancel" @click="cancel">取消</div>
            <div class="cleartext" v-show="inputValue" @click="clearInputValue"></div>
        </slot>
        <slot v-else>
            <div class="back" @click="goBack" v-if="config.hasBack"></div>
            <div class="text" v-if="config.text">{{config.text}}</div>
            <div class="search-icon" @click="goSearch" v-if="config.hasSearchIcon"></div>
            <div class="add-user" @click="goAddUser" v-if="config.hasAddIcon"></div>
            <div class="right-text" @click="doSave" v-if="config.rightText">{{config.rightText}}</div>
        </slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputValue: ''
        }
    },
    props: ['config'],
    methods: {
        goBack() {
            window.history.go(-1)
        },
        goSearch() {
            location.href = './customer-search.html'
        },
        cancel() {
            window.history.go(-1)
        },
        doInput(event) {
            if (event.keyCode == 13 || event.keyCode == 84) {
                this.doSearch(event.target.value)
            }
        },
        clearInputValue() {
            this.inputValue = ''
        },
        doSearch() {
            if (this.$store.state.searchKeyWord != this.inputValue && this.inputValue != '') {
                this.$store.commit('doSearch', {
                    pageIndex: 1,
                    keyword: this.inputValue
                })
                this.$emit('dosearched')
            }
        },
        goAddUser() {
            location.href = './customer-edit.html'
        },
        doSave() {
            this.$emit('saveCustomer')
        }
    }
}
</script>

<style lang="less" scoped>
.my-header {
    input[type=search] {
        -webkit-appearance: textfield;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button {
        display: none;
    }
    height: 4.4rem;
    background-image: linear-gradient(71deg, #FF7088 0%, #F759A8 100%);
    position: relative;
    .search-input {
        width: 29.1rem;
        height: 3rem;
        position: absolute;
        border-radius: 3rem;
        padding: 0 3.5rem 0 1.5rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #333;
        left: 1.5rem;
        bottom: 0.7rem;
        box-sizing: border-box;
        border: none;
    }
    .cancel {
        line-height: 3rem;
        font-size: 1.5rem;
        font-family: PingFangSC-Medium;
        color: #fff;
        position: absolute;
        right: 2rem;
        bottom: 0.7rem;
    }
    .search-input::-webkit-input-placeholder {
        color: #b5b5bb;
    }
    .back {
        position: absolute;
        width: 2rem;
        height: 2rem;
        left: 1.3rem;
        bottom: 1.2rem;
        background: url(../img/icon_nav_back@3x.png) no-repeat;
        background-size: contain;
    }
    .text {
        text-align: center;
        line-height: 4.4rem;
        color: #fff;
        font-size: 1.8rem;
    }
    .search-icon {
        width: 2rem;
        height: 2rem;
        position: absolute;
        bottom: 1.2rem;
        right: 1.3rem;
        background: url(../img/icon_search@3x.png) no-repeat;
        background-size: contain;
    }
    .add-user {
        width: 2rem;
        height: 2rem;
        position: absolute;
        bottom: 1.2rem;
        right: 5.3rem;
        background: url(../img/icon_nav_add@3x.png) no-repeat;
        background-size: contain;
    }
    .right-text {
        position: absolute;
        right: 1.5rem;
        bottom: 0;
        line-height: 4.4rem;
        color: #fff;
        font-size: 1.5rem;
        font-family: PingFangSC-Medium;
    }
    .cleartext {
        position: absolute;
        width: 3rem;
        height: 3rem;
        bottom: 0.7rem;
        left: 27rem;
        background: url(../img/icon_close@3x.png) center/1.2rem no-repeat;
    }
    &.isIOS {
        padding-top: 2rem;
    }
}
</style>

