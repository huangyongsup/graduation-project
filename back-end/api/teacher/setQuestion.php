<?php
require_once '../../mysqlTools.php';
$mysqlTools = new MysqlTools();

$data = json_decode(file_get_contents('php://input'));

if($data) {
  global $mysqlTools;
  $statement= '';
  if($data->tableName === "short_answer_question"){
    $statement = "insert into $data->tableName values(default, $data->score, '{$data->question}', '{$data->correctAnswer}', '{$data->username}')";
  } else {
    $statement = "insert into {$data->tableName} values(default, $data->score, '{$data->question}', '{$data->A}', '{$data->B}', '{$data->C}', '{$data->D}', '{$data->correctAnswer[0]}', '{$data->username}')";
  }

  if($mysqlTools->executeDML($statement)){
      echo json_encode((object)['setQuestionDone' => true, 'successMsg' => '题目添加成功']);
  } else {
    echo json_encode((object)['errorMsg' => '题目添加失败，请联系管理员']);
  }
}
