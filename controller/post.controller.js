const Post = require('../model/post.model')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

exports.CreatePost = async (req, res) => {
  try {
    const {title, content, picture, category, tags, status} = req.body
    console.log(req.body)
    const newPost = new Post({
      title,
      content,
      picture: req.file ? req.file.path: null,
      category,
      tags,
      status: status || 'draft',
      date: Date.now()
    }) 
    res.json({saved: newPost})
    await newPost.save()
  } catch (error) {
    throw error
  }
}

exports.GetPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    const formattedPosts = await Promise.all( 
      (posts.map(async post => {
        const filePath = post.file ? post.file.replace(/\\/g, "/") : null;
        const fileData = filePath ? await fs.promises.readFile(filePath) : null; 
        return {
          ...post.toObject(),
          file: fileData ? `data:${path.extname(filePath).slice(1)};base64,${fileData.toString('base64')}` : null,
          date: formatDate(post.date) 
        };
      }))
    )
    res.status(200).send(formattedPosts)
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send({ error: 'Failed to retrieve posts' });3
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
