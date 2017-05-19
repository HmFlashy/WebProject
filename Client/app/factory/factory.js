app.factory('ExercisesFactory', ['$http', 'api', 
	function($http, api){

		return {
			addExercise: function(name, desc, idmachine) {
		      return $http.post(api+'/api/exercises', {
		        "nameExerc": name,
		        "descExerc": desc,
		        "machine": idmachine
		      });
		    },

		    getExercises: function() {
		      return $http.get(api+'/api/exercises');
		    },

		    deleteExercise: function(idexercise){
		    	return $http.delete(api + '/api/exercises/'+idexercise);
		    }
		};
}]);

app.factory('MachinesFactory', ['$http', 'api', function($http, api){

	return {
		addMachine: function(name){
			return $http.post(api + '/api/machines', {
				"nameMach" : name
			})
		},

		getMachines: function(){
			return $http.get(api + '/api/machines');
		},

		deleteMachine: function(idmachine){
			return $http.delete(api + '/api/machines/'+idmachine);
		}
	};
}]);

app.factory('TrainingsFactory', ['$http', 'api', 
	function($http, api){
		return {
			addTraining: function(nametraining, desctraining){
				return $http.post(api + '/api/trainings', {
					"nameMach" : nametraining,
					"descMach" : desctraining
				})
			},

			addTrainingExercise: function(idtraining, exercise, indice){
				return $http.post(api + '/api/trainings/'+idtraining+'/exercises/'+exercise.idexercise, {
					"last": exercise.last,
					"numbertimes": exercise.numbertimes,
					"numbereachtime": exercise.numbereachtime,
					"numero": indice
				})
			},

			getTrainings: function(){
				return $http.get(api + '/api/trainings');
			},

			getTrainingById: function(idtraining){
				return $http.get(api + '/api/trainings/'+idtraining);
			},

			deleteTraining: function(idtraining){
				return $http.delete(api + '/api/trainings/'+ idtraining);
			}
		};
}]);

app.factory('PerformancesFactory', ['$http', 'api', 
	function($http, api){

		return {

			getPerformances: function(){
				return $http.get(api + '/api/performances');
			},

			addPerformance: function(rating, comment, idtraining){
				return $http.post(api + '/api/performances/'+idtraining, {
					"rating": rating,
					"comment": comment
				});
			},

			deletePerformance: function(idperformance){
				return $http.delete(api + '/api/performances/'+idperformance);
			}
		}
	}])