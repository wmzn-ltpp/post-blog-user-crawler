const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    name: {
      type: DataTypes.STRING(26),
      allowNull: false,
      defaultValue: "无",
      comment: "用户名"
    },
    online: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "是否在线"
    },
    acnum: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    grade: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "等级"
    },
    fans: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "粉丝数"
    },
    student_number: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "未知"
    },
    enrollment_year: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "入学年份"
    },
    school: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "未知",
      comment: "学校"
    },
    college: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "未知",
      comment: "学院"
    },
    subject: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "未知",
      comment: "专业"
    },
    class: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "未知",
      comment: "班级"
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "未知"
    },
    money: {
      type: DataTypes.DECIMAL(65,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    follow: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "关注数"
    },
    registertime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "注册时间"
    },
    lastlogin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "上次在线时间"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "''",
      comment: "密码"
    },
    headimage: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    bkimage: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "''"
    },
    sex: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "男"
    },
    mysay: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "''"
    },
    bkvideo: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "''"
    },
    musicuid: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    musiclovelistid: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    isusemusic: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    root_css: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''",
      comment: ":root中CSS变量"
    }
  }, {
    sequelize,
    tableName: 'user',
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
        name: "name",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "online",
        using: "BTREE",
        fields: [
          { name: "online" },
        ]
      },
      {
        name: "grade",
        using: "BTREE",
        fields: [
          { name: "grade" },
        ]
      },
      {
        name: "fans",
        using: "BTREE",
        fields: [
          { name: "fans" },
        ]
      },
      {
        name: "acnum",
        using: "BTREE",
        fields: [
          { name: "acnum" },
        ]
      },
      {
        name: "registertime",
        using: "BTREE",
        fields: [
          { name: "registertime" },
        ]
      },
      {
        name: "lastlogin",
        using: "BTREE",
        fields: [
          { name: "lastlogin" },
        ]
      },
      {
        name: "isdel",
        using: "BTREE",
        fields: [
          { name: "isdel" },
        ]
      },
      {
        name: "student_number",
        using: "BTREE",
        fields: [
          { name: "student_number" },
        ]
      },
      {
        name: "enrollment_year",
        using: "BTREE",
        fields: [
          { name: "enrollment_year" },
        ]
      },
      {
        name: "school",
        using: "BTREE",
        fields: [
          { name: "school" },
        ]
      },
      {
        name: "subject",
        using: "BTREE",
        fields: [
          { name: "subject" },
        ]
      },
      {
        name: "class",
        using: "BTREE",
        fields: [
          { name: "class" },
        ]
      },
      {
        name: "email",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "sex",
        using: "BTREE",
        fields: [
          { name: "sex" },
        ]
      },
      {
        name: "money",
        using: "BTREE",
        fields: [
          { name: "money" },
        ]
      },
      {
        name: "college",
        using: "BTREE",
        fields: [
          { name: "college" },
        ]
      },
      {
        name: "follow",
        using: "BTREE",
        fields: [
          { name: "follow" },
        ]
      },
    ]
  });
};
