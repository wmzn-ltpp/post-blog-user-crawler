/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-06 16:26:41
 * @LastEditors: 18855190718 1491579574@qq.com
 * @LastEditTime: 2023-10-11 18:07:48
 * @FilePath: \post-blog-user-crawler\js\src\cin.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const readline = require('readline');
const Console = require('./console');
const Base = require('./base');
require('./stack');

class Cin {
    static num = 0;
    static operator = '';
    static save_file = false;
    static save_db = true;
    static begin = false;

    constructor() {
        Cin.menu(0);
    }

    static menu(process_loc) {
        Console.log(process_loc, '【爬虫列表】');
        Console.log(process_loc, '1.爬取知乎');
        Console.log(process_loc, '2.爬取CSDN');
        Console.log(process_loc, '3.爬取简书');
        Console.log(process_loc, '请依次输入执行的【操作的序号】，【线程数目】，【是否保存数据库（Y/y/N/n）】，【是否保存到本地文件（Y/y/N/n）】（各项之间使用空格分割）：');
    }

    static isNumber(value) {
        return !isNaN(Number(value));
    }

    static scanf(process_loc) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve) => {
            rl.on('line', (line) => {
                if (!Cin.begin) {
                    let list = line.trim().split(' ');
                    if (list.length < 4) {
                        list[0] = list.hasOwnProperty(0) && list[0] ? list[0] : '13';
                        list[1] = list.hasOwnProperty(1) && list[1] ? list[1] : '16';
                        list[2] = list.hasOwnProperty(2) && list[2] ? list[2] : 'y';
                        list[3] = list.hasOwnProperty(3) && list[3] ? list[3] : 'n';
                    }
                    for (let i = 0; i < list.length; ++i) {
                        for (let j = 0; j < list[i].length; ++j) {
                            if (!i && Base.tips[list[i][j]]) {
                                Cin.operator += list[i][j];
                            } else if (i == 1 && Cin.isNumber(list[i][j])) {
                                Cin.num = Cin.num * 10 + Number(list[i][j]);
                            }
                        }
                    };
                    if (list[2] == 'y' || list[2] == 'Y') {
                        Cin.save_db = true;
                        Console.log(process_loc, '【已选择保存到数据库】');
                    } else {
                        Cin.save_db = false;
                        Console.log(process_loc, '【已选择不保存到数据库】');
                    }
                    if (list[3] == 'y' || list[3] == 'Y') {
                        Cin.save_file = true;
                        Console.log(process_loc, '【已选择保存到本地文件】');
                    } else {
                        Cin.save_file = false;
                        Console.log(process_loc, '【已选择不保存到本地文件】');
                    }
                    const set = new Set(Cin.operator);
                    Cin.operator = [...set].join('');
                    Cin.begin = true;
                }
                resolve('end');
            });
        });
    }
}

module.exports = Cin;