const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('video', {
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
    isdouyin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
      comment: "是否是抖音视频"
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fabulous: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    love: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'video',
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
        name: "tag",
        using: "BTREE",
        fields: [
          { name: "tag" },
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
        name: "love",
        using: "BTREE",
        fields: [
          { name: "love" },
        ]
      },
      {
        name: "fabulous",
        using: "BTREE",
        fields: [
          { name: "fabulous" },
        ]
      },
      {
        name: "time",
        using: "BTREE",
        fields: [
          { name: "time" },
        ]
      },
    ]
  });
};
