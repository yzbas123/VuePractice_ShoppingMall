<template>
  <div>
    <!-- 首页导航栏 -->
    <nav-bar class="navbar">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 首页轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import HomeSwiper from "./childview/HomeSwiper.vue";
import RecommendView from "./childview/RecommendView";
import { getHomeDatas } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    // 组件一旦创建便发送请求,调用getHomeDatas获取主页的数据
    getHomeDatas()
      .then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(this.recommends);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>