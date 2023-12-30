/*
 * @Author: 18855190718 1491579574@qq.com
 * @Date: 2023-06-13 21:40:51
 * @LastEditors: wmzn-ltpp 1491579574@qq.com
 * @LastEditTime: 2023-11-12 19:04:57
 * @FilePath: \post-blog-user-crawler\js\creatModels\sequelizeAuto.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by SQS, All Rights Reserved. 
 */
const SequelizeAuto = require('sequelize-auto');
const Console = require('../src/console');
const auto_db = new SequelizeAuto('ltpp', 'root', 'SQS', {
    host: 'ltpp.vip',
    port: 44466,
    dialect: 'mysql',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    logging: false,
    timestamps: true,
});
Console.log(0, '数据库连接成功！');
Console.log(0, '开始生成模型！');
auto_db.run().then(() => {
    Console.log(0, '模型生成完成！');
}).catch((err) => {
    console.log(err);
});