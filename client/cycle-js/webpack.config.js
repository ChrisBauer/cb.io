import webpack from 'webpack';

let name = 'cb.io - CycleJS';

export default {
    entry: './src/js/app.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                        ['transform-react-jsx', {
                            pragma: 'hJSX'
                        }]
                    ]
                }
            }
        ]
    }
};
