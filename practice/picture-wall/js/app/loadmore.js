define(['jquery','waterfall'],function($,waterFall){
	var load = (function(){
		var tag;
		var clock;
		var opts = {
			url: 'js/app/loadmore.php',
			type: 'get',
			dataType: 'json',
			data: {
				start: 1,
				len: 14
			},
			success: function(data){
				dealWith(data['data']);
			},
			error: function(){
				console.log('error...');
			}
		};
		function doLoad(){
			$.ajax(opts);
		}
		function isShow($ele){
			tag = $ele;
			var offsetTop = $ele.offset().top,
				winH = $(window).height(),
				scrollTop = $(window).scrollTop();
			
			if(winH + scrollTop > offsetTop){
				doLoad();
			}
		}
		function dealWith(data){
			var str = '';
			for(var i = 0;i < data.length;i ++){
				str += '<li><img src="pic/' + data[i] + '.jpg"></li>';
			}
			$('ul').append($(str));
			waterFall($('.waterfall'));
		}

		$(window).on('scroll',function(){
			clearTimeout(clock);
			clock = setTimeout(function(){
				isShow(tag);
			},800);
		});
		return {
			isShow: isShow
		}
	})();
	return load;
});