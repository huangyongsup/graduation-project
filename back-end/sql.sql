#作业报告在线管理系统
drop database graduation_project;
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
  correctAnswer enum('A', 'B', 'C', 'D') not null,
  teacher varchar(16)
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
  correctAnswer varchar(4) not null,
  teacher varchar(16)
);

#简答题表
create table short_answer_question(
  shortAnswerId int(8) auto_increment primary key ,
  score tinyint(1) not null ,
  question text not null ,
  correctAnswer text not null ,
  teacher varchar(16)
);

#试题表
create table testpaper(
  testPaperId int(4) primary key ,
  testPaperTitle varchar(32) not null ,
  teacher varchar(16),
  singleChoiceId varchar(128),
  multiChoiceId varchar(128),
  shortAnswerId varchar(128),
  beginTime date,
  endTime date
);

#班级表
create table class(
  classNo varchar(8) ,
  className varchar(8) not null ,
  testPaperId int(4),
  foreign key (testPaperId) references testpaper(testPaperId) on delete cascade on  update cascade
);

#用户表
create table user(
  username varchar(16) primary key ,
  password varchar(16) not null ,
  userType enum('admin', 'teacher', 'student') not null ,
  classNo varchar(8)
);

#答题表
create table submit_log(
  username varchar(16),
  testPaperId int(4)
);

#提交单选题
create table single_answer(
  testPaperId int(4),
  singleChoiceId int(8),
  singleAnswer enum('A', 'B', 'C', 'D'),
  isCorrect bool,
  correctAnswer enum('A', 'B', 'C', 'D') not null ,
  score tinyint(1) not null,
  fullMarks tinyint(1) not null,
  username varchar(16)
);

#提交多选题
create table multi_answer(
  testPaperId int(4),
  multiChoiceId int(8),
  multiAnswer varchar(4),
  isCorrect bool,
  correctAnswer varchar(4) not null ,
  score tinyint(1) not null,
  fullMarks tinyint(1) not null,
  username varchar(16)
);

#提交简答题
create table short_answer(
  testPaperId int(4),
  shortAnswerId int(8),
  shortAnswer text,
  correctAnswer text not null,
  score tinyint(1) not null ,
  fullMarks tinyint(1) not null,
  username varchar(16),
  isGrade bool
);

insert into class values('CS01', '计算机一班', NULL);
insert into class values('CS02', '计算机二班', NULL);
insert into class values('CS03', '计算机三班', NULL);

insert into user values('admin', 'admin', 'admin', NULL);
insert into user values('teacher', 'teacher', 'teacher', NULL);
insert into user values('student', 'student', 'student', 'CS01');
