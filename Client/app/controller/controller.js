app.controller('MainCtrl', ['Page', function (Page) {
    
	Page.setTitle('Acceuil');
}]);

app.controller("HomeCtrl", ["$http", 
	function($http){

	}
]);

app.controller("HeaderCtrl", ["$location", "UserAuthFactory", "AuthenticationFactory",
	function($location, UserAuthFactory, AuthenticationFactory){

		this.logout = UserAuthFactory.logout;
		this.islogged = false;

		this.goTo = function(path){
			$location.path(path);
		}
	}
]);

app.controller("LobbyCtrl", ["$location", "UserAuthFactory", "AuthenticationFactory",
	function($location, UserAuthFactory, AuthenticationFactory){
	}
]);

app.controller("ExercisesCtrl", ["$location", "$http", "$scope", "api", "ExercisesFactory", "MachinesFactory",
	function($location, $http, $scope, api, ExercisesFactory, MachinesFactory){

		this.exs = {};
		this.mchs = {};

		ExercisesFactory.getExercises().then(function(response){
			var data = response.data;
			if(data.length == 0){
				$scope.exercise.noexercises = true;
			} else {
				$scope.exercise.exs = data;
				console.log($scope.exercise.exs);
			}
		});

		MachinesFactory.getMachines().then(function(response){
			var data = response.data;
			if(data.length == 0){
				$scope.exercise.nomachines = true;
			} else {
				$scope.exercise.mchs = data;
				console.log($scope.exercise.mchs);
			}
		});

		this.addMachine = function(){
			MachinesFactory.addMachine(this.newmachine).then(function(response){

				var data = response.data;
				$scope.exercise.mchs.push(data);

			}).catch(function(response){

			});
		};

		this.addExercice = function(){
				ExercisesFactory.addExercise(this.nameexercise, this.descexercise, parseInt(this.choixmachine)).then(function(response){
					var data = response.data;
					$scope.exercise.exs.push(data);
				}).catch(function(response){

				});
		};
	}
]);


app.controller("TrainingsCtrl", ["$scope", "$location", "TrainingsFactory", "ExercisesFactory",
	function($scope, $location, TrainingsFactory, ExercisesFactory){

		this.trainings = [];

		this.trainingslength;

		this.updateTrainings = function(){
			TrainingsFactory.getTrainings().then(function(response){
				var data = response.data;
				this.trainingslength = data.length;
				if(data.length == 0){
					$scope.training.notraining = true;
				} else {
					var trainingsdata = [];
					var index = -1;
					var training = {
						"idtraining": undefined,
						"nametraining": undefined,
						"totaltime": undefined,
						"desctraining": undefined,
						"exercises": []
					};
					for(var row in data){
						if(data[row].idtraining != index){
							if(index != -1){
								this.training.exercises(exercises);
								trainingsdata.push(training);
							}
							index = data[row].idtraining;
							training.idtraining = index;
							training.nametraining = data[row].nametraining;
							training.totaltime = data[row].totaltime;
							training.desctraining = data[row].desctraining;
						}
						var exercise = {};
						exercise.idexercise = data[row].idexercise;
						exercise.nameexercise = data[row].nameexercise;
						training.exercises.push(exercise)
					}
					trainingsdata.push(training);
					$scope.training.trainings = trainingsdata;
				}
			});
		}

		this.updateTrainings();


		this.isCardio = true;
		this.exs = {};

		ExercisesFactory.getExercises().then(function(response){
			var data = response.data;
			if(data.length == 0){
				$scope.training.noexercises = true;
			} else {
				console.log(data);
				$scope.training.exs = data;

			}
		});

		this.typeChange = function(){
			if(this.type == 1){
				this.isCardio = false;
			} else {
				this.isCardio = true;
			}
		};

		$scope.$on('trainingReady', function(event, training){
			var i = 0;
			for(i = 0; i < $scope.training.trainingExercises.length; i++){
					TrainingsFactory.addTrainingExercise(training[0].idtraining, $scope.training.trainingExercises[i], i+1).then(function(respone){
				}).catch(function(response){

				});
			}
		});

		this.trainingExercises = [];
		this.numero = 1;

		this.addExercise = function(){
			var idexercise = this.idexercise;
			var type = this.type;
			var time = this.last;
			var nbSeries = undefined;
			var nbEachSeries = undefined;
			if(type == 1){
				if(this.nbseries == undefined || this.nbforeachseries == undefined){

				}
				nbSeries = this.nbseries;
				nbEachSeries = this.nbforeachseries;
			}
			if(idexercise == undefined || type == undefined || time == undefined || 
			  (type == 1 && (nbSeries == undefined || nbEachSeries == undefined))){
				this.missesthings = true;
			} else {
				this.trainingExercises.push({
					idexercise: idexercise,
					last: time,
					numero: this.numero,
					numbertimes: nbSeries,
					numbereachtime: nbEachSeries
				});
				this.numero++;
			}

		};

		this.addTraining = function(){
			var nameTraining = this.nametraining;
			var descTraining = this.desctraining;
			if(nameTraining == undefined || descTraining == undefined){
			} else {
				TrainingsFactory.addTraining(nameTraining, descTraining).then(function(response){
					$scope.$emit('trainingReady', response.data);
				}).catch(function(){
					console.log('probleme');
				})
			}
		}
	}
]);

app.controller("UserDataCtrl", 
	function(){

});

app.controller("AgendaCtrl", 
	function(){

});