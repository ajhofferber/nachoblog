console.log('scripts goin!');

angular.module('BlogApp', ['ngCookies']);


angular.module('BlogApp')
  .controller('UserController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){


    
    $scope.users = [];
    $scope.newUser = {};
    $scope.logginUser = {};
    $scope.newPost = {};


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
        console.log(response.data);
      });
    };

    $scope.obtainToken = function(){
      $http.post("/api/users/authentication_token", $scope.logginUser).then(function(response){
        $scope.token = response.data.token;
        $cookies.put('token', $scope.token);
      });
    };

    $scope.token = $cookies.get('token');

}])
