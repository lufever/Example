const webpack = require('webpack');
const path = require('path');
var glob = require("glob")
/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //打包的css拆分,将一部分抽离出来  
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackMd5Hash = require("webpack-md5-hash");

var htmlList = glob.sync('./src/**/*.html');

var HtmlWebpackPluginList = htmlList.map(function (file, index) {
	var cfg = {}
	var pattern = /.*\/(.*?)\/(.+)\.(.+)/.exec(file);
	var controller = pattern[1]
	var method = pattern[2]
	var key = controller + '_' + method
	cfg.filename = controller + '/' + method + '.html'
	cfg.template = file
	cfg.chunks = [key]
	cfg.inject = true
	return new HtmlWebpackPlugin(cfg);
});

var jsList = glob.sync('./src/**/*.js');

var newEntries = jsList.reduce(function (memo, file) {
	var pattern = /.*\/(.*?)\/(.+)\.(.+)/.exec(file);
	var controller = pattern[1]
	var method = pattern[2]
	var key = controller + '_' + method
	memo[key] = file;
	return memo;
}, {});



module.exports = {
	entry: newEntries,
	output: {
		//path: path.resolve(__dirname, "build"),
		filename: 'js' + '/' + '[name].[chunkhash].js'
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: [
				"style-loader",
				MiniCssExtractPlugin.loader,
				"css-loader",
				"less-loader"
			]
		}]
	},
	mode: 'development',
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),
		new CopyWebpackPlugin([ //src下其他的文件直接复制到dist目录下
			{
				from: 'src/assets/favicon.ico',
				to: 'favicon.ico'
			}
		]),
		new webpack.ProvidePlugin({ //引用框架 jquery工具库是很多组件会复用的，省去了import
			'$': 'jquery' //引用webpack
		}),
		new UglifyJSPlugin(),
		...HtmlWebpackPluginList,
		new WebpackMd5Hash(),
		new CleanWebpackPlugin()
	]
};