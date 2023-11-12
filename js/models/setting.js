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
      type: DataTypes.BIGINT,
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
      allowNull: true,
      comment: "GPT接口"
    },
    chatgpt_keys: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "GPT KEYS"
    },
    classurl: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "课堂直播地址"
    },
    smtp: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "''"
    },
    smtpkey: {
      type: DataTypes.TEXT,
      allowNull: true,
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
      allowNull: true,
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
      allowNull: true,
      defaultValue: "''"
    },
    socketurl: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "''"
    },
    idemaxtime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    idemaxmemory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    usercloudfilememory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 50
    },
    GLOBfronturl: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "''",
      comment: "前端地址"
    },
    ssh_back_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "启动SSH服务器地址"
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
        name: "id",
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
