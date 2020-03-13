<template>
  <div id="cart">
    <nav-bar class="cart_nav">
      <template v-slot:center>购物车({{totalCartCnt}})</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "c_common/navbar/NavBar";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed:{
    ...mapGetters(['totalCartCnt'])
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
</style>