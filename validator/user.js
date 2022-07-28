const validate = require('../middleware/validate')
const { User } = require('../model')
const { body } = require('express-validator')
const md5 = require('../util/md5')

exports.register = validate([
  // 1. 配置验证规则
  body('user.username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .custom(async (username) => {
      // 查询数据库查看数据是否存在
      const user = await User.findOne({ username })
      if (user) return Promise.reject('用户已存在')
    }),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail() // 如果错误就不向下执行
    .custom(async (email) => {
      // 查询数据库查看数据是否存在
      const user = await User.findOne({ email })
      if (user) return Promise.reject('邮箱已存在')
    })
])

exports.login = [
  validate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        'email',
        'password',
        'username'
      ])
      // 查询数据库查看数据是否存在
      if (!user) return Promise.reject('用户不存在')

      // 将数据挂载到请求对象中，后续的中间件也可以直接使用，就不需要重复查询了
      req.user = user.toJSON()
    })
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) return Promise.reject('密码错误')
    })
  ])
]

exports.update = validate([
  body('user.email').isEmail().withMessage('邮箱格式不正确')
])
