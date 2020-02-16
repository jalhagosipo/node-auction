const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Good = require('./good')(sequelize, Sequelize);
db.Auction = require('./auction')(sequelize, Sequelize);


// 사용자가 여러상품등록가능, 여러상품 낙찰가능
// 등록 > 상품모델에 ownerId로 컬럼이 추가됨
db.Good.belongsTo(db.User, { as: 'owner' });
// 낙찰 > 상품모델에 soldId로 컬럼이 추가됨
db.Good.belongsTo(db.User, { as: 'sold' });
// 사용자가 입찰을 여러번 할 수 있으므로 일대다
db.User.hasMany(db.Auction);
// 한 상품에 여러명이 입찰하므로 상품모델과 경매모델도 일대다
db.Good.hasMany(db.Auction);
db.Auction.belongsTo(db.User);
db.Auction.belongsTo(db.Good);

module.exports = db;