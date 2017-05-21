var promise = require('promise');

//Promise that check if the different data are correct to validate the register
var checkData = {

	register: function(pg, firstname, lastname, pseudo,  password, email){
		return new promise(function(resolve, reject){
			var err ='';
			if(firstname == undefined){
				err+='"firstname": "Firstname is missing"';
			}
			if(lastname == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"lastname": "Lastnemae is missing"';
			}
			if(password == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"password": "The password is missing"';
			}
			if(pseudo == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"pseudo": "The pseudo is missing"';
			}
			if(email == undefined){
				if(err != ''){
					err+=',';
				}
				err+='"email": "The email is missing"';
			}
			if(err == ''){
				pg.query("SELECT 1 FROM users WHERE lower(pseudo)=$1::text OR email=$2::text",
						  [pseudo.toLowerCase(), email],
						  function(err, res){
						  	 if(res.rows.length != 0){
						  	 	err +="'error': 'Pseudo or email already used'";
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
