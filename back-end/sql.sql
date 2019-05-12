#作业报告在线管理系统
create database if not exists graduation_project;
use graduation_project;
#单选题表
create table single_choice_question(
  singleChoiceId int(8) auto_increment primary key ,
  score tinyint(1) not null ,
  question text not null ,
  answerA text not null ,
  answerB text not null ,
  answerC text not null ,
  answerD text not null ,
  correctAnswer enum('A', 'B', 'C', 'D') not null
);

#多选题表
create table multi_choice_question(
  multiChoiceId int(8) auto_increment primary key ,
  score tinyint(1) not null ,
  question text not null ,
  answerA text not null ,
  answerB text not null ,
  answerC text not null ,
  answerD text not null ,
  correctAnswer varchar(4) not null
);
select * from multi_choice_question;
#试题表
create table testpaper(
  testPaperId int(4) primary key ,
  testPaperTitle varchar(32) not null ,
  singleChoiceId varchar(128),
  multiChoiceId varchar(128)
);
select * from testpaper;
delete from testpaper where testPaperId = 1557638363;
#班级表
create table class(
  classNo varchar(8) ,
  className varchar(8) not null ,
  testPaperId int(4),
  foreign key (testPaperId) references testpaper(testPaperId) on delete cascade on  update cascade
);

drop table user;
drop table class;
#用户表
create table user(
  username varchar(16) primary key ,
  password varchar(16) not null ,
  userType enum('admin', 'teacher', 'student') not null ,
  classNo varchar(8) not null
);
#答题表
create table submit_log(
  username varchar(16),
  testPaperId int(4)
);
select * from submit_log;
#提交单选题
create table single_answer(
  testPaperId int(4),
  singleChoiceId int(8),
  singleAnswer enum('A', 'B', 'C', 'D'),
  isCorrect bool,
  correctAnswer enum('A', 'B', 'C', 'D') not null ,
  score tinyint(1) not null
);
select * from single_answer;
#提交多选题
create table multi_answer(
  testPaperId int(4),
  multiChoiceId int(8),
  multiAnswer varchar(4),
  isCorrect bool,
  correctAnswer varchar(4) not null ,
  score tinyint(1) not null
);
desc multi_answer;
delete from submit_log;
delete from single_answer;
delete from multi_answer;
select * from submit_log;
select * from single_answer;
select * from multi_answer;
select * from testpaper;
delete from testpaper where testPaperId < 1557318241;
insert into class values('CS01', '计算机一班', 1);
insert into class values('CS02', '计算机二班', NULL);
insert into class values('CS03', '计算机三班', NULL);
insert into class values('admin', '管理员', NULL);


select * from class;

insert into user values('admin', 'admin', 'admin', 'admin');
insert into user values('teacher', 'teacher', 'teacher', 'admin');
insert into user values('student', 'student', 'student', 'CS01');

select * from user natural join class where username='student' and password='student' group by username;

select * from class natural join testpaper where classNo = 'CS01';
select * from class;
select * from testpaper where testPaperId = '1557555916';
delete from class where testPaperId = '1557318152';
select * from multi_choice_question where multiChoiceId = '3';
select * from class natural join testpaper where classNo = 'admin';
