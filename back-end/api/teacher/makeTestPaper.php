<?php
require_once '../../mysqlTools.php';
$mysqlTools = new MysqlTools();

$data = json_decode(file_get_contents('php://input'));
//print_r($data);
if($data) {
  $singleSelectedId = '';
  $multiSelectedId = '';
  $shortSelectedId = '';
  $testPaperId= time();
  if($data->singleSelectedId) {
    foreach ($data->singleSelectedId as $value) {
      $singleSelectedId .= $value . ',';
    }
  }
  if($data->multiSelectedId) {
    foreach ($data->multiSelectedId as $value) {
      $multiSelectedId .= $value . ',';
    }
  }
  if($data->shortSelectedId) {
    foreach ($data->shortSelectedId as $value) {
      $shortSelectedId .= $value . ',';
    }
  }
  $statementFirst = "insert into testpaper values($testPaperId, '{$data->title}', '{$data->username}','{$singleSelectedId}', '{$multiSelectedId}', '{$shortSelectedId}', '{$data->date->beginTime}', '{$data->date->endTime}')";


  if($mysqlTools->executeDML($statementFirst)){
    $flag = true;
    foreach ($data->class as $class) {
      $statementSecond = "insert into class values('{$class->key}', '{$class->label}', $testPaperId)";
      if (!$mysqlTools->executeDML($statementSecond)) {
       echo json_encode((object)['errorMsg' => '试卷分发失败，请稍后再试']);
        $flag = false;
      }
    }
    if($flag) {
      echo json_encode((object)['makeTestPaperDone' => true, 'successMsg' => '生成试卷成功']);
    }
  } else {
    echo json_encode((object)['errorMsg' => '试卷生成失败，请稍后再试']);
  }
}
