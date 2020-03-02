<template>
  <div class="goodslist">
    <goods-list-item v-for="(item,index) in goods" :key="index" :good="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>