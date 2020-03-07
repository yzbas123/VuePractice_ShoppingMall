import { request } from './index'

export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    });
}