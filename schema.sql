DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
\c test
CREATE TABLE accounts(
	id             BIGSERIAL PRIMARY KEY NOT NULL,
	first_name     VARCHAR(40) NOT NULL,
	last_name      VARCHAR(40) NOT NULL,
	utln           VARCHAR(10) UNIQUE NOT NULL,
	salt           CHAR(16) NOT NULL,
	passhash       CHAR(64) NOT NULL
);

CREATE TABLE ids(
	id             BIGSERIAL PRIMARY KEY NOT NULL,
	first_name     VARCHAR(40) NOT NULL,
	last_name      VARCHAR(40) NOT NULL,
	middle_initial VARCHAR(1) NOT NULL,
	utln           VARCHAR(10) UNIQUE NOT NULL,
	student_type   VARCHAR(20) NOT NULL,
	jumbocash_id   INT NOT NULL,
	birth_date     DATE NOT NULL,
	school         VARCHAR(30) NOT NULL,
	class_year     INT NOT NULL,
	barcode        INT NOT NULL,
	created_by     BIGSERIAL NOT NULL REFERENCES accounts,
	modified_by    BIGSERIAL NOT NULL REFERENCES accounts,
	created_at     TIMESTAMPTZ NOT NULL,
	modified_at    TIMESTAMPTZ NOT NULL
);

CREATE TABLE doors(
	id             BIGSERIAL PRIMARY KEY NOT NULL,
	address        VARCHAR(120) NOT NULL,
	building_name  VARCHAR(120) NOT NULL,
	door_name      VARCHAR(120) NOT NULL,
	created_by     BIGSERIAL NOT NULL REFERENCES accounts,
	modified_by    BIGSERIAL NOT NULL REFERENCES accounts,
	created_at     TIMESTAMPTZ NOT NULL,
	modified_at    TIMESTAMPTZ NOT NULL

);

CREATE TABLE id_doors(
	id             BIGSERIAL NOT NULL REFERENCES ids,
	door           BIGSERIAL NOT NULL REFERENCES doors,
	created_by     BIGSERIAL NOT NULL REFERENCES accounts,
	modified_by    BIGSERIAL NOT NULL REFERENCES accounts,
	created_at     TIMESTAMPTZ NOT NULL,
	modified_at    TIMESTAMPTZ NOT NULL,
	PRIMARY KEY(id, door)

);

INSERT INTO accounts VALUES (1, 'Matthew', 'Asnes', 'masnes01', '0x0x0x0x0x0x0x0x', '1234567890123456789012345678901234567890123456789012345678901234');
INSERT INTO ids      VALUES(1, 'Matthew', 'Asnes', 'D', 'masnes01', 'Undergraduate', 3001112, date '1996-07-11', 'Liberal Arts', 2018, 1133444, 1, 1, now(), now());
INSERT INTO ids      VALUES(2, 'Harrison', 'Kaiser', 'M', 'hkaise01', 'Undergraduate', 9391039, date '1996-09-02', 'Engineering', 2019, 932204, 1, 1, now(), now());
INSERT INTO doors    VALUES(1, '56 Professors Row', 'Metcalf Hall', 'Metcalf East', 1, 1, now(), now());
INSERT INTO doors    VALUES(2, '56 Professors Row', 'Metcalf Hall', 'Metcalf West', 1, 1, now(), now());
INSERT INTO doors    VALUES(3, '574 Boston Ave', 'CLIC Building', 'Main Entrance', 1, 1, now(), now());
INSERT INTO doors    VALUES(4, '161 College Ave', 'Halligan Hall', 'Main Entrance', 1, 1, now(), now());
INSERT INTO doors    VALUES(5, '161 College Ave', 'Halligan Hall', 'Halligan Extension', 1, 1, now(), now());
INSERT INTO id_doors VALUES(1, 1, 1, 1, now(), now());
INSERT INTO id_doors VALUES(1, 2, 1, 1, now(), now());
INSERT INTO id_doors VALUES(1, 3, 1, 1, now(), now());
INSERT INTO id_doors VALUES(1, 4, 1, 1, now(), now());
INSERT INTO id_doors VALUES(2, 1, 1, 1, now(), now());
INSERT INTO id_doors VALUES(2, 4, 1, 1, now(), now());
INSERT INTO id_doors VALUES(2, 5, 1, 1, now(), now());



