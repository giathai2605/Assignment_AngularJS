var app= angular.module("myApp",["ngRoute"]);
app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/",{
        templateUrl:"./page/home.html?",
        controller:"homeCtrl"
    })
    .when("/add",{
        templateUrl:"./page/form.html",
        controller:"addCtrl"
    })
    .when("/delete/:id",{
        templateUrl:"page/home.html?",
        controller:"deleteCtrl"
    })
    .otherwise({
        redirectTo:"/"
    });

});

app.controller("homeCtrl",function($scope,$http){
    $http.get("http://localhost:3000/table").then(function(response){
        $scope.data=response.data;
    });
});

app.controller("addCtrl",function($scope,$http,$location){
    $scope.name="";
    $scope.age="";
    $scope.city="";

    $scope.onSubmit=function(){
        var flag=true;

        if($scope.name==""){
            flag=false;
            $scope.nameErr=true;
        }else{
            $scope.nameErr=false;
        }

        if($scope.age==""){
            flag=false;
            $scope.ageErr=true;
        }else{
            $scope.ageErr=false;
        }

        if($scope.city==""){
            flag=false;
            $scope.cityErr=true;
        }else{
            $scope.cityErr=false;
        }
        
        if(flag){
           
            const data = {
                "name": $scope.name,
                "age": $scope.age,
                "city": $scope.city
            };
         
            $http.post("http://localhost:3000/table",data)
            .then(function(response) {
                alert("Add success!");
                $location.path('/');
            }, function(error) {
                alert(error);
            });
        }
    }
});

app.controller("deleteCtrl",function($scope,$http,$location,$routeParams){
   var id=$routeParams.id;
    const flag=confirm("Bạn có chắc chắn muốn xóa không?");
    if(flag){
        $http.delete(`http://localhost:3000/table/${id}`)
        .then(response=>{
            $location.path('/');
        })
    }else{
        $location.path('/');
    }
});