<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();

$type = $_GET['type'];

function getTestPaperList(){
  global $mysqlTools;
  $classNo = $_GET['classNo'];
  $query = "select * from class natural join testpaper where classNo = '{$classNo}'";
  if($res = $mysqlTools->executeDQL($query)){
    return json_encode($res);
  } else {
   return json_encode((object)['errorMsg' => '请求失败，请稍后再试']);
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
      if($value && $value !== ','){
        $singleQuery = "select * from single_choice_question where singleChoiceId = '{$value}'";
        if($single = $mysqlTools->executeDQL($singleQuery)){
          array_push($singleChoiceData, $single[0]);
        } else {
          return json_encode((object)['errorMsg' => '单选题数据请求失败，请联系管理员']);
        }
      }
    }
    foreach ($multiChoice as $key => $value){
      if($value && $value !== ','){

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

switch ($type){
  case 'getTestPaperList':
    echo getTestPaperList();
    break;
  case 'getTestPaperInfo':
    echo getTestPaperInfo();
    break;
  default:
    echo json_encode((object)['errorMsg' => '请求参数有误']);
    break;
}
