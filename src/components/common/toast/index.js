import Toast from './toast.vue'

export default {
    install(vue) {
        // 1.创建构造器对象
        const toastConstructor = vue.extend(Toast);

        // 2.使用构造器创建组件对象
        const toast = new toastConstructor();

        // 3.手动挂载到某一元素上
        toast.$mount(document.createElement('div'));

        // 4.获取挂载的元素,并将该元素添加到body上
        // 4.1 toast组件对象在使用了$mount后,其$el就指向挂载的元素
        document.body.appendChild(toast.$el);

        // 5. 将组件对象设置到Vue的原型链上,这样所有的vue组件才能够访问
        vue.prototype.$toast = toast;
    }
};