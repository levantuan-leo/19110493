const homeRouter = require("./home.route");
const postRouter = require("./post.route");
const reactionRouter = require("./reaction.route");
const commentRouter = require("./comment.route");

function route(app) {
  app.use("/", homeRouter);
  app.use("/post", postRouter);
  app.use("/reaction", reactionRouter);
  app.use("/comment", commentRouter);
}

module.exports = route;
