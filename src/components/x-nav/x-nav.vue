<template>
    <div class="x-nav">
        <ul class="x-nav-wrap">
            <router-link tag='li' class="text-center x-nav-item" v-for="(v, i) in list" :to="v.link" :key="i">
                {{v.name}}
            </router-link>
        </ul>
        <div class="x-nav-call text-center">
            <p class="x-nav-phone">联系客服(<span>8:30-18:00</span>)</p>
            <p class="x-nav-text">0731-89681299</p>
        </div>
        <div class="x-nav-ewm text-center">
            <img src="~assets/images/xh-ewm.jpg" alt="">
        </div>
        <div class="x-nav-des text-center">
            <p>扫描二维码</p>
            <p>关注象盒找房</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'x-nav',
        data () {
            return {
                list: [
                    {name: '首页', link: '/home/'},
                    {name: '项目管理', link: '/manage/'},
                    {name: '象盒进客', link: '/entry/'},
                    {name: '企业认证', link: '/approve/'},
                ]
            }
        }
    }
</script>

<style lang="scss" scope>
    .x-nav {
        width: 195px;
        height: 100%;   
        overflow: auto;
        background: #fff;
        box-shadow: $box-shadow;
        .x-nav-wrap {
            padding: 0 0 20px 0;
        }
        .x-nav-item {
            font-size: $fs-normal-x;
            height: 70px;
            line-height: 70px;
            cursor: pointer;
            transition: all .2s;
            &:hover {
                background: $color-back-blue;
                color: $color-text-blue;
            }
            
            &.router-link-active {
                background: $color-back-blue;
                color: $color-text-blue;
                border-left: 3px solid $color-text-blue;
            }
        }

        .x-nav-call {
            width: 155px;
            margin: 0 auto;
            border: solid 3px #e5e5e5;
            padding: 15px 10px;
            border-radius: 4px;
            
            .x-nav-phone {
                font-size: $fs-normal;
                span {
                    font-size: $fs-small;
                }
            }

            .x-nav-text {
                padding-top: 10px;
                font-weight: bold;
                color: $color-text-blue;
                font-size: $fs-normal-x;
            }
        }

        .x-nav-ewm {
            padding-top: 20px;
            img {
                width: 155px;
                height: 155px;
            }
        }

        .x-nav-des {
            padding-top: 20px;
            font-size: $fs-normal;
            color: #999;
        }
    }
 
</style>
