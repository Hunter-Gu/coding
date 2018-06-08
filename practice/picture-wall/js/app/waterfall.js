define(['jquery'],function($){
	var waterFall = (function(){
		var node;
		function init($node){
			node = $node;
			var $ele = $node.find('img').parent(),
				$nodeW = $node.width(),
				$eleW = $ele.outerWidth(true);

			var colNum = Math.floor($nodeW / $eleW),
				arr = [];

			for(var i = 0;i < colNum;i ++){
				arr.push(0);
			}

			var minVal = 0,
				minIdx = 0;

			$ele.each(function(){
				minVal = Math.min.apply(null,arr),
				minIdx = arr.indexOf(minVal);
				$(this).css({
					'left': minIdx * $eleW,
					'top': minVal
				});
				arr[minIdx] += $(this).outerHeight(true);
			});
			$ele.parent().height(Math.max.apply(null,arr));
		}
		$(window).on('resize',function(){
			init(node);
		});	
		return init;
	})();
	return waterFall;
});