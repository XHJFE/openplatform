import store from 'store'
import router from 'router'
import iView from 'iview'

const verifyUserStatus = {
    methods: {
        verifyUserStatus(func) {
            let all = store.state.wanzhengstatus;
            let status = store.state.status;

            if(status === 0) {
                iView.Modal.warning({
                    title: '您的账号当前已被禁用，请联系 0731-89681300 了解详细原因。'
                });
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
    }
}

export default {
    verifyUserStatus
}