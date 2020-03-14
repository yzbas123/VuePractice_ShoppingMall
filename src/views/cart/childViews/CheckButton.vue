<template>
  <div class="check_btn" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.check_btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.checked {
  background-color: red;
}
</style>