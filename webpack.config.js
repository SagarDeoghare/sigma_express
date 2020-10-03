const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    
    externals: [nodeExternals()],
    entry: './src/index',
    
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './build')
    },
    plugins: [
        new NodemonPlugin(), // Dong
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    target: "node"
}