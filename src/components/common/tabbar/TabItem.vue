<template>
  <div class="tabitem" @click="itemClick">
    <div v-if="!isActive" class="item-icon">
      <slot name="item_icon"></slot>
    </div>
    <div v-else class="item_icon_active">
      <slot name="item_icon_active"></slot>
    </div>
    <div :style="ActiveStyle" class="item-text">
      <slot name="item_text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabItem",
  data() {
    return {};
  },
  props: {
    link: String,
    activecolor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) != -1;
    },
    ActiveStyle() {
      /* 自己引用自己的要使用this！！！！！！！ */
      return this.isActive ? { color: this.activecolor } : {};
    }
  },
  methods: {
    itemClick() {
      if (!this.isActive) {
        this.$router.replace(this.link);
      }
    }
  }
};
</script>

<style>
  .tabitem {
    flex: 1;
  }

  .item-icon img, .item_icon_active img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }
</style>