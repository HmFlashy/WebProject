//Index for all different routes

module.exports = function(pg){

	var express = require('express');
	var router = express.Router();

	var machine = require('./Machine.js')(pg);
	var exercice = require('./Exercise.js')(pg);
	var performance = require('./Performance.js')(pg);
	var training = require('./Training.js')(pg);
	var auth = require('./auth.js')(pg);

	//Authentification
	router.post('/authenticate', auth.authenticate);
	router.post('/register', auth.register );

	//Machines
	router.get('/api/machines', machine.getMachines);
	router.get('/api/machines/:id', machine.getMachineById);
	router.post('/api/machines', machine.addMachine);
	router.delete('/api/machines/:id', machine.deleteMachine);

	//Exercises
	router.get('/api/exercises', exercice.getExercises);
	router.get('/api/exercises/:id', exercice.getExerciseById);
	router.post('/api/exercises', exercice.addExercise);
	router.put('/api/exercises/:id', exercice.updateExercise);
	router.delete('/api/exercises/:id', exercice.deleteExercise);

	//Trainings
	router.get('/api/trainings', training.getTrainings);
	router.get('/api/trainings/:idtraining', training.getTrainingById);
	router.post('/api/trainings/:idtraining/exercises/:idexercise', training.addTrainingExercise);
	router.post('/api/trainings', training.addTraining);
	router.delete('/api/trainings/:id', training.deleteTraining);

	//Performances
	router.get('/api/performances', performance.getPerformances);
	router.get('/api/performances/statistiques', performance.getStatistiques);
	router.get('/api/performances/:id', performance.getPerformanceById);
	router.post('/api/performances/:idtraining', performance.addPerformance);
	router.delete('/api/performances/:id', performance.deletePerformance);

	//Users
	/*router.get('/api/user/:id', machine.getUserById(pg));
	router.post('/api/user', machine.addUser(pg));
	router.put('/api/user/:id', machine.updateUser(pg));
	router.delete('/api/user/:id', machine.deleteUser(pg));*/
	return router;
}
