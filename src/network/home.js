import { request } from './index';

// 针对首页的请求

export function getHomeDatas() {
    return request({
        url: '/home/multidata'
    });
}