import { ADD_NEW_PRODUCT, INC_PRODUCT_CNT } from './mutations_type'
export default {
    // 增加相同产品的数量
    [INC_PRODUCT_CNT](state, payload) {
        payload.count++;
    },
    // 将新产品加入购物车
    [ADD_NEW_PRODUCT](state, payload) {
        // 新增的商品,设置checked属性,默认值为true
        payload.checked = true;
        state.cartList.push(payload);
    }
}