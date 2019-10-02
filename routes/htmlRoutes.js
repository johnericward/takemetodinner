// var path = require("path");
var db = require("../models");

module.exports = function(app) {
  // Load index page
  // 29-SEP-2019 : j0serobles : Changed to use Handlebars' render() method.
  app.get("/", function(req, res) {
    console.log ( "/ called"); 
    // res.sendfile(path.join(__dirname, "../public/index.html"));
    db.Eater.findAll({
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(function(data) {
      console.log (JSON.stringify(data, '', 2));
      var eaterObject = { eaterData: data };
      res.render("index", eaterObject);
    });
  });

  

  // Load example page and pass in an example by id
  app.get("/add", function(req, res) {
    // res.sendfile(path.join(__dirname, "../public/add.html"));
    res.render("add");
  });



  app.get("/locfilter/:location_string", function(req, res) {
    
    const Op = db.Sequelize.Op;
    var searchString = '%'+req.params.location_string+'%';
    console.log ("route = /locfilter/" + req.params.location_string); 

    db.Eater.findAll({
      where : {
        location : { 
          [Op.like]: searchString
        }
      },
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(function(data) {
      console.log (JSON.stringify(data, '', 2));
      var eaterObject = { 
                          layout: false, 
                          eaterData: data 
                        };
      res.render("partials/profile/profile-block", eaterObject);
    });
  });





  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
