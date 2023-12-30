/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-06 16:26:41
 * @LastEditors: wmzn-ltpp 1491579574@qq.com
 * @LastEditTime: 2023-12-30 21:31:11
 * @FilePath: \post-blog-user-crawler\js\src\csdn.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const fs = require('fs');
const Console = require('./console');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Public = require('./public');
require('./stack');

class CSDN {
    /**
     * 文章数据列表
     */
    static url = 'https://blog.csdn.net/api/articles?type=more&category=home';

    /**
     * 文章保存本地路径
     */
    static path = '/CSDN/';

    static css = '';

    static err_msg = 'CSDN请求出错';

    static cookie = '';

    constructor(process_loc, Base, Cin) {
        this.Base = Base;
        this.Cin = Cin;
        fs.readFile(__dirname + '/public/csdn.css', (err, data) => {
            if (err) {
                throw err;
            }
            CSDN.css = data.toString();
        });
        Console.log(process_loc, '【CSDN】CSS文件已读入');
        Console.log(process_loc, '【CSDN】初始化完成');
    }

    async bug(process_loc) {
        this.Base.creatDir(process_loc, CSDN.path);

        let data = await this.Base.sendGet(CSDN.url, {}, {
            Cookie: CSDN.cookie
        }).catch((err) => {
            Console.error(process_loc, 'CSDN首页请求出错：' + err.message);
            return;
        });

        if (!data) {
            Console.error(process_loc, CSDN.err_msg);
            return;
        }

        if (!data || !data.articles) {
            Console.error(process_loc, CSDN.err_msg);
            return;
        }

        let list = data.articles;
        await Promise.all(Array.from(list).map(async (t) => {
            if (!t.url) {
                return Promise.resolve();
            }
            let one_blog_url = t.url;
            let title = t.title;
            let user = t.nickname ? t.nickname : '匿名用户';
            let result = null;
            result = await this.Base.sendGet(one_blog_url, {}, {
                Cookie: CSDN.cookie
            }).catch((err) => {
                Console.error(process_loc, 'CSDN文章请求出错：' + err.message);
                return Promise.resolve();
            });

            if (!result) {
                Console.error(process_loc, CSDN.err_msg);
                return Promise.resolve();
            }

            const document = new JSDOM(result).window.document;
            // 获取指定ID的元素
            let element = document.getElementById('content_views');
            let html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' + title + '</title></head><style>' + CSDN.css + '</style><body>' + '<h1>' + title + '</h1>' + element?.innerHTML + '</body></html>';
            html = await this.Base.htmlImageToBase64(process_loc, html);
            if (html && this.Cin.save_file) {
                let tem_save_path = CSDN.path + title + '（' + user + '）.html';
                this.Base.writeToFile(process_loc, tem_save_path, html);
            }
            await Public.sleep(666);
            return Promise.resolve();
        }));
    }
}

module.exports = CSDN;