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
#试题表
create table testpaper(
  testPaperId int(4) primary key ,
  testPaperTitle varchar(32) not null ,
  singleChoiceId varchar(128),
  multiChoiceId varchar(128)
);

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
  classNo varchar(8)
);

insert into testpaper values(default, '测试试卷', '1,2,3', '2,3,4');

insert into class values('CS01', '计算机一班', 1);
insert into class values('CS02', '计算机二班', NULL);
insert into class values('CS03', '计算机三班', NULL);

select * from class;

insert into user values('admin', 'admin', 'admin', NULL);
insert into user values('teacher', 'teacher', 'teacher', NULL);
insert into user values('student', 'student', 'student', 'CS01');

select * from user;

delete from testpaper where testPaperId between 2 and 10;
select * from testpaper;

