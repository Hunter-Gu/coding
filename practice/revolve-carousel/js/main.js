require.config({
	'baseUrl': 'js',
	'paths':{
		'jquery': 'lib/jquery'
	}
});

require(['jquery','app/revolve'],function($,revolve){
	revolve.init($('.revolve-carousel'))
});