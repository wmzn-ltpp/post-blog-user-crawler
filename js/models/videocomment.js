const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('videocomment', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    videoid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    maincommentid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    touserid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    },
    tousername: {
      type: DataTypes.STRING(26),
      allowNull: false,
      defaultValue: "未知用户"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'videocomment',
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
        name: "videoid",
        using: "BTREE",
        fields: [
          { name: "videoid" },
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
