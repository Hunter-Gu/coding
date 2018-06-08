define(['jquery','app/event','randomplay'],function($,eventCenter,getSongsFM){
//歌词同步 获取歌词和时间同步的数组 以及歌曲结束时间

	//当需要暂停，或者切换时，也需要同步 from control.js
	//1.暂停 歌曲停止，计时停止（歌词也停了）
	//2.暂停后开始 歌曲从暂停处开始（容易实现），记时从暂停处开始（歌词也会从暂停处开始）
	//3.下／上一首 重新 randommusic.js 中 playRandomMusic ajax
	var synLyric = (function(){
		var lycArr = [];//对应时间的歌词
		var nowLyc = '';
		var theLastTime = 0;//歌曲结束时间
		var song = document.getElementsByTagName('audio')[0];

		var clock,
			time = 0;

		//获取歌词
		function getLyric(data){
			$.ajax({
				url: 'http://api.jirengu.com/fm/getLyric.php',
				type: 'post',
				dataType: 'json',
				data: {
					sid: data.sid//相应的歌曲名
				},
				success: function(lrcData){//对应歌曲的歌词
					var arr = lrcData.lyric.split('\n')
					formLyric(arr);
				},
				error: function(){
					console.log('error1')
				}
			});
		}
		//组成一个数组 key-value形式  arr[time] = lyric ---> arr['00:03'] = '两只老虎 两只老虎 跑的...'
		function formLyric(arr){
			lycArr = [];
			var patt = /\[[0-9]{2}\:[0-9]{2}\.[0-9]{2}\]/g;
			var theLast =  arr.length - 1;
			while(arr[theLast] === ''){
				theLast -= 1;
			}
			theLastTime = arr[theLast].match(patt);//歌曲结束时间
			arr.forEach(function(e,i,a){
				var timeArr = e.match(patt);//时间组成的数组
				if(timeArr){
					var words = e.replace(timeArr.join(''),'');//歌词
					if(i === 0){
						var pat = /, by 饥人谷/;
						words = words.replace(pat,'');
					}
					// for(var j = 0;j < timeArr.length;j ++){
					// 	lycArr[timeArr[j]] = words;
					// }
					for(var j = 0;j < timeArr.length;j ++){
						lycArr[timeArr[j].substring(1,6)] = words;
					}
				}
			});
			// console.log(lycArr);//得到我们需要的歌词数组
			$('.full-lyrics').text('');
			for(var key in lycArr){
				$('.full-lyrics').append($('<p>'+lycArr[key]+'</p>'))
			}
			getEndTime(theLastTime)
		}
		//获得最后结束的时间，以此得到一首歌的时间
		function getEndTime(theLastTime){
			var strEndTime = theLastTime[0];//???
			var strMin = strEndTime.substring(1,3)
			var strSec= strEndTime.substring(4,6)
			setRange(strMin,strSec);
		}
	

	//将进度条与歌曲进行的进度、以及对应的歌词同步
		function setRange(endTimeMin,endTimeSec){
			if(song.duration){
				var endTime = Math.ceil(song.duration*1000) + 1;
			}else{
				var endTime = parseInt(endTimeMin)*60*1000 + parseInt(endTimeSec)*1000 + 30;
			}
			var strMin = endTime/60/1000;
			strMin = Math.floor(strMin);
			strMin = strMin<10 ? ('0'+ strMin) : strMin;
			var strSec = Math.round((endTime/60/1000 - strMin)*60);
			strSec = strSec<10 ? ('0'+ strSec) : strSec;
			$('.end').text(strMin+':'+strSec);

			time = 0;

			var timeMin = '00',
				timeSec = '00',
				strTime = '00:00';

			$('.lyric').text(lycArr[strTime])
			// console.log(strMin+':'+strSec)
			clearInterval(clock);
			eventCenter.onEvent('playOrStop',function(flg,arg){
				if(arg){
					time = Math.floor(arg * endTime / 100000);
					song.currentTime = time;
					// console.log(time);
				}
				var flag = flg || false;
				clearInterval(clock);
				if(flag){
					clock = setInterval(function(){
						if(flag){

							time ++;
							$('input[type="range"]').val(Math.round(time*100000/endTime));
							// console.log(Math.round(time*100000/endTime))
							timeMin = Math.floor(time/60);
							timeSec = Math.ceil(time - timeMin * 60);
							if(timeMin<10 && timeSec<10){
								strTime = '0'+timeMin+':0'+timeSec
							}else if(timeSec<10){
								strTime = timeMin+':0'+timeSec
							}else if(timeMin<10){
								strTime = '0'+timeMin+':'+timeSec
							}else{
								strTime = timeMin+':'+timeSec
							}
							if(lycArr[strTime]){
								$('.lyric').text(lycArr[strTime]);
							}
							$('.start').text(strTime);
							// console.log(time)
							if(strTime === (strMin+':'+strSec)){
								// console.log('over')
								clearInterval(clock);
								time = 0;
								eventCenter.triggerEvent('playother');
							}
						}
					},1000);
				}
			});	
		}

		return getLyric;
	})();

	return synLyric;
});