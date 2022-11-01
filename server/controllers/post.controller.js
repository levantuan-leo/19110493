var _ = require("lodash");
const { comment } = require("../models/comment.model");
const { post } = require("../models/post.model");
const { reaction } = require("../models/reaction.model");

function getRequest(req, res) {
  const id = req.params.id;
  const article = post.find((p) => p.id === id);

  if (!article) {
    res.status(404).render("404", { layout: "minimal", title: "404" });
    return;
  }

  // res.render("post", {
  //   post: article,
  //   title: "Post",
  // });
  return res.status(200);
}

function getEditRequest(req, res) {
  const id = req.params.id;
  const article = post.find((p) => p.id === id);

  if (!article) {
    res.status(404).render("404", { layout: "minimal", title: "404" });
    return;
  }

  res.render("edit-post", {
    post: article,
    title: "Edit Post",
  });
}

function addRequest(req, res) {
  if (_.isEmpty(req.body)) {
    res.status(400).json("Not valid");
    return;
  }
  const p = req.body;
  p.id = `${post.length}`;
  p.date = new Date().toISOString();
  p.reactions = `${reaction.length}`;
  p.comments = [];

  const r = {
    id: p.reactions,
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
    postId: p.id,
  };

  post.unshift(p);
  reaction.unshift(r);
  res.status(200).json({
    ...p,
    reactions: r
  });
}

function editRequest(req, res) {
  if (_.isEmpty(req.body)) {
    res.status(400).json("Not valid");
    return;
  }

  const { id, title, content } = req.body;
  const p = post.find((_p) => _p.id === id);
  p.title = title;
  p.date = new Date().toISOString();
  p.content = content;

  res.status(200).json({
    ...p,
    reactions: reaction.find(r => r.id === p.reactions),
    comments: comment.filter(c => p.comments?.includes(c.id))
  });
}

function deleteRequest(req, res) {
  if (_.isEmpty(req.body)) {
    res.status(400).json("Not valid");
    return;
  }

  const { postId } = req.body;
  const index = post.indexOf(post.find((p) => p.id === postId))
  if(index > -1) {
    post.splice(index, 1);
    reaction.splice(
      reaction.indexOf(reaction.find((r) => r.postId === postId)),
      1
    );
    _.remove(comment, (c) => c.postId === postId);
    
    res.status(200).json(postId);
  }
  else return res.status(403).json("Already Deleted!");
}

module.exports = {
  getRequest,
  getEditRequest,
  addRequest,
  editRequest,
  deleteRequest,
};
