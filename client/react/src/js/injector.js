
// keys = injector instances
var injectorMap = {
    root: Injector('root')
};

function Injector (id, parentId) {
    var deps = {};

    var injector = {
        register: (newDeps) => {
            Object.keys(newDeps).reduce( (acc, key) => {
                if (acc[key]) {
                    // throw?
                    console.error('attempted to register key ' + key + ', but ' +
                        'it was already registered');
                }
                acc[key] = newDeps[key];
                return acc;
            }, deps);
        },
        registerInSequence: (...newDepSequence) => {
            newDepSequence.forEach( (depSet) => injector.register(depSet) );
        },
        get: (key) => {
            if (deps[key]) {
               return deps[key];
            }
            return injectorMap[parentId] ? injectorMap[parentId].get(key) : null;
        }
    };

    return injector;
}

module.exports = {
    //defaults
    get: (key) => injectorMap.root.get(key),
    register: (newDeps) => injectorMap.root.register(newDeps),
    registerInSequence: (newDepSequence) => injectorMap.root.registerInSequence(newDepSequence),
    // custom
    getInjector: (id) => injectorMap[id] || injectorMap.root || null,
    createContainer: (id, parentId) => {
        if (injectorMap[id]) {
            // throw?
            return injectorMap[id];
        }
        injectorMap[id] = Injector(id);
        return injectorMap[id];
    }
};
