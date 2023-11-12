const fs = require('fs');
const Console = require('./console');
const Db = require('./db');
const Public = require('./public');
require('./stack');

class ZhiHu {
    // 设置请求头信息
    static headers = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Referer: https://www.zhihu.com/',
        'X-Requested-With: XMLHttpRequest',
    ];

    // 构建请求URL
    static url = 'https://www.zhihu.com/api/v3/feed/topstory/recommend';

    static page = 0;

    static css = '';

    static err_msg = '知乎请求出错';

    /**
     * 文章保存本地路径
     */
    static path = '/ZhiHu/';

    constructor(process_loc, Base, Cin) {
        this.Base = Base;
        this.Cin = Cin;
        ZhiHu.page = 0;
        if (this.Cin.save_file) {
            fs.readFile(__dirname + '/public/zhihu.css', (err, data) => {
                if (err) {
                    throw err;
                }
                ZhiHu.css = data.toString();
            });
            Console.log(process_loc, '【知乎】CSS文件已读入');
        }
        Console.log(process_loc, '【知乎】初始化完成');
    }


    async bug(process_loc) {
        this.Base.creatDir(process_loc, ZhiHu.path);
        // 发送GET请求获取知乎首页列表
        let response = await this.Base.sendGet(ZhiHu.url).catch((err) => {
            Console.error(process_loc, '知乎请求出错：' + err.message);
            return;
        });

        if (!response || !response.data) {
            Console.error(process_loc, ZhiHu.err_msg);
            return;
        }

        let data = response.data;
        if (!data) {
            Console.error(process_loc, ZhiHu.err_msg);
            return;
        }

        await Promise.all(Array.from(data).map(async (t) => {
            if (Public.keyExist(t, 'target') != 1) {
                Console.error(process_loc, ZhiHu.err_msg);
                return Promise.resolve();
            }
            let tem = t.target;
            if (
                Public.keyExist(tem, 'question') != 1 ||
                Public.keyExist(tem, 'author') != 1 ||
                Public.keyExist(tem, 'content') != 1 ||
                Public.keyExist(tem.question, 'title') != 1 ||
                Public.keyExist(tem.author, 'name') != 1 ||
                Public.keyExist(tem.author, 'avatar_url') != 1 ||
                Public.keyExist(tem.question, 'author') != 1 ||
                Public.keyExist(tem.question.author, 'name') != 1 ||
                Public.keyExist(tem.question.author, 'avatar_url') != 1
            ) {
                Console.error(process_loc, ZhiHu.err_msg);
                return Promise.resolve();
            }

            let question = tem.question.title;
            let ans = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' + question + '</title></head><body>' + tem.content + '</body></html>';

            if (tem?.content?.length <= 100) {
                Console.warn(process_loc, '【' + question + '】回答过短，已跳过');
            } else {
                if (this.Cin.save_file) {
                    ans = await this.Base.htmlImageToBase64(process_loc, ans);
                }
                if (!ans) {
                    return Promise.resolve();
                }
                if (this.Cin.save_db) {
                    let post_user_db = await this.Base.addUser(process_loc, tem.question.author.name, tem.question.author.avatar_url);
                    let ans_user_db = await this.Base.addUser(process_loc, tem.author.name, tem.author.avatar_url);
                    let post_user_id = post_user_db.id ?? 0;
                    let ans_user_id = ans_user_db.id ?? 0;
                    let question_data = await this.Base.addQuestion(process_loc, question, post_user_id);
                    let question_id = question_data.id;
                    if (question_id) {
                        await this.Base.addAnswer(process_loc, question_id, ans_user_id, ans);
                    }
                    let article_data = await this.Base.addArticle(process_loc, question, ans, ans_user_id);
                    let article_id = article_data.id;
                    if (article_id) {
                        for (let i = 0; i < this.Base.comment_limit; ++i) {
                            let comment = await Db.getRandomComment(process_loc);
                            let comment_userid = await Db.getOneUser(process_loc)?.id ?? 0;
                            await this.Base.addComment(process_loc, article_id, comment_userid, comment);
                        }
                        let comment = await Db.getRandomComment(process_loc);
                        await this.Base.addComment(process_loc, article_id, post_user_id, comment);
                    }
                }
                if (this.Cin.save_file) {
                    let tem_save_path = ZhiHu.path + question + '（' + tem.author.name + '）.html';
                    this.Base.writeToFile(process_loc, tem_save_path, ans);
                }
                await Public.sleep(666);
                return Promise.resolve();
            }
        }));
    }
}

module.exports = ZhiHu;