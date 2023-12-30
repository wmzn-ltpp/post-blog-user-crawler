<?php

use log\Console;
use Illuminate\Database\Capsule\Manager as Db;

error_reporting(E_ERROR);
ini_set('display_errors', 'Off');

$mysql = new Db;

class Base
{
    /**
     * 关闭ssl验证
     */
    static $options = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ],
        'http' => [
            'timeout' => 8
        ]
    ];

    /**
     * 是否是子进程（仅适用于Win）
     */
    static $is_child = false;

    /**
     * 命令行读取参数，判断是否是子进程（仅适用于Win）
     */
    static $child_key = 'child';

    /**
     * 评论
     */

    static $comment_list = [];

    /**
     * 用户
     */

    static $user_list = [];

    /**
     * 图片
     */

    static $image_list = [];

    /**
     * 映射菜单
     */
    static $tips = [
        '1' => '知乎',
        '2' => 'CSDN',
        '3' => '简书'
    ];

    /**
     * 评论数目
     */
    static $comment_num = 6;

    /**
     * 数据库插入用户信息
     */
    static $user_data = [
        'name' => '',
        'acnum' => 0,
        'grade' => 0,
        'fans' => 0,
        'password' => '',
        'student_number' => '无',
        'enrollment_year' => 0,
        'school' => '无',
        'college' => '无',
        'subject' => '无',
        'class' => '无',
        'email' => '2133103246@qq.com',
        'money' => 0,
        'headimage' => '',
        'bkimage' => '',
        'sex' => '男',
        'follow' => 0,
        'mysay' => '',
        'bkvideo' => '',
        'musicuid' => 0,
        'musiclovelistid' => 0,
        'isusemusic' => 1,
        'registertime' => '2023-03-17 02:20:05',
        'lastlogin' => '2023-03-17 02:20:05',
    ];

    /**
     * 数据库插入文章信息
     */
    static $article_data = [
        'writerid' => 0,
        'problemid' => 0,
        'public' => 1,
        'name' => '',
        'writer' => '',
        'fabulous' => 66,
        'collection' => 66,
        'releasetime' => '2023-03-17 02:20:05',
        'lastchangetime' => '2023-03-17 02:20:05',
        'image' => '',
        'article' => ''
    ];

    /**
     * 数据库插入问题信息
     */
    static $question_data = [
        'name' => '',
        'userid' => 0,
        'question' => '',
        'answer_num' => 0,
        'time' => '2023-03-17 02:20:05'
    ];

    /**
     * 数据库插入答案信息
     */
    static $answer_data = [
        'questionid' => 0,
        'mainanswerid' => 0,
        'userid' => 0,
        'touserid' => 0,
        'answer' => '',
        'time' => '2023-03-17 02:20:05'
    ];

    /**
     * 数据库插入评论信息
     */
    static $comment_data = [
        'articleid' => 0,
        'userid' => 0,
        'maincommentid' => 0,
        'touserid' => 0,
        'username' => '',
        'tousername' => '',
        'text' => '',
        'time' => '2023-03-17 02:20:05',
    ];

    /**
     * docker中ip使用host.docker.internal
     */
    public function __construct($process_loc)
    {
        global $mysql;
        Console::log($process_loc, '【Base】初始化完成', null, 'green');
        try {
            $mysql->addConnection([
                'driver' => 'mysql',
                'host' => '127.0.0.1',
                'port' => 3306,
                'database' => '',
                'username' => '',
                'password' => '',
                'unix_socket' => '',
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
                'prefix' => '',
                'strict' => true,
                'engine' => null,
                'options' => [
                    PDO::ATTR_PERSISTENT => true,
                    PDO::ATTR_TIMEOUT => 10,
                ],
            ]);
            $mysql->setAsGlobal();
            $mysql->bootEloquent();
            Console::log($process_loc, '数据库连接成功', null, 'green');
            Base::initComment();
            Console::log($process_loc, '评论拉取完成', null, 'green');
            Base::initUser();
            Console::log($process_loc, '用户拉取完成', null, 'green');
            Base::initImage();
            Console::log($process_loc, '图片拉取完成', null, 'green');
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
            Console::log($process_loc, '数据库连接失败', null, 'green');
            exit(0);
        }
    }

    /**
     * 添加用户返回数据库该用户信息
     * @param string $name 用户名
     * @param string $headimage 用户头像
     * @param string $mysay 个性签名
     * @param int $follow 关注数目
     * @param int $fans 粉丝数目
     */
    static public function addUser($process_loc, $name, $headimage, $mysay = '', $follow = 0, $fans = 0)
    {
        if (!$mysay) {
            $mysay = Base::getOneComment();
        }
        if (!$name) {
            $name = '匿名用户';
        }
        Base::$user_data['name'] = mb_substr($name, 0, 26);
        Base::$user_data['headimage'] = $headimage;
        Base::$user_data['follow'] = $follow;
        Base::$user_data['mysay'] = $mysay;
        Base::$user_data['fans'] = max(0, $fans);
        Base::$user_data['password'] = md5(time() * rand(1, 100));
        Base::$user_data['sex'] = rand(1, 100) % 2 ? '男' : '女';
        Base::$user_data['registertime'] = date('Y-m-d H:i:s', time() - rand(10000000, 10000000));
        Base::$user_data['lastlogin'] = date('Y-m-d H:i:s', time() - rand(10, 1000));
        try {
            $db = Db::table('user')
                ->where('name', Base::$user_data['name'])
                ->first();
            if ($db) {
                Console::log($process_loc, '用户【' . $name . '】已存在，不进行用户插入', null, 'yellow');
                return $db;
            }
            $id = Db::table('user')
                ->insertGetId(Base::$user_data);
            $db = Db::table('user')
                ->where('id', $id)
                ->first();
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
            return [];
        }
        Console::log($process_loc, '用户【' . $name . '】插入成功', null, 'green');
        return $db;
    }

    /**
     * 添加文章
     * @param string $title 文章标题
     * @param string $content 文章内容
     * @param string $writerid 发布者ID
     * @return int $id 插入后的ID
     */
    static public function addArticle($process_loc, $title, $content, $writerid)
    {
        try {
            $db = Db::table('user')
                ->where('id', $writerid)
                ->first();
        } catch (Exception $e) {
            return 0;
        }
        if (!$db) {
            Console::log($process_loc, '文章作者不存在，不进行文章插入', null, 'yellow');
            return 0;
        }

        $name = $db->name;
        Base::$article_data['name'] = mb_substr($title, 0, 191);
        Base::$article_data['writerid'] = $writerid;
        Base::$article_data['problemid'] = 0;
        Base::$article_data['public'] = 1;
        Base::$article_data['name'] = $title;
        Base::$article_data['writer'] = $name;
        Base::$article_data['fabulous'] = rand(10, 10000);
        Base::$article_data['collection'] = rand(10, 10000);
        Base::$article_data['releasetime'] = date('Y-m-d H:i:s', time());
        Base::$article_data['lastchangetime'] = date('Y-m-d H:i:s', time());
        Base::$article_data['image'] = Base::randImage();
        Base::$article_data['article'] = $content;
        try {
            $has = Db::table('article')
                ->where('name', Base::$article_data['name'])
                ->exists();
            if ($has) {
                Console::log($process_loc, '文章【' . Base::$article_data['name'] . '】已存在，不进行文章插入', null, 'yellow');
                return 0;
            }
            $id = Db::table('article')
                ->insertGetId(Base::$article_data);
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
            return 0;
        }
        Console::log($process_loc, '文章【' . Base::$article_data['name'] . '】插入成功', null, 'green');
        return $id;
    }

    /**
     * 添加问题
     * @param string $title 问题内容
     * @param string $writerid 发布者ID
     * @return int $id 插入后的ID
     */
    static public function addQuestion($process_loc, $question, $writerid)
    {
        Base::$question_data['name'] = mb_substr($question, 0, 191);
        Base::$question_data['userid'] = $writerid;
        Base::$question_data['question'] = $question;
        Base::$question_data['answer_num'] = 0;
        Base::$question_data['time'] = date('Y-m-d H:i:s', time());
        try {
            $db = Db::table('question')
                ->where('name', Base::$question_data['name'])
                ->first();
            if ($db) {
                Console::log($process_loc, '问题【' . Base::$question_data['name'] . '】已存在，不进行问题插入', null, 'yellow');
                return $db->id;
            }
            $id = Db::table('question')
                ->insertGetId(Base::$question_data);
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
            return 0;
        }
        Console::log($process_loc, '问题【' . Base::$question_data['name'] . '】插入成功', null, 'green');
        return $id;
    }

    /**
     * 添加回答
     * @param int $question_id 问题ID
     * @param int $userid 用户ID
     * @return string $answer 回答内容
     */
    static public function addAnswer($process_loc, $question_id, $userid, $answer)
    {
        try {
            $user_db = Db::table('user')
                ->where('id', $userid)
                ->first();
            if (!$user_db) {
                Console::log($process_loc, '问题作者不存在，不进行回答插入', null, 'yellow');
                return 0;
            }
            $db = Db::table('question')
                ->where('id', $question_id)
                ->first();
            if (!$db) {
                Console::log($process_loc, '问题不存在，不进行问题插入', null, 'yellow');
                return 0;
            }
            $name = $db->name;
            Base::$answer_data['questionid'] = $question_id;
            Base::$answer_data['mainanswerid'] = 0;
            Base::$answer_data['userid'] = $userid;
            Base::$answer_data['touserid'] = 0;
            Base::$answer_data['answer'] = $answer;
            Base::$answer_data['time'] = date('Y-m-d H:i:s', time());
            $id = Db::table('answer')
                ->insertGetId(Base::$answer_data);
            Db::table('question')
                ->where('id', $question_id)
                ->increment('answer_num', 1);
            Base::addNotice($process_loc, 0, $question_id, $user_db->name);
            Console::log($process_loc, '问题【' . $name . '】的回答插入成功', null, 'green');
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
            return 0;
        }
        return $id;
    }

    /**
     * 添加主评论
     * @param int $article_id 文章ID
     * @param int $userid 用户ID
     * @return string $comment 评论内容
     */
    static public function addComment($process_loc, $article_id, $userid, $comment)
    {
        try {
            $user_db = Db::table('user')
                ->where('id', $userid)
                ->first();
            if (!$user_db) {
                Console::log($process_loc, '文章作者不存在，不进行评论插入', null, 'yellow');
                return 0;
            }
            $article_db = Db::table('article')
                ->where('id', $article_id)
                ->first();
            if (!$article_db) {
                Console::log($process_loc, '文章不存在，不进行评论插入', null, 'yellow');
                return 0;
            }

            Base::$comment_data['articleid'] = $article_id;
            Base::$comment_data['userid'] = $userid;
            Base::$comment_data['maincommentid'] = 0;
            Base::$comment_data['touserid'] = 0;
            Base::$comment_data['username'] = $user_db->name;
            Base::$comment_data['tousername'] = '';
            Base::$comment_data['text'] = Base::getOneComment();
            Base::$comment_data['time'] = date('Y-m-d H:i:s', time());
            $id = Db::table('articlecomment')
                ->insertGetId(Base::$comment_data);
            Console::log($process_loc, '文章【' . $article_db->name . '】的评论【' . Base::$comment_data['text'] . '】插入成功', null, 'green');
            if ($userid != $article_db->writerid) {
                Base::addNotice($process_loc, $article_id, 0, $user_db->name);
            }
            return $id;
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
            return 0;
        }
    }

    /**
     * 添加通知
     * @param int $article_id 文章ID
     * @param int $question_id 问题ID
     * @param string $name 消息中的用户名
     */
    static public function addNotice($process_loc, $article_id, $question_id, $name)
    {
        if ($article_id) {
            try {
                $article_db = Db::table('article')
                    ->where('id', $article_id)
                    ->first();
                if (!$article_id) {
                    Console::log($process_loc, '文章不存在，不进行评论通知插入', null, 'yellow');

                    return 0;
                }
                Db::table('usernotice')
                    ->insert([
                        'userid' => $article_db->writerid,
                        'articleid' => $article_id,
                        'questionid' => $question_id,
                        'videoid' => 0,
                        'fanuserid' => 0,
                        'notice' => $name . '在《' . $article_db->name . '》中评论了你',
                        'time' => date('Y-m-d H:i:s', time())
                    ]);
                Console::log($process_loc, '文章【' . $article_db->name . '】的评论通知【' . $name . '在《' . $article_db->name . '》中评论了你' . '】插入成功', null, 'green');
            } catch (Exception $e) {
                Console::log($process_loc, $e->getMessage(), null, 'red');
                return;
            }
        } else if ($question_id) {
            try {
                $question_db = Db::table('question')
                    ->where('id', $question_id)
                    ->first();
                if ($question_id) {
                    Console::log($process_loc, '问题不存在，不进行回答通知插入', null, 'yellow');
                    return 0;
                }
                Db::table('usernotice')
                    ->insert([
                        'userid' => $question_db->userid,
                        'articleid' => $article_id,
                        'questionid' => $question_id,
                        'videoid' => 0,
                        'fanuserid' => 0,
                        'notice' => $name . '在《' . $question_db->name . '》中回答了你',
                        'time' => date('Y-m-d H:i:s', time())
                    ]);
                Console::log($process_loc, '问题【' . $question_db->name . '】的回答通知【' . $name . '在《' . $question_db->name . '》中回答了你' . '】插入成功', null, 'green');
            } catch (Exception $e) {
                Console::log($process_loc, $e->getMessage(), null, 'red');
                return;
            }
        } else {
            Console::log($process_loc, '不合法通知类型，不进行插入', null, 'yellow');
        }
    }

    /**
     * 初始化评论
     */
    static public function initComment()
    {
        try {
            Base::$comment_list = Db::table('shortsentence')
                ->where('isdel', 0)
                ->get()
                ->toArray();
        } catch (Exception $e) {
            return;
        }
    }

    /**
     * 获取随机评论
     * @return string $comment
     */
    static public function getOneComment()
    {
        $len = sizeof(Base::$comment_list);
        if ($len > 0) {
            $loc = rand(0, $len - 1);
            return Base::$comment_list[$loc]->hitokoto . '————' . Base::$comment_list[$loc]->from;
        }
        return date('Y-m-d H:i:s');
    }

    /**
     * 初始化用户
     */
    static public function initUser()
    {
        try {
            $num = 1000;
            Base::$user_list = Db::table('user')
                ->where('isdel', 0)
                ->where('email', '2133103246@qq.com')
                ->orderBy('id', 'asc')
                ->limit($num)
                ->get()
                ->toArray();
        } catch (Exception $e) {
            return;
        }
    }

    /**
     * 获取随机用户
     */
    static public function getOneUser()
    {
        $len = sizeof(Base::$user_list);
        if ($len > 0) {
            $loc = rand(0, $len - 1);
            return Base::$user_list[$loc];
        }
        return null;
    }

    /**
     * 初始化图片
     */
    static public function initImage()
    {
        try {
            Base::$image_list = Db::table('image')
                ->where('isdel', 0)
                ->get()
                ->toArray();
        } catch (Exception $e) {
            return;
        }
    }

    /**
     * 随机图片
     * @return string $url
     */
    static public function randImage()
    {
        $len = sizeof(Base::$image_list);
        if ($len > 0) {
            $loc = rand(0, $len - 1);
            return Base::$image_list[$loc]->url;
        }
        return '';
    }

    /**
     * 根据图片url获取base64
     * @param string $src 图片地址
     * @return string $base64 base64编码后的图片
     */
    static public function getImgBase64($process_loc, $src)
    {
        try {
            $tem_image = @file_get_contents($src, false, stream_context_create(Base::$options));
            if (!$tem_image) {
                $tem_image = '';
            }
            $base64 = @base64_encode($tem_image);
            return $base64;
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
        return '';
    }

    /**
     * 根据名称判断内容是否存在
     */
    static public function judgeIsExists($db, $key, $name)
    {
        $res = false;
        try {
            $res = Db::table($db)
                ->where($key, mb_substr($name, 0, 191))
                ->exists();
        } catch (Exception $e) {
            return false;
        }
        return $res;
    }

    /**
     * HTML图片替换
     * @param int $process_loc 进程序号
     * @param string $html HTML
     */
    static public function htmlImageToBase64($process_loc, &$html)
    {
        try {
            $dom = new DOMDocument();
            @$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            $xpath = new DOMXPath($dom);
            $images = $xpath->query('//img');
            // 遍历 img 标签，替换其中的 URL
            foreach ($images as $image) {
                $src = $image->getAttribute('src');
                $dataURI = 'data:image/jpeg;base64,' . Base::getImgBase64($process_loc, $src);
                $image->setAttribute('src', $dataURI);
            }
            $html = @html_entity_decode($dom->saveHTML(), ENT_QUOTES, 'UTF-8');
        } catch (Exception $e) {
            $html = '';
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
        if (!$html) {
            $html = '';
            Console::error($process_loc);
        }
    }

    /**
     * 写HTML到文件
     * @param int $process_loc 进程序号
     * @param string $save_path 文件保存路径
     * @param string $html HTML
     */
    static public function writeToFile($process_loc, $save_path, $html)
    {
        if (file_exists($save_path)) {
            Console::log($process_loc, '文件存在，已跳过【' . $save_path . '】', null, 'yellow');
        }
        try {
            @file_put_contents($save_path, $html);
        } catch (Exception $e) {
            if (file_exists($save_path)) {
                @unlink($save_path);
            }
            Console::log($process_loc, '创建文件出错，已跳过【' . $save_path . '】', null, 'red');
        }
        Console::log($process_loc, '文件保存成功，保存路径：' . $save_path, null, 'green');
    }

    /**
     *  发送请求
     */
    static public function sendRequest($process_loc, $url)
    {
        try {
            return file_get_contents($url, false, stream_context_create(Base::$options));
        } catch (Exception $e) {
            Console::log($process_loc, $e->getMessage(), null, 'red');
        }
        return null;
    }
}
