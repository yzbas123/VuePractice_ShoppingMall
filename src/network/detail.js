import { request } from './index';

export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    });
}

/* 定义一个类,用于封装待展示的商品详细信息 */
export class GoodsDetailInfor {
    /* 思路:入口是少数几个对象,但是类中的属性可以详细零碎一点 */
    constructor(columns, itemInfo, services) {
        this.columns = columns;// 销量,收藏,快递品牌
        this.title = itemInfo.title;//商品标题
        this.discountDesc = itemInfo.discountDesc;//打折描述
        this.price = itemInfo.price;//现在价格,字符串
        this.oldPrice = itemInfo.oldPrice;//以前的价格,字符串
        this.services = services;//服务相关:退货补运费,全国包邮,7天无理由退货,72小时发货
    }
}