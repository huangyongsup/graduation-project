<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();

$tableName = $_GET['tableName'];
function getSingleChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from single_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    echo json_encode($res);
  }
}

function getMultiChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from multi_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    echo json_encode($res);
  }
}

switch ($tableName){
  case 'single_choice_question':
    getSingleChoiceQuestion();
    break;
  case 'multi_choice_question':
    getMultiChoiceQuestion();
    break;
  default:
    echo json_encode('请求参数有误');
    break;
}
