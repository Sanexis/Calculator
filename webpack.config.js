const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/js/index.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader', 
                        options: {
                            sourceMap: true, 
                            importLoaders: 2 
                        }
                    },
                    {
                        loader: 'postcss-loader', 
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', 
                        options: {
                            sourceMap: true,
                            implementation: require('sass') 
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
    devtool: 'source-map'
};