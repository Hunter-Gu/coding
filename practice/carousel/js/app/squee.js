define(['jquery'],function($){
	var Squee = function($ct){
		var $ele;
		var flag = false;
		$ct.find('li').on('mouseenter',function(){
			if(flag) return;
			flag = true;
			
			$(this).siblings().animate({
				width: 50
			},400,()=>{
				
			});
			$(this).animate({
				width: 800
			},800,()=>{
				flag = false;
			});

		});
		$ct.find('ul').on('mouseleave',function(){
			$(this).children().animate({
				width: 200
			},500);
		});
	};

	return	Squee;
});