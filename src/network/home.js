import { request } from './index';

// 针对首页的请求

export function getHomeDatas() {
    return request({
        url: '/home/multidata'
    });
}


export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            page,
            type
        }
    });

}