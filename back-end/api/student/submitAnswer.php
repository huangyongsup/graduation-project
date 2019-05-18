<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();
$data = json_decode(file_get_contents('php://input'));
if(submitLog() && singleAnswer() && multiAnswer() && shortAnswer()){
  echo json_encode((object)[
    'submitAnswerDone' => true,
    'successMsg' => '交卷成功',
    ]);
} else {
  echo json_encode((object)['errorMsg' => '交卷失败，请联系管理员']);
}

function submitLog(){
  global $data, $mysqlTools;
  $statement = "insert into submit_log values('{$data->username}', '{$data->testPaperId}')";
  if($res = $mysqlTools->executeDML($statement)){
    return true;
  } else {
    return false;
  }
}

function singleAnswer(){
  global $data, $mysqlTools;
  $arrayData = (Array)$data->answer;
  foreach ($arrayData as $key => $value) {
    $arr = explode('-',$key);
    if($arr[0] === 'singleChoice'){
      $query = "select correctAnswer, score from single_choice_question where singleChoiceId = '{$arr[1]}'";
      if($res = $mysqlTools->executeDQL($query)){
        $isCorrect = 0;
        $score = 0;
        if($res[0]['correctAnswer'] === $value){
          $isCorrect = 1;
          $score = $res[0]['score'];
        }
        $statement = "insert into single_answer values($data->testPaperId, $arr[1], '{$value}', {$isCorrect}, '{$res[0]['correctAnswer']}', {$score}, {$res[0]['score']}, '{$data->username}')";
        if(!$mysqlTools->executeDML($statement)){
          return false;
        }
      }
    }
  }
  return true;
}

function multiAnswer(){
  global $data, $mysqlTools;
  $arrayData = (Array)$data->answer;
  foreach ($arrayData as $key => $value) {
    $arr = explode('-',$key);
    if($arr[0] === 'multiChoice'){
      $query = "select correctAnswer, score from multi_choice_question where multiChoiceId = '{$arr[1]}'";
      if($res = $mysqlTools->executeDQL($query)){
        $isCorrect = 0;
        $score = 0;
        if(compareWithCorrectAnswer($value,str_split( $res[0]['correctAnswer'])) === 0){
          $isCorrect = 1;
          $score = $res[0]['score'];
        }
        $value = implode("", $value);
        $statement = "insert into multi_answer values($data->testPaperId, $arr[1], '{$value}', {$isCorrect}, '{$res[0]['correctAnswer']}', {$score}, {$res[0]['score']}, '{$data->username}')";
        if(!$mysqlTools->executeDML($statement)){
          return false;
        }
      }
    }
  }
  return true;
}

function shortAnswer(){
  global $data, $mysqlTools;
  $arrayData = (Array)$data->answer;
  foreach ($arrayData as $key => $value) {
    $arr = explode('-',$key);
    if($arr[0] === 'shortAnswer'){
      $query = "select correctAnswer, score from short_answer_question where shortAnswerId = '{$arr[1]}'";
      if($res = $mysqlTools->executeDQL($query)){
        $statement = "insert into short_answer values($data->testPaperId, $arr[1], '{$value}', '{$res[0]['correctAnswer']}', 0, {$res[0]['score']}, '{$data->username}', false)";
        if(!$mysqlTools->executeDML($statement)){
          return false;
        }
      }
    }
  }
  return true;
}

function compareWithCorrectAnswer($currentAnswer, $correctAnswer){
  sort($currentAnswer);
  sort($correctAnswer);
  return strcmp(implode("", $currentAnswer), implode("", $correctAnswer));
}
