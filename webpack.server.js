const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js',
    },
    target: 'node',
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    },
                },
            }],
    },
};