console.log('scripts goin!');

angular.module('BlogApp', ['ngCookies']);


angular.module('BlogApp')
  .controller('UsersController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location){



    $scope.users = [];
    $scope.newUser = {};
    $scope.logginUser = {};
    $scope.newPost = {};
    $scope.posts =[];



    $scope.getUsers = function(){
      $http.get('/api/users').then(function(response){
        $scope.users = response.data;
        console.log(response.data)
      });
    };
    $scope.getUsers();


    $scope.createUser = function(){
      $http.post('/api/users', $scope.newUser).then(function(response){
        $scope.users.push(response.data);
        $scope.newUser = {};
      });
    };

    $scope.createPost = function(){
      $scope.newPost.createdAt = Math.floor(Date.now() / 1000);
      $http({
        url: '/api/posts',
        method: 'post',
        headers:{
          token: $scope.token
        },
        data: $scope.newPost
      }).then(function(response){
        $scope.getUsers();
      });
    };

    $scope.deletePost = function(timestamp){
      $http({
        url:"api/posts/" + timestamp,
        method: 'delete',
        headers:{
          token: $scope.token
        }
      }).then(function(){
        $scope.getUsers();
      });
    };



    $scope.logOut = function(){
      $cookies.remove('token');
      $scope.token = $cookies.get('token');
    };



    $scope.obtainToken = function(){
      $http.post("/api/users/authentication_token", $scope.logginUser).then(function(response){
        $scope.token = response.data.token;
        $cookies.put('token', $scope.token);
      });
    };
    $scope.token = $cookies.get('token');
}])
