const app = angular.module("multichat", []);
const textbox = document.getElementsByClassName("textbox")[0];
const sendbtn = document.getElementsByClassName("send-button")[0];
const chat_box_messages = document.getElementsByClassName("chat-box-message-container")[0];
// app.factory("$socket", function ($rootScope) {
//     const socket = io();
//     return {
//         on: function (eventName, callback) {
//             console.log("creating socket event:", eventName)
//             socket.on(eventName, function () {
//                 const args = arguments;
//                 $rootScope.$apply(function () {
//                     callback.apply(socket, args);
//                 });
//             });
//         }
//     }
// });
app.controller("messager", function ($scope, $http, $rootScope) {
    $scope.messages = [];

    $scope.checktext = function () {
        if (textbox.value != "") {
            sendbtn.style = "display:block";
        }
        else {
            sendbtn.style = "display:none";
        }
    }

    textbox.addEventListener('keypress', function (e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            $scope.send();
        }
    });

    $scope.logout = function () {
        console.log("logout");
        $http({
            method: "DELETE",
            url: "/api/user/logout",
        }).then(function (response) {
            location.reload();
        });
    }

    // $scope.watchCollection('$scope.messages');

    $scope.send = function () {
        const time = new Date().toLocaleTimeString().split(":");
        const formatted_time = time[0] + ":" + time[1] + (time[2].split(" "))[1];
        const text = textbox.value;
        $http({
            method: "POST",
            url: "api/message/",
            data: { "time": formatted_time, "text": text }
        }).then(function (response) {
            $scope.messages.push(response.data.result);
            $scope.scrollToBottom();
            textbox.value = "";
            sendbtn.style = "display:none";
            textbox.focus();
        });
    }

    // $scope.handleMessage = function (mesg) {
    //         console.log("incoming mesg:", mesg);
    //         if ($scope.me == mesg.name) return;
    //         $scope.messages.push(mesg);
    //         console.log("pushed", mesg);
    //     }

    const socket = io();
    socket.on('chat_message', function (mesg) {
        console.log("incoming mesg:", mesg);
        if ($scope.me == mesg.name) return;
        $scope.messages.push(mesg);
        console.log("pushed", mesg);
        console.log($scope);
        $scope.$apply();
    });
    // socket.on('chat_message', function () {
    //     const args = arguments;
    //     $rootScope.$apply(function () {
    //         $scope.handleMessage.apply(socket, args);
    //     });
    // });



    $scope.scrollToBottom = () => setTimeout(() => chat_box_messages.scrollTo({ top: chat_box_messages.scrollHeight }));

    $http({
        method: "GET",
        url: "api/message/",
    }).then(function (response) {
        $scope.messages = response.data.results;
        $scope.me = response.data.me;
        $scope.scrollToBottom();
    });
});