import axios from 'util/axios'

const methods = {};

/**
 * 获取城市列表
 */
methods.queryCity = () => axios.post('web/city/findByCondition', { status: 1 });

/**
 * 获取手机验证码
 */
methods.getPhoneCode = phone => axios.get(`web/manager/generalCode/${phone}`);

/**
 * 提交企业认证
 */
methods.updateApprove = params => axios.post('web/manager/adddeveloperinfo', params);

/**
 * 查询企业认证
 */
methods.queryApprove = mId => axios.post(`web/manager/developerinfo/${mId}`);

/**
 * 查询房源电话和400电话
 */
methods.queryHousePhone = show_managerId => axios.get(`web/manager/find/${show_managerId}`);

/**
 * 修改房源电话
 */
methods.updateHousePhone = params => axios.get(`web/manager/updatemanager/`, params);

/**
 * 查找象盒进客列表数据
 */
methods.queryEntryList = params => axios.post(`web/manager/record/pageforTuangou`, params);

export default methods