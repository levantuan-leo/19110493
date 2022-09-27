const homeRouter = require("./routes");
const _19110493Router = require("./routes.19110493");
const messageRouter = require("./routes.message");

function route(app) {
  app.use("/", homeRouter);
  app.use("/19110493", _19110493Router);
  app.use("/message", messageRouter);
}

module.exports = route;
