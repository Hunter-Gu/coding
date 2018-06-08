require.config({
	baseUrl: './js',
	paths: {
		'jquery': './lib/jquery'
	}
});

require(['jquery', 'app/carousel','app/revolve','app/squee','app/stickup','app/backtotop', 'app/eventcenter'],function($, Carousel, Revolve, Squee, stickUp, backToTop, eventCenter){
	new Carousel($('.carousel'));
	
	Revolve($('.revolve'));

	Squee($('.squee'));

	$('nav').each(function(i,e){
		$(e).stickup();
	});

	backToTop();


	// $('.stop').hide();
	$('.start').on('click',function(){
		$('.start').hide();
		$('.stop').show();

		eventCenter.triggerEvent('stopauto');
	});
	$('.stop').on('click',function(){
		$('.stop').hide();
		$('.start').show();
		
		eventCenter.triggerEvent('autoplay');
	});
});
