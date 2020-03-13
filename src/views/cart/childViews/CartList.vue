<template>
  <div id="cart_list" v-if="getCartList.length!=0">
    <!-- <div v-for="(item,index) in getCartList" :key="index">{{item}}</div> -->
    <cart-list-item v-for="(item,index) in getCartList" :key="index" :cartItemInfor="item"></cart-list-item>
  </div>
</template>

<script>
/* 导入组件 */
import CartListItem from "./CartListItem";
/* 导入工具函数 */
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["getCartList"])
  },
  components: {
    CartListItem
  }
};
</script>

<style>
</style>