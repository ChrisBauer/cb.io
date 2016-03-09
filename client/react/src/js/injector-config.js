var initialized = false;
function init () {
    if (initialized) {
        return;
    }
    var injector = require('js-di').Injector;

    var EventRegistrar = require('../../../dist/js/event-registrar').default;
    var ScrollKeeper = require('./scroll-keeper');

    var registrar = function () { return new EventRegistrar() };

    injector.register({ScrollKeeper: ScrollKeeper, EventRegistrar: registrar});
}

module.exports = {
    init: init
};
