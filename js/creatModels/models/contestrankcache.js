const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contestrankcache', {
    contestid: {
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
    json: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    },
    echarts: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "''"
    }
  }, {
    sequelize,
    tableName: 'contestrankcache',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "contestid" },
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
