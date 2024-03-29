const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goods', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "名称"
    },
    type: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: ""
    },
    size: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "0 MB",
      comment: "文件大小"
    },
    money: {
      type: DataTypes.DECIMAL(65,16),
      allowNull: false,
      defaultValue: 0.0000000000000000,
      comment: "价格"
    },
    times: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "下载次数"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'",
      comment: "内容路径"
    },
    blurb: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'",
      comment: "简介"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'goods',
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
        name: "money",
        using: "BTREE",
        fields: [
          { name: "money" },
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
        name: "times",
        using: "BTREE",
        fields: [
          { name: "times" },
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
        name: "size",
        using: "BTREE",
        fields: [
          { name: "size" },
        ]
      },
    ]
  });
};
