const app = angular.module('multichat', []);
app.controller('user', function ($scope, $http) {
    $scope.verify = function () {
        $http({
            method: "POST",
            url: "/api/user/login",
            data: { "username": $scope.username }
        }).then(function (response) {
            location.reload();
        });
    }
})

