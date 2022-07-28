const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000 // 端口号

// 日志
app.use(require('morgan')('dev'))

// 跨域
app.use(require('cors')())

// 挂载jwt密钥
app.set('secret', require('./config/config.default').jwtSecret)

// 处理POST请求
app.use(express.json())

// 设置静态资源文件夹
app.use(express.static(path.join(__dirname + 'public')))

// 文件上传
app.post(
  '/upload',
  require('./middleware/upload').single('file'),
  require('./controller/upload').upload
)

// 用户相关路由
app.use('/api', require('./router'))

// 全局路由404错误中间件
app.use(require('./middleware/404')())

// 全局异常处理中间件
app.use(require('./middleware/error')())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
