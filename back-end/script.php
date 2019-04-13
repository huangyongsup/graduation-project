<?php
require_once 'MysqlTools.php';
$mysqlTools = new MysqlTools();
for($i = 0; $i < 35; ++$i){
  $res = $i % 4;
  $score = 2;
  switch ($res){
    case 0:
      $correctAnswer = 'A';break;
    case 1:
      $correctAnswer = 'B';break;
    case 2:
      $correctAnswer = 'C';break;
    case 3:
      $correctAnswer = 'D';break;
  }
  $statement = "insert into single_choice_question values(default, 2, '测试用例，这道题选{$correctAnswer}, 分值：{$score}', '正确答案是{$correctAnswer}','正确答案是{$correctAnswer}', '正确答案是{$correctAnswer}',   '正确答案是{$correctAnswer}', '{$correctAnswer}'
  )";
  if($mysqlTools->executeDML($statement)){
    echo '测试用例插入成功';
  } else {
    echo '测试用例插入失败';
  }
}
