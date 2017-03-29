\c cardcontrol

INSERT INTO cardcontrol_manageraccount VALUES(1, 'Matthew', 'Asnes', 'masnes01', 3);
INSERT INTO cardcontrol_manageraccount VALUES(2, 'Adam', 'Plumer', 'aplume01', 0);

INSERT INTO cardcontrol_door VALUES(1, '56 Professors Row, Medford, MA, 02155', 'Metcalf Hall', 'Metcalf East', now(), now(), 1, 1);
INSERT INTO cardcontrol_door VALUES(2, '56 Professors Row, Medford, MA, 02155', 'Metcalf Hall', 'Metcalf West', now(), now(), 1, 1);
INSERT INTO cardcontrol_door VALUES(3, '161 College Ave, Medford, MA, 02155', 'Halligan Hall', 'Main Entrance', now(), now(), 1, 1);
INSERT INTO cardcontrol_door VALUES(4, '161 College Ave, Medford, MA, 02155', 'Halligan Hall', 'Halligan Extension Entrance', now(), now(), 1, 1);
INSERT INTO cardcontrol_door VALUES(5, '574 Boston Ave, Medford, MA, 02155', 'CLIC', 'Main Entrance', now(), now(), 1, 1);
INSERT INTO cardcontrol_door VALUES(6, '574 Boston Ave, Medford, MA, 02155', 'CLIC', 'Physics Department', now(), now(), 1, 1);

INSERT INTO cardcontrol_card VALUES(1, 'Harrison', 'Kaiser', 'M', 'hkaise01', 'Undergraduate', '111222333', date '1996-10-02', 'Liberal Arts', '2019', '000000000', now(), now(), 1, 1);
INSERT INTO cardcontrol_card VALUES(2, 'Matthew', 'Asnes', 'D', 'masnes01', 'Undergraduate', '111222334', date '1996-08-04', 'Liberal Arts', '2018', '000001000', now(), now(), 1, 1);
INSERT INTO cardcontrol_card VALUES(3, 'Marina', 'Rakhilin', 'S', 'mrakhi01', 'Undergraduate', '111222335', date '1996-02-04', 'Liberal Arts', '2018', '000001001', now(), now(), 1, 1);
INSERT INTO cardcontrol_card VALUES(4, 'Nicolas', 'Asnes', 'W', 'nasnes01', 'Undergraduate', '111222336', date '2001-02-03', 'Liberal Arts', '2023', '000001010', now(), now(), 1, 1);
INSERT INTO cardcontrol_card VALUES(5, 'Harrison', 'Kaiser', 'M', 'hkaise01', 'Undergraduate', '111222333', date '1996-10-02', 'Engineering', '2019', '000000000', now(), now(), 1, 1);
INSERT INTO cardcontrol_card VALUES(6, 'Matt', 'Asnes', 'D', 'masnes01', 'Undergraduate', '111222334', date '1996-08-04', 'Liberal Arts', '2018', '000001000', now(), now(), 1, 1);

INSERT INTO cardcontrol_card_doors VALUES(1, 1, 1);
INSERT INTO cardcontrol_card_doors VALUES(2, 1, 2);
INSERT INTO cardcontrol_card_doors VALUES(3, 1, 3);
INSERT INTO cardcontrol_card_doors VALUES(4, 1, 5);
INSERT INTO cardcontrol_card_doors VALUES(5, 2, 1);
INSERT INTO cardcontrol_card_doors VALUES(6, 2, 2);
INSERT INTO cardcontrol_card_doors VALUES(7, 2, 3);
INSERT INTO cardcontrol_card_doors VALUES(8, 2, 5);
INSERT INTO cardcontrol_card_doors VALUES(9, 2, 6);
INSERT INTO cardcontrol_card_doors VALUES(10, 3, 1);
INSERT INTO cardcontrol_card_doors VALUES(11, 3, 2);
INSERT INTO cardcontrol_card_doors VALUES(12, 4, 4);

INSERT INTO cardcontrol_useraccount VALUES(1, 'Matthew', 'Asnes', 'masnes01', now(), now(), 2, 1, 1);
INSERT INTO cardcontrol_useraccount VALUES(2, 'Harrison', 'Kaiser', 'hkaise01', now(), now(), 1, 1, 1);

INSERT INTO cardcontrol_request VALUES(1, 1, 0, null, now(), now(), 1, 1, 5, 1);
INSERT INTO cardcontrol_request VALUES(2, 1, 0, null, now(), now(), 1, 1, 5, 2);

\q

