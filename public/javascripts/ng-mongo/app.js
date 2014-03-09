/**
 * Created by cenk on 3/9/14.
 */
var ngMongo = angular.module('ngMongo',[]);

ngMongo.factory('Mongo',function($http){
  return {
    database:function(){
      return $http.get('/mongo-api/dbs');
    }
  }
});

ngMongo.controller('ListCtrl' , function($scope,Mongo){
  var result = Mongo.database();
  result.success(function (data){
    $scope.items = data;
  });
});