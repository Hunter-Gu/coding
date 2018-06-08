define(['jquery'],function($){
	$.fn.stickup = function(){
		var $ct = this;

		var start = $ct.offset().top,
			width = $ct.width()

		var $hold = $ct.clone();
		$ct.after($hold.hide());

		$(window).on('scroll',()=>{
			if($(window).scrollTop() >= start){
				$ct.css({
					position: 'fixed',
					top: 0,
					width: width
				});
				$hold.show();
			}else{
				$hold.hide();
				$ct.removeAttr('style');
			}
		});
	};
});