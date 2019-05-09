<?php
require_once '../../mysqlTools.php';
$mysqlTools = new MysqlTools();

$data = json_decode(file_get_contents('php://input'));
//echo json_encode($data);
if($data) {
  $singleSelectedId = '';
  $multiSelectedId = '';
  $testPaperId= time();
  foreach ($data->singleSelectedId as $value) {
    $singleSelectedId .= $value . ',';
  }

  foreach ($data->multiSelectedId as $value) {
    $multiSelectedId .= $value . ',';
  }

  $statementFirst = "insert into testpaper values($testPaperId, '{$data->title}', '{$singleSelectedId}', '{$multiSelectedId}')";


  if($mysqlTools->executeDML($statementFirst)){
    $flag = true;
    foreach ($data->class as $class) {
      $statementSecond = "insert into class values('{$class->key}', '{$class->label}', $testPaperId)";
      if (!$mysqlTools->executeDML($statementSecond)) {
        json_encode((object)['errorMsg' => '试卷生成失败，请稍后再试']);
        $flag = false;
      }
    }
    if($flag) {
      echo json_encode((object)['makeTestPaperDone' => true, 'successMsg' => '生成试卷成功']);
    }
  } else {
    json_encode((object)['errorMsg' => '试卷生成失败，请稍后再试']);
  }
}
