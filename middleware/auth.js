const assert = require('http-assert')
const { verify } = require('../util/jwt')
const { User } = require('../model')

module.exports = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop()
    assert(token, 401, '请先登录') // 没有token
    const { id } = await verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录') // token 解析失败
    req.user = await User.findById(id)
    assert(req.user, 401, '请先登录') // 查不到用户
    await next() // 将用户信息挂载到req请求对象上，继续往后执行
  } catch (err) {
    next(err)
  }
}
