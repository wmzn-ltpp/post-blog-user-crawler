<?php
/*
 * @Author: 18855190718 1491579574@qq.com
 * @Date: 2023-04-07 19:59:02
 * @LastEditors: SQS 1491579574@qq.com
 * @LastEditTime: 2023-05-11 14:33:06
 * @FilePath: \post-blog-user-crawler\php\src\console.php
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
namespace log;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');

class Console
{
    static public function log($process_loc, $msg, $color = null, $bgColor = null)
    {
        if ($process_loc >= 0) {
            ++$process_loc;
        }
        $time = '|' . date('Y-m-d H:i:s', time()) . '|';
        $colors = array(
            'black' => "\033[0;30m",
            'red' => "\033[0;31m",
            'green' => "\033[0;32m",
            'yellow' => "\033[0;33m",
            'blue' => "\033[0;34m",
            'purple' => "\033[0;35m",
            'cyan' => "\033[0;36m",
            'white' => "\033[0;37m"
        );
        $bgColors = array(
            'black' => "\033[40m",
            'red' => "\033[41m",
            'green' => "\033[42m",
            'yellow' => "\033[43m",
            'blue' => "\033[44m",
            'purple' => "\033[45m",
            'cyan' => "\033[46m",
            'white' => "\033[47m"
        );
        $reset = "\033[0m";
        $output = '';
        $res = '';
        if ($bgColor !== null && isset($bgColors[$bgColor])) {
            $output .= $bgColors[$bgColor];
        }
        if ($color !== null && isset($colors[$color])) {
            $output .= $colors[$color];
        }
        $time = $bgColors['cyan'] . $time . $reset;
        $res .= $time;
        if ($process_loc >= 0) {
            $thread_msg = '【第' . $process_loc . '个子进程】';
        } else {
            $thread_msg = '【主进程】';
        }
        $thread_msg = $bgColors['blue'] . $thread_msg . $reset;
        $res .= $thread_msg;
        $output .= $msg . $reset;
        $res .= $output . "\n";
        echo $res;
    }

    /**
     * 错误
     */
    static public function error($process_loc)
    {
        Console::log($process_loc, '出错【' . date('Y-m-d H:i:s', time()) . '】', null, 'red');
    }
}