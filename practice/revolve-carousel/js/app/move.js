define(['jquery'],function($){
	var flag = false,
		clock;
	function move(arr,obj){
		clearInterval(clock);
		clock = setInterval(function(){
			flag = true;
			arr.forEach(function(e,i,a){
				for(var key in obj[i]){
					var start = 0,
						speed = 0;
					if(key === 'opacity'){
						start = a[i].css('opacity') * 100;
						speed = (obj[i][key] * 100 - start) / 10;
					}else if(key === 'width'){
						start = parseInt(a[i].find('img').css('width'));
						speed = (obj[i][key] - start) / 10;
					}else{
						start = parseInt(a[i].css(key));
						speed = (obj[i][key] - start) / 10;
					}	
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(key === 'opacity'){
						a[i].css('opacity',(start + speed)/100);
					}else if(key === 'width'){
						a[i].find('img').css('width',start + speed);
					}else if(key === 'z-index'){
						a[i].css(key,obj[i][key])
					}else{
						a[i].css(key,start + speed);
					}
					// console.log(i+':'+key+':'+a[i].css(key)+'?'+formatPara[i][key]);
					if(parseInt(a[i].css(key)) != obj[i][key]){
						flag = false;								
					}
				}
				if(flag){
					clearInterval(clock);
				}
			});
		},30);
	}

	return move;
});