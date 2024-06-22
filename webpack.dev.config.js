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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        //publicPath is default to value 'auto' in webpack 5, but it used to be ''
        // value is set to be '' on purpose because now we use index.html from dist folder
        publicPath: '',
        // clean: true // doest the same as CleanWebpackPlugin but has less functionality
    },
    mode: 'development',
    // this is necessary to develop faster, we create a server where when we make a change to code we can see the changes right away, without reloading the page
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
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
            filename: 'hello-world.html',
            chunks: ['hello-world'],
            title: 'Hello world',
            template: 'src/page-template.hbs',
            description: 'Hello world'
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            chunks: ['kiwi'],
            title: 'Kiwi',
            template: 'src/page-template.hbs',
            description: 'Kiwi'
        }),
        
    ]
}