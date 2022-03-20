const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')

const production = {
    mode: 'production', 
}

module.exports = merge(baseConfig,production)