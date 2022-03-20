const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


// 设置nodejs环境变量
// process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist')
    },

    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {

                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        // 指定版本
                                        corejs: {
                                            version: 3
                                        },
                                        // 指定兼容到那个版本
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            cacheDirectory: true
                        }
                    },

                ],
            },
            // 【不加，就很香】
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     // use: ['babel-loader','eslint-loader'],
            //     loader: 'eslint-loader',
            //     // enforce: 'pre',
            //     options: {
            //         // 1、自动修复2、可以忽略规则 eslint-disable-next-line
            //         fix: true,
            //         // 2、兼容处理
            //         // presets: ['@babel/preset-env']
            //     }
            // },
            {
                oneOf: [

                    {
                        test: /\.css$/,
                        exclude: /node_modules/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('autoprefixer')({
                                            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7', 'maintained node versions']
                                        })
                                    ]
                                }

                            }
                        ]
                    },
                    {
                        test: /\.less$/,
                        exclude: /node_modules/,
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        exclude: /node_modules/,
                        loader: 'url-loader',
                        options: {
                            limit: 30 * 1024,
                            name: '[hash:10].[ext]',
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    },
                    {
                        test: /\.html$/,
                        exclude: /node_modules/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(vue|css|less|js|html|jpg|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }


        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
        new CleanWebpackPlugin(),
        // css单独提取
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, '../src')
        }

    }
}