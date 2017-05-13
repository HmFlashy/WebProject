

module.exports = function(pg){
	var express = require('express');
	var router = express.Router();
	var machine = require('./Machine.js');
	var auth = require('./auth.js');

	router.post('/authenticate', auth.authenticate(pg));
	router.post('/register', auth.register(pg));

	router.get('/api/machine', machine.getMachines(pg));
	router.get('/api/machine/:id', machine.getMachineById(pg));
	router.post('/api/machine', machine.addMachine(pg));
	router.put('/api/machine/:id', machine.updateMachine(pg));
	router.delete('/api/machine/:id', machine.deleteMachine(pg));

	// router.get('/api/typemachines', machine.getTypesMachines(pg));
	// router.get('/api/typemachines/:id', machine.getTypeMachinesById(pg));
	// router.post('/api/typemachines', machine.addTypeMachines(pg));
	// router.put('/api/typemachines/:id', machine.getMachine(pg));
	// router.delete('/api/typemachines/:id', machine.getMachine(pg));

	// router.get('/api/exercice', machine.getExercices(pg));
	// router.get('/api/exercice/:id', machine.getExerciceById(pg));
	// router.post('/api/exercice', machine.addExercice(pg));
	// router.put('/api/exercice/:id', machine.updateExercice(pg));
	// router.delete('/api/exercice/:id', machine.deleteExercice(pg));

	// router.get('/api/programme', machine.getProgrammes(pg));
	// router.get('/api/programme/:id', machine.getProgrammeById(pg));
	// router.post('/api/programme', machine.addProgramme(pg));
	// router.put('/api/programme/:id', machine.updateProgramme(pg));
	// router.delete('/api/programme/:id', machine.deleteProgramme(pg));

	// router.get('/api/performance', machine.getPerformances(pg));
	// router.get('/api/performance/:id', machine.getPerformanceById(pg));
	// router.post('/api/performance', machine.addPerformance(pg));
	// router.put('/api/performance/:id', machine.updatePerformance(pg));
	// router.delete('/api/performance/:id', machine.deletePerformance(pg));

	// router.get('/api/user/:id', machine.getUserById(pg));
	// router.post('/api/user', machine.addUser(pg));
	// router.put('/api/user/:id', machine.updateUser(pg));
	// router.delete('/api/user/:id', machine.deleteUser(pg));
	return router;
}