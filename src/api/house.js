import axios from 'util/axios'

const methods = {};

/**
 * 查询房源列表
 */
methods.filterHouse = params => axios.post(`web/manager/house/findByWeb`, Object.assign({
        name: '',
        page: 0,
        pageSize: 5
    }, params));


/**
 * 添加房源项目
 */
methods.addHouseProject = params => axios.post(`web/manager/addDevelopersAudit`, Object.assign({
    developersId: '',
    houseName: '',
    houseId: '',
    cityId: '1'
}, params));

/**
 * 删除房源项目
 */
methods.deleteHouseProject = aid => axios.get(`web/manager/deleteDevelopersAudit/${aid}`);

/**
 * 查询房源项目
 */
methods.queryHouseProject = (mid, cityId = -1) => axios.post(`web/manager/findDevelopersAudit/${mid}/${cityId}`);

/**
 * 查询已添加的房源项目id列表
 */
methods.queryMyProjectId = mid => axios.get(`web/manager/findDevelopershouseIDbyhDID/${mid}`);

export default methods