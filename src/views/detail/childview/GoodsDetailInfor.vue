<template>
  <div class="goods_detail_infor" v-if="Object.keys(goodsDetail).length!=0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{goodsDetail.detialDesc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{goodsDetail.detailImage.key}}</div>
    <div class="detail_imgs">
      <div v-for="(item,index) in goodsDetail.detailImage.list" :key="index">
        <img :src="item" @load="imageLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsDetail: {
      type: Object
    }
  },
  data() {
    return {
      count: 0,
      imgLength: 0
    };
  },
  methods: {
    imageLoad() {
      if (++this.count == this.imgLength) {
        this.$emit("allImageLoaded");
      }
    }
  },
  watch: {
    goodsDetail() {
      this.imgLength = this.goodsDetail.detailImage.list.length;
    }
  }
};
</script>

<style scoped>
.goods_detail_infor {
  padding: 15px 10px 10px 10px;
  box-shadow: 0 5px 0px rgba(0, 0, 0, 0.07);
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.detail_imgs img {
  width: 100%;
}
</style>