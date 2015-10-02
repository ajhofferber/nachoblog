// Require what will be needed for the controller
var express  =  require('express'),
    User     =  require('../models/user'),
    postsRouter   =  express.Router();


postsRouter.post('/', function(req, res){
  //find the user by the token
  //push in the recipe
  //save the user
  //send the user back as json
  User.findOne({token: req.headers.token }, function(err, user){
    user.posts.push(req.body);
    user.save(function(){
      res.json(user);
    });
  });
});

module.exports = postsRouter;
