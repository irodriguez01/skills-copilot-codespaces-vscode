// Create web server using express
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

// Create a comment
router.post('/posts/:postId/comments', (req, res, next) => {
  // Find the post that the comment belongs to
  Post.findById(req.params.postId, (err, post) => {
    // Create a new comment
    const comment = new Comment(req.body);
    // Assign the post to the comment
    comment.post = post;
    // Save the comment
    comment.save((err, comment) => {
      // Redirect to the post
      return res.redirect(`/posts/${post._id}`);
    });
  });
});

// Upvote a comment
router.put('/posts/:postId/comments/:commentId/upvote', (req, res, next) => {
  // Find the comment
  Comment.findById(req.params.commentId, (err, comment) => {
    // Upvote the comment
    comment.upvote((err, comment) => {
      // Redirect to the post
      return res.redirect(`/posts/${comment.post}`);
    });
  });
});

module.exports = router;
