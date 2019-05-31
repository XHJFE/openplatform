import xImglist from 'components/x-imglist/x-imglist'
import xInfo from 'components/x-info/x-info'
import xDatawrap from 'components/x-datawrap/x-datawrap'
import xHouse from 'components/x-house/x-house'
import xUnderline from 'components/x-underline/x-underline'
import xPuzzle from 'components/x-puzzle/x-puzzle'
import xListloading from 'components/x-listloading/x-listloading'

export default {
    install(Vue) {
        Vue.component('x-imglist', xImglist);
        Vue.component('x-info', xInfo);
        Vue.component('x-datawrap', xDatawrap);
        Vue.component('x-house', xHouse);
        Vue.component('x-underline', xUnderline);
        Vue.component('x-puzzle', xPuzzle);
        Vue.component('x-listloading', xListloading);
    }
}
