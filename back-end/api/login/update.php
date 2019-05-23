<?php
require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();
$data = json_decode(file_get_contents('php://input'));

if($data){
  if(validate() && update()){
    echo json_encode((object)[
      'updateDone' => true,
      'successMsg' => '修改成功',
    ]);
  } else {
    echo json_encode((object)[
      'errorMsg' => '修改失败，请联系管理员',
      'updateDone' => false,
    ]);
  }
}

function validate(){
  global $mysqlTools, $data;
  $query = "select * from user natural join class where username = '{$data->username}' and password = '{$data->currentPassword}' group by username";
  if($mysqlTools->executeDQL($query)){
   return true;
  } else {
    return false;
  }
}

function update(){
  global $mysqlTools, $data;
  $statement = "update user set password = '{$data->password}' where username = '{$data->username}' ";
  if($mysqlTools->executeDML($statement)){
    return true;
  } else {
    return false;
  }
}
