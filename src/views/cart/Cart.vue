<template>
  <div id="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="cart_nav">
      <template v-slot:center>购物车({{totalCartCnt}})</template>
    </nav-bar>
    <scroll class="wrapper">
      <!-- 商品清单 -->
      <cart-list class="cart_list"></cart-list>
    </scroll>
  </div>
</template>

<script>
/* 导入组件 */
import NavBar from "c_common/navbar/NavBar";
import Scroll from "c_content/Scroll";
import CartList from "./childViews/CartList";
/* 导入工具函数 */
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList
  },
  computed: {
    ...mapGetters(["totalCartCnt"])
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart_nav {
  background-color: var(--color-tint);
  font-weight: 600;
  color: white;
}
.wrapper {
  width: 100%;
  position: fixed;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
.cart_list {
  width: 100%;
}
</style>