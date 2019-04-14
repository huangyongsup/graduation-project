<?php

require_once '../../MysqlTools.php';
$mysqlTools = new MysqlTools();
$username = $_GET['username'];
$password = $_GET['password'];
$query = "select * from user where username = '{$username}'and password = '{$password}'";
$userInfo = $mysqlTools->executeDQL($query);

echo json_encode($userInfo[0]);
