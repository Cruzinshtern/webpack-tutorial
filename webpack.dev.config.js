const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // [contenthash] is necessary to create a new file with a ceratin hash whenever there is a change in the file
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        //publicPath is default to value 'auto' in webpack 5, but it used to be ''
        // value is set to be '' on purpose because now we use index.html from dist folder
        publicPath: '',
        // clean: true // doest the same as CleanWebpackPlugin but has less functionality
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                // webpack determines by itself how to treat the image if you just put 'asset' here instead of 'asset/resource' or 'asset/inline'
                type: 'asset',
                // parser prop can determine the magic number when to use asset/resource and when asset/inline
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024 // 3 kilobytes
                    }
                }
            },
            {
                // this is necessary to treat txt files as plain text files
                test: /\.txt/,
                type: 'asset/source'
            },
            {
                // necessary to import css files into js
                test: /\.css$/,
                // css-loader reads the content of css files and returns it, nothing more
                // style-loader takes css content and injects it with help of style tags
                // NOTE: order is important, starts right and goes left
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                // necessary to import scss files into js
                test: /\.scss$/,
                // css-loader reads the content of css files and returns it, nothing more
                // style-loader takes css content and injects it with help of style tags
                // sass-loader converts sass to css
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.hbs$/,
                use: [ 'handlebars-loader' ]
            }
        ]
    },
    plugins: [
        // this plugin cleans the output folder removing unnecessary files
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hello world',
            template: 'src/index.hbs',
            description: 'Some description'
        })
    ]
}