<template>
    <transition name="none">
        <div class="Login">
            <div class="Login-content">
                <div class="Login-header">
                    <img src="~assets/images/logo.png">
                </div>
                
            </div>
            <div class="Login-body text-center">
                    <p>
                        象盒开放平台
                    </p>
                    <div class="Login-form">
                        <Card style="width:450px" :bordered="false">
                            <Form ref="formValidate" :model="form" :rules="ruleInline">
                                <FormItem prop="phone" label-position="top" label="手机号">
                                    <Input type="text" v-model="form.phone" placeholder="请输入手机号"></Input>
                                </FormItem>
                                <FormItem prop="code"  label-position="top" label="手机验证码">
                                    <Row>
                                        <Col span="20" class="text-left">
                                            <Input type="text" @on-enter="submit" v-model="form.code" placeholder="请输入手机验证码" style="width: 320px;"></Input>
                                        </Col>
                                        <Col span="4"><a @click="showVer">{{!isCountDown ? '获取验证码' : `${time}秒后获取`}}</a></Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    
                                    <div class="Login-btn">  
                                        <Button type="info" :loading="loginLoadin" @click="submit">{{loginLoadin ? '登录中...' : '登录'}}</Button>
                                    </div>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                </div>
            <Verify v-model="showModalVer" @fail="slideFail" @success="slideSucc"></Verify>
        </div>
    </transition>    
</template>

<script>
    import Verify from './Verify'
    import { mapActions, mapMutations  } from 'vuex'
    import api from 'api'
    import verify from 'util/verify'
    const {validatePhone} = verify;

    export default {
        name: 'Login',
        components: {
            Verify
        },
        data () {
            return {
                ruleInline: {
                    phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
                    code: { required: true, message: '请输入验证码', trigger: 'blur' }
                },
                form: {
                    phone: '',
                    code: ''
                },
                loginLoadin: false,
                time: 60, //倒计时时间
                isCountDown: false, //是否倒计时
                showModalVer: false
            }
        },
        methods: {
            ...mapActions(['queryCity']),
            ...mapMutations({
                setInfo: 'SET_USER_INFO',
                setWanzhengStatus: 'SET_FORM_STATUS',
                setStatus: 'SET_USER_STATUS'
            }),
            showVer() {
                if(this.isCountDown) {
                    return
                }

                //手机号无错误显示滑动验证
                this.$refs['formValidate'].validateField('phone', (res) => {
                    if(!res) {
                        this.showModalVer = true;
                    }
                });
            },
            submit() {
                this.$refs['formValidate'].validate((valid) => {
                    //验证不通过或正在登录中
                    if (!valid || this.loginLoadin) {
                        return
                    }
                    this.loginLoadin = true;
                    api.login.login({...this.form}).then((data) => {
                        
                        if(data && data.code == 200) {
                            this.setInfo(data.data);
                            this.setWanzhengStatus(data.data.wanzhengstatus);
                            this.setStatus(data.data.status);
                            this.$Notice.success({
                                title: '登陆成功',
                                desc: `欢迎您             ${data.data.userName}`
                            });
                            this.queryCity();
                            setTimeout(() => {
                                this.$router.replace('/home/');
                            }, 1000)
                        } else {
                            this.$Notice.warning({
                                title: '验证码输入错误，请重试。'
                            });
                        }
                        this.loginLoadin = false;                        
                    }).catch((e) => {
                        this.$Notice.warning({
                            title: '登录错误，请重试。'
                        });
                        this.loginLoadin = false;
                    })
                })
            },
            slideFail() {

            },
            slideSucc() {
                let phone = this.form.phone;
                api.helper.getPhoneCode(phone).then((data) => {
                    this.countDown();
                }).catch((e) => {
                    console.log(e)
                })

                setTimeout(() => {
                    this.showModalVer = false;
                }, 1000);
            },
            countDown() {
                this.isCountDown = true;
                if(!this.time) {
                    this.time = 60;
                    this.isCountDown = false;
                    return
                }
                this.time--;
                setTimeout(() => {
                    this.countDown();
                }, 1000)
            }
        }
        
    }
</script>

<style lang="scss" scope>
    .Login {
        @include fixed-full;
        background: #fff;   

        .ivu-form-item-label {
            font-size: 16px;
        }

        .Login-content {
            width: 1200px;
            margin: 0 auto;
            .Login-body, .Login-header {
                width: 100%;
            }

            .Login-header {
                padding: 15px 0 0 65px;
                height: 75px;
                &>img {
                    width: 70px;
                }
            }
        }
        .Login-body {
                height: 640px;
                background: url("../../assets/images/login.jpg") no-repeat bottom;
                &>p {
                    padding: 35px 0;
                    color: #fff;
                    letter-spacing: 5px;
                    font-size: 45px;
                    font-weight: bold;
                }

                .Login-form {
                    display: inline-block;
                    padding-top: 20px;
                    margin: 0 auto;

                    .Login-btn {
                        .ivu-btn {
                            width: 100%;
                        }
                    }
                }
            }
    }
</style>
