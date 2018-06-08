<?php 
	$start = $_GET['start'];
	$len = $_GET['len'];
	$items = array();

	for($i=0;$i<$len;$i++){
		array_push($items,$start+$i);
	}
	$ret = array('data'=>$items);

	echo json_encode($ret);
?>