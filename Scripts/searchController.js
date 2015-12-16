var SearchFoodController = function ($scope, $http, $uibModal, commonService, $localStorage) {
    $scope.Initialize = function () {
        $scope.selectedGroups = [];
        $scope.selectedFoodItem = [];
        $scope.foodItemDetails = [];
    }
    $scope.Initialize();



    $http.get("http://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=DEMO_KEY").then(function (response) {
        $scope.selectedGroups = response.data.list.item;
    });


    $scope.getFoodItems = function (foodGroupid) {
        var url = "http://api.nal.usda.gov/ndb/search/?format=json&q=&fg=" + foodGroupid + "&sort=n&max=25&offset=0&api_key=DEMO_KEY";
        $http.get(url).then(function (response) {
            $scope.selectedFoodItem = response.data.list.item;
        });
    }

    $scope.checkIteminLocalStorage = function (nbdno) {
        if ($localStorage.LocalMessage != undefined) {
            angular.forEach($localStorage.LocalMessage, function (value, key) {
                if ($localStorage.LocalMessage[key].ndbno == nbdno) {
                    $scope.foodItemDetails = $localStorage.LocalMessage[key];
                    return "true";
                }
            });
        }

        else {
            return "false";
        }
        return "false";
    }


    $scope.searchFoodItem = function (foodItemnbid) {
        var _result = $scope.checkIteminLocalStorage(foodItemnbid);
        if (_result == "false") {
            var url = "http://api.nal.usda.gov/ndb/reports/?ndbno=" + foodItemnbid + "&type=f&format=json&api_key=DEMO_KEY";
            $http.get(url).then(function (response) {
                $scope.foodItemDetails = response.data.report.food;
                if ($localStorage.LocalMessage != undefined) {

                    angular.forEach($localStorage.LocalMessage, function (value, key) {
                        if ($localStorage.LocalMessage[key].ndbno != $scope.foodItemDetails.ndbno)
                            $localStorage.LocalMessage.push($scope.foodItemDetails)
                    });
                }

                else {
                    var itemDetails = [];
                    itemDetails.push($scope.foodItemDetails);
                    $localStorage.LocalMessage = itemDetails;
                }
            });
        }
    }
    $scope.save = function () {
        var values = [];
        values.push($localStorage.LocalMessage);
        angular.forEach(values[0], function (value, key) {
            if (value[key].ndbno != $scope.foodItemDetails.ndbno)
                values.push($scope.foodItemDetails)
        });

        $localStorage.LocalMessage = values;
        //$sessionStorage.SessionMessage = "SessionStorage: My name is Mudassar Khan.";
    }
    $scope.viewDetails = function (itemDetails) {
        $scope.viewItemDetails = itemDetails;


        //debugger
        var modalInstance = $uibModal.open({
            scope: $scope,
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: function ($scope, $modalInstance) {
                $scope.ok = function (item) {
                    // debugger
                    $modalInstance.close(item);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            windowClass: 'center-modal'
        });



        //$sessionStorage.SessionMessage = "SessionStorage: My name is Mudassar Khan.";
    }

}

SearchFoodController.$inject = ['$scope', '$http', '$uibModal', 'commonService', '$localStorage'];
foodApp.controller('SearchFoodController', SearchFoodController);