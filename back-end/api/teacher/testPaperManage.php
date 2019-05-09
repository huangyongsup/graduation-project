<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();

$tableName = $_GET['tableName'];

function getClassInfo(){
  global $mysqlTools;
  $query = "select classNo, className from class group by classNo";
  if($res = $mysqlTools->executeDQL($query)){
    echo json_encode($res);
  } else {
    json_encode((object)['errorMsg' => '请求失败，请稍后再试']);
  }
}

function getSingleChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from single_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    echo json_encode($res);
  } else {
    json_encode((object)['errorMsg' => '请求失败，请稍后再试']);
  }
}

function getMultiChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from multi_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    echo json_encode($res);
  } else {
    json_encode((object)['errorMsg' => '请求失败，请稍后再试']);
  }
}

switch ($tableName){
  case 'single_choice_question':
    getSingleChoiceQuestion();
    break;
  case 'multi_choice_question':
    getMultiChoiceQuestion();
    break;
  case 'class':
    getClassInfo();
    break;
  default:
    echo json_encode((object)['errorMsg' => '请求参数有误']);
    break;
}
