<?php
use log\Console;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');
class ZhiHu
{
    // 设置请求头信息
    static $headers = array(
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Referer: https://www.zhihu.com/',
        'X-Requested-With: XMLHttpRequest',
    );

    // 构建请求URL
    static $url = 'https://www.zhihu.com/api/v3/feed/topstory/recommend';

    static $page = 0;

    static $css = '';

    /**
     * 文章保存本地路径
     */
    static $path = '/ZhiHu/';

    public function __construct($process_loc)
    {
        ZhiHu::$page = 0;
        if (Cin::$save_file) {
            ZhiHu::$css = @file_get_contents(__DIR__ . '/public/zhihu.css');
            Console::log($process_loc, '【知乎】CSS文件已读入', null, 'green');

        }
        Console::log($process_loc, '【知乎】初始化完成', null, 'green');
    }

    static public function bug($process_loc)
    {
        if (Cin::$save_file && !file_exists(ZhiHu::$path)) {
            @mkdir(ZhiHu::$path, 0777, true);
            Console::log($process_loc, '已创建【知乎】存储文件夹（文件夹路径：' . ZhiHu::$path . '）', null, 'red');
        }

        $params = [
            'session_token' => '',
            'desktop' => 'true',
            'page_number' => ZhiHu::$page++,
            'limit' => '6',
            'action' => 'down',
            'after_id' => '0',
        ];
        $url = ZhiHu::$url . '?' . http_build_query($params);
        // 发送GET请求获取知乎首页列表
        $response = Base::sendRequest($process_loc, $url);
        try {
            // 解析返回的JSON数据
            $data = @json_decode($response, false);
        } catch (Exception $e) {
            Console::log($process_loc, '出错【' . $e->getMessage() . '】', null, 'red');
            return;
        }
        if (!$data || !isset($data->data) || !$data->data) {
            Console::error($process_loc);
            return;
        }
        $data = $data->data;
        foreach ($data as &$t) {
            if (!$t || !isset($t->target)) {
                Console::error($process_loc);
                continue;
            }
            $tem = $t->target;
            $question = null;
            if (
                !isset($tem->question) ||
                !isset($tem->question->title) ||
                !$tem->question ||
                !$tem->question->title ||
                !isset($tem->question->author) ||
                !$tem->question->author ||
                !isset($tem->question->author->name) ||
                !$tem->question->author->name ||
                !isset($tem->author) ||
                !$tem->author ||
                !isset($tem->author->name) ||
                !$tem->author->name ||
                !isset($tem->content) ||
                !$tem->content
            ) {

                Console::log($process_loc, '出错【' . date('Y-m-d H:i:s', time()) . '】', null, 'red');

                continue;
            }

            $post_user_db = Base::addUser($process_loc, $tem->question->author->name, $tem->question->author->avatar_url);
            $ans_user_db = Base::addUser($process_loc, $tem->author->name, $tem->author->avatar_url);

            $post_user_id = $post_user_db->id;
            $ans_user_id = $ans_user_db->id;

            $question = $tem->question->title;
            $ans = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' . $question . '</title></head><body>' . $tem->content . '</body></html>';

            if (strlen($tem->content) <= 100) {
                Console::log($process_loc, '回答过短，已跳过【' . date('Y-m-d H:i:s', time()) . '】', null, 'yellow');
                continue;
            }
            if (Cin::$save_file) {
                Base::htmlImageToBase64($process_loc, $ans);
            }
            if (!$ans) {
                continue;
            }
            $ishas = Base::judgeIsExists('question', 'name', $question);
            if ($ishas) {
                Console::log($process_loc, '问题在数据库中已存在，已跳过【' . $question . '】', null, 'yellow');
            } else {
                $question_id = Base::addQuestion($process_loc, $question, $post_user_id);
                if ($question_id) {
                    Base::addAnswer($process_loc, $question_id, $ans_user_id, $ans);
                }
                $article_id = Base::addArticle($process_loc, $question, $ans, $ans_user_id);
                if ($article_id) {
                    for ($i = 0; $i < Base::$comment_num; ++$i) {
                        $comment = Base::getOneComment();
                        Base::addComment($process_loc, $article_id, Base::getOneUser()->id, $comment);
                    }
                    Base::addComment($process_loc, $article_id, $post_user_id, Base::getOneComment());
                }
            }

            if (Cin::$save_file) {
                $tem_save_path = ZhiHu::$path . $question . '（' . $tem->author->name . '）.html';
                Base::writeToFile($process_loc, $tem_save_path, $ans);
            }
            Console::log($process_loc, $question, null, 'green');
        }
    }
}