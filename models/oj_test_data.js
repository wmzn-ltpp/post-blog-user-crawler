const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oj_test_data', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    test_in: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    test_out: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    }
  }, {
    sequelize,
    tableName: 'oj_test_data',
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
        name: "problem_id",
        using: "BTREE",
        fields: [
          { name: "problem_id" },
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
