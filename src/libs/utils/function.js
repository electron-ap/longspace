// 返回从当天开始计算到指定天数的日期
export const getDate = (AddDayCount) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}

// 返回当月一号到当天的日期，array
export const getMonthStartToToday = () => {
    var dd = new Date();
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0

    var firstDay = y + "-" + m + "-01";
    var curDay = y + "-" + m + "-" + d;
    return [firstDay, curDay]
}

// 秒转为时分秒
export const formatSeconds = (value, format = ':') => {
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    let res = '';
    if (format === 'hms') {
        if (h !== '00') res += `${h}h`;
        res += `${m}m`; //if (m !== '00') 
        res += `${s}s`;
    } else {
        if (h !== '00') res += `${h}:`;
        res += `${m}:`; //if (m !== '00')
        res += `${s}`;
    }
    return res;
}

/**
* 验证数据 是数字：返回true；不是数字：返回false
**/
export const isNumber = (val) => {
    if (parseFloat(val).toString() === "NaN") {
        return false;
    } else {
        return true;
    }
}

export const exportCsv = (filename, data) => {
    const blobData = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), data], { type: 'text/csv' });
    if (blobData != null && navigator.msSaveBlob) {
        navigator.msSaveBlob(blobData, filename);
        return;
    }
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blobData);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}

/**
 * 获取文件后缀名   getExt("1.mp4") //->mp4
 * @param {String} filename
 */
export function getFileExt(filename) {
    if (typeof filename == 'string') {
        return filename
            .split('.')
            .pop()
            .toLowerCase()
    } else {
        throw new Error('filename must be a string type')
    }
}

//如果复制成功返回true
// copyToBoard('lalallala')
export function copyToBoard(value) {
    const element = document.createElement('textarea')
    document.body.appendChild(element)
    element.value = value
    element.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        document.body.removeChild(element)
        return true
    }
    document.body.removeChild(element)
    return false
}

/**
 * 生成随机id
 * @param {*} length
 * @param {*} chars
 */
//第一个参数指定位数，第二个字符串指定字符，都是可选参数，如果都不传，默认生成8位
// uuid()
export function uuid(length, chars) {
    chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    length = length || 8
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

/**
 * 数组去重  uniqueArray([1,1,1,1,1])//[1]  原理是利用Set中不能出现重复元素的特性
 * @param {*} arr
 */
export function uniqueArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('The first parameter must be an array')
    }
    if (arr.length === 1) {
        return arr
    }
    return [...new Set(arr)]
}

// 保留小数点以后几位，默认2位
export function cutNumber(number, no = 2) {
    if (typeof number != 'number') {
        number = Number(number)
    }
    return Number(number.toFixed(no))
}

//下载一个链接   download('http://111.229.14.189/file/1.xlsx')
export function download(link, name) {
    if (!name) {
        name = link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

/**
     * @desc 下载文件
     * */
export function downLoadFile(url) {
    const linkElement = document.createElement('a');
    linkElement.style.display = 'none';
    linkElement.href = url;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
};

export function formatDate(date) {
    date = new Date(Date.parse(date)); //转换成Data();.replace(/-/g, "/")
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}
