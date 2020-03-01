<template>
  <div id="home">
    <!-- 首页导航栏 -->
    <nav-bar class="navbar">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 首页轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 特色栏 -->
    <feature-view></feature-view>
    <!-- 列表控制栏 -->
    <tab-control :titles="['流行','新款','精选']" class="tabcontrol"></tab-control>
    <!-- 占位用的,后面删除 -->
    <ul>
      <li>sdfsdfsdf1</li>
      <li>sdfsdfsdf2</li>
      <li>sdfsdfsdf3</li>
      <li>sdfsdfsdf4</li>
      <li>sdfsdfsdf5</li>
      <li>sdfsdfsdf6</li>
      <li>sdfsdfsdf7</li>
      <li>sdfsdfsdf8</li>
      <li>sdfsdfsdf9</li>
      <li>sdfsdfsdf10</li>
      <li>sdfsdfsdf11</li>
      <li>sdfsdfsdf12</li>
      <li>sdfsdfsdf13</li>
      <li>sdfsdfsdf14</li>
      <li>sdfsdfsdf15</li>
      <li>sdfsdfsdf16</li>
      <li>sdfsdfsdf17</li>
      <li>sdfsdfsdf18</li>
      <li>sdfsdfsdf19</li>
      <li>sdfsdfsdf20</li>
      <li>sdfsdfsdf21</li>
      <li>sdfsdfsdf22</li>
      <li>sdfsdfsdf23</li>
      <li>sdfsdfsdf24</li>
      <li>sdfsdfsdf25</li>
      <li>sdfsdfsdf26</li>
      <li>sdfsdfsdf27</li>
      <li>sdfsdfsdf28</li>
      <li>sdfsdfsdf29</li>
      <li>sdfsdfsdf30</li>
      <li>sdfsdfsdf31</li>
      <li>sdfsdfsdf32</li>
      <li>sdfsdfsdf33</li>
      <li>sdfsdfsdf34</li>
      <li>sdfsdfsdf35</li>
      <li>sdfsdfsdf36</li>
      <li>sdfsdfsdf37</li>
      <li>sdfsdfsdf38</li>
      <li>sdfsdfsdf39</li>
      <li>sdfsdfsdf40</li>
      <li>sdfsdfsdf41</li>
      <li>sdfsdfsdf42</li>
      <li>sdfsdfsdf43</li>
      <li>sdfsdfsdf44</li>
      <li>sdfsdfsdf45</li>
      <li>sdfsdfsdf46</li>
      <li>sdfsdfsdf47</li>
      <li>sdfsdfsdf48</li>
      <li>sdfsdfsdf49</li>
      <li>sdfsdfsdf50</li>
      <li>sdfsdfsdf51</li>
      <li>sdfsdfsdf52</li>
      <li>sdfsdfsdf53</li>
      <li>sdfsdfsdf54</li>
      <li>sdfsdfsdf55</li>
      <li>sdfsdfsdf56</li>
      <li>sdfsdfsdf57</li>
      <li>sdfsdfsdf58</li>
      <li>sdfsdfsdf59</li>
      <li>sdfsdfsdf60</li>
      <li>sdfsdfsdf61</li>
      <li>sdfsdfsdf62</li>
      <li>sdfsdfsdf63</li>
      <li>sdfsdfsdf64</li>
      <li>sdfsdfsdf65</li>
      <li>sdfsdfsdf66</li>
      <li>sdfsdfsdf67</li>
      <li>sdfsdfsdf68</li>
      <li>sdfsdfsdf69</li>
      <li>sdfsdfsdf70</li>
      <li>sdfsdfsdf71</li>
      <li>sdfsdfsdf72</li>
      <li>sdfsdfsdf73</li>
      <li>sdfsdfsdf74</li>
      <li>sdfsdfsdf75</li>
      <li>sdfsdfsdf76</li>
      <li>sdfsdfsdf77</li>
      <li>sdfsdfsdf78</li>
      <li>sdfsdfsdf79</li>
      <li>sdfsdfsdf80</li>
      <li>sdfsdfsdf81</li>
      <li>sdfsdfsdf82</li>
      <li>sdfsdfsdf83</li>
      <li>sdfsdfsdf84</li>
      <li>sdfsdfsdf85</li>
      <li>sdfsdfsdf86</li>
      <li>sdfsdfsdf87</li>
      <li>sdfsdfsdf88</li>
      <li>sdfsdfsdf89</li>
      <li>sdfsdfsdf90</li>
      <li>sdfsdfsdf91</li>
      <li>sdfsdfsdf92</li>
      <li>sdfsdfsdf93</li>
      <li>sdfsdfsdf94</li>
      <li>sdfsdfsdf95</li>
      <li>sdfsdfsdf96</li>
      <li>sdfsdfsdf97</li>
      <li>sdfsdfsdf98</li>
      <li>sdfsdfsdf99</li>
      <li>sdfsdfsdf100</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import HomeSwiper from "./childview/HomeSwiper.vue";
import RecommendView from "./childview/RecommendView";
import FeatureView from "./childview/FeatureView";
import TabControl from "common/tabcontrol/TabControl";
import { getHomeDatas } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    // 组件一旦创建便发送请求,调用getHomeDatas获取主页的数据
    getHomeDatas()
      .then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(this.recommends);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
#home {
  padding-top: 44px;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tabcontrol {
  position: sticky;
  top: 44px;
  background-color: #fff;
}
</style>