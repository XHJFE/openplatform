<template>
    <div class="x-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'x-container',
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scope>
    .x-container {
        box-shadow: $box-shadow;
        background: #fff;
        flex: 1;
        height: 100%;
        margin-left: 30px;
        padding: 30px 10px 0 10px;
        overflow: auto;
    }
</style>
