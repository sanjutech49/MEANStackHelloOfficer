'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).
  directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          $.get(attrs.dynamic, function(data){
            ele.html(data);
            $compile(ele.contents())(scope);
          });
        });
      }
    };
  })
  .directive("ntFocus", function(){
        return {
                 link: function(scope, element, attr){
                     element[0].focus();
                  }
        };
});
