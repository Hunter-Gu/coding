define(['jquery'],function($){
	var revolve = function($ct){
		var $node = $ct.children().eq(0);
		var arr = [];
		var lock = false;

		for(var i = 0;i < $node.children().length;i ++){
			arr[i] = $node.children().eq(i)[0];
		}
		var temp= [
			{
				'width': 800,
				'top': 60,
				'left': 200,
				'opacity': 1,
				'z-index': 6
			},
			{
				'width': 600,
				'top': 100,
				'left': 600,
				'opacity': 0.7,
				'z-index': 5
			},
			{
				'width': 400,
				'top': 30,
				'left': 700,
				'opacity': 0.5,
				'z-index': 4
			},
			{
				'width': 200,
				'top': 0,
				'left': 500,
				'opacity': 0.3,
				'z-index': 3
			},
			{
				'width': 400,
				'top': 30,
				'left': 100,
				'opacity': 0.5,
				'z-index': 4
			},
			{
				'width': 600,
				'top': 100,
				'left': 0,
				'opacity': 0.7,
				'z-index': 5
			}
		];
		layout();
		$ct.height(60 + $(arr[0]).height())

		function layout(){
			arr.forEach(function(e,i,a){
				$(e).animate({
					'width': temp[i].width,
					'top': temp[i].top,
					'left': temp[i].left,
					'opacity': temp[i].opacity,
					'z-index': temp[i]['z-index']
				},500,function(){
					lock = false;
				});
			});
		}
		
		function playPre(){
			if(lock) return;
			lock = true;
			var last = arr.shift();
			arr.push(last)
			layout();
		}
		function playNext(){
			if(lock) return;
			lock = true;
			var first = arr.pop();
			arr.unshift(first)
			layout();
		}

		$ct.find('img.pre').on('click',function(){
			playPre();
		});
		$ct.find('img.next').on('click',function(){
			playNext();
		});
	}
	return revolve;
});