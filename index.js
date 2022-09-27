const express = require("express");
const route = require("./routes");
const app = express();
const port = 5000;
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
