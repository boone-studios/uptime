(function () {
  'use strict';

  angular
    .module('uptime')
    .directive('modal', function ($timeout) {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          visible: '=',
          onShow: '&',
          onHide: '&',
        },
        templateUrl: 'Config/config_modal.html',
        transclude: true,
        link: function (scope, element, attrs) {
          $(element).modal({
            show: false,
            keyboard: attrs.keyboard,
            backdrop: attrs.backdrop,
          });

          scope.$watch(function ()
            {
              return scope.visible;
            },

            function (value) {
              $timeout(function () {
                  if (value) {
                    $(element).modal('show');
                  } else {
                    $(element).modal('hide');
                  }
                });
            });

          $(element).on('shown.bs.modal', function () {
            scope.$apply(function () {
              scope.$parent[attrs.visible] = true;
              scope.onShow({});
            });
          });

          $(element).on('hidden.bs.modal', function () {
            scope.$apply(function () {
              scope.$parent[attrs.visible] = false;
              scope.onHide({});
            });
          });
        },

        controller: function ($scope, $timeout) {
          $scope.$on('propogateModal', function (event, arg) {
            $scope.visible = arg;
          });
        },
      };
    })
    .directive('modalHeader', function () {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          title: '@',
        },
        templateUrl: 'Config/config_modal_header.html',
      };
    })
    .directive('modalFooter', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'Config/config_modal_footer.html',
        transclude: true,
      };
    })
    .directive('modalBody', function () {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'Config/config_modal_body.html',
        transclude: true,
      };
    });
}());
