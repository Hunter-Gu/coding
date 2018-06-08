define([],function(){
	var eventCenter = (function(){
		events = {};
		function onEvent(evts, handler){
			events[evts] = events[evts] || [];
			// console.log(events)
			events[evts].push({
				handler: handler
			});
		}

		function triggerEvent(evts,arg,arg1){
			// console.log(events)
			events[evts][0].handler(arg,arg1);
		}

		function offEvent(evts){
			delete events[evts];
		}

		return {
			onEvent: onEvent,
			triggerEvent: triggerEvent,
			offEvent: offEvent
		}
	})();
	return eventCenter
});