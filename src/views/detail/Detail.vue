<template>
  <div>
    <!-- 顶部导航栏 -->
    <detail-nav-bar></detail-nav-bar>
    <!-- 轮播图 -->
    <detail-swiper :detail_swiper_imgs="detail_swiper_imgs"></detail-swiper>
    <!-- 商品信息 -->
    <detail-goods-info :goodsInfor="goodsInfor"></detail-goods-info>
  </div>
</template>

<script>
import DetailNavBar from "./childview/DetailNavBar";
import DetailSwiper from "./childview/DetailSwiper";
import DetailGoodsInfo from "./childview/DetailGoodsInfo";
import { getDetailData, GoodsDetailInfor } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo
  },
  data() {
    return {
      iid: null,
      detail_swiper_imgs: [],
      /* 保证DetailGoodsInfo不报错 */
      goodsInfor: {}
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
        this.goodsInfor = new GoodsDetailInfor(
          data.columns,
          data.itemInfo,
          data.shopInfo.services
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>