const { mygroup, group } = require("../models/models.group");

function addRequest(req, res) {
  if (!req.body.id) {
    return res.status(400).json("Not valid");
  }
  const item = req.body;
  if (
    !mygroup.find((i) => i.id === item.id) &&
    group.find((i) => i.id === item.id)
  ) {
    mygroup.push(item);
    res.status(200).json(item);
  }
  return res.status(400).json("Not valid");
}

function getRequest(req, res) {
  const id = req.params.id;
  const item = mygroup.find((i) => i.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(400).json({ error: "not valid" });
  }
}

module.exports = {
  addRequest,
  getRequest,
};
