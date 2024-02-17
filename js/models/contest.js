const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contest', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "无"
    },
    begin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    createrid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    creater: {
      type: DataTypes.STRING(26),
      allowNull: false,
      defaultValue: "root"
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "ACM",
      comment: "比赛类型"
    },
    allpeople: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "参赛人数"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    }
  }, {
    sequelize,
    tableName: 'contest',
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
        name: "type",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "allpeople",
        using: "BTREE",
        fields: [
          { name: "allpeople" },
        ]
      },
      {
        name: "begin",
        using: "BTREE",
        fields: [
          { name: "begin" },
        ]
      },
      {
        name: "end",
        using: "BTREE",
        fields: [
          { name: "end" },
        ]
      },
      {
        name: "creater",
        using: "BTREE",
        fields: [
          { name: "creater" },
        ]
      },
      {
        name: "createrid",
        using: "BTREE",
        fields: [
          { name: "createrid" },
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
