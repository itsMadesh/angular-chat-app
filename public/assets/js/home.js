var app=angular.module("multichat",[])
app.controller("home",function($scope){
    $scope.oldgroups=[
        {
            "name":"Group1"
        },
        {
            "name":"Group2"
        },
        {
            "name":"Group3"
        },
        {
            "name":"Group4"
        },
        {
            "name":"Group1"
        },
        {
            "name":"Group2"
        },
        {
            "name":"Group3"
        },
        {
            "name":"Group4"
        },
        {
            "name":"Group1"
        },
        {
            "name":"Group2"
        },
        {
            "name":"Group3"
        },
        {
            "name":"Group4"
        }
    ]
    const creategrp=document.getElementsByClassName("creategroup-container");
    const grpcon=document.getElementsByClassName("group-container");
    $scope.creategroup=function(){
        creategrp[0].style.display="flex";
        grpcon[0].style.opacity=0.1;
    }
    $scope.newgroup=function(){
        $scope.oldgroups.push({"name":$scope.groupname});
        $scope.groupname="";
        $scope.close();
    }
    $scope.close=function(){
        creategrp[0].style.display="none";
        grpcon[0].style.opacity="initial";
    }
})