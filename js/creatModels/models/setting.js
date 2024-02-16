const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('setting', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    canregister: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "开放注册"
    },
    canlogin: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "开放登录"
    },
    offline: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "是否是内网服务器"
    },
    useqqmail: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "是否使用QQ邮件服务器"
    },
    useemail: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "登录邮箱发送邮件"
    },
    chatgpt_api_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "GPT接口"
    },
    chatgpt_keys: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "GPT KEYS"
    },
    classurl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "课堂直播地址"
    },
    smtp: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    smtpkey: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    mysmtpurl: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "",
      comment: "个人邮件服务器地址"
    },
    mysmtpname: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "",
      comment: "个人邮件服务器账号"
    },
    mysmtppassword: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "",
      comment: "个人邮件服务器密码"
    },
    GLOBlinuxurl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    GLOBiplimit: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 60
    },
    GLOBiplimitTime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 60
    },
    GLOBipblack: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 666666
    },
    musicbkurl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    socketurl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    idemaxtime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 4000
    },
    idemaxmemory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1024
    },
    usercloudfilememory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 50
    },
    GLOBfronturl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "前端地址"
    },
    ssh_back_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "启动SSH服务器地址"
    },
    default_contest_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "竞赛默认内容描述"
    },
    default_contest_duration: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 7200,
      comment: "竞赛默认持续时间（单位秒）"
    },
    default_contest_begin_time: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "竞赛默认开始时间（当天零点开始的秒数）"
    },
    default_contest_problem_num: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
      comment: "竞赛默认题目数目"
    },
    default_contest_min_people_num: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 2000,
      comment: "竞赛默认最小参赛人数"
    },
    default_contest_max_people_num: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 4000,
      comment: "竞赛默认最大参赛人数"
    },
    douyin_listcollection_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "抖音收藏地址"
    },
    douyin_cookie: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "抖音cookie"
    },
    douyin_save_limit: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1000,
      comment: "抖音爬取最大保存条数"
    },
    douyin_save_file: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "是否保存抖音视频到本地"
    },
    douyin_noupdate_limit_seconds: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1800,
      comment: "抖音视频最大未更新秒数限制"
    },
    default_contest_submit_sleep_time: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 666,
      comment: "竞赛提交默认最大间隔休眠毫秒数"
    },
    cloud_file_readme_txt_file_name: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "无",
      comment: "云盘默认文件名称"
    },
    cloud_file_readme_txt: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'",
      comment: "云盘必读文件"
    },
    ltpp_win_download_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "Windows客户端安装地址"
    },
    ltpp_mac_download_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "Mac客户端安装地址"
    },
    ltpp_apk_download_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: "安卓客户端安装地址"
    }
  }, {
    sequelize,
    tableName: 'setting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "isdel",
        using: "BTREE",
        fields: [
          { name: "isdel" },
        ]
      },
    ]
  });
};
