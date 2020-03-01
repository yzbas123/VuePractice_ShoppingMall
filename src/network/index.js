import Axios from 'axios';


//导出一个函数,函数一旦调用就会创建一个独立的Axios实例用于网络请求
export function request(config) {
    // 创建Axios实例axios
    const axios = Axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 3000
    });

    // 使用拦截器

    // 请求拦截器
    axios.interceptors.request.use(config => {
        // 请求的参数需要在最后被返回,否则这个配置被拦截了,发送请求的配置就为空了
        return config;
    }, err => {
        // 打印错误信息
        console.log(err);
    });


    // 响应拦截器
    axios.interceptors.response.use(res => {
        // res 的data是响应拿到的数据
        return res.data;
    }, err => {
        console.log(err);
    });

    // 这个函数返回promise对象,调用方就可以使用then接收数据
    return axios(config);
}

