const { User } = require('../model')
const jwt = require('../util/jwt')

// 注册
exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body.user)
    res.status(200).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

// 登录
exports.login = async (req, res, next) => {
  try {
    // 处理请求
    // 得到用户信息[mongosse数据对象 转换成 json数据对象]
    const { user } = req
    // 生成token
    const token = await jwt.sign(
      {
        id: user._id
      },
      // 设置token过期时间，单位为秒
      req.app.get('secret'),
      {
        expiresIn: 60 * 60 * 24
      }
    )
    // 移除密码属性
    delete user.password
    // 发送成功响应（包含token的用户信息）
    res.status(200).json({
      ...user,
      token
    })
  } catch (err) {
    next(err)
  }
}

// 获取登录用户信息
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

// 更新用户信息
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.user.id, req.body.user, {
      new: true
    })
    user = user.toJSON() // 将mongoose对象转换成普通对象
    delete user.password // 删除敏感数据
    res.status(200).json({
      user
    })
  } catch (err) {
    next(err)
  }
}
