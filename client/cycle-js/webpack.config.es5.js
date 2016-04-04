'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    entry: './src/js/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        sourceMapFilename: '[file].map'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015'],
                plugins: [['transform-react-jsx', {
                    pragma: 'hJSX'
                }]]
            }
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    }
};
