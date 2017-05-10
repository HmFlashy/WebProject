module.export = function(sequelize){
	var User = sequelize.define('user', {
		idUser: 
		{ 
			type: Sequelize.INTEGER, 
			autoIncrement: true,
			allowNull: false
		},
		nomUser: 
		{ 
			type: Sequelize.STRING(20),
			allowNull: false,
			field: "nom_user"
		},
		prenomUser:
		{
			type: Sequelize.STRING(20),
			allowNull: false,
			field: "prenom_user"
		}


	});
	return User;
}