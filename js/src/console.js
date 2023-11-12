/*
 * @Author: 18855190718 1491579574@qq.com
 * @Date: 2023-06-13 21:40:51
 * @LastEditors: 18855190718 1491579574@qq.com
 * @LastEditTime: 2023-06-21 16:15:30
 * @FilePath: \post-blog-user-crawler\js\src\console.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
require('./stack');
const color = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',

    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};

class Console {
    static log(process_loc = 0, msg, mycolor = 'BgGreen') {
        let now = new Date();
        let res = color.BgCyan + color.FgWhite + '【' + now + '】';
        let thread_msg = process_loc && process_loc > 0 ? ('【第' + process_loc + '个进程】') : '【主进程】';
        res += color.BgBlue + color.FgWhite + thread_msg;
        res += color[mycolor] + color.FgWhite + msg + color.Reset;
        console.log(res);
    }

    static error(process_loc = 0, msg = '') {
        let now = new Date();
        let res = color.BgCyan + color.FgWhite + '【' + now + '】';
        let thread_msg = process_loc && process_loc > 0 ? ('【第' + process_loc + '个进程】') : '【主进程】';
        res += color.BgBlue + color.FgWhite + thread_msg;
        res += color.BgRed + color.FgWhite + msg + color.Reset;
        console.log(res);
    }

    static warn(process_loc = 0, msg = '') {
        let now = new Date();
        let res = color.BgCyan + color.FgWhite + '【' + now + '】';
        let thread_msg = process_loc && process_loc > 0 ? ('【第' + process_loc + '个进程】') : '【主进程】';
        res += color.BgBlue + color.FgWhite + thread_msg;
        res += color.BgYellow + color.FgWhite + msg + color.Reset;
        console.log(res);
    }
}

module.exports = Console;
