define(['jquery'],($)=>{
	var GoTop = function(){
		var instance;
		function backToTop(){
			var $back = this.$back = $('<p id="back"><a href="javascript:void(0)" id="back-top">回到顶部</a></p>')
			
			$back.css({
				'background-color': 'pink',
				'position': 'fixed',
				'bottom': 50,
				'right': 50,
				'padding': '20px 10px',
				'z-index': 6,
				'opacity': 0.8
			});
			$back.hide();

			$('body').append($back);

			this.event();
			this.show();
		}
		backToTop.prototype.event = function(){
			$('#back-top').on('click',()=>{
				$(window).scrollTop(0)
			});
		}
		backToTop.prototype.show = function(){
			$(window).on('scroll',()=>{
				if($(window).scrollTop() > 350){
					this.$back.show();
				}else{
					this.$back.hide();
				}
			});
		}


		if(!instance){
			instance = new backToTop();
		}else{
			return instance;
		}
	};
	return GoTop
});