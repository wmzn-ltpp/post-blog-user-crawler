<?php

use log\Console;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');

class Cin
{
    /**
     * 操作
     */
    static $do = '123';

    /**
     * 是否保存本地文件
     */
    static $save_file = true;

    /**
     * 开多少个进程
     */
    static $process_num = 4;

    /**
     * @param int $process_loc
     * @param bool $is_win
     */
    public function __construct($process_loc)
    {
        if (Base::$is_child) {
            return;
        }
        Cin::doMenu($process_loc);
        Cin::$do = trim(fgets(STDIN));
        while (!Cin::judgeDoSafe(Cin::$do)) {
            Cin::doMenu($process_loc);
            Cin::$do = trim(fgets(STDIN));
        }
        if (strripos(Cin::$do, '1') !== false || strripos(Cin::$do, '3') !== false) {
            Cin::saveMenu($process_loc);
            Cin::$save_file = trim(fgets(STDIN));
            while (!Cin::judgeSaveSafe(Cin::$save_file)) {
                Cin::saveMenu($process_loc);
                Cin::$save_file = trim(fgets(STDIN));
            }
            Cin::$save_file = Cin::$save_file == '1' ? true : false;
        } else {
            Cin::$save_file = false;
        }
        if (strtoupper(PHP_OS) === 'LINUX' || strtoupper(PHP_OS) === 'DARWIN') {
            Cin::threadMenu($process_loc);
            Cin::$process_num = trim(fgets(STDIN));
            while (!Cin::judgeThreadNumSafe(Cin::$process_num)) {
                Cin::threadMenu($process_loc);
                Cin::$process_num = trim(fgets(STDIN));
            }
        }
    }

    /**
     * 操作菜单
     */
    static private function doMenu($process_loc)
    {
        Console::log($process_loc, '请输入需要执行的操作对应的序号：', null, 'red');

        Console::log($process_loc, '1.爬取知乎', null, 'green');

        Console::log($process_loc, '2.爬取CSDN', null, 'green');

        Console::log($process_loc, '3.爬取简书', null, 'green');
    }

    /**
     * 保存菜单
     */
    static private function saveMenu($process_loc)
    {
        Console::log($process_loc, '请选择是否需要保存文件到本地？', null, 'red');

        Console::log($process_loc, '1.保存', null, 'green');

        Console::log($process_loc, '2.不保存', null, 'green');
    }

    /**
     * 进程菜单
     */
    static private function threadMenu($process_loc)
    {
        Console::log($process_loc, '请输入开启多少个进程？', null, 'red');
    }


    /**
     * 操作输入合法性判断
     * @param string $str
     * @return bool $res
     */
    static private function judgeDoSafe($str)
    {
        if (!$str) {
            return true;
        }
        $len = strlen($str);
        for ($i = 0; $i < $len; ++$i) {
            if ($str[$i] < '1' || $str[$i] > '3') {
                return false;
            }
        }
        return true;
    }

    /**
     * 保存输入合法性判断
     */
    static private function judgeSaveSafe($str)
    {
        if (!$str) {
            return true;
        }
        $len = strlen($str);
        for ($i = 0; $i < $len; ++$i) {
            if ($str[$i] < '1' || $str[$i] > '2') {
                return false;
            }
        }
        return true;
    }

    /**
     * 进程输入合法性判断
     */
    static private function judgeThreadNumSafe($str)
    {
        return is_numeric($str);
    }
}
