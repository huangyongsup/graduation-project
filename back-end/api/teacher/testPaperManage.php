<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();

$tableName = $_GET['tableName'];

function getClassInfo(){
  global $mysqlTools;
  $query = "select classNo, className from class group by classNo";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请稍后再试']);
  }
}

function getSingleChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from single_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请稍后再试']);
  }
}

function getMultiChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from multi_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
}

function getShortAnswerQuestion(){
  global $mysqlTools;
  $query = "select * from short_answer_question";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
}

function getTestPaperList(){
  global $mysqlTools;
  $query = "select * from submit_log natural join testpaper";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
}

switch ($tableName){
  case 'single_choice_question':
    echo getSingleChoiceQuestion();
    break;
  case 'multi_choice_question':
    echo getMultiChoiceQuestion();
    break;
  case 'class':
    echo getClassInfo();
    break;
  case 'short_answer_question':
    echo getShortAnswerQuestion();
    break;
  case 'getTestPaperList':
    echo getTestPaperList();
    break;
  default:
    echo json_encode((object)['errorMsg' => '请求参数有误']);
    break;
}
