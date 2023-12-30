<?php
/*
 * @Author: 18855190718 1491579574@qq.com
 * @Date: 2023-03-29 14:26:42
 * @LastEditors: 18855190718 1491579574@qq.com
 * @LastEditTime: 2023-06-20 12:08:14
 * @FilePath: \post-blog-user-crawler\php\main.php
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/console.php';
require __DIR__ . '/src/cin.php';
require __DIR__ . '/src/csdn.php';
require __DIR__ . '/src/zhihu.php';
require __DIR__ . '/src/jianshu.php';
require __DIR__ . '/src/base.php';
require __DIR__ . '/myprocess.php';

use log\Console;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');
$arguments = $argv;
if (isset($arguments[1])) {
    if ($arguments[1] == Base::$child_key) {
        Base::$is_child = true;
    }
}

function windowsRun()
{
    if (Base::$is_child) {
        Console::log(-1, '进程已运行', null, 'green');
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
                Console::log(-1, '开始爬取' . Base::$tips[Cin::$do[$i]] . '数据', null, 'yellow');
                $do[Cin::$do[$i]](-1);
            }
        }
    } else {
        for ($i = 0; $i < Cin::$process_num; ++$i) {
            Console::log(-1, '进程' . ($i + 1) . '开始创建', null, 'green');
            proc_open('php ' . __DIR__ . '/main.php child', [
                0 => ['pipe', 'r'],
                1 => STDOUT,
                2 => STDERR,
            ], $pipes);
            Console::log(-1, '进程' . ($i + 1) . '已创建', null, 'green');
        }
        while (1) {
        }
    }
}

function linuxRun()
{
    $workers = [];
    $cnt = 0;
    while (Cin::$process_num - $cnt > 0) {
        try {
            $process = new Swoole\Process(function () use ($cnt) {
                Console::log($cnt, '进程创建成功', null, 'green');
                $my_process = new Myprocess();
                $my_process->run($cnt);
            }, false, false);
            $process->signal(SIGTERM, function () use ($cnt) {
                try {
                    Console::log($cnt, '子进程已退出', null, 'red');
                    exit();
                } catch (Exception $e) {
                    Console::log($cnt, $e->getMessage(), null, 'red');
                }
            });
            $process->start();
        } catch (Exception $e) {
            Console::log($cnt, '进程创建失败', null, 'red');
            continue;
        }
        $workers[] = $process;
        ++$cnt;
    }
    // 等待所有子进程退出
    foreach ($workers as $process) {
        try {
            $process->wait();
        } catch (Exception $e) {
            Console::log($cnt, $e->getMessage(), null, 'red');
            continue;
        }
    }
    Swoole\Event::wait();
    while (1) {
        sleep(1);
    }
}


(function () {
    new Cin(-1);
    new Base(-1);
    new ZhiHu(-1);
    new CSDN(-1);
    new JianShu(-1);
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        Console::log(-1, '当前处于Windows环境', null, 'green');
        windowsRun();
    } else if (strtoupper(PHP_OS) === 'LINUX') {
        Console::log(-1, '当前处于Linux环境', null, 'green');
        linuxRun();
    } else if (strtoupper(PHP_OS) === 'DARWIN') {
        Console::log(-1, '当前处于MacOS环境', null, 'green');
        linuxRun();
    }
})();
