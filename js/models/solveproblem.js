const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solveproblem', {
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
    problemid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    language: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: "C++"
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
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    }
  }, {
    sequelize,
    tableName: 'solveproblem',
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
        name: "userid",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "problemid",
        using: "BTREE",
        fields: [
          { name: "problemid" },
        ]
      },
      {
        name: "language",
        using: "BTREE",
        fields: [
          { name: "language" },
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
