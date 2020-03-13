<template>
  <div class="bottom_bar">
    <!-- 客服 -->
    <div class="clientService">
      <i class="icon"></i>
      <p>客服</p>
    </div>
    <!-- 店铺 -->
    <div class="shop">
      <i class="icon"></i>
      <p>店铺</p>
    </div>
    <!-- 收藏 -->
    <div class="collect">
      <i class="icon"></i>
      <p>收藏</p>
    </div>
    <!-- 加入购物车 -->
    <div class="add2Cart" @click="add2Cart">加入购物车</div>
    <!-- 购买 -->
    <div class="purchase">购买</div>
  </div>
</template>

<script>
export default {
  name: "BottomToolBar",
  methods: {
    add2Cart() {
      this.$emit("add2Cart");
    }
  }
};
</script>

<style scoped>
.bottom_bar {
  position: fixed;
  display: flex;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background-color: #fff;
  height: 49px;
  text-align: center;
  font-size: 12px;
}
.icon {
  display: block;
  width: 20px;
  height: 20px;
  margin: 5px 0 5px 20px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.clientService {
  flex: 1;
}
.clientService i {
  background-position: 0 -48px;
}
.shop {
  flex: 1;
}
.shop i {
  background-position: 0 -89px;
}
.collect {
  flex: 1;
}
.add2Cart {
  flex: 2;
  background-color: yellow;
  font-size: 14px;
  line-height: 49px;
}
.purchase {
  flex: 2;
  background-color: pink;
  color: white;
  font-size: 14px;
  line-height: 49px;
}
</style>