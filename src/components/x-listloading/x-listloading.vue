<template>
    <div class="x-listloading">
        <Card> 
            <Row>
                <Col span="24">
                    <Spin fix>
                        <Icon type="ios-loading" size=18 class="x-listloading-spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'x-listloading',
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scope>
    .x-listloading {
        width: 100%;
        .ivu-card {
            padding: 20px;
        }
        .x-listloading-spin-icon-load{
            animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
            from { transform: rotate(0deg);}
            50%  { transform: rotate(180deg);}
            to   { transform: rotate(360deg);}
        }
        .demo-spin-col{
            height: 100px;
            position: relative;
            border: 1px solid #eee;
        }
    }
 
</style>
