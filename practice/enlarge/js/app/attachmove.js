define(['jquery'],function($){
	$.fn.attachMove = function(){
		var $cur = $(this);

		var curW = $cur.width(),
			curH = $cur.height(),
			ctPosLeft = $cur.parent().offset().left,
			ctPosHeight = $cur.parent().offset().top;
		
		var lock = false;

		$cur.parent().on('mousemove',function(e){
			// if(lock) return ;
			lock = true;
			var curPosLeft = e.pageX - ctPosLeft - Math.floor(curW/2),
				curPosHeight = e.pageY - ctPosHeight - Math.floor(curH/2);
			
			if(curPosLeft >= 250){
				curPosLeft = 250;
			}else if(curPosLeft <= 0){
				curPosLeft = 0;
			}
			if(curPosHeight >= 250){
				curPosHeight = 250;
			}else if(curPosHeight <= 0){
				curPosHeight = 0;
			}
			$cur.css({
				'left': curPosLeft,
				'top': curPosHeight
			});

			$('.are').css({
				'left': - Math.floor(800 * curPosLeft/350),
				'top': - Math.floor(800 * curPosHeight/350)
			});
			lock = false;
		});
		
	};
	// return attachMove;
});