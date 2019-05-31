<template>
    <div class="Add">
        <Alert show-icon>说明：请使用搜索功能查找项目、添加项目。</Alert>
        <div>
            <Form inline>
            <FormItem>
                <Select v-model="cityId" @on-change="queryChange" placeholder="请输入或选择城市" style="width:240px">
                    <OptionGroup v-for="(item, index) in cityList" :key="index" :label="item.type">
                        <Option v-for="v in item.list" :value="v.cityId" :key="v.cityId">{{ v.name }}</Option>
                    </OptionGroup>
                </Select>
            </FormItem>
            <FormItem>
                <AutoComplete
                    v-model="model11"
                    @on-change="queryChange"
                    @on-select="inputSelect"
                    placeholder="请输入所需添加的项目名"
                    style="width:240px">
                    <Option v-for="item in houseList" :value="item.name" :key="item.houseId">{{ item.name }}</Option>
                </AutoComplete>
            </FormItem>
            <FormItem>
                <Button class="Add-btn" type="primary" icon="ios-search" @click="search">搜索</Button>
                <Button class="Add-btn" size="large" type="text">
                    <router-link tag="span" to="/manage/">返回项目列表</router-link>
                </Button>
            </FormItem>
            
            </Form>
        </div>
        <x-underline :text="totalAll"></x-underline>
        <x-datawrap :loading="showListLoading">
            <div v-for="item in hasHouseList" :key="item.houseId" style="margin-bottom: 10px">
                <Card > 
                    <Row >
                        <Col span="12">
                            <x-house :data="item"></x-house>
                        </Col>
                        <Col span="8">&nbsp;</Col>
                        <Col span="4" class="Add-add-item">
                            <Button type="info" :disabled="item.hasOwn" @click="addHouse(item.hasOwn, item.houseId, item.name)">{{item.hasOwn ? '已添加' : '添加项目'}}</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
            <x-info v-if="hasList" text="暂时没有更多的房源数据" type="warning"></x-info>
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
    import api from 'api'
    import verify from 'util/verify'

    const houseApi = api.house;
    let initPage = {
        currPage: 1,
        pageSize: 10
    }

    export default {
        name: 'Add',
        data () {
            return {
                cityId: '1',
                model11: '',
                hasHouseId: [],         //已添加房源id，用于更新按钮状态
                houseList: [],          //下拉筛选
                showList: [],           //分页列表
                page: { ...initPage },  //分页
                total: 0,               //总条数
                filterHouse: null,      //列表axios实例
                timer: null,            //定时器
                hasList: false,
                showListLoading: false
            }
        },
        computed: {
            ...mapState(['cityList', 'userInfo']),
            
            totalAll() {
                return `全部项目数（${this.total}）`
            },

            hasHouseList() {
                return this.showList.map(v => {
                    if(this.hasHouseId.indexOf(v.houseId) > -1) {
                        v.hasOwn = true
                    }
                    return v
                })
            }
        },
        methods: {
            search() {
                this.resetPage();
                this.queryDataList(this.model11, this.page, true);
            },

            inputSelect(keyword) {
                this.resetPage();
                this.queryDataList(keyword, this.page, true);
            },
            
            /**
             * 下拉筛选和分页列表
             *  @isSubmit {Boolean} 是否为点击搜索
             */
            queryDataList(keyword, arg, isSubmit) {
                if(isSubmit) {
                    this.showList = [];
                    this.total = 0;
                    this.showListLoading = true;
                } else {
                    this.houseList = [];
                }
                let params = Object.assign({name: keyword, cityId: this.cityId}, arg);
                this.filterHouse = houseApi.filterHouse(params);
                this.filterHouse.then(data => {
                    let content = data.data;
                    if(isSubmit) {
                        this.showListLoading = false;
                        this.total = content.totalElements;
                        this.showList = content.content || [];
                        !this.showList.length && (this.hasList = true);
                        return
                    }
                    this.houseList = content.content || [];
                }, () => {})
            },

            /**
             * 输入改变
             */
            queryChange() {
                this.clearTimer();
                this.timer = setTimeout(() => {
                    this.clearTimer();
                    this.abort();
                    this.queryDataList(this.model11, {currPage: 0, pageSize: 5}, false);
                }, 300)      
            },

            clearTimer() {
                if(this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            },

            abort() {
                if(this.filterHouse) {
                    this.filterHouse.abort();
                }
            },

            /**
             * 查询重置分页
             */
            resetPage() {
                this.total = 10;
                this.page = { ...initPage };
            },

            pageChange(count) {
                this.page.currPage = count;
                this.queryDataList(this.model11, this.page, true);
            },

            pageSizeChange(pageSize) {
                this.page.pageSize = pageSize;
                this.queryDataList(this.model11, this.page, true);
            },

            /**
             * 添加项目
             */
            addHouse(hasOwn, houseId, houseName) {
                if(hasOwn) {
                    return
                }
                verify.verifyUserStatus({
                    success: () => {
                        let developersId = this.userInfo.managerId;
                        let params = {
                            developersId,
                            houseId,
                            houseName,
                        }
                        houseApi.addHouseProject(params).then(data => {
                            if(data.code === 200) {
                                this.hasHouseId.push(params.houseId);
                                this.$Notice.success({
                                    title: '添加成功。',
                                });
                            }
                        }).catch((e) => {
                            this.$Notice.error({
                                title: '添加失败。',
                            });
                        });
                    }
                });
            }
        },
        created() {
            // queryMyProjectId
            houseApi.queryMyProjectId(this.userInfo.managerId).then(data => {
                this.hasHouseId = data.data || []
            })
        }
    }
</script>

<style lang="scss" scope>
    .Add {
        .Add-add-item {
            padding-top: 40px;
        }

        .Add-btn {
            margin-left: 10px;
        }
    }
 
</style>
