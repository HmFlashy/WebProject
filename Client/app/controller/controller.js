app.controller("HomeCtrl", ["$http", "$scope", 
	function($http, $scope){
		
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

app.controller("ExercisesCtrl", ["$location", "$http", "$scope", "api", "ExercisesFactory", "MachinesFactory",
	function($location, $http, $scope, api, ExercisesFactory, MachinesFactory){

		this.exs = [];
		this.mchs = [];


		this.updateExercises = function(){
			ExercisesFactory.getExercises().then(function(response){
				var data = response.data;
				if(data.length == 0){
					$scope.exercise.noexercises = true;
				} else {
					$scope.exercise.exs = data;
				}
			});
		}

		this.updateMachines = function(){
			MachinesFactory.getMachines().then(function(response){
				var data = response.data;
				if(data.length == 0){
					$scope.exercise.nomachines = true;
					$scope.exercise.mchs = [];
				} else {
					$scope.exercise.mchs = data;
				}
			});
		}

		this.updateExercises();
		this.updateMachines();

		this.deleteExercise = function(idexercice){
			if(confirm("Voulez vous supprimez cet exercice?") == true){
				ExercisesFactory.deleteExercise(parseInt(idexercice)).then(function(response){
					$scope.exercise.updateExercises();
				}).catch(function(response){
					console.log(response);
					alert('Une erreur est survenue');
				});
			}
		}

		this.deleteMachine = function(idmachine){
			if(confirm("Voulez vous supprimez cette machine?\nAttention la machine disparaitra de tous vos exercices!") == true){
				MachinesFactory.deleteMachine(parseInt(idmachine)).then(function(response){
					$scope.exercise.updateMachines();
				}).catch(function(response){
					alert("Une erreur est survenue");
				});
			}
		}

		this.addMachine = function(){
			if(this.newmachine == undefined){
				alert("Donnez un nom à votre machine");
			} else {
				MachinesFactory.addMachine(this.newmachine).then(function(response){
					var data = response.data;
					$scope.exercise.mchs.push(data);
					$scope.exercise.newmachine = "";
				}).catch(function(response){
					console.log(response);
					if(response.status != 200){
						alert("Un problème est survenu")
					}
				});
			}
		};

		this.addExercice = function(){
			if(this.nameexercise != undefined && this.descexercise != undefined){
				if(this.choixmachine == ""){
					machine = undefined;
				} else {
					machine = parseInt(this.choixmachine);
				}
				ExercisesFactory.addExercise(this.nameexercise, this.descexercise.replace("/(?:\\r\\n|\\r|\\n)/g", '<br />'), machine).then(function(response){
					var data = response.data;
					$scope.exercise.updateExercises();
					alert("Exercice rajouté !");
				}).catch(function(response){

				});
			} else {
				alert("Il manque des informations !")
			}
		};
	}
]);


app.controller("TrainingsCtrl", ["$scope", "$location", "TrainingsFactory", "ExercisesFactory",
	function($scope, $location, TrainingsFactory, ExercisesFactory){

		this.trainings = [];

		this.trainingslength;

		this.wait = false;

		this.notraining = false;

		this.goTo = function(idtraining){
			$location.path('/mes-entrainements/'+idtraining);
		};

		this.updateTrainings = function(){
			TrainingsFactory.getTrainings().then(function(response){
				var data = response.data;
				$scope.training.trainingslength = data.length;
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
								var newtraining = JSON.parse(JSON.stringify(training));;
								trainingsdata.push(newtraining);
								training.exercises = [];
							}
							index = data[row].idtraining;
							training.idtraining = index;
							training.nametraining = data[row].nametraining;
							training.totaltime = data[row].totaltime;
							training.desctraining = data[row].desctraining;
						}
						var exercise = {};
						exercise.idexercise = data[row].idexercise;
						exercise.numero = data[row].numero;
						exercise.nameexercise = data[row].nameexercise;
						training.exercises.push(exercise);
					}
					var newtraining = JSON.parse(JSON.stringify(training));;
					trainingsdata.push(newtraining);
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
				TrainingsFactory.addTrainingExercise(training[0].idtraining, $scope.training.trainingExercises[i], i+1).then(
					function(respone){
						$scope.$emit('oneMoreReady');
					}).catch(function(response){
						alert('Une erreur est survenue..\nVeuillez supprimer l\'entrainement et recommencer)');
					});
			}
		});

		this.count = 1;
		$scope.$on('oneMoreReady', function(event){
			if($scope.training.count == $scope.training.numero){
				$scope.training.updateTrainings();
				$scope.training.clearForm();
			} else {
				$scope.training.count++;
			}
		});

		this.clearForm = function(){
				this.isCardio = true;
				this.type = "";
				this.idexercise = "";
				this.last = "";
				this.nbseries = "";
				this.numbereachtime = "";
				this.nametraining = "";
				this.desctraining = "";
				this.trainingExercises = [];
				this.wait = false;
				this.numero = 0;
		};

		this.trainingExercises = [];
		this.numero = 0;

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
				this.numero++;
				this.trainingExercises.push({
					idexercise: idexercise,
					last: time,
					numero: this.numero,
					numbertimes: nbSeries,
					numbereachtime: nbEachSeries
				});
			}

		};

		this.addTraining = function(){
			if(this.wait == false){
				this.wait = true;
				var nameTraining = this.nametraining;
				var descTraining = this.desctraining;
				if(nameTraining == undefined || descTraining == undefined){
				} else {
					TrainingsFactory.addTraining(nameTraining, descTraining).then(function(response){
						$scope.$emit('trainingReady', response.data);
					}).catch(function(){
					});
				}
			}
		}

		this.deleteTraining = function(idtraining){
			$event.stopPropagation();
			if(confirm("Voulez vous supprimez cet exercice?") == true){
				TrainingsFactory.deleteTraining(parseInt(idtraining)).then(function(response){
					$scope.training.updateTrainings();
				}).catch(function(response){
					alert('Une erreur est survenue');
				});
			}
		}
	}
]);

app.controller("TrainingIdCtrl", ["$scope", "$routeParams", "TrainingsFactory", "PerformancesFactory",
	function($scope, $routeParams, TrainingsFactory, PerformancesFactory){

		this.training = {};
		this.owner = false;
		this.rating = 5;
		this.rateFunction = function(rating) {
			console.log('Rating selected: ' + rating);
		}

		this.updateTrainingId = function(){
			TrainingsFactory.getTrainingById($routeParams.id).then(function(response){
				var data = response.data;
				if(data.length > 0){
					var training = $scope.trainingid.training;
					training.idtraining = data[0].idtraining;
					training.nametraining = data[0].nametraining;
					training.totaltime = data[0].totaltime;
					training.desctraining = data[0].desctraining;
					training.exercises = [];
					for(var row in data){
						var exercise = {};
						exercise.idexercise = data[row].idexercise;
						exercise.numero = data[row].numero;
						exercise.nameexercise = data[row].nameexercise;
						exercise.namemachine = data[row].namemachine;
						exercise.last = data[row].last;
						if(data[row].numbertimes != undefined){
							exercise.type == 'muscu';
							exercise.numbertimes = data[row].numbertimes;
							exercise.numbereachtime = data[row].numbereachtime;
						}
						training.exercises.push(exercise);
					}
					training.owner = true;
				}
			}).catch(function(response){

			});
		};

		this.updateTrainingId();

		this.addPerformance = function(){
			if(this.commentperf == undefined){
				alert("Laisse un petit commentaire sur ta performance ;)");
			} else {
				PerformancesFactory.addPerformance(this.rating, this.commentperf, $routeParams.id).then(function(response){
					alert("Performance ajoutée!");
					$scope.trainingid.rating = 5;
					$scope.trainingid.commentperf = undefined;
				}).catch(function(response){
					alert('Une erreur est survenue.');
				});
			}
		};
	}
]);

app.controller("UserDataCtrl", 
	function(){

});

app.controller("AgendaCtrl", 
	function(){

});