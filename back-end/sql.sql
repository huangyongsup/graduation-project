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
  testPaperId int(4) auto_increment primary key ,
  testPaperTitle varchar(32) not null ,
  singleChoiceId int(8),
  multiChoiceId int(8),
  foreign key (singleChoiceId) references single_choice_question(singleChoiceId) on delete cascade on update cascade ,
  foreign key (multiChoiceId) references multi_choice_question(multiChoiceId) on update cascade on delete cascade
);

#班级表
create table class(
  classNo varchar(8) primary key ,
  className varchar(8) not null ,
  testPaperId int(4),
  foreign key (testPaperId) references testpaper(testPaperId) on delete cascade on  update cascade
);

#用户表
create table user(
  username varchar(16) primary key ,
  password varchar(16) not null ,
  userType enum('admin', 'teacher', 'student') not null ,
  classNo varchar(8) ,
  foreign key (classNo) references class(classNo) on update cascade on delete cascade
);

select * from class;
select * from testpaper;
