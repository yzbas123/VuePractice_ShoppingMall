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