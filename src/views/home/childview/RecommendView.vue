<template>
  <div class="recommands">
    <div v-for="(item,index) in recommends" :key="index" class="recommand">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.recommands {
  display: flex;
  text-align: center;
}
.recommand{
  flex: 1
}
.recommand img{
  width: 80px;
  height: 80px;
}
</style>