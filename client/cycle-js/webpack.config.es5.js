'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    entry: './src/js/app.js',
    output: {
        path: __dirname,
        filename: 'dist/bundle.js'
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
        }]
    }
};
