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
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
}

function getSingleChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from single_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
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

function getTestPaperList()
{
  global $mysqlTools;
  $result = [];
  $username = $_GET['username'];
  $queryFirst = "select testPaperId from testpaper where teacher = '{$username}'";
  if ($res1 = $mysqlTools->executeDQL($queryFirst)) {
    foreach ($res1 as $index => $item) {
      $querySecond = "select * from submit_log where testPaperId = {$item['testPaperId']}";
      $res2 = $mysqlTools->executeDQL($querySecond);
      if ($res2) {
        foreach ($res2 as $k => $v) {
          $query3 = "select username, className from user natural join class where username = '{$v['username']}' group by username";
          $query4 = "select * from testpaper where testPaperId = {$v['testPaperId']}";
          $query5 = "select isGrade from short_answer where username='{$v['username']}' and testPaperId = {$v['testPaperId']}";
          $res3 = $mysqlTools->executeDQL($query3);
          $res4 = $mysqlTools->executeDQL($query4);
          $res5 = $mysqlTools->executeDQL($query5);
          if ($res3 && $res4) {
            if ($res5) {
              array_push($result, array_merge($res3[0], $res4[0], $res5[0]));
            } else {
              array_push($result, array_merge($res3[0], $res4[0]));
            }
          } else {
            return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
          }
        }
      }
    }
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
  return json_encode($result);
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
