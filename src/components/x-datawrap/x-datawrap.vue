<template>
    <div class="x-datawrap">
        <slot></slot>
        <x-listloading v-if="loading"></x-listloading>
        <div class="x-datawrap-page text-right">
             <slot name="page"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'x-datawrap',
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scope>
    .x-datawrap {
        .x-datawrap-page {
            padding: 20px 10px;
            .ivu-page {
                display: inline-block;
            }
        }
        
    }
 
</style>
