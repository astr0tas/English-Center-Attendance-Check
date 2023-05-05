USE ENGLISH_CENTER;

-- add new student to system
DELIMITER $$
CREATE PROCEDURE newStudent(
	IN p_name varchar(50),
	IN p_phone varchar(10),
	IN p_birthday date,
	IN p_birthplace varchar(50),
    IN p_email varchar(50),
	IN p_address varchar(100)
)
BEGIN
	DECLARE p_id VARCHAR(12) DEFAULT newID();
    DECLARE p_ssn VARCHAR(12);
    DECLARE numStu DECIMAL(10,0) DEFAULT 0;
    
    SELECT COUNT(*) INTO numStu FROM student;
    SET p_ssn = CONCAT(LPAD(CAST(RAND() * 1000000000 AS UNSIGNED), 9, '0'), CAST(numStu AS CHAR));

	INSERT INTO student VALUES(p_id, p_name, p_phone, p_birthday, p_birthplace, p_email, p_address, p_ssn);
END $$
DELIMITER ;

-- add new student to class
DELIMITER $$
CREATE PROCEDURE addStudent(
	IN p_id varchar(12),
	IN p_classname varchar(50)
)
BEGIN
	INSERT INTO in_class VALUES(p_id, p_classname);
    UPDATE class SET Current_stu = Current_stu + 1 WHERE Name = p_classname;
END $$
DELIMITER ;


-- change class of student
DELIMITER $$
CREATE PROCEDURE changeClass(
	IN p_id varchar(12),
    IN p_old_classname varchar(50),
	IN p_new_classname varchar(50)
)
BEGIN
    UPDATE class SET Current_number_of_student = Current_number_of_student - 1 WHERE Name = p_old_classname;
    UPDATE class SET Current_number_of_student = Current_number_of_student + 1 WHERE Name = p_new_classname;
    UPDATE in_class SET Class_name = p_new_classname WHERE Student_ID = p_id AND Class_name = p_old_classname;
END $$
DELIMITER ;-- add new student to system

-- generate sessions for a classs
DROP PROCEDURE IF EXISTS GenSession;
DELIMITER $$
CREATE PROCEDURE GenSession(
	IN className varchar(100),
	IN current_day DATE,
    IN end_day DATE,
	IN target_day VARCHAR(10),
    IN TimeTableID INT,
    IN room varchar(10),
    IN offset INT,
    IN studyDays INT
)
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE current_day <= end_day AND i<=12 DO
        IF DAYNAME(current_day) = target_day THEN
			INSERT INTO SESSION(Timetable_ID,Session_date,Classroom_ID,Session_number,Status,Class_name) values(TimeTableID,current_day,room,i+offset+(studyDays-1)*(i-1),2,className);
			UPDATE CLASS SET Status=true WHERE Name=className;
            SET i = i + 1;
        END IF;
        SET current_day = DATE_ADD(current_day, INTERVAL 1 DAY);
    END WHILE;
END $$
DELIMITER ;

-- call GenSession('TOEIC04','2023-04-30','2023-07-30','Monday',6,'ROOM03',0,3);
-- call GenSession('TOEIC04','2023-04-30','2023-07-30','Wednesday',6,'ROOM03',1,3);
-- call GenSession('TOEIC04','2023-04-30','2023-07-30','Friday',6,'ROOM03',2,3);

-- call GenSession('TOEIC03','2023-04-30','2023-07-30','Tuesday',6,'ROOM01',0,2);
-- call GenSession('TOEIC03','2023-04-30','2023-07-30','Thursday',8,'ROOM01',1,2);

-- assign teacher for a session
DROP PROCEDURE IF EXISTS AssignSessionForTeacher;
DELIMITER $$
CREATE PROCEDURE AssignSessionForTeacher(
	IN sessionNumber INT,
    IN className varchar(100),
    IN teacherID varchar(15)
)
BEGIN
	IF teacherID IN (select Teacher_ID from TEACH where Class_name=className) THEN
		INSERT INTO TEACHER_RESPONSIBLE(Session_number,Class_name,Teacher_ID) VALUES(sessionNumber,className,teacherID);
    END IF;
END $$
DELIMITER ;

-- call AssignSessionForTeacher(1,'TOEIC03','TEACHER01');
-- call AssignSessionForTeacher(2,'TOEIC03','TEACHER01');
-- call AssignSessionForTeacher(3,'TOEIC03','TEACHER01');
-- call AssignSessionForTeacher(4,'TOEIC03','TEACHER01');
-- call AssignSessionForTeacher(5,'TOEIC03','TEACHER02');
-- call AssignSessionForTeacher(6,'TOEIC03','TEACHER02');
-- call AssignSessionForTeacher(7,'TOEIC03','TEACHER02');
-- call AssignSessionForTeacher(8,'TOEIC03','TEACHER02');
-- call AssignSessionForTeacher(21,'TOEIC03','TEACHER02');

-- call AssignSessionForTeacher(1,'TOEIC04','TEACHER01');
-- call AssignSessionForTeacher(2,'TOEIC04','TEACHER01');
-- call AssignSessionForTeacher(3,'TOEIC04','TEACHER01');
-- call AssignSessionForTeacher(4,'TOEIC04','TEACHER02');
-- call AssignSessionForTeacher(5,'TOEIC04','TEACHER02');
-- call AssignSessionForTeacher(6,'TOEIC04','TEACHER02');
-- call AssignSessionForTeacher(7,'TOEIC04','TEACHER03');
-- call AssignSessionForTeacher(8,'TOEIC04','TEACHER03');
-- call AssignSessionForTeacher(9,'TOEIC04','TEACHER03');

-- check teacher attendace
DROP PROCEDURE IF EXISTS TeacherAttendance;
DELIMITER $$
CREATE PROCEDURE TeacherAttendance(
	IN sessionNumber INT,
    IN className varchar(100),
    IN teacherID varchar(15),
    IN Status INT,
    IN Note text
)
BEGIN
	update TEACHER_RESPONSIBLE set TEACHER_RESPONSIBLE.Status=Status,TEACHER_RESPONSIBLE.Note=Note where Session_number=sessionNumber and Class_name=className and Teacher_ID=teacherID;
END $$
DELIMITER ;

-- check student attendace
DROP PROCEDURE IF EXISTS StudentAttendance;
DELIMITER $$
CREATE PROCEDURE StudentAttendance(
	IN sessionNumber INT,
    IN className varchar(100),
    IN studentID varchar(15),
    IN Status INT,
    IN Note text
)
BEGIN
	if exists(select Status from STUDENT_ATTENDANCE where Session_number=sessionNumber and Class_name=className and Student_ID=studentID) then
		update STUDENT_ATTENDANCE set Status=Status, Note=Note where Session_number=sessionNumber and Class_name=className and Student_ID=studentID;
    else
		insert into STUDENT_ATTENDANCE values(sessionNumber,className,studentID,Status,Note);
    end if;
END $$
DELIMITER ;

-- select * from TEACHER_RESPONSIBLE where Session_number='21' and Class_name='TOEIC03' and Teacher_ID='TEACHER02';
-- select * from STUDENT_ATTENDANCE;
-- select * from SUPERVISOR_RESPONSIBLE;

-- create a new class
DROP PROCEDURE IF EXISTS createClass;
DELIMITER $$
CREATE PROCEDURE createClass(
	className VARCHAR(100),
    start_date DATE,
	end_date DATE,
    roomID varchar(15)
)
BEGIN
	declare seats int;
    select Max_of_seat into seats from CLASSROOM where ID=roomID;
    insert into CLASS values(start_date,end_date,className,1,seats,24);
END $$
DELIMITER ;


-- SELECT Timetable_ID from SESSION where Session_number_make_up_for is null and
--             ((Session_date>='2023-05-02' and Session_date<='2023-06-07') or (Session_date<='2023-05-02' and Session_date>='2023-06-07') or (Session_date>='2023-05-02' and Session_date>='2023-06-07') or (Session_date<='2023-05-02' and Session_date<='2023-06-07'))
--             and DAYOFWEEK(Session_date)=3 and Classroom_ID='ROOM01';
            
-- insert into TEACH values('TEACHER02','test'); 
-- insert into TEACH values('TEACHER01','test');
-- call createClass('test','2023-05-07','2023-05-31','ROOM01');
-- call GenSession('test','2023-05-07','2023-05-31','Monday','3','ROOM01',0,2); call GenSession('test','2023-05-07','2023-05-31','Wednesday','3','ROOM01',1,2);
-- select *,DAYOFWEEK(Session_date) from session where class_name='test';
-- select * from class;
-- select * from TEACHER_RESPONSIBLE where class_name='test';
-- select * from TEACH where class_name='test';
-- -- delete from class where name='test';

-- call AssignSessionForTeacher(1,'test','TEACHER01'); call AssignSessionForTeacher(2,'test','TEACHER02'); call AssignSessionForTeacher(3,'test','TEACHER01'); call AssignSessionForTeacher(4,'test','TEACHER02'); call AssignSessionForTeacher(5,'test','TEACHER01'); call AssignSessionForTeacher(6,'test','TEACHER02'); call AssignSessionForTeacher(7,'test','TEACHER01'); call AssignSessionForTeacher(8,'test','TEACHER02'); 
-- call AssignSessionForTeacher(9,'test','TEACHER01'); call AssignSessionForTeacher(10,'test','TEACHER02'); call AssignSessionForTeacher(11,'test','TEACHER01'); call AssignSessionForTeacher(12,'test','TEACHER02'); call AssignSessionForTeacher(13,'test','TEACHER01'); call AssignSessionForTeacher(14,'test','TEACHER02'); call AssignSessionForTeacher(15,'test','TEACHER01'); call AssignSessionForTeacher(16,'test','TEACHER02'); 
-- call AssignSessionForTeacher(17,'test','TEACHER01'); call AssignSessionForTeacher(18,'test','TEACHER02'); call AssignSessionForTeacher(19,'test','TEACHER01'); call AssignSessionForTeacher(20,'test','TEACHER02'); call AssignSessionForTeacher(21,'test','TEACHER01'); call AssignSessionForTeacher(22,'test','TEACHER02'); call AssignSessionForTeacher(23,'test','TEACHER01'); call AssignSessionForTeacher(24,'test','TEACHER02');

select * from session where Class_name='TOEIC03';
delete from session where Class_name='TOEIC03' and Session_number=26;