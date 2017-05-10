module.export = function(sequelize){
	var User = sequelize.define('user', {
		username: { type: Sequelize.STRING, allowNull: false },
		birthday: Sequelize.DATE
	});
	return User;
}