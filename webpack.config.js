const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const resolve = relativePath => path.resolve(__dirname, '.', relativePath)

module.exports = {
    entry: {
        index: resolve('client/src/index.js')
    },
    output: {
        filename: '[name].js',
        path: resolve('client/dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'vue-style-loader' },
                    { loader: 'css-loader'}
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './client/src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: resolve('client/src/assets'),
            to: resolve('client/dist/assets'),
            toType: 'dir'
        }])
    ]
  };