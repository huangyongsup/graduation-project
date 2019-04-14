<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();

function getSingleChoiceQuestion(){
  global $mysqlTools;
  $query = "select * from single_choice_question";
  if($res = $mysqlTools->executeDQL($query)){
    echo json_encode($res);
  }
}

getSingleChoiceQuestion();
