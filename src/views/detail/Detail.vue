<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar @navItemClicked="navItemClicked" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scrolling="scrolling">
      <!-- @pullingUp="pullupload"
      :pull-up-load="true"-->
      <!-- 轮播图 -->
      <detail-swiper :detail_swiper_imgs="detail_swiper_imgs"></detail-swiper>
      <!-- 商品信息 -->
      <goods-base-infor :goodsBaseInfor="goodsBaseInfor"></goods-base-infor>
      <!-- 商家信息 -->
      <detail-shop-infor :shopInfor="shopInfor"></detail-shop-infor>
      <!-- 商品详情 -->
      <goods-detail-infor
        :goodsDetail="goodsDetail"
        @goodsDetailImagesLoaded="goodsDetailImagesLoaded"
      ></goods-detail-infor>
      <!-- 商品参数 -->
      <goods-params-infor :goodsParams="goodsParams" ref="paramInfor"></goods-params-infor>
      <!-- 用户评论 -->
      <user-rate-infor :userRate="userRate" ref="rateInfor"></user-rate-infor>
      <!-- 推荐商品信息 -->
      <goods-list :goods="recommendData" ref="recommendInfo"></goods-list>
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
import GoodsList from "c_content/GoodsList";
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
  UserRate,
  getRecommendData
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
    GoodsList,
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
      userRate: {},
      recommendData: [],
      navPositionY: [0, 0, 0, 0],
      currentIndex: 0,
      goodsImgsHandler: null
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
    // 获取推荐数据
    getRecommendData()
      .then(res => {
        // 用变量缓存数据

        this.recommendData = res.data.list;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goodsDetailImagesLoaded() {
      /* 所有图片加载完成后,刷新一下滚动条高度 */
      this.$refs.scroll.refresh();
      /* 更新所有组件的位置,这样点击nav的item时能够正常跳转到对应的位置 */
      // 清空缓存
      this.navPositionY = [];
      // 商品的位置
      this.navPositionY.push(0);
      // 商品参数的位置
      this.navPositionY.push(-this.$refs.paramInfor.$el.offsetTop);
      // 用户评论的位置
      this.navPositionY.push(-this.$refs.rateInfor.$el.offsetTop);
      //
      this.navPositionY.push(-this.$refs.recommendInfo.$el.offsetTop);
      //
      this.navPositionY.push(Number.MAX_VALUE);
    },
    scrolling(position) {
      /* 判断TapBack是否可以显示 */
      position.y = Math.abs(position.y);
      this.tapBackCanShow = position.y > 1000;
      /* 位置判断,设置对应navbar的currentIndex */
      let length = this.navPositionY.length;
      for (let i = 0; i < length - 1; i++) {
        const e1 = Math.abs(this.navPositionY[i]);
        const e2 = Math.abs(this.navPositionY[i + 1]);
        if (this.currentIndex != i && position.y >= e1 && position.y < e2) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    navItemClicked(index) {
      /* 跳转到对应内容的位置 */
      console.log(this.navPositionY);

      this.$refs.scroll.scrollTo(0, this.navPositionY[index], 200);
    },
    debounce(cb, delay = 100) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          cb(args);
        }, delay);
      };
    }
  },
  mounted() {
    // 组件挂载后，监听自定义事件
    let refresh = this.debounce(this.$refs.scroll.refresh);
    this.goodsImgsHandler = () => {
      // 刷新scroll的长度
      refresh();
    };
    this.$bus.$on("goodsListImgsLoaded", this.goodsImgsHandler);
  },
  destroyed() {
    /* 注销全局事件 */
    this.$bus.$off("goodsListImgsLoaded", this.goodsImgsHandler);
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
  position: absolute;
  top: 44px;
  bottom: 60px;
  height: 100vh;
  overflow: hidden;
}
</style>