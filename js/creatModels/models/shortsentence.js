const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shortsentence', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    from: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: "无"
    },
    isdel: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    hitokoto: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'无'"
    }
  }, {
    sequelize,
    tableName: 'shortsentence',
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
        name: "isdel",
        using: "BTREE",
        fields: [
          { name: "isdel" },
        ]
      },
      {
        name: "from",
        using: "BTREE",
        fields: [
          { name: "from" },
        ]
      },
    ]
  });
};
