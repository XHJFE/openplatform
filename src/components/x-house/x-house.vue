<template>
    <div class="x-house flex-left">
        <div class="x-house-img">
            <img class="x-house-img" :src="data.logo || defaultImg" @error="imgErr">
        </div>
        
        <div class="flex-column-start">
            <div class="flex-between">
                <div class="x-house-title">
                    <span class="text-overflow" :title="`(${data.cityName})${data.name}`">
                        <span class="x-house-city">{{`(${data.cityName})`}}</span>{{data.name}}
                    </span>
                    <Tag color="blue" v-for="(ts, index) in data.ts" v-show="index < 2 && ts && ts.length < 5" :key="index">{{ts}}</Tag>
                    
                </div>
            </div>
            
            <div>
                户型：{{zlhx}}
            </div>
                <div>
                建筑面积：{{data.jzmj}}
            </div>
            <div>
                物业类型：{{data.wylbName}}
            </div>
            <div>
                最近维护时间：{{data.updateDate}}
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/xh.config'

    export default {
        name: 'x-house',
        props: {
            data: {
                type: Object,
                default() {
                    return {
                        
                    }
                }
            },
        },
        data() {
            return {
                defaultImg: config.failureDefaultImg
            }
        },
        computed: {
            /**
             * 主力户型
             */
            zlhx() {
                let huxinglist = this.data.huxinglist;
                let arr = [];
                if(!huxinglist) {
                    return ''
                }

                huxinglist.forEach(v => {
                    let str = v.jushi + '室';
                    if(v.saleStatus === "在售" && arr.indexOf(str)  === -1) {
                        arr.push(str)
                    }
                });
                return arr.join('，')
            }
        },
        methods: {
            imgErr(e) {
                e.target.src = config.failureDefaultImg;
            }
        }
    }
</script>

<style lang="scss" scope>
    .x-house {
        .x-house-img {
            width: 150px;
            height: 100px;
            margin-right: 20px;
        }
        .x-house-city {
            color: $color-font-Sub;
        }
        .flex-column-start {
            min-height: 100px;
            .ivu-badge-count {
                background: $color-primary;
            }
            div {
                font-size: $fs-small;
                padding: 1px 0;
            }
            .x-house-title {
                &>span {
                    width: 140px;
                    display: inline-block;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                color: $color-font-title;
                font-size: $fs-big;
            }
        }
    }
 
</style>
