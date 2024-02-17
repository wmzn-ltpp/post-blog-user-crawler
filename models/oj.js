const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oj', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    public: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    problemName: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "无"
    },
    problemLabe: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "算法"
    },
    createrid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    problemFrom: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "LTPP"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    problemContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    },
    problemCinTest: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    },
    problemCoutTest: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    },
    ACNum: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    ALLSubmitNum: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    Time: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1000
    },
    Memory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 128
    },
    ACpoint: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1
    },
    think: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'",
      comment: "解题思路"
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'",
      comment: "AC的C++代码"
    }
  }, {
    sequelize,
    tableName: 'oj',
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
        name: "problemName",
        using: "BTREE",
        fields: [
          { name: "problemName" },
        ]
      },
      {
        name: "problemLabe",
        using: "BTREE",
        fields: [
          { name: "problemLabe" },
        ]
      },
      {
        name: "problemFrom",
        using: "BTREE",
        fields: [
          { name: "problemFrom" },
        ]
      },
      {
        name: "public",
        using: "BTREE",
        fields: [
          { name: "public" },
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
