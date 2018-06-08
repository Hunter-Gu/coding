require.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'lib/jquery',
		'eventCenter': 'app/event'
	}
});

require(['jquery','app/release','app/layout'],function($,release,layout){
	release($('.release'));
	layout.getData();
});