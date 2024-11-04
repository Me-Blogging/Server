const express = require('express')
const router = express.Router()

const {
  CreatePost,
  UpdatePost,
  DraftPost,
  SchedulePost,
  DeletePost
} = require('../controller/post.controller')

router.post('/createpost', CreatePost)

module.exports = router