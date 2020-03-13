import Vue from 'vue';
import Vuex from 'vuex';


// 1.安装插件
Vue.use(Vuex);

// 2.创建store实例

// 2.1 创建options对象,用于配置store
const options = {
    state: {
        // 商品对象数组,用于存放添加到购物车中的商品
        cartList: []
    },
    mutations: {
        addProuct2Cart(state, payload) {
            let product = payload.product;
            // 判断加入的商品是否已在购物车中
            let oldProduct = state.cartList.find(item => {
                return item.iid == product.iid
            });
            // 如果有,将其数量加1
            if (oldProduct) {
                oldProduct.count++;
            }
            // 否则加入购物车,并将其数量设置为1
            else {
                product.count = 1;
                state.cartList.push(product);
            }
        }
    },
    getter: {}
};
// 2.2 调用Vuex的Store构造函数实例化Store
const store = new Vuex.Store(options);


// 3.导出store对象,并在Vue实例中进行注册
export default store;