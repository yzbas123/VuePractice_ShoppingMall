<template>
  <nav-bar class="detailnav">
    <template v-slot:left>
      <!-- 左侧插槽插入返回按钮 -->
      <img src="~assets/img/common/back.svg" @click="backClicked" />
    </template>
    <!-- 中间插槽插入tabCtrl -->
    <template v-slot:center>
      <div class="tab-ctrl">
        <div
          v-for="(item,index) in navtitles"
          :key="index"
          @click="tabItemClicked(index)"
          :class="{active:currentIndex==index}"
        >{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "c_common/navbar/NavBar.vue";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      navtitles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    backClicked() {
      this.$router.back();
    },
    tabItemClicked(index) {
      this.currentIndex = index;
      /* 发送事件到Detail组件中解决 */
      this.$emit("navItemClicked", index);
    }
  }
};
</script>

<style scoped>
.detailnav {
  text-align: center;
  font-size: 14px;
}
.left img {
  /* width: 25px;
  height: 25px; */
  vertical-align: middle;
}
.tab-ctrl {
  display: flex;
}
.tab-ctrl div {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>