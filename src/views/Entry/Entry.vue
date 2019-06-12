<template>
    <div class="Entry">
        <Form>
            <Row>
                <Col span="7">
                    <FormItem label="城市" :labelWidth="65">
                        <Select v-model="cityId" @on-change="queryData(1)" placeholder="请输入或选择城市" style="width:200px">
                            <Option value="">请选择城市</Option>
                            <OptionGroup v-for="(item, index) in cityList" :key="index" :label="item.type">
                                <Option v-for="v in item.list" :value="v.cityId" :key="v.cityId">{{ v.name }}</Option>
                            </OptionGroup>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="项目" :labelWidth="65">
                        <Select v-model="houseId" @on-change="queryData(2)" placeholder="请选择项目" style="width:200px">
                            <Option value="">请选择项目</Option>
                            <Option v-for="item in houseList" :value="item.houseId" :key="item.houseId" v-if="item.status === 1">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="日期" :labelWidth="65">
                        <DatePicker
                        
                        type="daterange" 
                        placeholder="请选择日期范围"  
                        placement="bottom-end"  
                        style="width: 200px"
                        format="yyyy-MM-dd"
                        @on-change="queryData"
                        >
                        </DatePicker>
                    </FormItem>
                </Col>
                <Col span="3"></Col>
            </Row>
        </Form>
        <x-underline :text="totalAll"></x-underline>
        <x-datawrap :loading="showListLoading">
            <Table :columns="tableHead" :data="tableBody" :no-data-text="``">
                <template  slot-scope="{ row, index }" slot="cityName">
                    <span>{{ row.cityName }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="housename">
                    <span>{{ row.housename }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="comsur_name">
                    <span>{{ row.comsur_name }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="comsur_phone">
                    <span>{{ row.comsur_phone }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="createTime">
                    <span>{{ row.createTime | formatTime('YYYY-MM-DD')}}</span>
                </template>
            </Table>
            <x-info v-if="hasList" text="暂时没有更多的获客数据" type="warning"></x-info>
            <Page 
            :total="total"
            :current="page.currPage"
            :page-size="page.pageSize" 
            size="small" 
            show-elevator 
            show-sizer 
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            slot="page"/>
        </x-datawrap>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import verify from 'util/verify'
    import iView from 'iview'
    import api from 'api'
    import store from 'store'

    const houseApi = api.house;
    const helperApi = api.helper;
    let initPage = {
        currPage: 1,
        pageSize: 10
    }

    export default {
        name: 'Entry',
        data () {
            return {
                tableHead: [
                                {
                                    title: '城市名',
                                    slot: 'cityName'
                                },
                                {
                                    title: '项目名',
                                    slot: 'housename'
                                },
                                {
                                    title: '客户名',
                                    slot: 'comsur_name'
                                },
                                {
                                    title: '客户联系方式',
                                    slot: 'comsur_phone'
                                },
                                {
                                    title: '获客时间',
                                    slot: 'createTime'
                                }
                            ],
                tableBody: [],
                date: '',
                total: 0,               //总条数
                page: { ...initPage },  //分页
                total: 0,               //总条数
                houseList: [],          //项目列表
                cityId: '',
                houseId: '',
                timeFrom: '',
                timeTo: '',
                times: [],
                showListLoading: false,
                hasList: false
            }
        },
        computed: {
            ...mapState(['cityList', 'userInfo']),
            totalAll() {
                return `全部项目数（${this.total}）`
            },
        },
        methods: {
            queryData(e) {
                verify.verifyUserStatus({
                    success: () => {
                        this.hasList = false;
                        this.showListLoading = true;
                        this.tableBody = [];
                        let params = {...this.page};

                        //选城市重置房源查询
                        if(e === 1) {
                            this.houseId = '';
                        }

                        //有房源id查单个房源，传用户id查所有
                        if(this.houseId) {
                            params.houseId = this.houseId;
                        } else {
                            params.did = this.userInfo.managerId;
                        }
                        
                        //有选择时间
                        if(e instanceof Array) {
                            this.timeFrom = e[0];
                            this.timeTo = e[1];
                        }

                        if(this.timeFrom && this.timeTo) {
                            params.timeFrom = this.timeFrom;
                            params.timeTo = this.timeTo;
                        }

                        //有选择城市
                        if(this.cityId) {
                            params.cityId = this.cityId;
                        }

                        helperApi.queryEntryList(params).then(data => {
                            this.showListLoading = false;
                            this.tableBody = data.data.content;
                            this.total = data.data.totalElements;
                            !this.tableBody.length && (this.hasList = true);
                        })
                    },
                    fail: () => {
                        
                    }
                });
                
            },

            /**
             * 查询重置分页
             */
            resetPage() {
                this.total = 10;
                this.page = { ...initPage };
            },

            pageChange(count) {
                this.resetPage();
                this.page.currPage = count;
                this.queryData();
            },

            pageSizeChange(pageSize) {
                this.resetPage();
                this.page.pageSize = pageSize;
                this.queryData();
            },

        },
        created() {
            this.houseId = this.$route.params.id || '';
            this.queryData();
            houseApi.queryHouseProject(this.userInfo.managerId).then(data => {
                this.houseList = data.data;
            })
        }
    }
</script>

<style lang="scss" scope>

 
</style>
