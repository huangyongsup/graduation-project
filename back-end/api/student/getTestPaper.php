<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();

$type = $_GET['type'];

function getTestPaperList(){
  global $mysqlTools;
  $classNo = $_GET['classNo'];
  $username = $_GET['username'];
  $queryFirst = "select * from class natural join testpaper where classNo = '{$classNo}'";
  if($res1 = $mysqlTools->executeDQL($queryFirst)){
    $querySecond = "select * from submit_log where username = '{$username}'";
    $res2 = $mysqlTools->executeDQL($querySecond);
    foreach ($res1 as $key => $value){
      foreach ($res2 as $index => $item){
        if($value['testPaperId'] === $item['testPaperId']){
          $res1[$key]['analysis'] = true;
        }
      }
    }
    return json_encode($res1);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
}

function getTestPaperInfo(){
  global $mysqlTools;
  $testPaperId = $_GET['testPaperId'];
  $query = "select * from testpaper where testPaperId = '{$testPaperId}'";
  if($res = $mysqlTools->executeDQL($query)){
    $singleChoice = explode(',' , $res[0]['singleChoiceId']);
    $multiChoice = explode(',' , $res[0]['multiChoiceId']);
    $singleChoiceData = [];
    $multiChoiceData = [];
    foreach ($singleChoice as $key => $value){
      if($value){
        $singleQuery = "select * from single_choice_question where singleChoiceId = '{$value}'";
        if($single = $mysqlTools->executeDQL($singleQuery)){
          array_push($singleChoiceData, $single[0]);
        } else {
          return json_encode((object)['errorMsg' => '单选题数据请求失败，请联系管理员']);
        }
      }
    }
    foreach ($multiChoice as $key => $value){
      if($value){
        $multiQuery = "select * from multi_choice_question where multiChoiceId = '{$value}'";
        if($multi = $mysqlTools->executeDQL($multiQuery)){
          array_push($multiChoiceData, $multi[0]);
        } else {
          return json_encode((object)['errorMsg' => '多选题数据请求失败，请联系管理员']);
        }
      }
    }
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
  return json_encode((object)[
    'singleChoiceData' => $singleChoiceData,
    'multiChoiceData' => $multiChoiceData
  ]);
}

function analysis(){
  global $mysqlTools;
  $testPaperId = $_GET['testPaperId'];
  $singleQuery = "select * from single_answer where testPaperId = '{$testPaperId}'";
  $multiQuery = "select * from multi_answer where testPaperId = '{$testPaperId}'";
  $res1 = $mysqlTools->executeDQL($singleQuery);
  $res2 = $mysqlTools->executeDQL($multiQuery);
  if($res1 && $res2){
    return json_encode(
      (object)[
        "singleAnswer" => $res1,
        "multiAnswer" => $res2,
      ]);
  } else {
    return json_encode((object)['errorMsg' => '请求失败，请联系管理员']);
  }
}

switch ($type){
  case 'getTestPaperList':
    echo getTestPaperList();
    break;
  case 'getTestPaperInfo':
    echo getTestPaperInfo();
    break;
  case 'analysis':
    echo analysis();
    break;
  default:
    echo json_encode((object)['errorMsg' => '请求参数有误']);
    break;
}
