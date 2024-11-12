const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const {Upload} = require('../middleware/multer')

const {
  CreatePost,
  GetPosts,
  GetPost,
  UpdatePost,
  DraftPost,
  SchedulePost,
  DeletePost,
  GetPublishedPosts,
} = require('../controller/post.controller')

router.post('/createpost', Upload, CreatePost)
router.get('/getposts', GetPosts)
router.get('/getpublishedposts', GetPublishedPosts)
router.get('/getpost/:id', GetPost)
router.patch('/updatepost/:id', UpdatePost)


module.exports = router