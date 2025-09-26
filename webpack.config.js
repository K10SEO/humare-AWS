const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: "./src/index.js",
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: './',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            inject: 'body',
        }),
        // src 폴더 전체를 그대로 복사 (index.html, index.js 제외)
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src',
                    to: '.',
                    filter: (resourcePath) => {
                        const fileName = path.basename(resourcePath);
                        // index.html과 index.js만 제외하고 모든 파일 복사
                        return fileName !== 'index.html' && fileName !== 'index.js';
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    module: {
        rules: [
            // CSS는 JS에 인라인으로 포함 (별도 파일 생성 안 함)
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/,
            },
        ]
    },
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, "src"),
                publicPath: "/src",
            },
            {
                directory: path.resolve(__dirname, "dist"),
                publicPath: "/",
            }
        ],
        port: 3036,
        hot: true,
        open: true,
    },
};