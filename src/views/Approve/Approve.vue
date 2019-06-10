<template>
  <div class="Approve">
    <Form :model="formItem" :label-width="110">
      <FormItem label="企业名称">
          <Input type="text" v-model="formItem.corporation_name" placeholder="请填写公司名称"></Input>
      </FormItem>
      <FormItem label="企业法人">
          <Input type="text" v-model="formItem.corporation" placeholder="请填写公司法人"></Input>
      </FormItem>
      <FormItem label="统一社会信用代码">
          <Input type="text" v-model="formItem.scode" placeholder="请填写营业执照编码"></Input>
      </FormItem>
      <FormItem label="联系人姓名">
          <Input type="text" v-model="formItem.name" placeholder="请填写联系人姓名"></Input>
      </FormItem>
      <FormItem label="联系人电话">
          <Input type="number" v-model="formItem.phone" placeholder="请填写联系人电话"></Input>
      </FormItem>
      <FormItem label="归属区域">
          <Row>
            <Col span="11">
              <Select v-model="formItem.region" placeholder="请选择归属区域">
                <!-- <Option :key="58888" value="">&lt;请选择归属区域&gt;</Option> -->
                <Option v-for="(item, index) in attributionArea" :key="index" :value="item">{{item}}</Option>
              </Select>
            </Col>
            <Col span="1" style="text-align: center">&nbsp;</Col>
            <Col span="1" style="text-align: center">城市&nbsp;</Col>
            <Col span="11">
              <Select v-model="formItem.city" placeholder="请选择城市">
                    <!-- <Option :key="58888" value="">&lt;请选择城市&gt;</Option> -->
                    <OptionGroup v-for="(item, index) in cityList" :key="index" :label="item.type">
                        <Option v-for="v in item.list" :value="v.name" :key="v.cityId">{{ v.name }}</Option>
                    </OptionGroup>
                </Select>
            </Col>
          </Row>
      </FormItem>
      <FormItem label="营业执照">
          <Upload 
          ref="upload" 
          :action="uploadUrl" 
          :on-success="handleSuccess" 
          :before-upload="handleUpload" 
          :on-remove="handleRemove"
          :on-error="handleErr"
          >
          <Button icon="ios-cloud-upload-outline">选择图片</Button>
          </Upload>
          <Button v-if="file !== null && !loadingStatus" type="text" @click="clear">
              取消选择
          </Button>
          <!-- <Button v-if="formItem.business_license" type="text" @click="deleteImg">
              删除执照
          </Button> -->
      </FormItem>
      <FormItem>
            <div class="show-img">
              <div style="height: 244px;">
                <img v-if="baseImg" :src="baseImg">
                <div  class="text-center">
                  <span v-if="file">
                    {{ file.name }}
                  </span>  
                </div>
              </div>
              <div>
                <img src="~assets/images/shili.png">
                <div class="text-center">
                  示例图片
                </div>
              </div>
            </div>
      </FormItem>
      <FormItem>
            <Button type="info" :loading="loading" @click="submit">{{loading ? '提交中...' : '提交 '}}</Button>
      </FormItem>
    </Form>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  // @ is an alias to /src
  import config from '../../xh.config'
  import {mapState, mapMutations} from 'vuex'
  import api from 'api'

  export default {
    name: 'Approve',
    data() {
      return {
        formItem: {
          corporation_name: '',//企业名称
          corporation: '',      //法人
          business_license: '', //营业执照
          scode: '',            //统一社会信用认证代码
          region: '',   //归属区域
          city: '',         //城市
          name: '',            //姓名
          phone: '',           //联系电话
        },
        managerId: '',
        wanzhengstatus: 0,     //是否完整状态 0没填 1填了部分 2填完了
        managerId: '',        //用户id
        uploadUrl: config.upload,
        attributionArea: config.attributionArea,
        loading: false,
        loadingStatus: false,
        baseImg: '',
        file: null,
        spinShow: false,
      }
    },
    computed: {
        ...mapState(['cityList', 'userInfo']),
        isAll() {
          let formItem = this.formItem;
          let keys = Object.keys(formItem);
          let arr = [];
          keys.forEach(v => {
            !!formItem[v] && (arr.push(1));
          })
          return arr.length === 0 ? 0 : arr.length === keys.length ? 2 : 1
        }
    },
    methods: {
      ...mapMutations({
          setWanzhengStatus: 'SET_FORM_STATUS'
      }),

      handleSuccess(response, file, fileList) {
        this.loadingStatus = false;
        this.$refs.upload.clearFiles();
        this.file = null;
        this.formItem.business_license = this.baseImg = response;
        this.updateData();
      },

      handleErr() {
        this.loadingStatus = false;
      },

      /**
       * 截止自动上传，改为手动上传
       */
      handleUpload(file) {
        this.file = file;
        this.preview();
        return false;
      },

      /**
       * 预览图片
       */
      preview() {
        let file = this.file;
        let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = e => {
            this.baseImg = reader.result;
          }
      },
      handleRemove() {
        this.file = null;
      },

      /**
       * 上传图片
       */
      uploadImg() {
        this.loading = true;
        this.loadingStatus = true;
        this.$refs.upload.post(this.file);
      },
      
      /**
       * 取消选择图片
       */
      clear() {
        this.$refs.upload.clearFiles();
        this.baseImg = this.formItem.business_license;
        this.file = null;
      },

      /**
       * 提交表单数据
       */
      updateData() {
        let params = { ...this.formItem };
        params.wanzhengstatus = this.isAll;
        params.managerId = this.userInfo.managerId;
        let info = {
              title: '提交成功',
              onOk: () => {
                  this.$router.push('/home/');
              }
            };
        if(params.wanzhengstatus < 2) {
          info.content = '<p>当前企业认证信息不完整，将影响部分功能的使用。</p>'
        }
        api.helper.updateApprove(params).then(data => {
          if(!data.data) {
            return
          }
          this.$Modal.success(info);
        })
      },

      /**
       * 删除执照
       */
      // deleteImg() {
      //   this.$Modal.confirm({
      //       title: '确定删除已保存的营业执照吗？',
      //       onOk: () => {
      //           this.formItem.business_license = '';
      //           this.updateData();
      //           this.queryForm();
      //       },
      //       onCancel: () => {}
      //   });
      // },

      /**
       * 查询表单数据
       */
      queryForm() {
        this.spinShow = true;
        api.helper.queryApprove(this.userInfo.managerId).then(data => {
          this.spinShow = false;
          if(!data) {
            return
          }
          if(data.code === 200) {
            //每次查询重新设置信息完整度状态
            this.setWanzhengStatus(data.data.wanzhengstatus);
            for(let i in this.formItem) {
              this.formItem[i] = data.data[i]
            }
          }
          this.baseImg = data.data.business_license;
          this.wanzhengstatus = data.data.wanzhengstatus;
        }).catch(() => {
        })
      },

      /**
       * 提交表单
       */
      submit() {
        //没填东西
        if(!this.baseImg && !this.isAll) {
          this.$Modal.warning({
              title: '需要填写表单信息才能提交哦'
          });
          return
        }


        //已经填写过完整的信息，再次提交也必须是完整的
        if(this.wanzhengstatus === 2 && this.isAll < 2) {
          this.$Modal.warning({
              title: '需要填写完整的表单信息才能提交哦'
          });
          this.queryForm();
          return
        }

        //图片选择有变化，重新上传图片并提交
        if(this.baseImg && this.baseImg !== this.formItem.business_license) {
          console.log('有修改图')
          this.uploadImg()
        } else {
          console.log('无修改图')
          this.updateData()
        }
      },
    },
    created() {
      this.queryForm();
    },
  }
</script>

<style lang="scss" scope>
    .Approve {
      padding: 0 65px;
      .ivu-upload {
        display: inline-block;
      }
      .show-img {
        @include flex-between;
        width: 500px;
        height: 260px;
        img {
          width: 155px;
          height: 200px;
        }
      }
    }
</style>
