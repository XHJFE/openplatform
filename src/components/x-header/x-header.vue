<template>
    <div class="x-header">
        <div class="x-header-content">
            <div class="x-header-logo">
                <router-link to="/">
                    <img src="~assets/images/logo.png">
                </router-link>
                <span class="x-header-text">象盒开放平台</span>
            </div>
            <div class="x-header-info">
                <span class="x-header-name">
                    您好{{userName}}
                </span>
                <span class="x-head-logout">
                    <Button size="large" type="text" @click="out">
                        <span>
                            退出
                        </span>
                    </Button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'x-header',
        computed: {
            userName() {
                return this.$store.state.userInfo.userName || ''
            }
        },  
        methods: {
            ...mapActions(['logout']),
            out() {
                this.logout();
                this.$router.replace({path: '/login/'});
            }
        }, 
    }
</script>

<style lang="scss" scope>
    .x-header {
        width: 100%;
        height: 75px;
        padding-top: 5px;
        position: fixed;
        top: 0;
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
        box-shadow: $box-shadow;
        .x-header-content {
            @include flex-between;
            margin: 0 auto;
            width: 1200px;
            height: 100%;
            
            .x-header-logo {
                padding-left: 65px;
                @include flex-center;
                .x-header-text {
                    font-size: $fs-big-x;
                    color: $color-text-blue;
                    margin-left: 80px;
                }

                img {
                    width: 70px;
                }
            }

            .x-header-info {
                @include flex-between;
                font-size: $fs-normal-x;
                width: 240px;
                padding-right: 10px;
            }
        }
    }
 
</style>
