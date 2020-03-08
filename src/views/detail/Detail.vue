<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3">
      <!-- @scrolling="scrolling"
      :pull-up-load="true"
      @pullingUp="pullupload"-->
      <!-- 轮播图 -->
      <detail-swiper :detail_swiper_imgs="detail_swiper_imgs"></detail-swiper>
      <!-- 商品信息 -->
      <goods-base-infor :goodsBaseInfor="goodsBaseInfor"></goods-base-infor>
      <!-- 商家信息 -->
      <detail-shop-infor :shopInfor="shopInfor"></detail-shop-infor>
      <!-- 商品详情 -->
      <goods-detail-infor :goodsDetail="goodsDetail" @allImageLoaded="allImageLoaded"></goods-detail-infor>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childview/DetailNavBar";
import DetailSwiper from "./childview/DetailSwiper";
import GoodsBaseInfor from "./childview/GoodsBaseInfor";
import DetailShopInfor from "./childview/DetailShopInfor";
import Scroll from "content/Scroll";
import GoodsDetailInfor from "./childview/GoodsDetailInfor";
import {
  getDetailData,
  BaseInfor,
  ShopInfor,
  GoodsDetail
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    GoodsBaseInfor,
    DetailShopInfor,
    Scroll,
    GoodsDetailInfor
  },
  data() {
    return {
      iid: null,
      detail_swiper_imgs: [],
      /* 初值为{},保证DetailGoodsInfo不报错 */
      goodsBaseInfor: {},
      shopInfor: {},
      goodsDetail: {}
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
        // 商品基本信息
        this.goodsBaseInfor = new BaseInfor(
          data.columns,
          data.itemInfo,
          data.shopInfo.services
        );
        // 商店的信息
        this.shopInfor = new ShopInfor(data.shopInfo);
        // 商品详情
        this.goodsDetail = new GoodsDetail(data.detailInfo);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    allImageLoaded() {
      this.$refs.scroll.refresh();
    }
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