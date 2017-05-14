CREATE TABLE Users (
idUser serial,
firstname varchar(30),
lastname varchar(30),
pseudo varchar(30),
email varchar(100),
password varchar(60),
CONSTRAINT pk_users PRIMARY KEY (idUser)
);
DROP TABLE users;

Truncate machine;
CREATE TABLE Machine (
idMachine serial,
machineName varchar(50),
description varchar(300),
CONSTRAINT pk_machine PRIMARY KEY (idMachine)
);
DROP TABLE Machine;
INSERT INTO machine VALUES (1, 'Banc dev-coucher', 'Banc permettant de faire des développés couchés');
SELECT * FROM Machine WHERE idmachine=1;
INSERT INTO Machine (machineName, description, userid) VALUES ('Lol','Ouai ok', 1);