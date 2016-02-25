export class EventRegistrar {
	
	register (element, event, callback) {
		if (!this[event]) {
			this[event] = [];
			this.setupCallback(element, event);
		}
		
		this[event].push(callback);
	}

	setupCallback (element, event) {
		element[event] = function () {
			var args = arguments;
			this[event].forEach( cb => cb.apply(arguments) );
		}.bind(this);
	}
}

