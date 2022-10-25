var _ = require("lodash");
const { reaction } = require("../models/reaction.model");

function addRequest(req, res) {
  if (_.isEmpty(req.body)) {
    res.status(400).json("Not valid");
    return;
  }

  const { action, postId } = req.body;
  const r = reaction.find((_r) => _r.postId === postId);

  r[action] += 1;
  res.status(200).json({ count: r[action] });
}

module.exports = {
  addRequest,
};
