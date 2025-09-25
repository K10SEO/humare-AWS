const path = require("path");
// 경로를 조합해주는 node.js API
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    // target: ["web", "es5"], // ES6 지원하지 않는 브라우저에서 실행 가능
    mode: 'development',
	  entry: "./src/index.js",
  	output: {
      	filename: "bundle.js",
      	path: path.resolve(__dirname, "dist"),
      	// npm build (webpack) 실행 시 dist 폴더에 bundle.js 생성됨
        clean: true, // 빌드전 빌드폴더 정리
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', 'index.html'),
        }),
      ],
    module : {
        rules: [
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: /node_modules/,
            },
        ]
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "docs"),
      },
      port: 3036,
    },
};