<?php

require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();
//$userName = $_GET['userName'];
//$password = $_GET['password'];
$userName = 'admin';
$password = 'admin';
$query = "select * from user where userName = '{$userName}'and password = '{$password}'";
$userInfo = $mysqlTools->executeDQL($query);

echo json_encode($userInfo[0]);
