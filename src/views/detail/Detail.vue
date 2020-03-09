<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scrolling="scrolling">
      <!-- @pullingUp="pullupload"
      :pull-up-load="true"-->
      <!-- 轮播图 -->
      <detail-swiper :detail_swiper_imgs="detail_swiper_imgs"></detail-swiper>
      <!-- 商品信息 -->
      <goods-base-infor :goodsBaseInfor="goodsBaseInfor"></goods-base-infor>
      <!-- 商家信息 -->
      <detail-shop-infor :shopInfor="shopInfor"></detail-shop-infor>
      <!-- 用户评论 -->
      <user-rate-infor :userRate="userRate"></user-rate-infor>
      <!-- 商品参数 -->
      <goods-params-infor :goodsParams="goodsParams"></goods-params-infor>
      <!-- 商品详情 -->
      <goods-detail-infor :goodsDetail="goodsDetail" @allImageLoaded="allImageLoaded"></goods-detail-infor>
    </scroll>
    <!-- 回到顶部的按钮 -->
    <tap-back v-show="tapBackCanShow" @click.native="tapBackClicked"></tap-back>
  </div>
</template>

<script>
/* 导入组件相关 */
import DetailNavBar from "./childview/DetailNavBar";
import DetailSwiper from "./childview/DetailSwiper";
import GoodsBaseInfor from "./childview/GoodsBaseInfor";
import DetailShopInfor from "./childview/DetailShopInfor";
import Scroll from "c_content/Scroll";
import GoodsDetailInfor from "./childview/GoodsDetailInfor";
import GoodsParamsInfor from "./childview/GoodsParamsInfor";
import UserRateInfor from "./childview/UserRateInfor";
import TapBack from "c_content/TapBack";
/* 导入混入相关 */
import { TapBackMixin } from "common/mixin.js";
/* 导入网路请求相关 */
import {
  getDetailData,
  BaseInfor,
  ShopInfor,
  GoodsDetail,
  GoodsParams,
  UserRate
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    GoodsBaseInfor,
    DetailShopInfor,
    Scroll,
    GoodsDetailInfor,
    GoodsParamsInfor,
    UserRateInfor,
    TapBack
  },
  mixins: [TapBackMixin],
  data() {
    return {
      iid: null,
      detail_swiper_imgs: [],
      goodsBaseInfor: {},
      shopInfor: {},
      goodsDetail: {},
      goodsParams: {},
      userRate: {}
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
        // 商品参数
        this.goodsParams = new GoodsParams(data.itemParams);
        // 用户评论
        this.userRate = new UserRate(data.rate);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    allImageLoaded() {
      this.$refs.scroll.refresh();
    },
    scrolling(position) {
      /* 判断TapBack是否可以显示 */
      this.tapBackCanShow = Math.abs(position.y) > 1000;
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
  overflow: hidden;
}
.content {
  height: 100vh;
  overflow: hidden;
}
</style>