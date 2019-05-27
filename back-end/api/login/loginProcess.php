<?php

require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();
$username = $_GET['username'];
$password = $_GET['password'];
$query = "select * from user natural join class where username = '{$username}' and password = '{$password}' group by username";
if($userInfo = $mysqlTools->executeDQL($query)){
  echo json_encode($userInfo[0]);
} else {
  echo json_encode((object)['errorMsg' => '账号或密码错误']);
}

