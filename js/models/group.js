const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(26),
      allowNull: false
    },
    creatorid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    code: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "",
      comment: "加群验证码"
    },
    total: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    headimage: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'group',
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
        name: "group_name",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "userid",
        using: "BTREE",
        fields: [
          { name: "creatorid" },
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
        name: "jointime",
        using: "BTREE",
        fields: [
          { name: "time" },
        ]
      },
      {
        name: "creatorid",
        using: "BTREE",
        fields: [
          { name: "creatorid" },
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
      {
        name: "total",
        using: "BTREE",
        fields: [
          { name: "total" },
        ]
      },
    ]
  });
};
