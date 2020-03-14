<template>
  <div class="cart_botm_bar">
    <div class="all_select">
      <check-button :isChecked="isSelectAll" @click.native="checkBtnClicked"></check-button>
      <span>全选</span>
    </div>
    <div class="totalcnt">
      <span>合计:￥{{totalMoney}}</span>
    </div>
    <div class="calculate" @click="calClicked">去计算({{totalCnt}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["getCartList"]),
    totalMoney() {
      return this.getCartList
        .filter(value => {
          return value.checked;
        })
        .reduce((pre, crtValue) => {
          return (pre += crtValue.price * crtValue.count);
        }, 0)
        .toFixed(2);
    },
    totalCnt() {
      return this.getCartList
        .filter(value => {
          return value.checked;
        })
        .reduce((pre, crtValue) => {
          return (pre += crtValue.count);
        }, 0);
    },
    isSelectAll() {
      if (this.getCartList.length === 0) return false;
      return !this.getCartList.find(value => !value.checked);
    }
  },
  methods: {
    checkBtnClicked() {
      //   是否全选
      if (this.isSelectAll) {
        //   全部取消
        this.getCartList.forEach(e => {
          e.checked = false;
        });
      }
      //  非全选
      else {
        //   全部 选中
        this.getCartList.forEach(e => {
          e.checked = true;
        });
      }
    },
    calClicked() {
      if (this.totalCnt == 0) {
        this.$toast.show("请选择待购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.cart_botm_bar {
  position: absolute;
  bottom: 49px;
  right: 0;
  left: 0;
  background-color: #eee;
  height: 45px;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 14px;
}
.all_select {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 10px;
}
.all_select > span {
  margin-left: 5px;
}
.totalcnt {
  flex: 1;
  margin-left: 30px;
  line-height: 45px;
}
.calculate {
  width: 100px;
  text-align: center;
  background-color: red;
  color: #fff;
  line-height: 45px;
}
</style>