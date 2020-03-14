<template>
  <div id="cart_list_item">
    <!-- 勾选框部分 -->
    <div class="selector">
      <!-- <input type="checkbox" /> -->
      <check-button @click.native="checkBtnClicked" :isChecked="cartItemInfor.checked"></check-button>
    </div>
    <!-- 商品图片 -->
    <div class="itemImg">
      <img :src="cartItemInfor.img" />
    </div>
    <!-- 描述信息 -->
    <div class="mainInfor">
      <div class="title">{{cartItemInfor.title}}</div>
      <div class="desc">商品描述:{{cartItemInfor.desc}}</div>
      <div class="price_num">
        <div class="price">￥{{cartItemInfor.price}}</div>
        <div>×{{cartItemInfor.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartListItem",
  props: {
    cartItemInfor: {
      type: Object
    }
  },
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  methods: {
    checkBtnClicked() {
      // 修改数据模型中的属性
      this.cartItemInfor.checked = !this.cartItemInfor.checked;
    }
  }
};
</script>

<style scoped>
#cart_list_item {
  width: 100%;
  display: flex;
  padding: 10px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.selector {
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.itemImg img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
  margin: 0px 10px 0 5px;
  display: block;
}
.mainInfor {
  overflow: hidden;
}
.title,
.desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title {
  margin: 2px 0 15px 0;
}
.desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}
.price_num {
  display: flex;
  justify-content: space-between;
}
.price {
  color: orangered;
}
</style>