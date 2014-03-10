/**
 * Created by cenk on 3/9/14.
 */
var ngMongo = angular.module('ngMongo',['ngResource']);

ngMongo.factory('Mongo',function($resource){
  return {
    database : $resource('/mongo-api/dbs')
  }
});

ngMongo.directive("deleteButton",function(){
  return {
    restrict: "E",
    transclude:true,
    replace:true,
    template:"<button class='btn btn-danger' ng-click='removeDb(item)' ng-transclude><i class='icon icon-remove icon-white'></i></button>"
  }
});

ngMongo.controller('ListCtrl' , function($scope,Mongo){
  $scope.items = Mongo.database.query({},isArray = true);
  //DB = $scope.items;


  $scope.addDb = function(){

    var dbName = $scope.newDbName;
    if(dbName){
      var newDb = new Mongo.database({name:dbName});
      newDb.$save();
      $scope.items.push(newDb);

    }
  };

  $scope.removeDb = function(db){
    if(confirm("Delete this database ? There is no undo ...")){
      db.$delete({name:db.name});
      $scope.items.splice($scope.items.indexOf(db),1);

    }
  };

});