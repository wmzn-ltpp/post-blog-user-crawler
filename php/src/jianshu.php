<?php
/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-06 13:50:53
 * @LastEditors: 18855190718 1491579574@qq.com
 * @LastEditTime: 2023-08-15 22:35:12
 * @FilePath: \post-blog-user-crawler\php\src\jianshu.php
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

use log\Console;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');

class JianShu
{
    /**
     * 最新的文章数据列表
     */
    static $url = 'https://www.jianshu.com/asimov/trending/now';

    /**
     * 具体文章详情
     */
    static $one_url = 'https://www.jianshu.com/asimov/p/';

    /**
     * 具体用户详情
     */
    static $user_url = 'https://www.jianshu.com/asimov/users/slug/';

    /**
     * 文章保存本地路径
     */
    static $path = '/JianShu/';

    static $css = '';

    public function __construct($process_loc)
    {
        try {
            if (Cin::$save_file) {
                JianShu::$css = @file_get_contents(__DIR__ . '/public/jianshu.css');
                Console::log($process_loc, '【简书】CSS文件已读入', null, 'green');
            }
            Console::log($process_loc, '【简书】初始化完成', null, 'green');
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
    }

    static public function bug($process_loc)
    {
        try {
            if (Cin::$save_file && !file_exists(JianShu::$path)) {
                @mkdir(JianShu::$path, 0777, true);
                Console::log($process_loc, '已创建【简书】存储文件夹（文件夹路径：' . JianShu::$path . '）', null, 'red');
            }

            $list = Base::sendRequest($process_loc, JianShu::$url);
            if (!$list) {
                Console::error($process_loc);
                return;
            }
            $list = @json_decode($list);
            if (!$list) {
                Console::error($process_loc);
                return;
            }
            foreach ($list as &$t) {
                if (!isset($t->object)) {
                    Console::error($process_loc);
                    continue;
                }
                $t = $t->object;
                if (!isset($t->data)) {
                    Console::error($process_loc);
                    continue;
                }
                try {
                    $one_json = Base::sendRequest($process_loc, JianShu::$one_url . $t->data->slug);
                } catch (Exception $e) {
                    Console::log($process_loc, $e->getMessage(), null, 'red');
                    continue;
                }
                if (!$one_json) {
                    Console::error($process_loc);
                    continue;
                }
                $one_json = @json_decode($one_json);
                if (!$one_json || !isset($one_json->public_title) || !isset($one_json->free_content)) {
                    Console::error($process_loc);
                    continue;
                }
                $title = $one_json->public_title;
                $content = $one_json->free_content;
                if (!$title || !$content) {
                    Console::error($process_loc);
                    continue;
                }
                $content = str_replace('data-original-src="', 'src="https:', $content);
                $content = str_replace('padding-bottom:', '', $content);
                $html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' . $title . '</title></head><body>' . $content . '</body></html>';

                Base::htmlImageToBase64($process_loc, $html);
                if (!$html) {
                    continue;
                }

                $user_json = Base::sendRequest($process_loc, JianShu::$user_url . $one_json->user->slug);

                if (!$user_json) {
                    Console::error($process_loc);
                    continue;
                }
                $user_json = @json_decode($user_json);
                if (!$user_json->nickname) {
                    $user_json->nickname = '匿名用户';
                }
                $user_db = Base::addUser($process_loc, $user_json->nickname, $user_json->avatar, $user_json->intro_compiled, $user_json->following_users_count, $user_json->followers_count);
                $ishas = Base::judgeIsExists('article', 'name', $title);
                if ($ishas) {
                    Console::log($process_loc, '文章在数据库中已存在，已跳过【' . $title . '】', null, 'yellow');
                } else {
                    $article_id = Base::addArticle($process_loc, $title, $html, $user_db->id);
                    if ($article_id) {
                        for ($i = 0; $i < Base::$comment_num; ++$i) {
                            Base::addComment($process_loc, $article_id, Base::getOneUser()->id, Base::getOneComment());
                        }
                    }
                }
                if (Cin::$save_file) {
                    $html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' . $title . '</title></head><style>' . JianShu::$css . '</style><body><h1>' . $title . '</h1>' . $content . '</body></html>';
                    $tem_save_path = JianShu::$path . $title . '（' . $user_json->nickname . '）.html';
                    Base::writeToFile($process_loc, $tem_save_path, $html);
                }
                Console::log($process_loc, $title, null, 'green');
            }
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
    }
}
