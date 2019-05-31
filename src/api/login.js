import axios from 'util/axios'

const methods = {};

/**
 * 登录
 */
methods.login = ({phone, code}) => axios.post(`web/manager/login/${phone}/${code}`);

export default methods