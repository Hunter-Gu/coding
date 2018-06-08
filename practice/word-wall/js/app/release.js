define(['jquery','app/layout'],function($,layout){
	var release = function($ele){
		$ele.find('button').on('click',function(){
			if($ele.find('textarea').val() === ''){
				alert('内容为空，请输入内容...')
			}else{
				renewData();
			}
		});
		function renewData(){
			var d = new Date();
			var str = '';
				str += '<div class="content"><div class="time"><p><span>' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
				str += '</span><a href="javascript:void(0)" class="close">x</a></p></div><p class="word">' + $ele.find('textarea').val();
				str += '</p><p class="name"><img src="img/bpic_1.gif">陌生人</p></div>';
			$('.ct-word').append($(str));
			$('textarea').val('');
			layout.layout();
		}
		
	}
	return release;
});

