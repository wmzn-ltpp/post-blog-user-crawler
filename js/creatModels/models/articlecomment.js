const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articlecomment', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    articleid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "发表该评论的用户"
    },
    maincommentid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "主评论的评论id"
    },
    touserid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "被回复的用户"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    username: {
      type: DataTypes.STRING(26),
      allowNull: false,
      defaultValue: "未知用户"
    },
    tousername: {
      type: DataTypes.STRING(26),
      allowNull: false,
      defaultValue: "未知用户"
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'articlecomment',
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
        name: "blogid",
        using: "BTREE",
        fields: [
          { name: "articleid" },
        ]
      },
      {
        name: "userid",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "touserid",
        using: "BTREE",
        fields: [
          { name: "touserid" },
        ]
      },
      {
        name: "maincommentid",
        using: "BTREE",
        fields: [
          { name: "maincommentid" },
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
