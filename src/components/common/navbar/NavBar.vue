<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.05);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
  text-align: center;
}
</style>