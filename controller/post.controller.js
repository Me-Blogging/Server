const Post = require('../model/post.model')

exports.CreatePost = async (req, res) => {
  try {
    const {title, content, picture, category, tags, status} = req.body
    const newPost = new Post({
      title,
      content,
      picture,
      category,
      tags,
      status
    }) 
    await newPost.save()
  } catch (error) {
    throw error
  }
}

exports.UpdatePost = async (req, res) => {
  try {
    
  } catch (error) {
    throw error
  }
}

exports.DraftPost = async (req, res) => {
  try {
    
  } catch (error) {
    throw error
  }
}

exports.SchedulePost = async (req, res) => {
  try {
    
  } catch (error) {
    throw error
  }
}

exports.DeletePost = async (req, res) => {
  try {
    
  } catch (error) {
    throw error
  }

}
