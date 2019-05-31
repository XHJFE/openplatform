<template>
    <div class="x-underline" :style="{width: width}">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: 'x-underline',
        props: {
            text: {
                type: [String, Number],
                default: ''
            },
            width: {
                type: [String, Number],
                default: '100%'
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scope>
    .x-underline {
        padding: 20px 0 10px 0;
        border-bottom: $border-1px;
        margin-bottom: 30px;
    }
</style>
