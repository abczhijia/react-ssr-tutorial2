const path = require('path');

module.exports = {
    entry: './src/browser/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'client.js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    },
                },
            },
        ],
    },
};