<template>
  <div class="tabcontrol">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tabitem"
      @click="itemclick(index)"
      :class="{active:currentIndex==index? 'active':'' }"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style>
.tabcontrol {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
}
.tabitem>span {
    padding: 5px;
}
.active{
    color: var(--color-high-text);
}
.active>span{
     border-bottom: 3px solid var(--color-high-text);
}
</style>