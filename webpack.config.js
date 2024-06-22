const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
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
            }
        ]
    }
}