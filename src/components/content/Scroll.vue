<template>
  <div class="wrapped" ref="wrappeddiv">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrappeddiv, {
      probeType: 3,
      click: true
    });
    this.scroll.on("scroll", position => {
      console.log(position);
    });
  }
};
</script>

<style scoped>
</style>