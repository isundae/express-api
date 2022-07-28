const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../upload'))
  },
  filename(req, file, cb) {
    let extname = path.extname(file.originalname)
    filename = file.fieldname + '-' + Date.now() + extname
    cb(null, filename)
    req.filename = filename
  }
})

module.exports = multer({ storage })
