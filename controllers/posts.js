const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comments");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      console.log(req.user)
      res.json({ user: req.user, posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.json({ posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    console.log(req.params.id)
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post:req.params.id}).sort({ createdAt: "desc" }).lean();
      res.json({ post: post, user: req.user, comment: comment });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.body, req.file)
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      res.json({title: req.body.title,image: result.secure_url,caption: req.body.caption})
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
     const postData = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      res.json({likeCountUpdated: true});
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.json({deleted: true});
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
