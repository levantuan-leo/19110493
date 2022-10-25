const express = require("express");
const route = require("./routes");
const hbsHelpers = require("./helpers/handlebars");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 5000;

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: hbsHelpers,
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
