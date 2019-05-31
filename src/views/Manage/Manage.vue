<template>
    <div class="Manage">
        <div>
            <router-link to="/manage/add/" tag="span">
                <Button type="info">
                    添加新项目
                </Button>
            </router-link>
        </div>
        <x-underline :text="getCount"></x-underline>
        <x-datawrap :loading="showListLoading">
            <div v-for="(item, index) in list" :key="item.audit_id" style="margin-bottom: 10px">
                <Card> 
                    <Row>
                        <Col span="10">
                            <x-house :data="item"></x-house>
                        </Col>
                        <Col span="7">
                            <div class="text-center Manage-cell-header">
                                状态
                            </div>
                            <div class="text-left Manage-cell">
                                <p class="Manage-status">{{item.status === 0 ? '等待审核' : item.status === -1 ? '审核失败' : '审核通过'}}</p>
                                <p>{{item.auditupdateTime}}</p>

                                <!-- 不通过原因 -->
                                <p>{{item.refusereson}}</p>
                            </div>
                        </Col>
                        <Col span="7">
                            <div class="text-center Manage-cell-header">
                                操作
                            </div>
                            <div class="text-center">
                                <p class="Manage-btn Manage-btn-first text-center">
                                    <Button size="small" @click="edit(item.show_managerId, item.audit_id)" v-if="item.status === 1">修改电话</Button>
                                    <Button size="small" @click="again(item.houseId, item.houseName, item.audit_id, item.status)" v-if="item.status === -1">重新申请</Button>
                                    <Button size="small" @click="del(item.audit_id, item.name)">取消添加</Button>
                                    <Button size="small" @click="look(item.houseId, item.cityPY)" v-if="item.status === 1">查看获客</Button>
                                    <Button size="small" @click="prev(item.houseId, item.cityPY)">&nbsp;&nbsp;预&nbsp;&nbsp;&nbsp;览&nbsp;&nbsp;</Button>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Card>
                
            </div>
            <!-- <Page :total="40" size="small" show-elevator show-sizer slot="page"/> -->
        </x-datawrap>
        <x-info v-if="hasList" text="暂无项目信息，请先添加项目" type="warning"></x-info>
        <div  class="Manage-wrap" v-if="hasList">
            <x-imglist v-for="(item, index) in imgs" :src="item.src" :text="item.text"></x-imglist>
        </div>
        <!-- <div class="Manage-wrap" v-if="false">
            <x-imglist v-for="(item, index) in imgList" :src="item.src" :text="item.text"></x-imglist>
        </div>
        <div v-if="true">
            <img src="~assets/images/dt.jpg" alt="">
        </div> -->
        <manageModal ref="manageModal" @submit="submitSucc"></manageModal>
    </div>
</template>

<script>
    import manageModal from './manage-modal'
    import {mapState} from 'vuex'
    import api from 'api'
    import verify from 'util/verify'

    const houseApi = api.house;
    export default {
        name: 'Manage',
        components: {
            manageModal
        },
        data () {
            return {
                list: [],
                imgs: [
                    {src: require('../../assets/images/zxfyxq.png'),text: '实时预览在线房源详情'},
                    {src: require('../../assets/images/400.png'),text: '添加开发商400电话'},
                    {src: require('../../assets/images/xhjksj.png'),text: '获取象盒网进客数据'},
                ],
                imgList: [
                    {src: require('../../assets/images/jzkh.png'),text: '精准客户'},
                    {src: require('../../assets/images/hyll.png'),text: '活跃流量'},
                    {src: require('../../assets/images/jjr.png'),text: '经纪人'},
                ],
                showModal: false,
                hasList: false,
                showListLoading: false
            }
        },
        computed: {
            ...mapState(['userInfo']),
            getCount() {
                return `全部项目数（${this.list.length}）`
            }
        },
        methods: {
            /**
             * 修改电话
             */
            edit(show_managerId, audit_id) {
                //房源show_managerId 可能为null
                verify.verifyUserStatus({
                    success: () => {
                        this.$refs.manageModal.showPop(show_managerId, audit_id);
                    }
                });
            },

            /**
             * 电话修改成功回调
             */
            submitSucc() {
                this.queryData();
            },

            /**
             * 取消
             */
            del(audit_id, houseName) {
                this.$Modal.confirm({
                    title: `是否取消添加"${houseName}"?`,
                    onOk: () => {
                        houseApi.deleteHouseProject(audit_id).then(data => {
                            if(data.code === 200) {
                                this.$Modal.success({title: '删除成功。'});
                                this.queryData();
                            }
                        })
                    },
                    onCancel: () => {
                        
                    }
                });
                
            },

            /**
             * 查看获客
             */
            look(houseId, cityPY) {
               verify.verifyUserStatus({
                    success: () => {
                        this.$router.push(`/entry/${houseId}`)
                    }
                });
            },

            /**
             * 重新申请,再次掉添加项目接口,并添加audit_id
             */
            again(houseId, houseName, audit_id, status) {
                verify.verifyUserStatus({
                    success: () => {
                        let developersId = this.userInfo.managerId;
                        let params = {
                            developersId,
                            houseId,
                            houseName,
                            audit_id
                        }
                        houseApi.addHouseProject(params).then(data => {
                            if(data.code === 200) {
                                this.queryData();
                                this.$Notice.success({
                                    title: '重新申请成功。',
                                });
                            }
                        }).catch((e) => {
                            this.$Notice.error({
                                title: '重新申请失败。',
                            });
                        });
                    }
                });
            },

            /**
             * 预览，打开新房详情
             */
            prev(houseId, cityPY) {
                window.open(`http://${cityPY}.fang.xhj.com/${houseId}.html`);
            },

            /**
             * 列表查询
             */
            queryData() {
                this.showListLoading = true;
                this.list = [];
                houseApi.queryHouseProject(this.userInfo.managerId).then(data => {
                    this.showListLoading = false;
                    this.list = data.data;
                    if(!this.list.length) {
                        this.hasList = true;
                    }
                })
            }
        },
        created() {
            this.queryData();
        }
    }
</script>

<style lang="scss" scope>
    .Manage {
        .Manage-cell-header {
            font-size: $fs-normal-x;
        }

        .Manage-cell {
            padding: 10px 30px 0 80px;
            .Manage-status {
                color: $color-warning;
            }
        }

        .Manage-btn-first {
            margin-top: 20px;
            width: 160px;
            text-align: left;
            display: inline-block;
        }

        .Manage-btn {
            .ivu-btn {
                margin: 0 5px 5px 0;
            }
        }

        .Manage-count {
            padding: 20px 0 10px 0;
            border-bottom: $border-1px;
            margin-bottom: 30px;
        }
        .Manage-wrap {
            @include flex-around;
            padding: 80px 0;
        }
    }
</style>
