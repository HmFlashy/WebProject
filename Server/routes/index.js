

module.exports = function(pg){

	var express = require('express');
	var router = express.Router();

	var machine = require('./Machine.js')(pg);
	var exercice = require('./Exercice.js')(pg);
	var performance = require('./Performance.js')(pg);
	var auth = require('./auth.js')(pg);

	router.post('/authenticate', auth.authenticate);
	router.post('/register', auth.register );

	router.get('/api/machines', machine.getMachines);
	router.get('/api/machine/:id', machine.getMachineById);
	router.post('/api/machine', machine.addMachine);
	router.put('/api/machine/:id', machine.updateMachine);
	router.delete('/api/machine/:id', machine.deleteMachine);

	router.get('/api/exercices', exercice.getExercices);
	router.get('/api/exercice/:id', exercice.getExerciceById);
	router.post('/api/exercice', exercice.addExercice);
	router.put('/api/exercice/:id', exercice.updateExercice);
	router.delete('/api/exercice/:id', exercice.deleteExercice);

	// router.get('/api/trainings', machine.getTrainings());
	// router.get('/api/lasttrainings/:id', machine.getProgrammeById());
	// router.post('/api/training', machine.addTraining());
	// router.put('/api/training/:id', machine.updateTraining());
	// router.delete('/api/training/:id', machine.deleteTraining());


	router.get('/api/performances', performance.getPerformances);
	router.get('/api/performance/:id', performance.getPerformanceById);
	router.post('/api/performance', performance.addPerformance);
	router.delete('/api/performance/:id', performance.deletePerformance);
	router.get('/api/lastperformances/:number/:offset', performance.getPerformances);

	/*router.get('/api/user/:id', machine.getUserById(pg));
	router.post('/api/user', machine.addUser(pg));
	router.put('/api/user/:id', machine.updateUser(pg));
	router.delete('/api/user/:id', machine.deleteUser(pg));*/
	return router;
}
