<?php
require_once '../../mysqlTools.php';
$mysqlTools = new MysqlTools();

$data = json_decode(file_get_contents('php://input'));

if($data) {
  global $mysqlTools;
  foreach ($data->score as $key => $value) {
    $statement = "update short_answer set score = {$value}, isGrade = true where shortAnswerId = {$key}";
    if ($mysqlTools->executeDML($statement)) {
      echo json_encode((object)['gradeDone' => true, 'successMsg' => '打分成功']);
    } else {
      echo json_encode((object)['errorMsg' => '打分失败，请联系管理员']);
    }
  }
}
