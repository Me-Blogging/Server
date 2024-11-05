const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const {Upload} = require('../middleware/multer')

const {
  CreatePost,
  GetPosts,
  UpdatePost,
  DraftPost,
  SchedulePost,
  DeletePost
} = require('../controller/post.controller')

router.post('/createpost', Upload, CreatePost)
router.get('/getposts', GetPosts)
router.patch('/updatepost/:id', UpdatePost)


module.exports = router