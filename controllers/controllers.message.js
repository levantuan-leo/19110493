const { mygroup } = require("../models/models.group");

function getRequest(req, res) {
  const id = req.params.id;
  if (id) {
    const item = mygroup.find((i) => i.id === id);
    if (item) {
      res
        .status(200)
        .render("../views/views.message.ejs", { messages: [item] });
    }
    res.send("Not valid");
  }
  res.status(200).render("../views/views.message.ejs", { messages: mygroup });
}

module.exports = {
  getRequest,
};
