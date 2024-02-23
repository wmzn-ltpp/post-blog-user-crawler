const Console = require('./console');
const Db = require('./db');
const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Public = require('./public');
require('./stack');

class Base {
    /**
     * 映射菜单
     */
    static tips = {
        1: '知乎',
        2: 'CSDN',
        3: '简书'
    };

    constructor(process_loc, Cin) {
        this.comment_limit = 36;
        this.Db = new Db(process_loc, Cin);
    }

    /**
     * 添加用户返回数据库该用户信息
     * @param {string} process_loc 线程编号
     * @param {string} name 用户名
     * @param {string} headimage 用户头像
     * @param {string} mysay 个性签名
     * @param {int} follow 关注数目
     * @param {int} fans 粉丝数目
     * @returns {Object} res 插入成功后的数据
     */
    async addUser(process_loc, name, headimage, mysay = '', follow = 0, fans = 0) {
        if (this.Db.sequelize === null || typeof this.Db.sequelize !== 'object' || Array.isArray(this.Db.sequelize) || Object.keys(this.Db.sequelize).length === 0) {
            return {};
        }
        if (!mysay) {
            mysay = await Db.getRandomComment(process_loc);
        }
        if (!name) {
            name = '匿名用户';
        }
        let db_user_data = {
            name: '',
            acnum: 0,
            grade: 1,
            fans: 0,
            password: '',
            student_number: '无',
            enrollment_year: 0,
            school: '无',
            college: '无',
            subject: '无',
            class: '无',
            email: 'robot@ltpp.vip',
            money: 0,
            headimage: '',
            bkimage: '',
            sex: '男',
            follow: 0,
            mysay: '',
            bkvideo: '',
            musicuid: '0',
            musiclovelistid: '0',
            isusemusic: 1,
            registertime: '2023-03-17 02:20:05',
            lastlogin: '2023-03-17 02:20:05',
        };
        db_user_data.name = name.substr(0, 26);
        db_user_data.headimage = headimage;
        db_user_data.follow = follow;
        db_user_data.mysay = mysay;
        db_user_data.fans = fans;
        db_user_data.password = Public.md5(Public.rand(1, 10000000));
        db_user_data.sex = Public.rand(1, 100) % 2 ? '男' : '女';
        db_user_data.registertime = Public.date();
        db_user_data.lastlogin = Public.date();
        let db = await this.Db.queryOne('user', 'name', db_user_data.name).catch((err) => {
            Console.error(process_loc, '查询用户出错：' + err.message);
            return {};
        });
        if (db !== null && typeof db === 'object' && !Array.isArray(db) && Object.keys(db).length > 0) {
            Console.warn(process_loc, '用户【' + name + '】已存在，不进行用户插入');
            return db;
        }
        db = await this.Db.insertToDb('user', db_user_data).catch((err) => {
            Console.error(process_loc, '用户插入出错：' + err.message);
            return {};
        });
        Console.log(process_loc, '用户【' + name + '】插入成功');
        return db;
    }

    /**
     * 添加文章并返回插入后的数据
     * @param {int} process_loc 线程编号
     * @param {string} title 
     * @param {string} content
     * @param {int} writerid
     * @returns {Object} res 插入成功后的数据
     */
    async addArticle(process_loc, title, content, writerid) {
        if (!writerid) {
            return {};
        }
        if (this.Db.sequelize === null || typeof this.Db.sequelize !== 'object' || Array.isArray(this.Db.sequelize) || Object.keys(this.Db.sequelize).length === 0) {
            return {};
        }
        let user_db = await this.Db.queryOne('user', 'id', writerid).catch((err) => {
            Console.error(process_loc, '查询用户出错：' + err.message);
            return {};
        });
        if (user_db === null || typeof user_db !== 'object' || Array.isArray(user_db) || Object.keys(user_db).length == 0) {
            Console.warn(process_loc, '文章作者不存在，不进行文章插入');
            return {};
        }
        let db_article_data = {
            writerid: 0,
            problemid: 0,
            public: 1,
            name: '',
            fabulous: 66,
            collection: 66,
            releasetime: '2023-03 - 17 02: 20:05',
            lastchangetime: '2023-03 - 17 02: 20:05',
            image: '',
            article: ''
        };
        db_article_data.name = title.substr(0, 191);
        db_article_data.writerid = writerid;
        db_article_data.problemid = 0;
        db_article_data.public = 1;
        db_article_data.fabulous = Public.rand(10, 10000);
        db_article_data.collection = Public.rand(10, 10000);
        db_article_data.releasetime = Public.date();
        db_article_data.lastchangetime = Public.date();
        db_article_data.image = await Db.randImage(process_loc);
        db_article_data.article = content.replace(/<[^>]*>/g, '').substring(0, 100);
        let article_db = await this.Db.queryOne('article', 'name', db_article_data.name).catch((err) => {
            Console.error(process_loc, '查询文章是否存在出错：' + err.message);
            return {};
        });

        if (article_db !== null && typeof article_db === 'object' && !Array.isArray(article_db) && Object.keys(article_db).length > 0) {
            Console.warn(process_loc, '文章【' + db_article_data.name + '】已存在，不进行文章插入');
            return article_db;
        }

        let db = await this.Db.insertToDb('article', db_article_data).catch((err) => {
            Console.error(process_loc, '插入文章出错：' + err.message);
            return {};
        });
        await this.Db.insertToDb('article_data', {
            article_id: db.id,
            data: content
        }).catch((err) => {
            Console.error(process_loc, '插入文章出错：' + err.message);
            return {};
        });
        Console.log(process_loc, '文章【' + db_article_data.name + '】插入成功');
        return db;
    }

    /**
     * 添加问题
     * @param {int} process_loc 线程编号
     * @param {string} title 问题内容
     * @param {string} writerid 发布者ID
     * @return {object} res 插入后的数据
     */
    async addQuestion(process_loc, question, writerid) {
        if (!writerid) {
            return {};
        }
        if (this.Db.sequelize === null || typeof this.Db.sequelize !== 'object' || Array.isArray(this.Db.sequelize) || Object.keys(this.Db.sequelize).length === 0) {
            return {};
        }
        let user_db = await this.Db.queryHas('user', 'id', writerid).catch((err) => {
            Console.error(process_loc, '查询用户出错：' + err.message);
            return {};
        });

        if (!user_db) {
            Console.warn(process_loc, '问题作者不存在，不进行问题插入');
            return {};
        }
        let db_question_data = {
            name: '',
            userid: 0,
            question: '',
            answer_num: 0,
            time: '2023-03 - 17 02: 20:05'
        };
        db_question_data.name = question.substr(0, 191);
        db_question_data.userid = writerid;
        db_question_data.question = question;
        db_question_data.answer_num = 0;
        db_question_data.time = Public.date();
        let question_db = await this.Db.queryOne('question', 'name', db_question_data.name).catch((err) => {
            Console.error(process_loc, '查询问题出错：' + err.message);
            return {};
        });
        if (question_db !== null && typeof question_db === 'object' && !Array.isArray(question_db) && Object.keys(question_db).length > 0) {
            Console.warn(process_loc, '问题【' + db_question_data.name + '】已存在，不进行问题插入');
            return question_db;
        }
        question_db = await this.Db.insertToDb('question', db_question_data).catch((err) => {
            Console.error(process_loc, '插入问题出错：' + err.message);
            return {};
        });
        Console.log(process_loc, '问题【' + db_question_data.name + '】插入成功');
        return question_db;
    }

    /**
     * 添加主评论
     * @param {int} process_loc 线程编号
     * @param {int} article_id 文章ID
     * @param {int} userid 用户ID
     * @returns {Object} res 插入后的评论数据
     */
    async addComment(process_loc, article_id, userid, comment = null) {
        if (!userid || !article_id) {
            return {};
        }
        if (this.Db.sequelize === null || typeof this.Db.sequelize !== 'object' || Array.isArray(this.Db.sequelize) || Object.keys(this.Db.sequelize).length === 0) {
            return {};
        }
        let user_db = await this.Db.queryOne('user', 'id', userid).catch((err) => {
            Console.error(process_loc, '查询用户出错：' + err.message);
            return {};
        });
        if (user_db === null || typeof user_db !== 'object' || Array.isArray(user_db) || Object.keys(user_db).length == 0) {
            Console.warn(process_loc, '文章作者不存在，不进行评论插入');
            return {};
        }
        let article_db = await this.Db.queryOne('article', 'id', article_id).catch((err) => {
            Console.error(process_loc, '查询文章出错：' + err.message);
            return {};
        });

        if (article_db === null || typeof article_db !== 'object' || Array.isArray(article_db) || Object.keys(article_db).length == 0) {
            Console.log(process_loc, '文章不存在，不进行评论插入');
            return {};
        }
        if (!comment) {
            comment = await Db.getRandomComment(process_loc);
        }
        let db_comment_data = {
            articleid: 0,
            userid: 0,
            maincommentid: 0,
            touserid: 0,
            username: '',
            tousername: '',
            text: '',
            time: '2023-03-17 02:20:05',
        };
        db_comment_data.articleid = article_id;
        db_comment_data.userid = userid;
        db_comment_data.maincommentid = 0;
        db_comment_data.touserid = 0;
        db_comment_data.username = user_db.name;
        db_comment_data.tousername = '';
        db_comment_data.text = comment;
        db_comment_data.time = Public.date();
        let db = await this.Db.insertToDb('articlecomment', db_comment_data).catch((err) => {
            Console.error(process_loc, '插入文章评论出错：' + err.message);
            return {};
        });
        Console.log(process_loc, '文章【' + article_db.name + '】的评论【' + db_comment_data.text + '】插入成功');
        if (userid != article_db.writerid) {
            await this.addNotice(process_loc, article_id, 0, user_db.name);
        }
        return db;
    }

    /**
     * 添加回答
     * @param {int} question_id 问题ID
     * @param {int} userid 用户ID
     * @return {string} answer 回答内容
     */
    async addAnswer(process_loc, question_id, userid, answer) {
        if (!userid || !question_id) {
            return {};
        }
        if (this.Db.sequelize === null || typeof this.Db.sequelize !== 'object' || Array.isArray(this.Db.sequelize) || Object.keys(this.Db.sequelize).length === 0) {
            return {};
        }
        let user_db = await this.Db.queryOne('user', 'id', userid).catch((err) => {
            Console.error(process_loc, '查询用户出错：' + err.message);
            return {};
        });
        if (user_db === null || typeof user_db !== 'object' || Array.isArray(user_db) || Object.keys(user_db).length == 0) {
            Console.log(process_loc, '用户不存在，不进行回答插入');
            return {};
        }
        let question_db = await this.Db.queryOne('question', 'id', question_id).catch((err) => {
            Console.error(process_loc, '查询问题出错：' + err.message);
            return {};
        });

        if (question_db === null || typeof question_db !== 'object' || Array.isArray(question_db) || Object.keys(question_db).length == 0) {
            Console.log(process_loc, '问题不存在，不进行问题插入');
            return {};
        }
        let db_answer_data = {
            questionid: 0,
            mainanswerid: 0,
            userid: 0,
            touserid: 0,
            answer: '',
            time: '2023-03 - 17 02: 20:05'
        };
        db_answer_data.questionid = question_id;
        db_answer_data.mainanswerid = 0;
        db_answer_data.userid = userid;
        db_answer_data.touserid = 0;
        db_answer_data.answer = answer;
        db_answer_data.time = Public.date();
        let db = await this.Db.insertToDb('answer', db_answer_data).catch((err) => {
            Console.error(process_loc, '插入问题回答出错：' + err.message);
            return {};
        });
        await this.Db.inc('question', 'id', question_id, 'answer_num').catch((err) => {
            Console.error(process_loc, '自增问题回答数出错：' + err.message);
            return db;
        });
        await this.addNotice(process_loc, 0, question_id, user_db.name);
        return db;
    }

    /**
     * 添加通知
     * @param {int} process_loc 线程编号
     * @param {int} article_id 文章ID
     * @param {int} question_id 问题ID
     * @param {string} name 消息中的用户名
     */
    async addNotice(process_loc, article_id, question_id, name) {
        if (this.Db.sequelize === null || typeof this.Db.sequelize !== 'object' || Array.isArray(this.Db.sequelize) || Object.keys(this.Db.sequelize).length === 0) {
            return {};
        }
        if (article_id) {
            let article_db = await this.Db.queryOne('article', 'id', article_id).catch((err) => {
                Console.error(process_loc, '查询文章出错：' + err.message);
                return {};
            });
            if (article_db === null || typeof article_db !== 'object' || Array.isArray(article_db) || Object.keys(article_db).length == 0) {
                Console.log(process_loc, '文章不存在，不进行评论插入');
                return {};
            }
            let db = await this.Db.insertToDb('usernotice', {
                userid: article_db.writerid,
                articleid: article_id,
                questionid: question_id,
                videoid: 0,
                fanuserid: 0,
                notice: name + '在《' + article_db.name + '》中评论了你',
                time: Public.date()
            }).catch((err) => {
                Console.error(process_loc, '插入文章通知出错：' + err);
                return {};
            });
            Console.log(process_loc, '文章【' + article_db.name + '】的评论通知【' + name + '在《' + article_db.name + '》中评论了你' + '】插入成功');
            return db;
        } else if (question_id) {
            let question_db = await this.Db.queryOne('question', 'id', question_id).catch((err) => {
                Console.error(process_loc, '查询问题出错：' + err.message);
                return {};
            });
            if (question_db === null || typeof question_db !== 'object' || Array.isArray(question_db) || Object.keys(question_db).length == 0) {
                Console.log(process_loc, '问题不存在，不进行回答通知插入');
                return {};
            }
            let db = await this.Db.insertToDb('usernotice', {
                userid: question_db.userid,
                articleid: article_id,
                questionid: question_id,
                videoid: 0,
                fanuserid: 0,
                notice: name + '在《' + question_db.name + '》中回答了你',
                time: Public.date()
            }).catch((err) => {
                Console.error(process_loc, '插入问题通知出错：' + err);
                return {};
            });
            Console.log(process_loc, '问题【' + question_db.name + '】的回答通知【' + name + '在《' + question_db.name + '》中回答了你' + '】插入成功');
            return db;
        }
        Console.log(process_loc, '不合法通知类型，不进行插入');
        return {};
    }

    /**
     * 根据图片URL获取Base64编码后的图片
     * @param {int} process_loc 线程编号
     * @param {string} src 图片地址
     * @returns {string} Base64编码后的图片
     */
    async getImgBase64(process_loc, src) {
        if (!src) {
            return;
        }
        return new Promise(async (resolve) => {
            try {
                const response = await axios({
                    method: 'get',
                    url: src,
                    responseType: 'arraybuffer',
                    maxContentLength: -1
                });
                const imgData = new Uint8Array(response.data);
                const base64 = btoa(String.fromCharCode.apply(null, imgData));
                resolve(base64);
            } catch (err) {
                Console.error(process_loc, '获取图片出错：' + err.message);
            }
            resolve('');
        });
    }

    /**
     * html中图片转base64
     * @param {int} process_loc 线程编号
     * @param {string} html HTML 
     * @returns {string} res 转换后的html
     */
    async htmlImageToBase64(process_loc, html) {
        let res = '';
        try {
            const document = new JSDOM(html).window.document;
            const images = document.querySelectorAll('img');
            await Promise.all(Array.from(images).map(async (image) => {
                const src = image.getAttribute('src');
                let base64 = await this.getImgBase64(process_loc, src);
                if (base64) {
                    const dataURI = 'data:image/jpeg;base64,' + base64;
                    image.setAttribute('src', dataURI);
                }
                await Public.sleep(666);
            }));
            res = document.documentElement.outerHTML;
        } catch (err) {
            res = '';
            Console.log(process_loc, 'HTML中图片转Base64出错：' + err.message);
        }
        if (!res) {
            res = '';
        }
        return res;
    }

    /**
     * 保存到文件
     * @param {int} process_loc 线程编号
     * @param {string} save_path 文件保存路径
     * @param {string} html 保存的HTML内容
     */
    writeToFile(process_loc, save_path, html) {
        if (fs.existsSync(save_path)) {
            Console.log(process_loc, '文件存在，已跳过【' + save_path + '】');
            return;
        }
        try {
            fs.writeFileSync(save_path, html);
        } catch (err) {
            Console.error(process_loc, '创建文件出错：' + err.message);
        }
        Console.log(process_loc, '文件保存成功，保存路径【' + save_path + '】');
    }

    /**
     * 发送get请求
     * @param {string} url 请求网址 
     */
    async sendGet(url, my_data = {}, headers = {}) {
        const { data: res } = await axios.get(url, {
            params: my_data,
            headers: headers,
            timeout: 66666666,
            maxContentLength: -1
        }).catch((err) => {
            throw err;
        });
        return res;
    }

    /**
     * 发送post请求
     * @param {string} url 请求网址 
     */
    async sendPost(url, my_data = {}, headers = {}) {
        const { data: res } = await axios.post(url, my_data, {
            headers: headers,
            timeout: 66666666,
            maxContentLength: -1
        }).catch((err) => {
            throw err;
        });
        return res;
    }

    /**
     * 创建文件夹
     * @param {string} path
     */
    creatDir(process_loc, path) {
        if (!fs.existsSync(path)) {
            // 如果不存在则创建文件夹
            try {
                fs.mkdirSync(path);
            } catch (err) {
                Console.error(process_loc, '创建文件夹出错：' + err.message);
            } finally {
                Console.log(process_loc, '已创建文件夹（' + path + '）');
            }
        }
    }

}

module.exports = Base;