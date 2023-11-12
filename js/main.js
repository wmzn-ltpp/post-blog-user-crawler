/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-06 15:58:39
 * @LastEditors: SQS 1491579574@qq.com
 * @LastEditTime: 2023-05-14 06:26:51
 * @FilePath: \post-blog-user-crawler\js\main.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const { fork } = require('child_process');
const process = require('process');
const Cin = require('./src/cin');
const Console = require('./src/console');
const Db = require('./src/db');
const Public = require('./src/public');
require('./src/stack');
process.setMaxListeners(0);
let process_list = [];
(async function () {
    process.on('uncaughtException', (error) => {
        Console.error(0, '未捕获异常：' + error.message);
    });
    new Cin();
    await Cin.scanf(0).then(() => { });
    process.on('SIGINT', () => {
        Console.error(0, '主进程收到退出信号，已通知子进程退出');
        try {
            process_list.forEach((child) => {
                child.worker.kill('SIGINT');
            });
            Console.error(0, '主进程已退出');
            process.exit(0);
        } catch (err) {
            Console.error(process_loc, err.message);
        }
    });
    let db = new Db(0, Cin);
    if (Cin.save_db) {
        await db._connectDb();
        await db.init();
    }
    let i = 1;
    for (let i = 1; i <= Cin.num; ++i) {
        creatProcess(i);
    }
    while (1) {
        if (process_list.length < Cin.num) {
            creatProcess(i++);
            Console.log(process_loc, '当前进程个数小于' + Cin.num + '已创建新进程');
        }
        await Public.sleep(666);
    }
})();

function creatProcess(process_loc) {
    processData(process_loc);
}

function processData(process_loc) {
    let worker = fork(__dirname + '/process.js');
    Console.log(process_loc, `第${process_loc}个进程已成功创建`);
    process_list.push({
        process_loc: process_loc,
        worker: worker
    });
    worker.send({
        process_loc: process_loc,
        operator: Cin.operator,
        save_file: Cin.save_db,
        save_db: Cin.save_file,
        user_list: Db.user_list,
        image_list: Db.image_list,
        shortsentence_list: Db.shortsentence_list
    });

    worker.on('message', (msg) => {
        Console.log(process_loc, msg);
    });

    worker.on('error', () => {
        Console.error(process_loc, '进程创建失败');
    });

    worker.on('exit', (code) => {
        process_list.splice(process_list.indexOf({
            process_loc: process_loc,
            worker: worker
        }), 1);
        if (code === 200) {
            Console.error(process_loc, '进程退出成功');
        } else {
            Console.error(process_loc, '进程异常退出');
            Console.error(process_loc, '进程重启中');
            processData(process_loc);
            Console.error(process_loc, '进程重启完成');
        }
    });
}