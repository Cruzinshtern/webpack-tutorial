const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // [contenthash] is necessary to create a new file with a ceratin hash whenever there is a change in the file
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        //publicPath is default to value 'auto' in webpack 5, but it used to be ''
        publicPath: 'dist/'
    },
    mode: 'none',
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
            }
        ]
    },
    plugins: [
        new TerserPlugin(),
        // Extract css into separate file
        new MiniCssExtractPlugin({
            // [contenthash] is necessary to create a new file with a ceratin hash whenever there is a change in the file
            filename: 'styles.[contenthash].css'
        })
    ]
}