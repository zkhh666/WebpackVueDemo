const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')


 const dev = {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true
    }
}

module.exports = merge(baseConfig,dev)