const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('codehistory', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    language: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: "C++"
    },
    status: {
      type: DataTypes.STRING(26),
      allowNull: true,
      defaultValue: "答案错误"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    usetime: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "0"
    },
    usememory: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "0"
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    problemid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    contestid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'codehistory',
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
        name: "userid",
        using: "BTREE",
        fields: [
          { name: "userid" },
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
        name: "problemid",
        using: "BTREE",
        fields: [
          { name: "problemid" },
        ]
      },
      {
        name: "contestid",
        using: "BTREE",
        fields: [
          { name: "contestid" },
        ]
      },
      {
        name: "status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "language",
        using: "BTREE",
        fields: [
          { name: "language" },
        ]
      },
      {
        name: "time",
        using: "BTREE",
        fields: [
          { name: "time" },
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
