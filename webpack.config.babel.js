import webpack from 'webpack';
import yargs from 'yargs';

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { optimizeMinimize } = yargs.alias('p', 'optimize-minimize').argv;
const nodeEnv = optimizeMinimize ? 'production' : 'development';

const devServer = {
    outputPath: path.join(__dirname, './dest'),
    contentBase: path.resolve(__dirname, './src'),
    colors: true,
    quiet: false,
    noInfo: false,
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 8080,
    hot: true
};

export default {
    entry: {
        'bundle': './index.js'
    },
    devServer: devServer,
    output: {
        path: devServer.outputPath,
        filename: 'js/[name].js',
        library: 'middlewareReport',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /datatables/, loader: 'imports?define=>false'}, // Disable AMD for DataTables
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ]
    },
    externals: [],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify(nodeEnv) }
        }),
        new ExtractTextPlugin('css/style.css'),
        new CopyWebpackPlugin([{ from: 'src/js/api/data.json', to: 'src/js/api/data.json' }]),
        new CopyWebpackPlugin([{ from: 'src/css/lib', to: 'css/lib' }]),
        new CopyWebpackPlugin([{ from: 'lib', to: 'lib' }]),
        new CopyWebpackPlugin([{ from: 'index.html', to: 'index.html' }])
    ],
    devtool: optimizeMinimize ? 'source-map' : null
};