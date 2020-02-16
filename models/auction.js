module.exports = (sequelize, DataTypes) => (
    sequelize.define('auction', {
      bid: { // 입찰가
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      msg: { // 입찰 시 메시지
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );