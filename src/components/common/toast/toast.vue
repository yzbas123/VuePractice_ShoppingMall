<template>
  <div class="toast" v-show="isShow">{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "默认文字",
      isShow: false
    };
  },
  methods: {
    show(msg = "默认文字", duration = 3000) {
      // 将参数的消息赋值给组件数据中
      this.msg = msg;
      // 显示组件
      this.isShow = true;
      // duration时间后,消失
      setTimeout(() => {
        this.msg = "";
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 10px;
  z-index: 999;
}
</style>