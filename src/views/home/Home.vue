<template>
  <div id="home">
    <!-- 首页导航栏 -->
    <nav-bar class="navbar">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 列表控制栏1 -->
    <tab-control
      :titles="['流行','新款','精选']"
      class="tab-control"
      ref="tabcontrol1"
      @tabitemclick="tabItemClick"
      v-show="canDisplay"
    ></tab-control>
    <!-- 下面的组件被包含在scroll组件中 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrolling="scrolling"
      :pull-up-load="true"
      @pullingUp="pullupload"
    >
      <!-- 首页轮播图 -->
      <home-swiper :banners="banners" @swiperImgLoaded.once="swiperImgLoaded"></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 特色栏 -->
      <feature-view></feature-view>
      <!-- 列表控制栏2 -->
      <tab-control :titles="['流行','新款','精选']" ref="tabcontrol2" @tabitemclick="tabItemClick"></tab-control>
      <!-- 商品信息列表 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
      <!-- 返回到前面的按钮 -->
    </scroll>
    <tap-back @click.native="tapBackClicked" v-show="tapBackCanShow"></tap-back>
  </div>
</template>

<script>
/* 界面相关的组件 */
import NavBar from "c_common/navbar/NavBar";
import HomeSwiper from "./childview/HomeSwiper.vue";
import RecommendView from "./childview/RecommendView";
import FeatureView from "./childview/FeatureView";
import TabControl from "c_common/tabcontrol/TabControl";
import GoodsList from "c_content/GoodsList";
import Scroll from "c_content/Scroll";
import TapBack from "c_content/TapBack";

/* 网络请求方法 */
import { getHomeDatas, getHomeGoods } from "network/home.js";
/* 混入 */
import { TapBackMixin, GoodsImgLoadMixin } from "common/mixin.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    TapBack
  },
  mixins: [TapBackMixin, GoodsImgLoadMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      tabctrlOffsetTop: 0,
      canDisplay: false,
      savedY: 0
    };
  },
  created() {
    // 组件一旦创建便发送请求,调用getHomeDatas获取主页的数据
    this.getHomeDatasLocal();
    //请求流行类商品数据
    this.getHomeGoodsLocal("pop");
    //请求最新类商品数据
    this.getHomeGoodsLocal("new");
    //请求热销类商品数据
    this.getHomeGoodsLocal("sell");
  },
  methods: {
    pullupload() {
      /* 请求新的数据填入列表 */
      this.getHomeGoodsLocal(this.currentType);
      this.$refs.scroll.continuePullingup();
    },
    scrolling(position) {
      /* 根据y轴上的位移来判断小按钮是否显示 */
      this.tapBackCanShow = Math.abs(position.y) > 1000;
      /* 根据y轴上的位移 与 存储的tabcontrol的位置来判断tabcontrol1是否显示 */
      this.canDisplay = Math.abs(position.y) > this.tabctrlOffsetTop;
    },
    tabItemClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    swiperImgLoaded() {
      this.tabctrlOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
    getHomeDatasLocal() {
      getHomeDatas()
        .then(res => {
          res.data &&
            res.data.banner &&
            res.data.banner.list &&
            (this.banners = res.data.banner.list) &&
            res.data.recommend &&
            res.data.recommend.list &&
            (this.recommends = res.data.recommend.list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHomeGoodsLocal(type) {
      // 每次请求都是增加一页的数据,所以页数索引在请求数据时需要自增1
      // 填入类型 和 页数 到 请求方法中.
      getHomeGoods(type, this.goods[type].page++)
        .then(res => {
          if (res.data) {
            if (res.data.list) {
              // ...res.data.list可以将对应的数据全部解析出来传入push中
              // 然后push将这些数据追加到this.goods[type].list这个数组后面
              this.goods[type].list.push(...res.data.list);
            } else {
              console.log(res.data);
            }
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  activated() {
    /* 打印一下滚动条包裹的内容区域的高度 */
    // console.log(this.$refs.scroll.$el, ":", this.$refs.scroll.$el.offsetHeight);
    /*刷新一下滚动条 ,然后跳转到对应位置*/
    this.$refs.scroll.refresh(); //必须刷新,better-scroll官方文档说keep-alive的缓存机制有可能导致计算高度出错,所以先刷新一下
    this.$refs.scroll.scrollTo(0, this.savedY, 0);
  },
  deactivated() {
    /* 跳转前,获取当前的滚动位置并保存 */
    this.savedY = this.$refs.scroll.getPositionY();
    /* 跳转前注销全局总线中的事件,防止不同组件中的相同事件被这里处理 */
    /* $off参数:1.事件名称 2. 事件处理函数 ,如果不传入第二个参数,则会注销全局中的所有这个事件 */
    this.$bus.$off("goodsListImgsLoaded", this.goodsImgsHandler);
  }
};
</script>

<style scoped>
#home {
  position: relative;
  /* height equals 100% viewport height */
  height: 100vh;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0px;
  left: 0px;
  overflow: hidden;
}
</style>