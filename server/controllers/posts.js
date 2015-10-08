// Require what will be needed for the controller
var express  =  require('express'),
    User     =  require('../models/user'),
    _        =  require('underscore'),
    postsRouter   =  express.Router();

//
// postsRouter.get('/', function (req, res) {
//   User.find({}, function (err, users)
//     for (var i = 0; i < users.length; i++) {
//       users[i].posts
//     }
//     res.json(results);
//   });
// });


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

postsRouter.delete('/:id', function(req, res){
    User.findOne({token: req.headers.token }, function(err, user){

    user.posts = _.reject(user.posts, function( post ) {
      return post.createdAt = req.params.id;
    });

    user.save(function(){
      res.json(user);
    });
  });
});

module.exports = postsRouter;
