<template>
  <div class="goods_params_infor" v-if="Object.keys(goodsParams)!=0">
    <table class="size_infor" v-for="(t,it) in goodsParams.size_tables" :key="it">
      <tr v-for="(tr,itr) in t" :key="itr">
        <td v-for="(td,itd) in tr" :key="itd">{{td}}</td>
      </tr>
    </table>
    <table class="product_infor">
      <tr v-for="(item,index) in goodsParams.product_infors" :key="index">
        <td class="key">{{item.key}}</td>
        <td class="value">{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    goodsParams: {
      type: Object
    }
  }
};
</script>

<style scoped>
.goods_params_infor {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.goods_params_infor table {
  width: 100%;
  border-collapse: collapse;
}

.goods_params_infor table tr {
  height: 42px;
}

.goods_params_infor table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.product_infor .key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.product_infor {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.product_infor .value {
  color: #eb4868;
}
</style>