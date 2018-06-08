define(['jquery'],function($){
	var eventCenter = (function(){
		var event = [];

		function onEvent(evts, handler){
			event[evts] = event[evts] || [];

			event[evts].push({
				handler: handler
			});
		}

		function triggerEvent(evts) {
			if(!event[evts]){
				return;
			}
			event[evts][0].handler()
		}
		function offEvent(evts){
			delete event[evts];
		}

		return {
			onEvent: onEvent,
			triggerEvent: triggerEvent,
			offEvent: offEvent
		};
	})();

	return eventCenter;
});