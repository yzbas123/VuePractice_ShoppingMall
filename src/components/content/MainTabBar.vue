<template>
  <div>
    <tab-bar>
      <tab-item link="/home">
        <template v-slot:item_icon>
          <img src="~assets/img/home.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/home_active.svg" alt />
        </template>
        <template v-slot:item_text>首页</template>
      </tab-item>
      <tab-item link="/category">
        <template v-slot:item_icon>
          <img src="~assets/img/category.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/category_active.svg" alt />
        </template>
        <template v-slot:item_text>分类</template>
      </tab-item>
      <tab-item link="/cart">
        <template v-slot:item_icon>
          <img src="~assets/img/cart.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/cart_active.svg" alt />
        </template>
        <template v-slot:item_text>购物车</template>
      </tab-item>
      <tab-item link="/user">
        <template v-slot:item_icon>
          <img src="~assets/img/user.svg" alt />
        </template>
        <template v-slot:item_icon_active>
          <img src="~assets/img/user_active.svg" alt />
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