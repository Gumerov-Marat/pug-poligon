const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // импортируем обязательно
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');


const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([{
        mode: 'development',
            resolve: {
                alias: {
                    Src: path.resolve(__dirname, './src'),
                    Pages: path.resolve(__dirname, './src')
                }
            },
        entry: {
            'index': PATHS.source + '/index.js',
        },

        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATHS.source + '/index.pug'
            }),

            // Это важный блок и он тут нужен. Ввверху импорт плагина
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
    },
    pug(),
    sass(),
    images(),
    fonts()
]);


module.exports = function (env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return merge([
            common,
            devserver()
        ]);
    }
};