import { debounce } from 'common/util';
export const TapBackMixin = {
    data() {
        return {
            // 控制TapBack能否显示的变量
            tapBackCanShow: false
        }
    },
    methods: {
        tapBackClicked() {
            // TapBack被点击时执行的事件处理函数
            this.$refs.scroll.scrollTo(0, 0, 400);
        }
    }
}


export const GoodsImgLoadMixin = {
    data() {
        return {
            goodsImgsHandler: null
        }
    },
    mounted() {
        // 组件挂载后，监听自定义事件
        let refresh = debounce(this.$refs.scroll.refresh);
        this.goodsImgsHandler = () => {
            // 刷新scroll的长度
            refresh();
        };
        this.$bus.$on("goodsListImgsLoaded", this.goodsImgsHandler);
    }
}