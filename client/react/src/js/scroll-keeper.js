
var scrollKeeper = null;
var EventRegistrar = null;

var callbacks = [];

module.exports = function getScrollKeeper (registrar) {
        
    if (registrar && !EventRegistrar) {
        EventRegistrar = registrar;
    }
    
    if (scrollKeeper !== null) return scrollKeeper;
    
    function setupWatcher () {
        EventRegistrar.register(window, 'onscroll', () => {
            checkContentSection();
        });
    }
    

    scrollKeeper = {
        anchors: [],
    };
    
    scrollKeeper.registerAnchor = function registerAnchor (anchor) {
        observer.observe(anchor.element.parentElement, {childList: true, subtree: true});
        scrollKeeper.anchors.push(anchor);
        scrollKeeper.anchors.sort( (a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1 );
        scrollKeeper.currentAnchor = scrollKeeper.anchors[0];

        notify();
    };
    
    scrollKeeper.registerCallback = function registerCallback (cb) {
        callbacks.push(cb);
        return function unregister () {
            callbacks.splice(callbacks.indexOf(cb), 1);
        };
    };

    var observer = new MutationObserver( () => {
        updateOffsets();
    });
    
    function checkContentSection () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var i = 0;
        
        // Loop until the scrollTop is less than one of the anchor's positions. At this point,
        // we'll want to take the previous anchor
        while (i < scrollKeeper.anchors.length && scrollTop > scrollKeeper.anchors[i].position && ++i);

        // make sure we don't have a negative value for i after decrementing
        i = --i < 0 ? 0 : i;

        if (scrollKeeper.anchors[i] !== scrollKeeper.currentAnchor) {
            scrollKeeper.currentAnchor = scrollKeeper.anchors[i];
            
            notify(scrollKeeper.anchors, scrollKeeper.currentAnchor);
        }
    }
    
    function updateOffsets () {
        scrollKeeper.anchors.forEach( anchor => anchor.updateOffset() );
    }
    function notify () {
        callbacks.forEach( (cb) => cb(scrollKeeper.anchors, scrollKeeper.currentAnchor) );
    }

	setupWatcher();

    return scrollKeeper;
}
