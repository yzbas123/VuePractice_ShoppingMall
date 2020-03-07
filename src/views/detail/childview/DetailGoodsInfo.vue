<template>
  <div class="detail" v-if="Object.keys(goodsInfor).length !== 0">
    <p class="title">{{goodsInfor.title}}</p>
    <div class="price_section">
      <span class="price">{{goodsInfor.price}}</span>
      <span class="oldprice">{{goodsInfor.oldPrice}}</span>
      <span class="discount" v-if="isDiscount">{{goodsInfor.discountDesc}}</span>
    </div>
    <div class="sellinfo">
      <span>{{goodsInfor.columns[0]}}</span>
      <span>{{goodsInfor.columns[1]}}</span>
      <span>{{goodsInfor.services[goodsInfor.services.length-1].name}}</span>
    </div>
    <div class="services">
      <div class="service" v-for="index in (goodsInfor.services.length-1)" :key="index">
        <img :src="goodsInfor.services[index-1].icon" />
        <span>{{goodsInfor.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsInfor: {
      type: Object
    }
  },
  computed: {
    isDiscount() {
      return !(this.goodsInfor.discountDesc == "");
    }
  }
};
</script>

<style scoped>
.detail {
  padding: 0 8px 12px 8px;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.07);
}
.title {
  margin: 10px 0px;
  color: #000;
}
.price_section {
  position: relative;
  margin-bottom: 12px;
}
.price_section .price {
  font-size: 24px;
  color: var(--color-high-text);
}
.price_section .oldprice {
  margin: 0px 6px;
  font-size: 14px;
  text-decoration: line-through;
}
.price_section .discount {
  position: absolute;
  border-radius: 10px;
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
  top: 0px;
}
.sellinfo {
  display: flex;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.07);
  justify-content: space-between;
  margin-bottom: 20px;
}
.services {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
}
.service img {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
</style>