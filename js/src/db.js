const { Sequelize, Op } = require('sequelize');
const Console = require('./console');
const Public = require('./public');
require('./stack');

class Db {
    static shortsentence_list = [];
    static user_list = [];
    static image_list = [];
    static sequelize = null;
    constructor(process_loc, Cin) {
        this.process_loc = process_loc;
        this.Cin = Cin;
        Db.sequelize = null;
    }

    async init() {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        while (!Db.user_list.length) {
            Console.log(this.process_loc, '正在获取随机用户');
            Db.user_list = await this.getUserRandom(1000).catch((err) => {
                Console.error(0, '获取随机用户出错：' + err.message);
                return {};
            });
        }
        Console.log(0, '随机用户拉取完成');
        while (!Db.shortsentence_list.length) {
            Console.log(this.process_loc, '正在获取随机评论');
            Db.shortsentence_list = await this.getRandom('shortsentence', 100).catch((err) => {
                Console.error(0, '获取随机评论出错：' + err.message);
                return {};
            });
        }
        Console.log(0, '随机评论拉取完成');
        while (!Db.image_list.length) {
            Console.log(this.process_loc, '正在获取随机图片');
            Db.image_list = await this.getRandom('image', 100).catch((err) => {
                Console.error(0, '获取随机图片出错：' + err.message);
                return {};
            });
        }
        Console.log(0, '随机图片拉取完成');
    }

    /**
     * 需要手动调用
     */
    async _connectDb() {
        try {
            await this._initConnect();
            Db.sequelize.addHook('afterConnect', () => {
                Console.log(this.process_loc, '数据库连接成功');
            });
            Db.sequelize.addHook('afterDisconnect', () => {
                Console.error(this.process_loc, '数据库连接已断开');
                this._initConnect();
            });
        } catch (error) {
            Console.error(this.process_loc, '检测到数据库异常错误：' + error.message);
            process.exit(1);
        }
    }

    /**
     * 数据库初始化
     */
    async _initConnect() {
        while (true) {
            try {
                Db.sequelize = new Sequelize('', '', '', {
                    host: '127.0.0.1',
                    port: 3306,
                    dialect: 'mysql',
                    charset: 'utf8mb4',
                    collation: 'utf8mb4_unicode_ci',
                    logging: false,
                    timestamps: true,
                    retry: {
                        max: Infinity,
                        timeout: 6666,
                    },
                    query: {
                        timeout: 10 // 查询时间限制
                    },
                    dialectOptions: {
                        connectTimeout: 10, // 连接超时限制
                    }
                });
                Console.log(this.process_loc, '正在检测数据库连接是否正常');
                await Db.sequelize.authenticate();
            } catch (err) {
                Console.error(this.process_loc, '连接数据库失败：' + err.message);
                Console.warn(this.process_loc, '尝试重新连接数据库');
                continue;
            }
            break;
        }
    }

    /**
     * 查询数据表某记录是否存在
     * @param {string} table_name 数据表名称
     * @param {string} query_key 数据库字段
     * @param {string} query_data 该字段值
     * @returns {boolean} ishas 是否存在
     */
    async queryHas(table_name, query_key, query_data) {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        let res = await this.queryOne(table_name, query_key, query_data).catch((err) => {
            throw err;
        });
        return Object.keys(res).length > 0;
    }

    /**
     * 插入一条记录
     * @param {string} table_name 数据表名称
     * @param {Object} insert_data 插入的数据
     * @returns {Object} res 插入后的数据
     */
    async insertToDb(table_name, insert_data) {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        try {
            const model = require('../models/' + table_name)(Db.sequelize, Sequelize);
            let res = await model.create(insert_data).catch((err) => {
                throw err;
            });
            return res?.dataValues ?? {};
        } catch (err) {
            throw err;
        }
    }

    /**
     * 查询一条记录
     * @param {string} table_name 数据表名称
     * @param {string} query_key 数据库字段
     * @param {string} query_data 该字段值
     * @returns {Object} res 查询的数据
     */
    async queryOne(table_name, query_key, query_data) {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        while (true) {
            try {
                const model = require('../models/' + table_name)(Db.sequelize, Sequelize);
                const res = await model.findOne({
                    where: {
                        [query_key]: query_data,
                        isdel: 0,
                    },
                    limit: [0, 1]
                }).catch(err => {
                    throw err;
                });
                return res?.dataValues ?? {};
            } catch (err) {
                if (err.message.indexOf('unknown timed out') != -1) {
                    Console.error(this.process_loc, '查询【' + table_name + '】出错：' + err.message);
                    Console.warn(this.process_loc, '尝试重新查询');
                    continue;
                } else {
                    throw err;
                }
            }
        }
    }

    /**
     * 获取随机多条数据
     * @param {string} table_name 数据表名称
     * @param {int} limit 数据条数
     * @returns {Array} res 数据
     */
    async getRandom(table_name, limit) {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        while (1) {
            try {
                const model = require('../models/' + table_name)(Db.sequelize, Sequelize);
                const db = await model.findAll({
                    where: {
                        isdel: 0,
                    },
                    limit: [0, limit]
                }).catch(err => {
                    throw err;
                });
                let res = [];
                db.forEach(t => {
                    res.push(t?.dataValues ?? {});
                });
                return res;
            } catch (err) {
                if (err.message.indexOf('unknown timed out') != -1) {
                    Console.error(this.process_loc, '获取' + limit + '条【' + table_name + '】随机数据出错：' + err.message);
                    Console.warn(this.process_loc, '尝试重新获取');
                    continue;
                }
                throw err;
            }
        }
    }

    /**
     * 获取随机多条用户数据
     * @param {int} limit 数据条数
     * @returns {Array} res 数据
     */
    async getUserRandom(limit) {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        while (1) {
            try {
                const model = require('../models/user')(Db.sequelize, Sequelize);
                const db = await model.findAll({
                    where: {
                        isdel: 0,
                        email: '2133103246@qq.com'
                    },
                    limit: [0, limit]
                }).catch(err => {
                    throw err;
                });
                let res = [];
                db.forEach(t => {
                    res.push(t?.dataValues ?? {});
                });
                return res;
            } catch (err) {
                if (err.message.indexOf('unknown timed out') != -1) {
                    Console.error(this.process_loc, '获取' + limit + '条【' + table_name + '】随机数据出错：' + err.message);
                    Console.warn(this.process_loc, '尝试重新获取');
                    continue;
                }
                throw err;
            }
        }
    }

    /**
     * 自增
     * @param {string} table_name 数据表名称
     * @param {string} search_key 搜索的key
     * @param {string} search_value 搜索的key的value
     * @param {string} inc_key 需要自增的key
     * @returns {object} res
     */
    async inc(table_name, search_key, search_value, inc_key) {
        if (Db.sequelize === null || typeof Db.sequelize !== 'object' || Object.keys(Db.sequelize).length === 0) {
            await this._connectDb();
        }
        try {
            const model = require('../models/' + table_name)(Db.sequelize, Sequelize);
            await model.increment(inc_key, {
                by: 1,
                where: {
                    [search_key]: search_value
                }
            }).catch(err => {
                throw err;
            });
        } catch (err) {
            throw err;
        }
    }

    /**
     * 获取一个随机用户
     * @returns {Object} res 用户信息
     */
    static async getOneUser(process_loc) {
        let loc = Public.rand(0, Db.user_list.length - 1);
        let res = Db.user_list[loc];
        Console.log(process_loc, '随机用户【' + (res?.name ?? '无名氏') + '】生成成功');
        return res;
    }

    /**
    * 随机图片
    * @return {string} url 图片地址
    */
    static async randImage(process_loc) {
        let loc = Public.rand(0, Db.image_list.length - 1);
        let res = Db.image_list[loc];
        Console.log(process_loc, '随机图片【' + (res?.url ?? '') + '】生成成功');
        return res?.url ?? '';
    }

    /**
     * 获取一条随机评论
     * @param {int} limit 数据条数
     */
    static async getRandomComment(process_loc) {
        let loc = Public.rand(0, Db.shortsentence_list.length - 1);
        let res = (Db.shortsentence_list[loc].hitokoto ?? new Date().toString()) + '————' + (Db.shortsentence_list[loc].from ?? new Date().toString());
        Console.log(process_loc, '随机评论【' + res + '】生成成功');
        return res;
    }
}

module.exports = Db;