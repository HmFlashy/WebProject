CREATE TABLE Users (
	idUser serial,
	firstname character varying(32) NOT NULL,
	lastname character varying(32) NOT NULL,
	pseudo character varying(32) NOT NULL,
	email character varying(64) NOT NULL,
	password character varying(64) NOT NULL,
	CONSTRAINT pk_users PRIMARY KEY (iduser),
	CONSTRAINT un_users UNIQUE (pseudo, email)
);


CREATE TABLE Machine (
	idMachine serial,
	nameMachine varchar(50) NOT NULL,
	iduser integer NOT NULL,
	CONSTRAINT pk_machine PRIMARY KEY (idMachine),
	CONSTRAINT fk_machine_user FOREIGN KEY (iduser) REFERENCES users (iduser) ON DELETE CASCADE
);


CREATE TABLE Exercise (
	idExercise serial,
	nameExercise varchar(32) NOT NULL,
	descExercise varchar(128) NOT NULL,
	idMachine integer,
	iduser integer NOT NULL,
	CONSTRAINT pk_exercise PRIMARY KEY (idExercise),
	CONSTRAINT fk_exercise_user FOREIGN KEY (iduser) REFERENCES users (iduser) ON DELETE CASCADE,
	CONSTRAINT fk_exercise_machine FOREIGN KEY (idmachine) REFERENCES machine (idmachine) ON DELETE SET NULL
);

CREATE TABLE Training (
	idTraining serial,
	nameTraining varchar(32) NOT NULL,
	descTraining varchar(128) NOT NULL,
	idUser integer NOT NULL,
	CONSTRAINT pk_training PRIMARY KEY (idTraining),
	CONSTRAINT fk_training_user FOREIGN KEY (iduser) REFERENCES users (iduser) ON DELETE CASCADE
);

CREATE TABLE Performance (
	idPerformance serial,
	dateperf date NOT NULL,
	rating integer NOT NULL,
	comment varchar(256) NOT NULL,
	iduser integer NOT NULL,
	idtraining integer NOT NULL,
	CONSTRAINT pk_performance PRIMARY KEY (idPerformance),
	CONSTRAINT fk_performance_user FOREIGN KEY (iduser) REFERENCES users (iduser) ON DELETE CASCADE,
	CONSTRAINT fk_performance_training FOREIGN KEY (idTraining) REFERENCES Training (idTraining) ON DELETE CASCADE
);

CREATE TABLE Contain (
	idExercise integer NOT NULL,
	idTraining integer NOT NULL,
	numero integer NOT NULL,
	last integer NOT NULL,
	numberTimes integer,
	numberEachTime integer,
	CONSTRAINT pk_contain PRIMARY KEY (idExercise, idTraining, numero),
	CONSTRAINT fk_contain_training FOREIGN KEY (idTraining) REFERENCES Training (idTraining) ON DELETE CASCADE,
	CONSTRAINT fk_contain_exercice FOREIGN KEY (idExercise) REFERENCES Exercise (idExercise) ON DELETE CASCADE
);

DROP TABLE users CASCADE;
DROP TABLE Machine CASCADE;
DROP TABLE Exercise CASCADE;
DROP TABLE Training CASCADE;
DROP TABLE Performance CASCADE;
DROP TABLE Contain CASCADE;




CREATE OR REPLACE FUNCTION supp_empty_trainings() RETURNS trigger AS
$BODY$
DECLARE id integer; 
BEGIN	
	FOR id IN ((SELECT idTraining FROM training WHERE iduser=OLD.iduser) EXCEPT (SELECT idTraining FROM training NATURAL JOIN contain WHERE iduser= OLD.iduser))
	LOOP
		DELETE FROM training WHERE idtraining = id;
	END LOOP;
	RETURN NEW;
END
$BODY$ LANGUAGE plpgsql VOLATILE COST 100;

CREATE TRIGGER trigg_supp_empty_trainings
AFTER DELETE ON exercise
    FOR EACH ROW EXECUTE PROCEDURE supp_empty_trainings();