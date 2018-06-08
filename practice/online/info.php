<?php  
	$name = $_GET['name'];
	$img = $_GET['img'];
	if($name === 'name' && $img === 'img'){
		$users = array(
	        '{"name": "tdxy01","src":"images/1.jpg"}',
	        '{"name": "沉眠楚人","src":"images/2.jpg"}',
	        '{"name": "爱上karina","src":"images/3.gif"}',
	        '{"name": "tdxy01","src":"images/1.jpg"}',
	        '{"name": "today","src":"images/3.gif"}',
	        '{"name": "hlg","src":"images/2.jpg"}',
	        '{"name": "itcast","src":"images/2.jpg"}',
	        '{"name": "heima","src":"images/1.jpg"}',
	        '{"name": "nima","src":"images/3.gif"}',
	        '{"name": "gege","src":"images/2.jpg"}',
	        '{"name": "nimei","src":"images/1.jpg"}',
	        '{"name": "goodman","src":"images/2.jpg"}',
	        '{"name": "haoren","src":"images/1.jpg"}',
	        '{"name": "yuanxiaojie","src":"images/3.gif"}',
	        '{"name": "zhengyue","src":"images/3.gif"}',
	        '{"name": "qishi","src":"images/3.gif"}',
	        '{"name": "qqtang","src":"images/2.jpg"}',
	        '{"name": "wawawa","src":"images/3.gif"}',
	        '{"name": "haha","src":"images/1.jpg"}',
	        '{"name": "robot","src":"images/2.jpg"}',
	        '{"name": "XFlute","src":"images/2.jpg"}',
	        '{"name": "lovmilan","src":"images/1.jpg"}',
	        '{"name": "johnny670","src":"images/1.jpg"}',
	        '{"name": "xiaobinbin02","src":"images/3.gif"}',
	        '{"name": "axxxxx","src":"images/2.jpg"}'
	    );
	    echo json_encode($users);
    }
?>