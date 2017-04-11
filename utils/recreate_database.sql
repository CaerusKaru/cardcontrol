\c cardcontrol

-- Note: SINGLE QUOTES ONLY!

INSERT INTO cardcontrol_card VALUES(1, 'Matthew', 'Asnes', 'D', 'masnes01', 'Undergraduate', '111222334', date '1996-08-04', 'Liberal Arts', '2018', '000001000', now(), now());
INSERT INTO cardcontrol_card VALUES(2, 'Marina', 'Rakhilin', 'S', 'mrakhi01', 'Undergraduate', '111222335', date '1996-02-04', 'Liberal Arts', '2018', '000001001', now(), now());
INSERT INTO cardcontrol_card VALUES(3, 'Nicolas', 'Asnes', 'W', 'nasnes01', 'Undergraduate', '111222336', date '2001-02-03', 'Liberal Arts', '2023', '000001010', now(), now());
INSERT INTO cardcontrol_card VALUES(4, 'Harrison', 'Kaiser', 'M', 'hkaise01', 'Undergraduate', '111222333', date '1996-09-02', 'Engineering', '2019', '000000000', now(), now());
INSERT INTO cardcontrol_card VALUES(5, 'Adam', 'Plumer', 'X', 'aplume01', 'Graduate', '123456789', date '1995-06-23', 'Engineering', '2018', '3333333', now(), now());

INSERT INTO cardcontrol_useraccount VALUES(1, 'Matthew', 'Asnes', 'masnes01', now(), now(), 2, 1);
INSERT INTO cardcontrol_useraccount VALUES(2, 'Harrison', 'Kaiser', 'hkaise01', now(), now(), 0, 4);
INSERT INTO cardcontrol_useraccount VALUES(3, 'Adam', 'Plumer', 'aplume01', now(), now(), 1, 5);

INSERT INTO cardcontrol_domain VALUES(1, 'Tufts University', now(), now(), 1, 1, null);
INSERT INTO cardcontrol_domain VALUES(4, 'Academic', now(), now(), 1, 1, 1);
INSERT INTO cardcontrol_domain VALUES(2, 'CS Department', now(), now(), 1, 1, 4);
INSERT INTO cardcontrol_domain VALUES(3, 'Physics Department', now(), now(), 1, 1, 4);
INSERT INTO cardcontrol_domain VALUES(6, 'Residental', now(), now(), 1, 1, 1);
INSERT INTO cardcontrol_domain VALUES(5, 'Area 2', now(), now(), 1, 1, 6);

INSERT INTO cardcontrol_resource VALUES(1, '02155', '56 Professors Row', 'Medford', 'MA', 'United States', 'Metcalf Hall', now(), now(), 1, 1, 5);
INSERT INTO cardcontrol_resource VALUES(4, '02155', '200 Packard Ave', 'Medford', 'MA', 'United States', 'Carmichael Hall', now(), now(), 1, 1, 5);
INSERT INTO cardcontrol_resource VALUES(2, '02155', '161 College Ave', 'Medford', 'MA', 'United States', 'Halligan Hall', now(), now(), 1, 1, 2);
INSERT INTO cardcontrol_resource VALUES(3, '02155', '574 Boston Ave', 'Medford', 'MA', 'United States', 'CLIC Building', now(), now(), 1, 1, 3);

INSERT INTO cardcontrol_accesspoint VALUES(1, 'Metcalf East', now(), now(), 1, 1, 1);
INSERT INTO cardcontrol_accesspoint VALUES(2, 'Metcalf West', now(), now(), 1, 1, 1);
INSERT INTO cardcontrol_accesspoint VALUES(3, 'Main Entrance', now(), now(), 1, 1, 2);
INSERT INTO cardcontrol_accesspoint VALUES(4, 'Halligan Extension Entrance', now(), now(), 1, 1, 2);
INSERT INTO cardcontrol_accesspoint VALUES(5, 'Main Entrance', now(), now(), 1, 1, 3);
INSERT INTO cardcontrol_accesspoint VALUES(6, 'Physics Department', now(), now(), 1, 1, 3);
INSERT INTO cardcontrol_accesspoint VALUES(7, 'Main Entrance', now(), now(), 1, 1, 4);

INSERT INTO cardcontrol_useraccount_access_points VALUES(1, 1, 1);
INSERT INTO cardcontrol_useraccount_access_points VALUES(2, 1, 2);
INSERT INTO cardcontrol_useraccount_access_points VALUES(3, 1, 3);
INSERT INTO cardcontrol_useraccount_access_points VALUES(4, 1, 5);
INSERT INTO cardcontrol_useraccount_access_points VALUES(5, 2, 1);
INSERT INTO cardcontrol_useraccount_access_points VALUES(6, 2, 2);
INSERT INTO cardcontrol_useraccount_access_points VALUES(7, 2, 3);
INSERT INTO cardcontrol_useraccount_access_points VALUES(8, 2, 5);
INSERT INTO cardcontrol_useraccount_access_points VALUES(9, 2, 6);
INSERT INTO cardcontrol_useraccount_access_points VALUES(10, 3, 1);
INSERT INTO cardcontrol_useraccount_access_points VALUES(11, 3, 2);
INSERT INTO cardcontrol_useraccount_access_points VALUES(12, 3, 4);

-- INSERT INTO cardcontrol_request VALUES(1, 1, 0, null, null, now(), now(), 1, 1, 5, 1);
-- INSERT INTO cardcontrol_request VALUES(2, 1, 0, null, null, now(), now(), 1, 1, 5, 2);

\q

