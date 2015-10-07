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

    $scope.deletePost = function(){
      $http.delete('/api/posts');
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
