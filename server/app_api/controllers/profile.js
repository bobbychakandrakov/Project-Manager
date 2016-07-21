var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
module.exports.updateProfile = function(req, res) {



  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    User
        .findById(req.payload._id)
        .exec(function(err, user) {


            if (err){
              res.status(400).json(err);
            }



          if((user.validPassword(req.body.oldPassword))===true){
              user.setPassword(req.body.newPassword || req.body.oldPassword);
              user.name = req.body.name || user.name;
              user.email = req.body.email || user.email;
              user.position = req.body.position || user.position;

              user.save(function(err) {
                  if (err){
                      res.status(400).json(err);
                  }else{
                      var token;
                      token = user.generateJwt();
                      res.status(200);
                      res.json({
                          "token" : token
                      });
                  }

              });

          }else{
            res.status(400).json({error:'password doesnt match'});
          }





                  });
  }

};
