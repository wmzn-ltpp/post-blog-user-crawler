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
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(26),
      allowNull: false,
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
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "",
      comment: "密码"
    },
    student_number: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "0"
    },
    enrollment_year: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: "入学年份"
    },
    school: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "无",
      comment: "学校"
    },
    college: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "无",
      comment: "学院"
    },
    subject: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "无",
      comment: "专业"
    },
    class: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "无",
      comment: "班级"
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "1491579574@qq.com"
    },
    money: {
      type: DataTypes.DECIMAL(65,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    headimage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bkimage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: "男"
    },
    follow: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "关注数"
    },
    mysay: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bkvideo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    musicuid: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "'0'"
    },
    musiclovelistid: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "'0'"
    },
    isusemusic: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1
    },
    registertime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "注册时间"
    },
    lastlogin: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "上次登录时间"
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
        name: "id",
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
        name: "college",
        using: "BTREE",
        fields: [
          { name: "college" },
        ]
      },
      {
        name: "sex",
        using: "BTREE",
        fields: [
          { name: "sex" },
        ]
      },
    ]
  });
};
