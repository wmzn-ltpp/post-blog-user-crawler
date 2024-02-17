const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('video', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    isdouyin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
      comment: "是否是抖音视频"
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "无"
    },
    tag: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "无"
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
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
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
        name: "isdouyin",
        using: "BTREE",
        fields: [
          { name: "isdouyin" },
        ]
      },
    ]
  });
};
