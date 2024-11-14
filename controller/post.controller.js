const Post = require('../model/post.model')
const fs = require('fs')
const path = require('path')
const sanitizeHtml = require('sanitize-html');
const markdownIt = require('markdown-it')();
const { marked } = require('marked');

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

exports.CreatePost = async (req, res) => {
  try {
    const { title, content, picture, category, tags, status } = req.body
    const sanitizedContent = sanitizeHtml(content) // Sanitize the markdown content
    const newPost = new Post({
      title,
      content: sanitizedContent,
      picture: req.file ? req.file.path : null,
      category,
      tags,
      status: status || 'draft',
      date: Date.now()
    })
    await newPost.save()
    res.json({ saved: newPost })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).send({ error: 'Failed to create post' })
  }
}


exports.GetPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    const formattedPosts = await Promise.all(
      posts.map(async post => {
        const filePath = post.picture ? post.picture.replace(/\\/g, "/") : null;
        const fileData = filePath ? await fs.promises.readFile(filePath) : null;
        return {
          ...post.toObject(),
          file: fileData ? `data:${path.extname(filePath).slice(1)};base64,${fileData.toString('base64')}` : null,
          date: formatDate(post.date)
        };
      })
    )
    res.status(200).send(formattedPosts)
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send({ error: 'Failed to retrieve posts' });
  }
}

exports.GetPublishedPosts = async (req, res) => {
  try {
    const publishedPosts = await Post.find({ status: "published" })
    if (!publishedPosts) return res.status(404).send("No published post")

    const formattedPublishedPosts = await Promise.all(
      publishedPosts.map(async post => {
        const filePath = post.picture ? post.picture.replace(/\\/g, "/") : null;
        const fileData = filePath ? await fs.promises.readFile(filePath) : null;
        return {
          ...post.toObject(),
          file: fileData ? `data:${path.extname(filePath).slice(1)};base64,${fileData.toString('base64')}` : null,
          date: formatDate(post.date),
          htmlContent: marked(post.content)
        };
      })
    )
    res.status(200).send(formattedPublishedPosts)
  } catch (error) {
    console.error('Error fetching published posts:', error);
    res.status(500).send({ error: 'Failed to retrieve posts' });
  }
}

exports.GetPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    const formattedPost = {
      ...post.toObject(),
      date: formatDate(post.date),
      htmlContent: marked(post.content) // markdown to HTML
    };

    if (post.picture) {
      const filePath = post.picture.replace(/\\/g, "/");
      try {
        const fileData = await fs.promises.readFile(filePath);
        formattedPost.file = `data:${path.extname(filePath).slice(1)};base64,${fileData.toString('base64')}`;
      } catch (error) {
        console.error('Error reading post image:', error);
      }
    }

    res.status(200).send(formattedPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send({ error: 'Failed to retrieve the post' });
  }
};
exports.UpdatePost = async (req, res) => {
  try {
    const { title, content, picture, category, tags, status } = req.body
    const sanitizedContent = sanitizeHtml(content) // Sanitize the markdown 

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content: sanitizedContent,
        picture: req.file ? req.file.path : null,
        category,
        tags,
        status: status || 'draft'
      },
      { new: true }
    )
    if (!updatedPost) return res.status(404).send('Post not found')

    res.status(201).send(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).send({ error: 'Failed to update the post' })
  }
}

exports.PublishPost = async (req, res) => {
  try {

  } catch (error) {
    throw error
  }
}

// exports.SchedulePost = async (req, res) => {
//   try {

//   } catch (error) {
//     throw error
//   }
// }

exports.DeletePost = async (req, res) => {
  try {

  } catch (error) {
    throw error
  }

}
