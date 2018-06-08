define(['jquery','app/eventcenter'],function($, eventCenter){
	
	function Carousel($ct){

		var $ct = this.$ct = $ct,
			$node = this.$node = $ct.children().eq(0);
			$ele = this.$ele = $node.children(),
			imgWidth = this.imgWidth = $ele.children().width(),
			num = this.num = ($ele.length + 2),
			index = this.index = 1;

		this.flag = false;

		$node.append($ele.first().clone());
		$node.prepend($ele.last().clone());
		
		$node.css({
			'width': num * imgWidth,
			'margin-left': - imgWidth
		});

		$ct.find('.arrow').on('click','a',(e)=>{
			if(this.flag) return;
			this.flag = true;
			if($(e.target).parent().hasClass('pre')){
				this.playPre();
			}else if($(e.target).parent().hasClass('next')){
				this.playNext();
			}
		});
		$ct.find('.mark').on('click','a',(e)=>{
			if(this.flag) return;
			var i = $(e.target).parent().index() + 1;
			if(i > index){
				index = i;
				this.flag = true;

				this.playNext(i);
			}else if(i < index){
				index = i;
				this.flag = true;

				this.playPre(i)
			}
		});

		this.autoPlay();
		eventCenter.onEvent('autoplay',()=>{
			this.autoPlay();
		});
		eventCenter.onEvent('stopauto',()=>{
			this.stopAuto();
		});
	}
	Carousel.prototype.playNext = function(i){
		var index = this.index = i || (this.index + 1);
		this.play(index);
	};
	Carousel.prototype.playPre = function(i){
		var index = this.index = i || (this.index - 1);
		this.play(index);
	};
	Carousel.prototype.play = function(i){
		this.$node.animate({
			'margin-left': - i * this.imgWidth
		},500,()=>{
			if(i === 5){
				this.index = 1;
				this.$node.css({
					'margin-left': - this.imgWidth
				});
			}else if(i === 0){
				this.index = 4;
				this.$node.css({
					'margin-left': - 4 * this.imgWidth
				});
			}
			this.addStyle(this.index - 1);
			this.flag = false;
		});
	};
	Carousel.prototype.addStyle = function(i){
		var $ele = this.$ct.children().eq(2).children();//li
		$ele.children().removeClass('choose');
		$ele.eq(i).children().addClass('choose');
	};
	Carousel.prototype.autoPlay = function(){
		this.clock = setInterval(()=>{
			this.playNext()
		},3000);
	};
	Carousel.prototype.stopAuto = function(){
		clearInterval(this.clock);
	}

	return Carousel;
	
});