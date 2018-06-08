define(['jquery','randomplay','app/event'],function($,getSongsFM,eventCenter){
	var bindEvent = (function(){

		var flag = false;

		$('.info').on('mousedown','input',function(){
			$(this).on('mouseup',function(){
				var nowTime = $(this).val();
				eventCenter.triggerEvent('playOrStop',flag,nowTime);
			});
		});

		$('.play').on('click',function(){
			$('.play').toggle();
			$('.pause').toggle();
			document.getElementsByTagName('audio')[0].play();
			flag = true;
			eventCenter.triggerEvent('playOrStop',flag);
		});
		$('.lrc').on('click',function(){
			if($('#fm article').hasClass('rshow')){
				return ;
			}else if($('#fm article').hasClass('lshow')){
				$('#fm article').removeClass('lshow');
			}else{
				$('#fm article').addClass('lshow');
			}

			$('#fm article').toggle();
			$('#fm aside.full-lyrics').toggle();
		});

		$('.side').on('click',function(){
			if($('#fm article').hasClass('lshow')){
				return ;
			}else if($('#fm article').hasClass('rshow')){
				$('#fm article').removeClass('rshow');
			}else{
				$('#fm article').addClass('rshow');
			}
			
			$('#fm article').toggle();
			$('#fm aside.fm-classify').toggle();
		});

		$('.pause').on('click',function(){
			flag = false;
			$('.pause').toggle();
			$('.play').toggle();
			document.getElementsByTagName('audio')[0].pause();
			flag = false;
			eventCenter.triggerEvent('playOrStop',flag);
		});


		$('.icon-key').on('click','a',function(e){

			if($(e.target).parent().hasClass('right') || $(e.target).parent().hasClass('left')){
				$('audio').removeAttr('src');

				playOther();

				$('.play').hide();
				$('.pause').show();
			}
			
			
		});
		//切换电台
		$('.fm-classify').on('click','a',function(e){
			$('audio').removeAttr('src');

			var fm = $(e.target).data('channel');
			if($('#fm article').hasClass('rshow')){
				$('#fm article').removeClass('rshow');
			}

			getSongsFM.getRandomSongs(fm);
			
			$('#fm article').toggle();
			$('#fm aside.fm-classify').toggle();
			
			$('input').val(0);
			$('.pause').hide();
			$('.play').show();
			
		});

		function playOther(){
			getSongsFM.getRandomSongs();

			setTimeout(function(){
				document.getElementsByTagName('audio')[0].play();
				flag = true;
				eventCenter.triggerEvent('playOrStop',flag);
			},2000)
		}
		eventCenter.onEvent('playother',playOther);

	})();

	return bindEvent;
});