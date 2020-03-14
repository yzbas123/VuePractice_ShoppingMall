<template>
  <div class="goods" @click="goodsItemClicked">
    <img v-lazy="getImgSrc" class="good_img" @load="imageLoaded" />
    <div class="goods-info">
      <p>{{good.title}}</p>
      <span class="price">{{good.price}}</span>
      <span class="collect">{{good.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoaded() {
      /* 图片加载完毕时，在事件总线中组成自定义事件 */
      this.$bus.$emit("goodsListImgsLoaded");
    },
    goodsItemClicked() {
      /* 跳转至详情界面 */
      /* 同时携带商品iid号到详情页面 */
      this.$router.push("/detail/" + this.good.iid);
    }
  },
  computed: {
    getImgSrc() {
      return this.good.image || this.good.show.img;
    }
  }
};
</script>

<style>
.goods {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>