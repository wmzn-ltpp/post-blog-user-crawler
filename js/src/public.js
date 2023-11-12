const crypto = require('crypto');
class Public {
    /**
      * 查询对象是否有该属性
      * @param {object} obj 对象
      * @param {string|number} search_key 查找的key 
      * @returns {int} deep 该key所在层数，若未找到返回-1
      */
    static keyExist(obj, search_key, deep = 1) {
        if (typeof obj !== 'object') {
            return -1;
        }
        for (let key in obj) {
            if (key === search_key) {
                return deep;
            } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                let child_key_deep = Public.keyExist(obj[key], search_key, deep + 1);
                if (child_key_deep != -1) {
                    return child_key_deep;
                }
            }
        }
        return -1;
    }

    /**
     * 睡眠
     * @param {int} ms 
     * @returns {Promise} res
     */
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 随机数（闭区间）
     */
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 当前时间
     */
    static date() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
    }

    /**
     * MD5加密
     * @param {*} str 加密字符串
     * @returns {string} md5 加密结果
     */
    static md5(str) {
        const hash = crypto.createHash('md5');
        try {
            hash.update(str?.toString());
        } catch (err) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 32; i++) {
                const index = Math.floor(Math.random() * characters.length);
                result += characters[index];
            }
            return result;
        }
        return hash.digest('hex');
    }

}

module.exports = Public;