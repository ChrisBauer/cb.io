
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
                if (Array.isArray(newDeps[key])) {
                    var dep = newDeps[key];
                    acc[key] = dep[0][dep[1]](dep[2]);
                }
                else {
                    acc[key] = newDeps[key];
                }
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
    getContainer: (id) => injectorMap[id] || injectorMap.root || null,
    createContainer: (id, parentId) => {
        if (injectorMap[id]) {
            // throw?
            return injectorMap[id];
        }
        injectorMap[id] = Injector(id);
        return injectorMap[id];
    },
    invoke: (needsInjection) => {
        if (typeof needsInjection === 'function' && needsInjection._inject !== undefined) {
            // beautiful reflection code that won't work when minified
            // so we follow the Angular 1 pattern of creating an array of deps and attaching it
            // var args = needsInjection.toString().match(/\([a-zA-Z0-9,_\$\ ]*\)/)[0];
            // args = args.substring(1, args.length - 1).split(',');
            var args = needsInjection._inject;
            var deps = args.map( (arg) => injectorMap.root.get(arg.trim()) );
            return needsInjection.apply(needsInjection, deps);
        }
        else {
            return needsInjection;
        }
    }
};
