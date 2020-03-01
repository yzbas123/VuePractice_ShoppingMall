<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" :title="item.title" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    }
  }
};
</script>

<style>
</style>