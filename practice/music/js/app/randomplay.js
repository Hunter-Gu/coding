define(['jquery','app/setlyric'],function($,synLyric){
	var getSongsFM = (function(){
		//获取电台
		(function(){
			$.ajax({
				url: 'http://api.jirengu.com/fm/getChannels.php',
				type: 'get',
				dataType: 'json',
				success: function(data){
					dealWith(data.channels);
				},
				error: function(){
					console.log('error...')
				}
			});
			//将获得的电台展示在侧边栏 side 中
			function dealWith(data){
				var str = '';
				$('.fm-classify').empty();
				data.forEach(function(e,i,a){
					str += '<p><a href="javascript:void(0)" data-channel="'+ e['channel_id'];
					str += '">'+ e.name +'</a></p>';
				});
				$('.fm-classify').append($(str));
			}
		})();

//切换电台from control.js ------> 使得歌曲从相应电台得到 a 的 data-channel
		//基础功能 自动播放歌曲
		// 从指定电台获得歌曲
		getRandomSongs();
		function getRandomSongs(channel){
			var channel = channel || 'public_aaa_bbb';

			$.ajax({
				url: 'http://api.jirengu.com/fm/getSong.php',
				type: 'get',
				data: {
					channel: channel
				},
				dataType: 'json',
				success: function(song){
					fillMusicInfo(song['song'][0])
				},
				error: function(){
					console.log('error...')
				}
			});
		}
		//同步歌曲的信息。。。歌名，演唱者，。。。。
		function fillMusicInfo(data){
			var str ="";
			$('.info').empty();
			str += '<p class="title">' + data.title;//歌名
			str += '</p><p class="artist">——&nbsp;&nbsp;' + data.artist;//歌手
			str += '&nbsp;&nbsp;——</p><img src="' + data.picture;//图片
			str += '"><p class="lyric">&nbsp;&nbsp;';//歌词
			str += '</p><span class="start">00:00</span>'//当前歌曲进度
			str += '<input type="range" name="schedule" value="0">';//歌曲进度条
			str += '<span class="end"></span>';//歌曲总时间
			$('.info').append($(str));
			$('#fm').css({
				'background-image': 'url(' + data.picture + ')'
			});
			synLyric(data);//to setlyric.js 用于同步歌词
			$('audio').attr('src',data.url);//设置歌曲链接，按下播放即可播放
		}

		
		return {getRandomSongs: getRandomSongs};//切换电台 下／上一首 都是这个
	})();
	return getSongsFM;
});