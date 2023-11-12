const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ssh', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    isdel: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      unique: "userid"
    },
    port: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      unique: "port"
    },
    buy_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "'\\'ltpp\\''"
    }
  }, {
    sequelize,
    tableName: 'ssh',
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
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "port",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "port" },
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
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "buy_time",
        using: "BTREE",
        fields: [
          { name: "buy_time" },
        ]
      },
    ]
  });
};
