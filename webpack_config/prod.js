
'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'entry.min': './src/entry.js',
    },
    mode: 'production',
    output: {
        chunkFilename: '[name].[contenthash].js',
        filename: '[name].js',
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
            templateContent: `
                <!DOCTYPE html>
                <html lang="ko">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>ENTRY ASSESS - EntryJS</title>
                    <style>
                        body { margin: 0; font-family: sans-serif; }
                        #entryContainer { width: 100%; height: 100vh; }
                    </style>
                </head>
                <body>
                    <div id="entryContainer"></div>
                </body>
                </html>
            `,
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
