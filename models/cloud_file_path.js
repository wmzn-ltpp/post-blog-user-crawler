const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cloud_file_path', {
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
    path: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "无",
      unique: "path_2"
    },
    name: {
      type: DataTypes.STRING(535),
      allowNull: false,
      defaultValue: "无"
    },
    file_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      unique: "file_id_2"
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
    size: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'cloud_file_path',
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
        name: "file_id_2",
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
        name: "userid",
        using: "BTREE",
        fields: [
          { name: "userid" },
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
        name: "file_id",
        using: "BTREE",
        fields: [
          { name: "file_id" },
        ]
      },
      {
        name: "name",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
