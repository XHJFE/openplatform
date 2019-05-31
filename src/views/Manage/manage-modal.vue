<template>
    <Modal
        v-model="showModal"
        title="修改获客电话"
        loading
        @on-ok="asyncOK"
        @on-cancel="asyncCnacel"
        ref="modal"
        >
        <Form 
            label-position="right" 
            :label-width="100"
            ref="formInline"
            :rules="rule"
            :model="formData"
            >
            <FormItem prop="tel" label="新接线电话：">
                <Input v-model="formData.tel"></Input>
            </FormItem>
            <FormItem label="当前接线电话：">
                {{phone}}
            </FormItem>
            <FormItem label="绑定400号段：">
                {{bigPhone}}
            </FormItem>
        </Form>
        <Alert show-icon>注：获客电话会设为客户默认电话，系统将会为接线电话自动生成400号码</Alert>
    </Modal>
</template>

<script>
    import verify from 'util/verify'
    import api from 'api'
    const {validatePhone} = verify;
    const helperApi = api.helper;

    export default {
        name: 'manage-modal',
        data () {
            return {
                showModal: false,
                formData: {
                    tel: ''
                },
                rule: {
                    tel: [{validator: validatePhone, trigger: 'blur'}]
                },
                modal: null,
                show_managerId: '',     //用来查询房源的电话
                audit_id: '',    //用来提交房源的电话
                phone: '',      //经纪人电话
                bigPhone: ''    //400电话
            }
        },
        methods: {
            /**
             * 父组件调用入口
             */
            showPop(show_managerId, audit_id) {
                //show_managerId 可能为null
                this.show_managerId = show_managerId;
                this.audit_id = audit_id;
                this.showModal = true;
                this.phone = '';
                this.bigPhone = '';
                if(!this.show_managerId) {
                    return
                }
                this.queryPhone(this.show_managerId);
            },

            /**
             * 点确定
             */
            asyncOK() {
                let _this = this;
                let success = _this.$Modal;
                _this.formInline.validate((valid) => {
                    if (!valid) {
                        _this.modal.buttonLoading = false;
                        return
                    }
                    _this.confirm();
                })
            },

            /**
             * 点取消
             */
            asyncCnacel() {
                let _this = this;
                // resetFields
                _this.formInline.resetFields();
                _this.$emit('input', false);
                _this.$emit('on-cancel');
            },

            /**
             * 显示点确定对话框
             */
            confirm() {
                let _this = this;
                let confirm = _this.$Modal;
                let params = {
                    phone: _this.formData.tel,
                    audit_id: _this.audit_id
                };
                confirm.confirm({
                    title: '确定修改获客电话吗？',
                    onOk() {
                        _this.$Spin.show();
                        helperApi.updateHousePhone(params).then((data) => {
                            _this.okHandle()
                        });
                    },
                    onCancel() {
                        _this.modal.buttonLoading = false;
                    },
                });
            },
            okHandle() {
                this.$Spin.hide();
                this.$emit('submit');
                this.formData.tel = '';
                this.showModal = false;
                this.$Notice.success({
                    title: '修改成功',
                }); 
            },

            /**
             * 查询该房源号码
             */
            queryPhone(show_managerId) {
                helperApi.queryHousePhone(show_managerId).then((data) => {
                    let d = data.data;
                    if(!d || data.code !== 200) {
                        return
                    }
                    this.phone = d.phone;
                    this.bigPhone = d.bigNum && d.extNum ? `${d.bigNum}转${d.extNum}` : '';
                })
            }
        },
        mounted () {
            let _this = this;
            _this.modal = _this.$refs.modal;
            _this.formInline = _this.$refs.formInline;       
        }
    }
</script>

<style lang="scss" scope>

 
</style>
