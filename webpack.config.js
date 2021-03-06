const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', 'json'],
    alias: {
      '@' : path.resolve(__dirname, 'app')
    }
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'app')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      }
    ]
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
    }),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
};