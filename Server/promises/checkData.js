var promise = require('promise');

var checkData = {

	register: function(pg, firstname, lastname, pseudo,  password, email){
		return new promise(function(resolve, reject){
			var err ='';
			if(firstname == undefined){
				err+='"firstname": "Prenom absent"';
			}
			if(lastname == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"lastname": "Nom de famille absent"';
			}
			if(password == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"password": "Mot de passe absent"';
			}
			if(pseudo == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"pseudo": "Pseudo absent"';
			}
			if(email == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"email": "email absent"';
			}
			if(err == ''){
				pg.query("SELECT 1 FROM users WHERE lower(pseudo)=$1::text OR email=$2::text",
						  [pseudo.toLowerCase(), email],
						  function(err, res){
						  	 if(res.rows.length != 0){
						  	 	err +="'error': 'Pseudo ou email déjà utilisé'";
								reject(err);
						  	 } else {
								resolve();
						  	 }
						  });
			} else {
				reject(err);
			}
		});

	}
}

module.exports = checkData;