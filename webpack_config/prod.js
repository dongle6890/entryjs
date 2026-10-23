
'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'entry.min': './src/entry.js',
    },

    mode: 'production',

    output: {
        chunkFilename: '[name].[contenthash].js',
        filename: '[name].js',
        publicPath: '/',
    },

    module: {
        rules: [],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name][contenthash].css',
        }),

        new HtmlWebpackPlugin({
            title: 'ENTRY ASSESS - EntryJS',
            filename: 'index.html',
            template: './example/example.ejs',
            inject: false,
            publicPath: '/',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'extern',
                    to: 'extern',
                    noErrorOnMissing: true,
                    force: true,
                },
                {
                    from: 'images',
                    to: 'images',
                    noErrorOnMissing: true,
                    force: true,
                },
                {
                    from: 'weights',
                    to: 'weights',
                    noErrorOnMissing: true,
                    force: true,
                },
            ],
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                parallel: true,
                terserOptions: {
                    ecma: 5,
                },
            }),
        ],
    },
};
