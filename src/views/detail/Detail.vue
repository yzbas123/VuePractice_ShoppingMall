<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childview/DetailNavBar";
import { getDetailData } from "network/detail";
export default {
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    };
  },
  created() {
    /* 保存iid */
    this.iid = this.$route.params.iid;
    /* 根据iid请求数据 */
    getDetailData(this.iid)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>