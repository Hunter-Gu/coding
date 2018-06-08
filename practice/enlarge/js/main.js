requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'lib/jquery'
	}
});

requirejs(['jquery','app/attachmove'],function($,attachMove){
	$('.cover').attachMove();
});