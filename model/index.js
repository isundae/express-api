const mongoose = require('mongoose')
const { dbURI } = require('../config/config.default')

mongoose
  .connect(dbURI)
  .then(() => console.log('数据库连接成功！'))
  .catch((err) => console.log('数据库连接失败！' + err))

exports.User = mongoose.model('User', require('./user'))
