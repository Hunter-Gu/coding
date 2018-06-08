requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'lib/jquery',
		'randomplay': 'app/randomplay'
	}
});


requirejs(['jquery','randomplay','app/action'],function($,getSongsFM,bindEvent){

	// console.log(getSongsFM)
	getSongsFM;

	bindEvent;
});
