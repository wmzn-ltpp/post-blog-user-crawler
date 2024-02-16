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
    total: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    headimage: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    code: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "",
      comment: "加群验证码"
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
        name: "creatorid",
        using: "BTREE",
        fields: [
          { name: "creatorid" },
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
