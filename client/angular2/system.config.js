System.config({
    transpiler: 'typescript', 
    typescriptOptions: { emitDecoratorMetadata: true }, 
    meta: { 'dist/js/main.min.js': { format: 'global' } },
    packages: {
        'dist/js': {defaultExtension: 'js'},
        'node_modules': {
            format: 'cjs',
            defaultExtension: 'js'
        }
    },
    paths: {
        'angular2/*': 'node_modules/angular2/*',
        'angular2/platform/*': 'node_modules/angular2/platform/*',
        'marked': 'node_modules/marked/marked.min',
        'rxjs/*': 'node_modules/rxjs/*',
		'shared/*': '../../shared/src/js/*'
    }
});
