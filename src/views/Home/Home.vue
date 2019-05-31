<template>
    <div class="Home">
        <Alert type="error" show-icon v-if="status === 0">您的账号当前已被禁用，部分功能将无法使用，请联系 0731-89681300 了解详细原因。</Alert>
        <Alert type="warning" show-icon v-if="wanzhengstatus === 0">您尚未进行<router-link to="/approve/">企业认证</router-link>，立即认证即可添加房源，解锁更多新功能。</Alert>
        <Card>
            <h3 slot="title">精选产品</h3>
            <div class="Home-card">
                <div class="text-center" v-for="(item, index) in imgs" :key="index">
                    <router-link :to="item.href">
                        <x-imglist :src="item.src" :text="item.text" radius></x-imglist>
                    </router-link>
                </div>
            </div>
        </Card>
        <Card>
            <h3 slot="title">象盒认证</h3>
            <div class="Home-card">
                <div class="text-center">
                    <p>本月新增开盘数</p>
                    <h1 class="Home-big-text">
                        20
                    </h1>
                </div>
                <div class="text-center">
                    <p>本月新房成交均价</p>
                    <h1 class="Home-big-text">
                        <!-- 2000
                        <span>元/㎡</span> -->
                        暂无数据
                    </h1>
                </div>
                <div class="text-center">
                    <p>本月新房成交数</p>
                    <h1 class="Home-big-text">
                        暂无数据
                    </h1>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'Home',
        data () {
            return {
                imgs: [
                    {src: require('../../assets/images/tjxm.png'), text: '添加项目', href: '/manage/add/'},
                    {src: require('../../assets/images/xmgl.png'), text: '项目管理', href: '/manage/'},
                    {src: require('../../assets/images/xhjk.png'), text: '象盒进客', href: '/entry/'},
                    {src: require('../../assets/images/qyrz.png'), text: '企业认证', href: '/approve/'},
                ]
            }
        },
        computed: {
            ...mapState(['status', 'wanzhengstatus']),
        },
    }
</script>

<style lang="scss" scope>
    .Home {
        padding: 0 10px;

        .Home-card {
            @include flex-around;
            padding: 35px 0;
            .Home-big-text {
                color: $color-text-blue;
                span {
                    color: inherit;
                    // font: w
                    color: $color-font-default;
                    font-size: $fs-small;
                    vertical-align: middle;
                }
            }
        }
    }

    .ivu-card {
        margin-top: 20px; 
    }

    .ivu-icon {
        vertical-align: sub;
        margin-right: 5px;
    }
</style>
