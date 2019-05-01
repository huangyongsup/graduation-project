<?php
require_once '../../mysqlTools.php';
$mysqlTools = new MysqlTools();

$data = file_get_contents('php://input');
echo $data;

$statementFirst = "insert into testpaper values(default, '{$data['title']}')";



