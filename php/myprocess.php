<?php
/*
 * @Author: 18855190718 1491579574@qq.com
 * @Date: 2023-04-05 12:35:29
 * @LastEditors: SQS 1491579574@qq.com
 * @LastEditTime: 2023-05-11 14:23:23
 * @FilePath: \post-blog-user-crawler\php\myprocess.php
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

use log\Console;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');

class Myprocess
{
    /**
     * 多进程运行
     * @return never
     */
    public function run($process_loc)
    {
        Console::log($process_loc, '进程已运行', null, 'green');
        $do = [
            '1' => function ($process_loc) {
                ZhiHu::bug($process_loc);
            },
            '2' => function ($process_loc) {
                CSDN::bug($process_loc);
            },
            '3' => function ($process_loc) {
                JianShu::bug($process_loc);
            }
        ];
        $len = strlen(Cin::$do);
        while (1) {
            for ($i = 0; $i < $len; ++$i) {
                Console::log($process_loc, '开始爬取' . Base::$tips[Cin::$do[$i]] . '数据', null, 'yellow');
                $do[Cin::$do[$i]]($process_loc);
                sleep(6);
            }
        }
    }
}
