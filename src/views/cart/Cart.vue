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
    <!-- 底部工具栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
/* 导入组件 */
import NavBar from "c_common/navbar/NavBar";
import Scroll from "c_content/Scroll";
import CartList from "./childViews/CartList";
import CartBottomBar from './childViews/CartBottomBar'
/* 导入工具函数 */
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
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
  position: absolute;
  top: 44px;
  bottom: 98px;
  overflow: hidden;
}
.cart_list {
  width: 100%;
}
</style>