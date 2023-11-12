/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-06 16:26:41
 * @LastEditors: SQS 1491579574@qq.com
 * @LastEditTime: 2023-05-14 06:12:36
 * @FilePath: \post-blog-user-crawler\js\process.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const process = require('process');
const Base = require('./src/base');
const CSDN = require('./src/csdn');
const JianShu = require('./src/jianshu');
const ZhiHu = require('./src/zhihu');
const Console = require('./src/console');
const Db = require('./src/db');
const Public = require('./src/public');
require('./src/stack');
process.setMaxListeners(0);
let begin = false;
let process_loc = 0;
let base = null;
let zhihu = null;
let csdn = null;
let jianshu = null;

(async function () {
    process.on('SIGINT', () => {
        Console.error(process_loc, '进程主动尝试退出');
        try {
            process.exit(200);
        } catch (err) {
            Console.error(process_loc, err.message);
        }
    });
    process.on('uncaughtException', (error) => {
        Console.error(process_loc, '未捕获异常：' + error.message);
        Console.error(process_loc, '进程主动尝试退出');
        try {
            process.exit(1);
        } catch (err) {
            Console.error(process_loc, err.message);
        }
    });
    process.on('message', (obj) => {
        process_loc = obj.process_loc;
        let cin = {
            operator: obj.operator,
            save_file: obj.save_db,
            save_db: obj.save_file,
        };
        Db.user_list = obj.user_list;
        Db.image_list = obj.image_list;
        Db.shortsentence_list = obj.shortsentence_list;
        process.send(`第${process_loc}个进程已开始运行`);
        run(cin);
    });
})();

async function run(cin) {
    if (begin) {
        return;
    }
    begin = true;
    base = new Base(process_loc, cin);
    if (cin.save_db) {
        await base.Db._connectDb();
    }

    zhihu = new ZhiHu(process_loc, base, cin);
    csdn = new CSDN(process_loc, base, cin);
    jianshu = new JianShu(process_loc, base, cin);

    let has_func = {
        1: () => zhihu.bug(process_loc),
        2: () => csdn.bug(process_loc),
        3: () => jianshu.bug(process_loc)
    }
    setInterval(() => {
        base.Db.updateUserOnline();
    }, 600000);
    while (1) {
        for (let i = 0; i < cin.operator.length; ++i) {
            let t = cin.operator[i];
            Console.log(process_loc, '【开始爬取】' + Base.tips[parseInt(t)]);
            try {
                await has_func[parseInt(t)]();
            } catch (err) {
                Console.error(process_loc, '主程序执行' + Base.tips[parseInt(t)] + '出错：' + err.message);
            }
            await Public.sleep(666);
        }
    }
}