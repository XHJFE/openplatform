<template>
    <transition name="fade">
        <div class="Verify" @click="close" v-if="value">
            <div class="Verify-pop text-center">
                <Card>
                    <x-puzzle @click.native.stop @error="verError" @success="verSuccess" width="260" height="120" :puzzle-img-list="imglist"></x-puzzle>
                </Card>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Verify',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                imglist: ['http://szimg.xhj.com/xhj/images/64bab61c-3e50-4730-aa6a-82588a3be959.jpg']
            }
        },
        methods: {
            close() {
                this.$emit('input', false);
            },
            verError() {
                this.$emit('fail');
            },
            verSuccess() {
                this.$emit('success');
            }
        }
    }
</script>

<style lang="scss" scope>
    .Verify {
        @include fixed-full;
        background: rgba(0, 0, 0, 0.5);

        .Verify-pop {
            @include fixed-full;
            top: 20%;

            .ivu-card {
                width: 350px;
                margin: 0 auto;
            }
            // padding-top: 20%;
        }
    }
 
</style>
