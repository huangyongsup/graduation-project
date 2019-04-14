<?php
require_once '../../mysqlTools.php';
$data = file_get_contents('php://input');
echo json_encode($data);

