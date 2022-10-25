var _ = require("lodash");
const { comment } = require("../models/comment.model");
const { post } = require("../models/post.model");

function addRequest(req, res) {
  if (_.isEmpty(req.body)) {
    res.status(400).json("Not valid");
    return;
  }

  const c = req.body;
  c.id = `${comment.length}`;
  c.date = new Date().toISOString();

  const p = post.find((_p) => _p.id === c.postId);
  p.comments.push(c.id);

  comment.push(c);
  res.status(200).json(c);
}

module.exports = {
  addRequest,
};
