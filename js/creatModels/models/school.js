const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('school', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "学校名称"
    },
    code: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "学校标识码"
    },
    department: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "主管部门"
    },
    place: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "所在地"
    },
    type: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "办学层次（本科）"
    },
    isdel: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'school',
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
        name: "code",
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "department",
        using: "BTREE",
        fields: [
          { name: "department" },
        ]
      },
      {
        name: "place",
        using: "BTREE",
        fields: [
          { name: "place" },
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
    ]
  });
};
