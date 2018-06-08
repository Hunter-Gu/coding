requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'lib/jquery',
		'waterfall': 'app/waterfall'
	}
});


requirejs(['jquery','waterfall','app/loadmore'],function($,waterFall,load){
	

	load.isShow($('.isshow'))
	waterFall($('.waterfall'))
});
