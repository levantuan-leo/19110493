const { mygroup } = require("../models/models.group");

function homeRequest(req, res) {
  res.status(200).json(mygroup);
}

module.exports = {
  homeRequest,
};
