var app = angular.module('app', []);

function mainController($scope, $http) {

	$scope.formData = {};

	$http.get('/api/patrons')
			.success(function(data){
				$scope.patrons = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});


	$scope.createPatron = function(){
		$http.post('/api/patrons', $scope.formData)	
			 .success(function(data){
			 	$scope.formData = {};
			 	$scope.patrons = data;
			 	console.log(data);
			 })
			 .error(function(data){
			 	console.log('Error: ' + data);
			 });


    $scope.deletePatron = function(id) {
        $http.delete('/api/patrons/' + id)
            .success(function(data) {
                $scope.patrons = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

}