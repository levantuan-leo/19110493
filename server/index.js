const express = require("express");
const cors = require("cors");
const route = require("./routes");
// const hbsHelpers = require("./helpers/handlebars");
// const exphbs = require("express-handlebars");

const app = express();
const PORT = 5000;

const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

// app.engine(
//   "hbs",
//   exphbs.engine({
//     defaultLayout: "main",
//     extname: ".hbs",
//     helpers: hbsHelpers,
//   })
// );

// app.set("view engine", "hbs");
// app.set("views", "./views");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
