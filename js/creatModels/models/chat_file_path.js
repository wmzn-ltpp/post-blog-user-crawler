const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_file_path', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    post_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    get_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    path: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "未知",
      unique: "path_2"
    },
    file_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      unique: "file_id"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "无"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    size: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'chat_file_path',
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
        name: "path_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "path" },
        ]
      },
      {
        name: "file_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "file_id" },
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
        name: "post_user_id",
        using: "BTREE",
        fields: [
          { name: "post_user_id" },
        ]
      },
      {
        name: "get_user_id",
        using: "BTREE",
        fields: [
          { name: "get_user_id" },
        ]
      },
      {
        name: "path",
        using: "BTREE",
        fields: [
          { name: "path" },
        ]
      },
      {
        name: "file_id_2",
        using: "BTREE",
        fields: [
          { name: "file_id" },
        ]
      },
    ]
  });
};
