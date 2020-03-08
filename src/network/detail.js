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

/* 定义一个类,用于封装待展示的商店信息 */
export class ShopInfor {
    constructor(shopInfor) {
        this.shopName = shopInfor.name;//商店名称
        this.shopLogo = shopInfor.shopLogo;//商店的头像
        this.totalSells = shopInfor.cSells;// 商店的总销量
        this.totalGoods = shopInfor.cGoods;// 商店的商品数量
        this.shopScores = shopInfor.score;// 商店的评价,是个对象数组
        this.shopLink = shopInfor.shopUrl;// 商店的对应页面
        // 下面这种方案暂时不用
        // this.shopScoreNames = [];
        // this.shopScoreBetters = [];
        // this.shopScoreScores = [];
        // // 解析评价数组中的各项数据填入对应数组中
        // shopInfor.score.forEach(item => {
        //     this.shopScoreNames.push(item.name);//评价的名称:描述相符,价格合理,质量满意
        //     this.shopScoreBetters.push(item.isBetter);// 该店比其他商店平均评价相比是否更高
        //     this.shopScoreScores.push(item.score);// 评分的分数
        // });
    }
}