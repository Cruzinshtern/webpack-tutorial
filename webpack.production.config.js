const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js',
    },
    output: {
        // [contenthash] is necessary to create a new file with a ceratin hash whenever there is a change in the file
        // [name] takes values from entry object
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        //publicPath is default to value 'auto' in webpack 5, but it used to be ''
        // value is set to be '' on purpose because now we use index.html from dist folder
        publicPath: '',
        // clean: true // doest the same as CleanWebpackPlugin but has less functionality
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            // if a third party lib is less then 30 KB webpack will not create a separate bundle for it, minSize can manipulate that size 
            minSize: 3000
        }
    },
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
            // {
            //     // necessary to import css files into js
            //     test: /\.css$/,
            //     // css-loader reads the content of css files and returns it, nothing more
            //     // style-loader takes css content and injects it with help of style tags
            //     // NOTE: order is important, starts right and goes left
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            {
                // necessary to import css files into js
                test: /\.css$/,
                // css-loader reads the content of css files and returns it, nothing more
                // NOTE: order is important, starts right and goes left
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            // {
            //     // necessary to import scss files into js
            //     test: /\.scss$/,
            //     // css-loader reads the content of css files and returns it, nothing more
            //     // style-loader takes css content and injects it with help of style tags
            //     // sass-loader converts sass to css
            //     use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            // }
            {
                // necessary to import scss files into js
                test: /\.scss$/,
                // css-loader reads the content of css files and returns it, nothing more
                // sass-loader converts sass to css
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }, 
            {
                test: /\.hbs$/,
                use: [ 'handlebars-loader' ]
            }
        ]
    },
    plugins: [
        // Extract css into separate file more useful in prod environment
        new MiniCssExtractPlugin({
            // [contenthash] is necessary to create a new file with a ceratin hash whenever there is a change in the file
            filename: '[name].[contenthash].css'
        }),
        // this plugin cleans the output folder removing unnecessary files
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            // chunks names are taken from entry object
            chunks: ['hello-world'],
            title: 'Hello world',
            template: 'src/page-template.hbs',
            description: 'Hello world',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            // chunks names are taken from entry object
            chunks: ['kiwi'],
            title: 'Kiwi',
            template: 'src/page-template.hbs',
            description: 'Kiwi',
            minify: false
        })
    ]
}