<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <!-- 轮播图 -->
      <detail-swiper :detail_swiper_imgs="detail_swiper_imgs"></detail-swiper>
      <!-- 商品信息 -->
      <detail-goods-infor :goodsInfor="goodsInfor"></detail-goods-infor>
      <!-- 商家信息 -->
      <detail-shop-infor :shopInfor="shopInfor"></detail-shop-infor>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childview/DetailNavBar";
import DetailSwiper from "./childview/DetailSwiper";
import DetailGoodsInfor from "./childview/DetailGoodsInfor";
import DetailShopInfor from "./childview/DetailShopInfor";
import Scroll from "content/Scroll";
import { getDetailData, GoodsDetailInfor, ShopInfor } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfor,
    DetailShopInfor,
    Scroll
  },
  data() {
    return {
      iid: null,
      detail_swiper_imgs: [],
      /* 初值为{},保证DetailGoodsInfo不报错 */
      goodsInfor: {},
      shopInfor: {}
    };
  },
  created() {
    /* 保存iid */
    this.iid = this.$route.params.iid;
    /* 根据iid请求数据 */
    getDetailData(this.iid)
      .then(res => {
        let data = res.result;
        /* 解析数据存入对应的变量 */
        // 轮播图数据
        this.detail_swiper_imgs.push(...data.itemInfo.topImages);
        // 商品的信息
        this.goodsInfor = new GoodsDetailInfor(
          data.columns,
          data.itemInfo,
          data.shopInfo.services
        );
        // 商店的信息
        this.shopInfor = new ShopInfor(data.shopInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
}
.content {
  height: 100vh;
  overflow: hidden;
}
</style>