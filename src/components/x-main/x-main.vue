<template>
    <main class="x-main">
        <div class="warp-content">
            <slot></slot>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'x-main',
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scope>
    .x-main {
        position: fixed;
        top: 85px;
        bottom: 0;
        right: 0;
        left: 0;
        .warp-content {
            @include flex-center;
            width: 1200px;
            height: 100%;
            margin: 0 auto;
        }
    }
 
</style>
