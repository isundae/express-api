module.exports = (str) =>
  require('crypto')
    .createHash('md5')
    .update('sun' + str)
    .digest('hex')
