const multer = require('multer')
const upload = multer({dest : '../uploads/'})

exports.Upload = (req, res, next) => {
  upload.single('avatar')
  next()
}