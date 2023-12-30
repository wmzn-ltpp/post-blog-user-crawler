<?php

use log\Console;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');

class CSDN
{
    /**
     * 文章数据列表
     */
    static $url = 'https://blog.csdn.net/api/articles?type=more&category=home&shown_offset=';

    static $offset = 0;

    /**
     * 文章保存本地路径
     */
    static $path = '/CSDN/';

    static $css = '';

    public function __construct($process_loc)
    {
        try {
            CSDN::$offset = 0;
            CSDN::$css = @file_get_contents(__DIR__ . '/public/csdn.css');
            Console::log($process_loc, '【CSDN】CSS文件已读入', null, 'green');
            Console::log($process_loc, '【CSDN】初始化完成', null, 'green');
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
    }

    static public function bug($process_loc)
    {
        try {
            if (!file_exists(CSDN::$path)) {
                @mkdir(CSDN::$path, 0777, true);
                Console::log($process_loc, '已创建【CSDN】存储文件夹（文件夹路径：' . CSDN::$path . '）', null, 'red');
            }

            $result = Base::sendRequest($process_loc, CSDN::$url . CSDN::$offset++);

            if (!$result) {
                Console::error($process_loc);
                return;
            }

            $data = @json_decode($result);
            if (!$data || !isset($data->articles)) {
                Console::error($process_loc);
                return;
            }
            $list = $data->articles;

            foreach ($list as &$t) {
                if (!isset($t->url)) {
                    continue;
                }
                $one_blog_url = $t->url;
                $title = $t->title;
                $user = $t->nickname ? $t->nickname : '匿名用户';
                $result = null;

                $result = Base::sendRequest($process_loc, $one_blog_url);
                if (!$result) {
                    Console::error($process_loc);
                    return;
                }

                // 解析HTML数据
                $dom = new DOMDocument();
                try {
                    @$dom->loadHTML($result);
                } catch (Exception $e) {
                    Console::log($process_loc, $e->getMessage(), null, 'red');
                    continue;
                }

                // 获取指定ID的元素
                $element = $dom->getElementById('content_views');
                // 输出元素内容
                $content = $dom->saveXML($element);
                $html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' . $title . '</title></head><body>' . '<h1>' . $title . '</h1>' . $content . '</body></html>';
                Base::htmlImageToBase64($process_loc, $html);
                if (!$html) {
                    continue;
                }
                $ishas = Base::judgeIsExists('article', 'name', $title);
                if ($ishas) {
                    Console::log($process_loc, '文章在数据库中已存在，已跳过【' . $title . '】', null, 'yellow');
                } else {
                    $article_id = Base::addArticle($process_loc, $title, $html, Base::getOneUser()->id);
                    if ($article_id) {
                        for ($i = 0; $i < Base::$comment_num; ++$i) {
                            Base::addComment($process_loc, $article_id, Base::getOneUser()->id, Base::getOneComment());
                        }
                    }
                }
                if (Cin::$save_file) {
                    $html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' . $title . '</title></head><style>' . CSDN::$css . '</style><body>' . '<h1>' . $title . '</h1>' . $content . '</body></html>';
                    $tem_save_path = CSDN::$path . $title . '（' . $user . '）.html';
                    Base::writeToFile($process_loc, $tem_save_path, $html);
                }
            }
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
    }
}
