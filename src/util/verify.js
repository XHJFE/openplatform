import store from 'store'
import router from 'router'
import iView from 'iview'



const methods = {};

/**
 * 结合iview表单验证组件提供自定义验证方法
 */
methods.validatePhone = (rule, value, callback) => {
    if (!value) {
        return callback('电话号码不能为空');
    } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback('电话号码格式不正确');
    } else {
        callback();
    }   
};

/**
 * 按钮级别权限验证
 * @func {*} 验证成功回调
 * @onlyStatus {Boolean} 只验证账号禁用状态
 */
methods.verifyUserStatus = (func, onlyStatus) => {
    let all = store.state.wanzhengstatus;
    let status = store.state.status;

    if(status === 0) {
        iView.Modal.warning({
            title: '您的账号当前已被禁用，请联系 0731-89681300 了解详细原因。'
        });
        return
    }

    if(onlyStatus) {
        if(func && typeof func === 'function') {
            func();
        }
        return
    }

    if(all !== 2) {
        iView.Modal.confirm({
            title: '您当前尚未完成认证，将有部分功能不能使用，是否先去完成认证？',
            onOk: () => {
                router.push('/approve/');
            },
            onCancel: () => {
                
            }
        })
        return
    }
    
    if(func && typeof func === 'function') {
        func();
    }
}

// let verifyUserDisabled = () => {

// }

let verifyMap = {
    verDisabled(status, success, fail) {
        if(status > 0) {
            return true;
        }

        iView.Modal.warning({
            title: '您的账号当前已被禁用，请联系 0731-89681300 了解详细原因。'
        });
        
        return false;
    },
    verFull(all, success, fail) {
        if(all === 2) {
            
            return true;
        }

        iView.Modal.confirm({
            title: '您当前尚未完成认证，将有部分功能不能使用，是否先去完成认证？',
            onOk: () => {
                router.push('/approve/');
            },
            onCancel: () => {
                
            }
        })
        return false;
    },

    errType(type) {
        const map = {
            disabled: {
                err: 'disabled',
                msg: '账号当前已被禁用'
            },
            full: {
                err: 'full',
                msg: '未完成认证'
            }
        }
        return map[type]
    }
}

/**
 * 
 * @param type disabled只验证是否禁用  full只验证是否信息完整 没有验证所有
 * @param success 成功回调
 * @param fail 失败回调
 */
methods.verifyUserStatus = (
        {
            type = '',
            success = () => {},
            fail = () => {}
        } = {}
    ) => {

    let all = store.state.wanzhengstatus;
    let status = store.state.status;

    //只验证是否禁用账号
    if(type === 'disabled') {
        if(verifyMap.verDisabled(status)) {
            success();
        } else {
            fail(verifyMap.errType[type]);
        }
        return
    }

    //只验证信息完整度
    if(type === 'full') {
        if(verifyMap.verFull(all)) {
            success();
        } else {
            fail(verifyMap.errType[type])
        }
        return
    }


    //都验证
    if(!verifyMap.verDisabled(status)) {
        fail(verifyMap.errType[type])
        return
    }

    if(!verifyMap.verFull(all)) {
        fail(verifyMap.errType[type])
        return
    }
    success()

}


export default methods