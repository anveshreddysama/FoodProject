'use strict';
var foodApp = angular.module('foodApp', ['ui.bootstrap', 'ngAnimate', 'ngStorage']);

foodApp.constant('foodAppSettings', {

});

foodApp.factory('commonService', function ($rootScope, $uibModal) {
    var sharedService = {};

    sharedService.message = '';


    sharedService.showdialog = function ($rootScope, $uibModal) {
        var modalInstance = $uibModal.open({
            scope: $rootScope,
            animation: true,
            templateUrl: 'alertModal.html',
            controller: function ($scope, $modalInstance) {
                $scope.Message = $rootScope.Message;
                $scope.ok = function (item) {

                    $modalInstance.close(item);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },

            windowClass: 'center-modal'

        });

        modalInstance.result.then(function (selectedItem) {
            // debugger
            $scope.slectedRequestor = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    return sharedService;
    //return $rootScope.showModal;
});

