<template>
  <div id="home">
    <!-- 首页导航栏 -->
    <nav-bar class="navbar">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 下面的组件被包含在scroll组件中 -->
    <scroll class="wrapped">
      <!-- 首页轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 特色栏 -->
      <feature-view></feature-view>
      <!-- 列表控制栏 -->
      <tab-control :titles="['流行','新款','精选']" class="tabcontrol" @tabitemclick="tabItemClick"></tab-control>
      <!-- 商品信息列表 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
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
    Scroll
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
      currentType: "pop"
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
    },
    getHomeDatasLocal() {
      getHomeDatas()
        .then(res => {
          if (res.data) {
            // TODO: 这些数据有可能会因为接口改变而导致值为null,需要进行非空判断的
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          } else {
            console.log(res);
          }
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
  padding-top: 44px;
  position: relative;
  /* height equals 100% viewport height */
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tabcontrol {
  /* position: sticky; */
  top: 44px;
  background-color: #fff;
  z-index: 9;
}
.wrapped {
  position:absolute;
  top: 44px;
  bottom: 49px;
  right: 0px;
  left: 0px;
}
</style>