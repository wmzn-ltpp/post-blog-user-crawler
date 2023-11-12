const fs = require('fs');
const Console = require('./console');
const Db = require('./db');
const Public = require('./public');
require('./stack');

class JianShu {
    /**
     * 最新的文章数据列表
     */
    static url = 'https://www.jianshu.com/asimov/trending/now';

    /**
     * 具体文章详情
     */
    static one_url = 'https://www.jianshu.com/asimov/p/';

    /**
     * 具体用户详情
     */
    static user_url = 'https://www.jianshu.com/asimov/users/slug/';

    /**
     * 文章保存本地路径
     */
    static path = '/JianShu/';

    static css = '';

    static err_msg = '简书请求出错';

    constructor(process_loc, Base, Cin) {
        this.Base = Base;
        this.Cin = Cin;
        if (this.Cin.save_file) {
            fs.readFile(__dirname + '/public/jianshu.css', (err, data) => {
                if (err) {
                    throw err;
                }
                JianShu.css = data.toString();
            });
            Console.log(process_loc, '【简书】CSS文件已读入');
        }
        Console.log(process_loc, '【简书】初始化完成');
    }

    async bug(process_loc) {
        this.Base.creatDir(process_loc, JianShu.path);
        let list = await this.Base.sendGet(JianShu.url).catch((err) => {
            Console.error(process_loc, '简书首页请求出错：' + err.message);
            return;
        });

        if (!list) {
            Console.error(process_loc, JianShu.err_msg);
            return;
        }

        await Promise.all(Array.from(list).map(async (t) => {
            if (!t.object) {
                Console.error(process_loc, JianShu.err_msg);
                return Promise.resolve();
            }
            t = t.object;
            if (!t.data) {
                Console.error(process_loc, JianShu.err_msg);
                return Promise.resolve();
            }

            let one_json = await this.Base.sendGet(JianShu.one_url + t.data.slug).catch((err) => {
                Console.error(process_loc, '简书文章请求出错：' + err.message);
                return Promise.resolve();
            });

            if (!one_json) {
                Console.error(process_loc, JianShu.err_msg);
            }

            if (!one_json || !one_json.public_title || !one_json.free_content) {
                Console.error(process_loc, JianShu.err_msg);
                return Promise.resolve();
            }
            let title = one_json.public_title;
            let content = one_json.free_content;

            if (!title || !content) {
                Console.error(process_loc, JianShu.err_msg);
                return Promise.resolve();
            }
            content.replace('data-original-src="', 'src="https:');
            content.replace('padding-bottom:', '');
            let html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' + title + '</title></head><body>' + content + '</body></html>';
            html = await this.Base.htmlImageToBase64(process_loc, html);
            if (!html) {
                return Promise.resolve();
            }
            let user_json = await this.Base.sendGet(JianShu.user_url + one_json.user.slug).catch((err) => {
                Console.error(process_loc, '简书用户请求出错：' + err.message);
                return Promise.resolve();
            });

            if (!user_json) {
                Console.error(process_loc, JianShu.err_msg);
                return Promise.resolve();
            }

            if (!user_json.nickname) {
                user_json.nickname = '匿名用户';
            }
            if (this.Cin.save_db) {
                let user_db = await this.Base.addUser(process_loc, user_json.nickname, user_json.avatar, user_json.intro_compiled, user_json.following_users_count, user_json.followers_count);
                let article_data = await this.Base.addArticle(process_loc, title, html, user_db.id);
                let article_id = article_data.id;
                if (article_id) {
                    for (let i = 0; i < this.Base.comment_limit; ++i) {
                        let comment = await Db.getRandomComment(process_loc);
                        let user_data = await Db.getOneUser(process_loc);
                        let comment_userid = user_data?.id ?? 0;
                        await this.Base.addComment(process_loc, article_id, comment_userid, comment);
                    }
                }
            }
            if (this.Cin.save_file) {
                html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' + title + '</title></head><style>' + JianShu.css + '</style><body><h1>' + title + '</h1>' + content + '</body></html>';
                let tem_save_path = JianShu.path + title + '（' + user_json.nickname + '）.html';
                this.Base.writeToFile(process_loc, tem_save_path, html);
            }
            await Public.sleep(666);
            return Promise.resolve();
        }));
    }
}

module.exports = JianShu;