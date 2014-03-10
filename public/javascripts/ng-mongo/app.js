/**
 * Created by cenk on 3/9/14.
 */
var ngMongo = angular.module('ngMongo',['ngResource']);

ngMongo.config(function($routeProvider){
  $routeProvider
    .when("/",{
      templateUrl:"list-template.html",
      controller: "ListCtrl"
    })
    .when("/:database",{
      templateUrl:"list-template.html",
      controller: "ListCtrl"
    });
});

ngMongo.factory('Mongo',function($resource){
  return {
    database : $resource('/mongo-api/dbs'),
    collection: $resource('/mongo-api/:database')
  }
});

ngMongo.directive("deleteButton",CustomThings.Bootstrap.deleteButton);

ngMongo.directive("addButton",CustomThings.Bootstrap.addButton);

ngMongo.controller('ListCtrl' , function($scope,$routeParams,Mongo){

  //console.log($routeParams);
  var context = "database";
  if($routeParams.database){
    context = "collection";
  }

  $scope.items = Mongo[context].query($routeParams);

  /*if($routeParams.database){
    $scope.items = Mongo.collection.query({database:$routeParams.database});
  }else{
    $scope.items = Mongo.database.query({},isArray = true);
  }*/

  //DB = $scope.items;

  $scope.addItem = function(){

    var newItemName = $scope.newItemName;
    if(newItemName){
      var newItem = new Mongo[context]({name: newItemName});
      newItem.$save($routeParams);
      $scope.items.push(newItem);
    }
  };

  $scope.removeItem = function(item){
    if(confirm("Delete this " + context +"? There is no undo ...")){
      var params = {name: item.name};
      if($routeParams.database) params.database = $routeParams.database;
      item.$delete(params);
      $scope.items.splice($scope.items.indexOf(item),1);
    }
  };
});