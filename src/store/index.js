import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from "./getters";

// 1.安装插件
Vue.use(Vuex);

// 2.创建store实例

// 2.1 创建options对象,用于配置store
const options = {
    state: {
        // 商品对象数组,用于存放添加到购物车中的商品
        cartList: []
    },
    mutations,
    actions,
    getters
};
// 2.2 调用Vuex的Store构造函数实例化Store
const store = new Vuex.Store(options);


// 3.导出store对象,并在Vue实例中进行注册
export default store;