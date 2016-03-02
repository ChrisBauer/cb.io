var initialized = false;
function init () {
    if (initialized) {
        return;
    }
    var injector = require('./injector');

    var EventRegistrar = require('../../../dist/js/event-registrar').default;
    var registrar = new EventRegistrar();

    injector.register({EventRegistrar: registrar});

    var ScrollKeeper = injector.invoke(require('./scroll-keeper'));

    injector.register({ScrollKeeper: ScrollKeeper});
}

module.exports = {
    init: init
};
