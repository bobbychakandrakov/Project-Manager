var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var validateEmail= function (email) {
    if (email.length === 0) return false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
};

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json({
          _id:user._id,
          name:user.name,
          position:user.position,
          email:user.email
        });
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

            if(!req.body.oldPassword) {
                sendJSONresponse(res, 400, {
                    "message": "oldPassword is required"
                });
                return;
            }
            if(req.body.oldPassword.length<=5 ){
                sendJSONresponse(res, 400, {
                    "message": "password must be more than 5 symbols"
                });
                return;
            }

            if(req.body.oldPassword.length>=50 ){
                sendJSONresponse(res, 400, {
                    "message": "password cannot be more than 50 symbols"
                });
                return;
            }
            if(req.body.newPassword){
                if(req.body.newPassword.length>=50 ){
                    sendJSONresponse(res, 400, {
                        "message": "password cannot be more than 50 symbols"
                    });
                    return;
                }
            }
            if(req.body.newPassword){
                if(req.body.newPassword.length<=5 ){
                    sendJSONresponse(res, 400, {
                        "message": "password must be more than 5 symbols"
                    });
                    return;
                }
            }

            if(req.body.name){

                if(req.body.name.length<=5){
                    sendJSONresponse(res, 400, {
                        "message": "name must be more than 5 symbols"
                    });
                    return;
                }

                if(req.body.name.length>=50){
                    sendJSONresponse(res, 400, {
                        "message": "name cannot be more than 50 symbols"
                    });
                    return;
                }
            }

            if(req.body.email){
                if(req.body.email.length<=5){
                    sendJSONresponse(res, 400, {
                        "message": "email must be more than 5 symbols"
                    });
                    return;
                }

                if(req.body.email.length>=50){
                    sendJSONresponse(res, 400, {
                        "message": "email cannot be more than 50 symbols"
                    });
                    return;
                }

                if(!validateEmail(req.body.email)){
                    sendJSONresponse(res, 400, {
                        "message": "emaill error"
                    });
                    return;
                }
            }

            if(req.body.position){
                if(req.body.position.length<=5){
                    sendJSONresponse(res, 400, {
                        "message": "position must be more than 5 symbols"
                    });
                    return;
                }

                if(req.body.position.length>=50){
                    sendJSONresponse(res, 400, {
                        "message": "position cannot be more than 50 symbols"
                    });
                    return;
                }
            }


            User.findOne({ name:req.body.name}, function (err, name){
                if(err){
                    sendJSONresponse(res, 400, {
                        "message": err
                    });
                }

                if(name){
                    sendJSONresponse(res, 400, {
                        "message": "name exist"
                    });
                }else{
                    User.findOne({email: req.body.email }, function (err, email) {
                        if(err){
                            sendJSONresponse(res, 400, {
                                "message": err
                            });
                        }

                        if(email){
                            sendJSONresponse(res, 400, {
                                "message": "email exist"
                            });
                        }else{
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
                        }
                    });

                }
            });

        });
  }

};
