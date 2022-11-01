const { comment } = require("../models/comment.model");
const { post } = require("../models/post.model");
const { reaction } = require("../models/reaction.model");

function homeRequest(_, res) {
  // res.render("home", {
  //   posts: post,
  //   title: "Home",
  // });
  // ------------------
  res.status(200).json(post?.map(p => ({
    ...p,
    reactions: reaction.find(r => r.id === p.reactions),
    comments: comment.filter(c => p.comments?.includes(c.id))
  })));
}

module.exports = {
  homeRequest,
};
