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
  props: {
    // 是否需要时刻监听滚动
    ProbeType: {
      type: Number,
      default: 0
    },
    // 是否需要上拉刷新
    PullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrappeddiv, {
      probeType: this.ProbeType,
      pullUpLoad: this.PullUpLoad,
      click: true,
      observeDOM: false
    });

    /* 监听滚动事件 */
    this.scroll.on("scroll", position => {
      /* 将滚动事件发送到Home组件 */
      this.$emit("scrolling", position);
    });
    /* 监听上拉加载事件 */
    // this.scroll.on("pullingUp", () => {
    //   /* 将上拉事件发送到Home事件 */
    //   this.$emit("pullingUp");
    // });
  },
  methods: {
    continuePullingup() {
      this.scroll.finishPullUp();
    },
    scrollTo(x, y, time = 300) {
      console.log("scrollTo", y, time);

      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll.refresh();
    },
    getPositionY() {
      return this.scroll.y;
    }
  }
};
</script>

<style scoped>
</style>