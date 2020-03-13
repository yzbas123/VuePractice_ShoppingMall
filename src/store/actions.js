import { ADD_NEW_PRODUCT, INC_PRODUCT_CNT } from './mutations_type'
export default {
    addProuct2Cart(context, payload) {
        // 判断加入的商品是否已在购物车中          
        let oldProduct = context.state.cartList.find(item => {
            return item.iid == payload.iid
        });

        // 如果有,将其数量加1
        if (oldProduct) {
            context.commit(INC_PRODUCT_CNT, oldProduct);
        }
        // 否则加入购物车,并将其数量设置为1
        else {
            payload.count = 1;
            context.commit(ADD_NEW_PRODUCT, payload);
        }
    }
}