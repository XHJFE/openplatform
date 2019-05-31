<template>
    <div class="not-found">
        <div>很抱歉，您要访问的页面不存在！</div>
    </div>
</template>

<script>
    import api from 'api'

    export default {
        name: 'not-found',
        data () {
            return {

            }
        },
        created () {

        }
    }
</script>

<style lang="scss" scope>
    .not-found {
        @include fixed-full;
        background: #fff;
    }
 
</style>
