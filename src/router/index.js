import Vue from 'vue';
import VueRouter from 'vue-router';

// 2.1 lazy loade component
const Home = () => import('views/home/Home.vue');
const Cart = () => import('views/cart/Cart.vue');
const Category = () => import('views/category/Category.vue');
const User = () => import('views/user/User.vue');
const Detail = () => import('views/detail/Detail.vue');

// 1. install plugin

Vue.use(VueRouter);

// 2. create router instance

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/cart',
        name: "Cart",
        component: Cart
    },
    {
        path: '/user',
        name: "User",
        component: User
    },
    {
        path: '/detail/:iid',
        name: "Detail",
        component: Detail
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
}
);

// 3. export router 

export default router;