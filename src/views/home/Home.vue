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
    <tap-back @click.native="tapBackClick" v-show="canshow"></tap-back>
  </div>
</template>

<script>
/* 界面相关的组件 */
import NavBar from "common/navbar/NavBar";
import HomeSwiper from "./childview/HomeSwiper.vue";
import RecommendView from "./childview/RecommendView";
import FeatureView from "./childview/FeatureView";
import TabControl from "common/tabcontrol/TabControl";
import GoodsList from "content/GoodsList";
import Scroll from "content/Scroll";
import TapBack from "content/TapBack";

/* 网络请求方法 */
import { getHomeDatas, getHomeGoods } from "network/home.js";

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
      canshow: false,
      tabctrlOffsetTop: 0,
      canDisplay: false
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
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    // 组件挂载后，监听自定义事件
    this.$bus.$on("imageLoaded", () => {
      // 刷新scroll的长度
      refresh();
    });
  },
  methods: {
    debounce(cb, delay) {
      let timer = null;
      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // cb.apply(this, args);
          cb(args);
        }, delay);
      };
    },

    pullupload() {
      /* 请求新的数据填入列表 */
      this.getHomeGoodsLocal(this.currentType);
      this.$refs.scroll.continuePullingup();
    },
    scrolling(position) {
      /* 根据y轴上的位移来判断小按钮是否显示 */
      this.canshow = Math.abs(position.y) > 1000;
      /* 根据y轴上的位移 与 存储的tabcontrol的位置来判断tabcontrol1是否显示 */
      // console.log(position.y);
      // console.log(this.canDisplay);

      this.canDisplay = Math.abs(position.y) > this.tabctrlOffsetTop;
    },
    tapBackClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
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