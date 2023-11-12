/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-11 19:42:10
 * @LastEditors: 18855190718 1491579574@qq.com
 * @LastEditTime: 2023-06-21 16:16:39
 * @FilePath: \post-blog-user-crawler\js\src\stack.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
process.env.NODE_ENV = 'production';
const v8 = require('v8');
const os = require('os');
const EventEmitter = require('events');
const emitter = new EventEmitter();
v8.setFlagsFromString(`--stack_size=${os.totalmem()}`);
emitter.setMaxListeners(0);