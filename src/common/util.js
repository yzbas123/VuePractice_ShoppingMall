export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        // RegExp.$1 代表匹配的第一个子串
        // (date.getFullYear() + '') 表示将四位年份数字转换成字符串
        // (date.getFullYear() + '').substr(4 - RegExp.$1.length) 表示,传入的模式是几个y,就替换几个
        // 例如yyyy 替换完就是 2018 ,yy 就是 18 ,y就是8 ,yyy就是018
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

    }
    /* 将解析的月,号数,小时,分钟,秒封装在一起 */
    /* 属性名称是 对应的正则模式,M+ 就是说匹配1个或多个大M ,以此类推*/
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    /* 使用for in 可以直接访问属性名称,既模式字符串 */
    for (let k in o) {
        // console.log(k);
        /* 模板字符串,使用``就可以把这里面的格式比如空格,回车直接表示出来 */
        /* 而且里面使用${变量}的方式可以直接应用变量,不像传统字符串还需要+号连接 */
        // console.log(`(${k})`);

        /* 有前面的知识补充 */
        /* 知道了下面就是想表示类似(M+)的 模板,用模板字符串的方式较为方便 */
        if (new RegExp(`(${k})`).test(fmt)) {
            /* 满足条件的子串转换为字符串 */
            let str = o[k] + '';
            /* 然后执行匹配内容替换模板 */
            /* 如果模板不是单位数,那么进行补零处理 */
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

