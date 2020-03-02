<template>
  <div>
    <tab-bar>
      <tab-item link="/home">
        <template v-slot:item_icon>
          <img src="~assets/img/tabbar/home.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/tabbar/home_active.svg" alt />
        </template>
        <template v-slot:item_text>首页</template>
      </tab-item>
      <tab-item link="/category">
        <template v-slot:item_icon>
          <img src="~assets/img/tabbar/category.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/tabbar/category_active.svg" alt />
        </template>
        <template v-slot:item_text>分类</template>
      </tab-item>
      <tab-item link="/cart">
        <template v-slot:item_icon>
          <img src="~assets/img/tabbar/cart.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/tabbar/cart_active.svg" alt />
        </template>
        <template v-slot:item_text>购物车</template>
      </tab-item>
      <tab-item link="/user">
        <template v-slot:item_icon>
          <img src="~assets/img/tabbar/profile.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/tabbar/profile_active.svg" alt />
        </template>
        <template v-slot:item_text>用户</template>
      </tab-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "common/tabbar/TabBar";
import TabItem from "common/tabbar/TabItem";
export default {
  components: {
    TabBar,
    TabItem
  }
};
</script>

<style>
</style>