<template>
  <!-- 这里必须加v-if -->
  <!-- 原因我笔记里分析 -->
  <swiper v-if="detail_swiper_imgs.length" class="detail_swiper">
    <swiper-item v-for="(item,index) in detail_swiper_imgs" :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "c_common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    detail_swiper_imgs: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.detail_swiper {
  height: 300px;
  overflow: hidden;
}

</style>