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
  teacher varchar(16) not null
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
  teacher varchar(16) not null
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
  teacher varchar(16) not null,
  singleChoiceId varchar(128),
  multiChoiceId varchar(128),
  shortAnswerId varchar(128),
  beginTime date not null,
  endTime date not null
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
  classNo varchar(8) not null,
  name varchar(16) not null
);

#答题表
create table submit_log(
  username varchar(16),
  testPaperId int(4)
);

#提交单选题
create table single_answer(
  testPaperId int(4) not null,
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

select * from user;

insert into class values('CS01', '计算机一班', NULL);
insert into class values('CS02', '计算机二班', NULL);
insert into class values('CS03', '计算机三班', NULL);

insert into user values('cs01', 'cs01', 'student', 'CS01', '计算机一班');
insert into user values('cs02', 'cs02', 'student', 'CS02', '计算机二班');
insert into user values('cs03', 'cs03', 'student', 'CS03', '计算机三班');
insert into user values('teacher', 'teacher', 'teacher', 'CS01', '教师');
insert into user values('zhanglaoshi ', 'teacher', 'teacher', 'CS01', '张老师');
insert into user values('student', 'student', 'student', 'CS01', '学生');

select * from user natural join class where username='student' group by username;

drop table user;

select * from user natural join class natural join testpaper natural join submit_log natural join short_answer where username = 'student';

