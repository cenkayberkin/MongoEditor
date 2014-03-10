/**
 * Created by cenk on 3/10/14.
 */

var CustomThings = CustomThings || {};

CustomThings.Bootstrap ={};

CustomThings.Bootstrap.deleteButton = function(){
  return {
    restrict: "E",
    transclude:true,
    replace:true,
    scope:{
      text:"@",
      action:"&",
      comment: "="
    },
    template:"<button class='btn btn-danger' ng-click='action()' ng-transclude><i class='icon icon-remove icon-white'></i>{{text}}</button>"
  }
}

CustomThings.Bootstrap.addButton =function(){
  return{
    restrict: "E",
    scope:{
      action:"&",
      text:"@"
    },
    template:"<button class='btn btn-success' ng-click='action()'><i class='icon icon-white icon-plus-sign'></i>{{text}}</button>"

  }
}