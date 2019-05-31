<template>
    <div class="x-imglist text-center"  @click="clickItem">
        <img :src="src" :class="[radius ? 'radius' : '']">
        <p v-if="text">{{text}}</p>
    </div>
</template>

<script>
    export default {
        name: 'x-imglist',
        props: {
            src: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            radius: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {

            }
        },
        methods: {
            clickItem(e) {
                this.$emit('click', e);
            }
        }
    }
</script>

<style lang="scss" scope>
    .x-imglist {
        display: inline-block;
        img {
            width: 120px;
        }
        img.radius {
            border-radius: 50%;
        }

        p {
            padding: 15px 0;
            font-size: $fs-normal;
            font-weight: bold;
        }
    }
 
</style>
