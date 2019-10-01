var db = require("../models");

module.exports = function(app) {
  // Get all Eaters
  app.get("/api/new", function(req, res) {
    db.Eater.findAll({
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(function(dbEaters) {
      res.json(dbEaters);
    });
  });

  // Create a new Eater
  app.post("/api/new", function(req, res) {
    db.Eater.create(req.body).then(function(dbEater) {
      res.json(dbEater);
    });
  });

  // Delete an Eater by id
  app.delete("/api/Eaters/:id", function(req, res) {
    db.Eater.destroy({ where: { id: req.params.id } }).then(function(dbEater) {
      res.json(dbEater);
    });
  });
};
