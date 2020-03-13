export default {
    totalCartCnt(state) {
        let totalCnt = 0;
        for (const item of state.cartList) {
            // 每次遍历增加的数量是该商品的count属性
            // 这样就可以避免少加了多个同样商品
            totalCnt += item.count;
        }
        return totalCnt;
    }
}