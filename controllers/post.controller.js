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

  res.render("post", {
    post: article,
    title: "Post",
  });
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
  res.status(200).json(p);
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

  res.status(200).json(p);
}

function deleteRequest(req, res) {
  if (_.isEmpty(req.body)) {
    res.status(400).json("Not valid");
    return;
  }

  const { postId } = req.body;
  post.splice(post.indexOf(post.find((p) => p.id === postId)), 1);
  reaction.splice(
    reaction.indexOf(reaction.find((r) => r.postId === postId)),
    1
  );
  comment.splice(comment.indexOf(comment.find((c) => c.postId === postId)), 1);

  res.status(200).json(postId);
}

module.exports = {
  getRequest,
  getEditRequest,
  addRequest,
  editRequest,
  deleteRequest,
};
