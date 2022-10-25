const { post } = require("../models/post.model");

function homeRequest(req, res) {
  res.render("home", {
    posts: post,
    title: "Home",
  });
}

module.exports = {
  homeRequest,
};
