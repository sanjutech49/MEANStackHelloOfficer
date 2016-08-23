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
  }).
 directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return false;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
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
})
.directive('googleplace',function(){
  var componentForm = {
        premise: 'long_name',
        street_number: 'short_name',
        route: 'long_name',
        sublocality_level_1: 'long_name',
        sublocality_level_2: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };
    var mapping = {
        premise: 'BuildingName',
        street_number: 'Unit',
        route: 'Street',
        sublocality_level_1: 'Suburb',
        sublocality_level_2: 'Suburb_2',
        locality: 'City',
        administrative_area_level_1: 'State',
        country: 'Country',
        postal_code: 'PostCode'
        //Region, District, Level
    };

  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: ['geocode']
      };

      var autocomplete = new google.maps.places.Autocomplete(element[0], options);

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var location = place.geometry && place.geometry.location ? {
            Latitude: place.geometry.location.lat(),
            Longitude: place.geometry.location.lng()
        } : {};

        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                location[mapping[addressType]] = val;
            }
        }
        location.FormattedAddress = place.formatted_address;
        location.PlaceId = place.place_id;

        scope.$apply(function () {
            scope.address = location; // array containing each location component
            model.$setViewValue(location);
        });
      });
    }
  };
});
 
