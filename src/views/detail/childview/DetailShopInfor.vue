<template>
  <div class="shopinfor" v-if="Object.keys(shopInfor).length!=0">
    <div class="title_infor">
      <img :src="shopInfor.shopLogo" alt />
      <span>{{shopInfor.shopName}}</span>
    </div>
    <div class="main_infor">
      <div class="datas">
        <div class="total_sell">
          <p>{{totalSellShow}}</p>
          <p>总销量</p>
        </div>
        <div class="total_goods">
          <p>{{shopInfor.totalGoods}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="score">
        <div
          v-for="(item,index) in shopInfor.shopScores"
          :key="index"
          :class="item.isBetter ? 'better' : 'less'"
        >
          <span>{{item.name}}</span>
          <span>{{item.score}}</span>
          <span>{{item.isBetter? '高' : '低'}}</span>
        </div>
      </div>
    </div>
    <div class="link_infor">
      <a :href="shopInfor.shopLink">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfor",
  props: {
    shopInfor: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    totalSellShow() {
      if (parseInt(this.shopInfor.totalSells) < 10000) {
        return this.shopInfor.totalSells;
      } else {
        return (this.shopInfor.totalSells / 10000).toFixed(1) + "万";
      }
    }
  }
};
</script>

<style scoped>
.shopinfor {
  padding: 20px 10px;
  box-shadow: 0 5px 0px rgba(0, 0, 0, 0.07);
}
.title_infor {
  font-size: 16px;
  margin-bottom: 10px;
}
.title_infor img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 8px;
}
.main_infor {
  display: flex;
  justify-content: space-around;
  /* height: 80px; */
  font-size: 12px;
  margin-bottom: 20px;
}
.datas {
  display: flex;
  text-align: center;

  border-right: 1px solid #eee;
  padding-right: 20px;
}
.datas > div {
  margin: 10px;
}
.datas p:nth-child(1) {
  font-size: 21px;
  padding-bottom: 8px;
}
.score {
  /* margin-right: 20px; */
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.score div {
  display: flex;
  justify-content: space-between;
}
.score div span {
  margin-right: 15px;
}
.link_infor {
  text-align: center;
}
.better span:nth-child(2) {
  color: red;
}
.better span:nth-child(3) {
  background-color: red;
  color: white;
}
.less span:nth-child(n + 2) {
  color: green;
}
.less span:nth-child(3) {
  background-color: green;
  color: white;
}
.link_infor a {
  border-radius: 5px;
  padding: 5px 40px;
  background-color: #f3f3f3;
  font-size: 14px;
}
</style>