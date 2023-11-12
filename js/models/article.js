const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      comment: "博客标题"
    },
    isdel: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    public: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: "是否可见"
    },
    writerid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    problemid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    writer: {
      type: DataTypes.STRING(26),
      allowNull: true,
      defaultValue: "匿名用户",
      comment: "作者"
    },
    fabulous: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: "赞"
    },
    collection: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: "收藏"
    },
    releasetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "编写时间"
    },
    lastchangetime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "上次修改时间"
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "图片url"
    },
    article: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "博客内容"
    }
  }, {
    sequelize,
    tableName: 'article',
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
        name: "blogname",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "writerid",
        using: "BTREE",
        fields: [
          { name: "writerid" },
        ]
      },
      {
        name: "writer",
        using: "BTREE",
        fields: [
          { name: "writer" },
        ]
      },
      {
        name: "ispublic",
        using: "BTREE",
        fields: [
          { name: "public" },
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
        name: "fabulous",
        using: "BTREE",
        fields: [
          { name: "fabulous" },
        ]
      },
      {
        name: "collection",
        using: "BTREE",
        fields: [
          { name: "collection" },
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
        name: "problemid",
        using: "BTREE",
        fields: [
          { name: "problemid" },
        ]
      },
    ]
  });
};
