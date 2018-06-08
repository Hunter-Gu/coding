define(['jquery','app/move'],function($,move){
	var revolve = (function(){
		var formatPara = [
			{
				'width': 800,
				'top': 60,
				'left': 200,
				'opacity': 1,
				'z-index': 6
			},
			{
				'width': 600,
				'top': 80,
				'left': 600,
				'opacity': 0.7,
				'z-index': 5
			},
			{
				'width': 400,
				'top': 40,
				'left': 700,
				'opacity': 0.5,
				'z-index': 4
			},
			{
				'width': 200,
				'top': 20,
				'left': 500,
				'opacity': 0.3,
				'z-index': 3
			},
			{
				'width': 400,
				'top': 40,
				'left': 100,
				'opacity': 0.5,
				'z-index': 4
			},
			{
				'width': 600,
				'top': 80,
				'left': 0,
				'opacity': 0.7,
				'z-index': 5
			}
		];

		var arr = [];

		function init($node){
			var $ct = $node.find($('.ct'));

			for(var i = 0;i < $ct.find('li').length;i ++){
				arr.push($ct.find('li').eq(i));
			}
			move(arr,formatPara)
		}
		$('.next').on('click',function(){
			arr.unshift(arr.pop());
			move(arr,formatPara);			
		});
		$('.pre').on('click',function(){
			arr.push(arr.shift());
			move(arr,formatPara)	
		});

		return {
			init: init
		};
	})();
	return revolve;
});
