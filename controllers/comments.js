
const Comment = require("../models/Comments");

module.exports = {

  createComment: async (req, res) => {
    try {
     let createComment =  await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log(createComment);
      res.json({commentAdded: true, commentData: createComment});
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      console.log(req.params.id)
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      const postID = await Comment.findOne({_id: req.params.id })
      console.log("Likes +1");
      res.redirect(`/post/${postID.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const postID = await Comment.findOne({_id: req.params.id })
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/post/${postID.post}`);
    } catch (err) {
      res.redirect("/profile");
    }
  },

};
